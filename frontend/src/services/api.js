import axios from 'axios';

const API_URL = import.meta.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post(`${API_URL}/api/auth/refresh`, {
            refresh_token: refreshToken,
          });

          const { access_token, refresh_token } = response.data;
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);

          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, logout user
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

// Auth API
export const authAPI = {
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', new URLSearchParams(data), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  }),
  getCurrentUser: () => api.get('/api/auth/me'),
  refreshToken: (refreshToken) => api.post('/api/auth/refresh', { refresh_token: refreshToken }),
};

// Notes API
export const notesAPI = {
  getAll: (params) => api.get('/api/notes', { params }),
  getById: (id) => api.get(`/api/notes/${id}`),
  create: (data) => api.post('/api/notes', data),
  update: (id, data) => api.put(`/api/notes/${id}`, data),
  delete: (id) => api.delete(`/api/notes/${id}`),
  archive: (id, archived) => api.patch(`/api/notes/${id}/archive`, null, { params: { archived } }),
  search: (query) => api.get('/api/notes/search', { params: { q: query } }),
};

// Flashcards API
export const flashcardsAPI = {
  getAll: (params) => api.get('/api/flashcards', { params }),
  getById: (id) => api.get(`/api/flashcards/${id}`),
  getForReview: (limit) => api.get('/api/flashcards/review', { params: { limit } }),
  create: (data) => api.post('/api/flashcards', data),
  update: (id, data) => api.put(`/api/flashcards/${id}`, data),
  delete: (id) => api.delete(`/api/flashcards/${id}`),
  review: (id, correct) => api.post(`/api/flashcards/${id}/review`, { correct }),
};

// Study Sessions API
export const studySessionsAPI = {
  getAll: (params) => api.get('/api/study-sessions', { params }),
  getById: (id) => api.get(`/api/study-sessions/${id}`),
  getStats: (days) => api.get('/api/study-sessions/stats', { params: { days } }),
  create: (data) => api.post('/api/study-sessions', data),
  complete: (id) => api.patch(`/api/study-sessions/${id}/complete`, { completed: true }),
};
