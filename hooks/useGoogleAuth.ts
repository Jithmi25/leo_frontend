import {
  AuthRequest,
  AuthSessionResult,
  DiscoveryDocument,
  exchangeCodeAsync,
  makeRedirectUri,
  useAuthRequest
} from 'expo-auth-session';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

// Access environment variables from Expo config (set in app.config.js)
const WEB_CLIENT_ID = Constants.expoConfig?.extra?.WEB_CLIENT_ID;
const WEB_CLIENT_SECRET = Constants.expoConfig?.extra?.WEB_CLIENT_SECRET;
const IOS_CLIENT_ID = Constants.expoConfig?.extra?.IOS_CLIENT_ID;
const ANDROID_CLIENT_ID = Constants.expoConfig?.extra?.ANDROID_CLIENT_ID;

// Debug logging for environment variables (remove in production)
if (__DEV__) {
  console.log('Google Auth Config:', {
    WEB_CLIENT_ID: WEB_CLIENT_ID ? 'Set' : 'Missing',
    WEB_CLIENT_SECRET: WEB_CLIENT_SECRET ? 'Set' : 'Missing',
    IOS_CLIENT_ID: IOS_CLIENT_ID ? 'Set' : 'Missing',
    ANDROID_CLIENT_ID: ANDROID_CLIENT_ID ? 'Set' : 'Missing',
  });
}

const discovery: DiscoveryDocument = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

interface GoogleAuthResult {
  idToken: string;
  accessToken: string | undefined;
}

interface UseGoogleAuthReturn {
  signIn: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  result: GoogleAuthResult | null;
  clearError: () => void;
  request: AuthRequest | null;
}

export const useGoogleAuth = (): UseGoogleAuthReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GoogleAuthResult | null>(null);

  const redirectUri = makeRedirectUri({
    scheme: 'leofrontend',
  });

  // Get the appropriate client ID based on platform
  const getClientId = () => {
    if (Platform.OS === 'ios') return IOS_CLIENT_ID;
    if (Platform.OS === 'android') return ANDROID_CLIENT_ID;
    return WEB_CLIENT_ID;
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: getClientId()!,
      scopes: ['openid', 'profile', 'email'],
      redirectUri,
    },
    discovery
  );

  useEffect(() => {
    const handleResponse = async (authResponse: AuthSessionResult) => {
      if (authResponse.type === 'success') {
        const { code } = authResponse.params;
        try {
          setIsLoading(true);
          
          // Validate that client secret is available
          if (!WEB_CLIENT_SECRET) {
            throw new Error('Google OAuth client_secret is not configured. Please check your app.config.js and .env file.');
          }
          
          const tokenResponse = await exchangeCodeAsync(
            {
              clientId: WEB_CLIENT_ID!,
              clientSecret: WEB_CLIENT_SECRET,
              code,
              redirectUri,
              extraParams: {
                code_verifier: (request as any)?.codeVerifier || '',
              },
            },
            discovery
          );

          if (tokenResponse.idToken) {
            setResult({
              idToken: tokenResponse.idToken,
              accessToken: tokenResponse.accessToken,
            });
          } else {
            setError('Failed to get ID token from Google.');
          }
        } catch (e: any) {
          setError(e.message);
        } finally {
          setIsLoading(false);
        }
      } else if (authResponse.type === 'error') {
        setError(authResponse.error?.message || 'Google Sign-In failed');
      } else if (authResponse.type === 'cancel' || authResponse.type === 'dismiss') {
        setError('Sign-In was cancelled');
      }
      setIsLoading(false);
    };

    if (response) {
      handleResponse(response);
    }
  }, [response, request]);

  const signIn = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      setResult(null);

      if (!request) {
        throw new Error('Google Auth not configured properly');
      }

      await promptAsync();
    } catch (err: any) {
      if (err.code !== 'ERR_CANCELED') {
        setError(err.message || 'Failed to initiate Google Sign-In');
      }
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    signIn,
    isLoading,
    error,
    result,
    clearError,
    request,
  };
};

export default useGoogleAuth;
