import {
  AuthRequest,
  AuthRequestConfig,
  AuthSessionResult,
  DiscoveryDocument,
  exchangeCodeAsync,
  fetchUserInfoAsync,
  makeRedirectUri,
  useAuthRequest,
} from 'expo-auth-session';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';

// Complete auth session for web browser redirect
WebBrowser.maybeCompleteAuthSession();

// Get client IDs from environment variables
const WEB_CLIENT_ID = Constants.expoConfig?.extra?.WEB_CLIENT_ID || process.env.WEB_CLIENT_ID;
const WEB_CLIENT_SECRET = Constants.expoConfig?.extra?.WEB_CLIENT_SECRET || process.env.WEB_CLIENT_SECRET;

// Define the discovery document for Google
const discovery: DiscoveryDocument = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

interface GoogleAuthResult {
  idToken: string | null;
  accessToken: string | null;
  user: {
    email: string;
    name: string;
    picture: string;
  } | null;
}

interface UseGoogleAuthReturn {
  signIn: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  result: GoogleAuthResult | null;
  clearError: () => void;
}

export const useGoogleAuth = (): UseGoogleAuthReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GoogleAuthResult | null>(null);

  // 1. Manually configure the auth request
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: WEB_CLIENT_ID,
      scopes: ['openid', 'profile', 'email'],
      // Force the proxy redirect URI, which will be something like https://auth.expo.io/@your-username/your-app-slug
      redirectUri: makeRedirectUri({
        useProxy: true,
      }),
    },
    discovery
  );

  // Log the redirect URI to the console when the request object is available
  useEffect(() => {
    if (request) {
      console.log('Using redirect URI:', request.redirectUri);
    }
  }, [request]);

  // 2. Handle the response and exchange the authorization code for a token
  useEffect(() => {
    const exchangeToken = async (authResponse: AuthSessionResult) => {
      if (authResponse.type === 'success' && request) {
        try {
          const tokenResponse = await exchangeCodeAsync(
            {
              clientId: WEB_CLIENT_ID,
              clientSecret: WEB_CLIENT_SECRET,
              code: authResponse.params.code,
              extraParams: {
                // This must be included for the token exchange
                code_verifier: request.codeVerifier || '',
              },
              redirectUri: request.redirectUri,
            },
            discovery
          );

          // 3. Get user info and set the final result
          const { id_token, access_token } = tokenResponse;
          if (id_token) {
            const payload = JSON.parse(atob(id_token.split('.')[1]));
            setResult({
              idToken: id_token,
              accessToken: access_token || null,
              user: {
                email: payload.email,
                name: payload.name,
                picture: payload.picture,
              },
            });
          }
        } catch (e: any) {
          setError(e.message);
        } finally {
          setIsLoading(false);
        }
      } else if (response?.type === 'error') {
        setError(response.error?.message || 'Google Sign-In failed');
        setIsLoading(false);
      } else if (response?.type === 'cancel' || response?.type === 'dismiss') {
        setError('Sign-In was cancelled');
        setIsLoading(false);
      }
    };

    if (response) {
      exchangeToken(response);
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
      // The user cancelled the prompt, which is not a true error.
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
  };
};

export default useGoogleAuth;