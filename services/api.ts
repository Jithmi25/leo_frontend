import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Base URL for the API - using environment variable
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token to requests
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      console.log('[API] Request to:', config.url);
      console.log('[API] Token from storage:', token ? `Token exists (length: ${token.length})` : 'No token found');
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('[API] Authorization header set');
      } else {
        console.warn('[API] No auth token available for request');
      }
    } catch (error) {
      console.error('[API] Error reading token from AsyncStorage:', error);
    }
    return config;
  },
  (error) => {
    console.error('[API] Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.error('[API] 401 Unauthorized - Token may be invalid or expired');
      // Token expired or invalid, clear stored data
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userData');
    }
    return Promise.reject(error);
  }
);

// Polls API
export const pollsApi = {
  getAllPolls: (params?: any) => api.get('/polls', { params }),
  getPoll: (id: string) => api.get(`/polls/${id}`),
  createPoll: (data: any) => api.post('/polls', data),
  voteOnPoll: (id: string, voteData: any) => api.post(`/polls/${id}/vote`, voteData),
  getPollResults: (id: string) => api.get(`/polls/${id}/results`),
  getActivePolls: (limit: number = 10) => api.get('/polls/active/all', { params: { limit } }),
  getMyVotedPolls: (page: number = 1, limit: number = 10) => api.get('/polls/my/voted', { params: { page, limit } }),
  updatePoll: (id: string, data: any) => api.put(`/polls/${id}`, data),
  deletePoll: (id: string) => api.delete(`/polls/${id}`),
};

// Posts API
export const postsApi = {
  getAllPosts: (params?: any) => api.get('/posts', { params }),
  getPost: (id: string) => api.get(`/posts/${id}`),
  createPost: (data: any) => api.post('/posts', data),
  updatePost: (id: string, data: any) => api.put(`/posts/${id}`, data),
  deletePost: (id: string) => api.delete(`/posts/${id}`),
  likePost: (id: string) => api.post(`/posts/${id}/like`),
  unlikePost: (id: string) => api.post(`/posts/${id}/unlike`),
  addComment: (id: string, commentData: any) => api.post(`/posts/${id}/comment`, commentData),
  sharePost: (id: string, destination: string) => api.post(`/posts/${id}/share`, { destination }),
  getClubPosts: (clubName: string, page: number = 1, limit: number = 10) => api.get(`/posts/club/${clubName}`, { params: { page, limit } }),
  getUserPosts: (userId: string, page: number = 1, limit: number = 10) => api.get(`/posts/user/${userId}`, { params: { page, limit } }),
};

// Users API
export const usersApi = {
  getAllUsers: (params?: any) => api.get('/users', { params }),
  getUser: (id: string) => api.get(`/users/${id}`),
  updateProfile: (data: any) => api.put('/users/profile', data),
  searchUsers: (query: string) => api.get('/users/search/all', { params: { query } }),
  getLeaderboard: () => api.get('/users/leaderboard/all'),
  getUserStats: () => api.get('/users/stats/overview'),
};

// Events API
export const eventsApi = {
  getAllEvents: (params?: any) => api.get('/events', { params }),
  getEvent: (id: string) => api.get(`/events/${id}`),
  createEvent: (data: any) => api.post('/events', data),
  updateEvent: (id: string, data: any) => api.put(`/events/${id}`, data),
  deleteEvent: (id: string) => api.delete(`/events/${id}`),
  registerForEvent: (id: string) => api.post(`/events/${id}/register`),
  getEventRegistrations: (id: string) => api.get(`/events/${id}/registrations`),
  getEventStats: (id: string) => api.get(`/events/${id}/stats`),
  getUpcomingEvents: () => api.get('/events/upcoming'),
  getPastEvents: () => api.get('/events/past'),
  getMyEvents: () => api.get('/events/my'),
};

// Notifications API
export const notificationsApi = {
  getAllNotifications: () => api.get('/notifications'),
  markAsRead: (id: string) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/read-all'),
  deleteNotification: (id: string) => api.delete(`/notifications/${id}`),
};

// Communities API
export const communitiesApi = {
  getAllCommunities: (params?: any) => api.get('/communities', { params }),
  getCommunity: (id: string) => api.get(`/communities/${id}`),
  joinCommunity: (id: string) => api.post(`/communities/${id}/join`),
  leaveCommunity: (id: string) => api.post(`/communities/${id}/leave`),
  getMyCommunities: () => api.get('/communities/my'),
};

// Leaderboard API
export const leaderboardApi = {
  getOverallLeaderboard: (limit?: number) => api.get('/leaderboard', { params: { limit } }),
  getDistrictLeaderboard: (districtId: string, limit?: number) => api.get(`/leaderboard/district/${districtId}`, { params: { limit } }),
  getClubLeaderboard: (limit?: number) => api.get('/leaderboard/clubs', { params: { limit } }),
};

export default api;
