import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

// Types
export interface User {
  name: string;
  email: string;
  picture: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface AuthError {
  message: string;
  error?: string;
}

// Storage keys
const AUTH_TOKEN_KEY = 'authToken';
const USER_DATA_KEY = 'userData';

/**
 * Send Google ID token to backend for authentication
 * @param idToken - Google ID token received from Google Sign-In
 * @returns AuthResponse with token and user data
 */
export const googleLogin = async (idToken: string): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/auth/google-login', {
      idToken,
    });

    const { token, user } = response.data;

    console.log('[AuthService] Login successful, storing token...');
    console.log('[AuthService] Token received:', token ? `Yes (length: ${token.length})` : 'No token in response');
    console.log('[AuthService] User:', user?.name || user?.email);

    // Store token and user data
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(user));

    console.log('[AuthService] Token and user data stored successfully');
    
    // Verify storage immediately
    const storedToken = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    console.log('[AuthService] Verification - Token retrieved from storage:', storedToken ? `Yes (length: ${storedToken.length})` : 'FAILED - No token found!');

    return response.data;
  } catch (error: any) {
    if (error.response) {
      // Server responded with error
      const errorData: AuthError = error.response.data;
      throw new Error(errorData.message || 'Google login failed');
    } else if (error.request) {
      // No response received
      throw new Error('Network error. Please check your connection.');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

/**
 * Get current authenticated user from storage
 * @returns User data or null if not logged in
 */
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const userData = await AsyncStorage.getItem(USER_DATA_KEY);
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

/**
 * Get stored auth token
 * @returns Token string or null
 */
export const getAuthToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

/**
 * Check if user is authenticated
 * @returns Boolean indicating authentication status
 */
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    return !!token;
  } catch (error) {
    return false;
  }
};

/**
 * Verify token with backend
 * @returns Boolean indicating if token is valid
 */
export const verifyAuthToken = async (): Promise<boolean> => {
  try {
    const response = await api.get('/auth/verify');
    return response.data.success === true;
  } catch (error) {
    return false;
  }
};

/**
 * Get user profile from backend
 * @returns User data from server
 */
export const getUserProfile = async (): Promise<User | null> => {
  try {
    const response = await api.get<{ success: boolean; user: User }>('/auth/me');
    return response.data.user;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

/**
 * Logout user - clear all stored auth data
 */
export const logout = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    await AsyncStorage.removeItem(USER_DATA_KEY);
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};

export default {
  googleLogin,
  getCurrentUser,
  getAuthToken,
  isAuthenticated,
  verifyAuthToken,
  getUserProfile,
  logout,
};
