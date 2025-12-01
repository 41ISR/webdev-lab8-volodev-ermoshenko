import axios from 'axios';

const API_BASE_URL = 'https://kitek.ktkv.dev/marketplace';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: async (username, password, email) => {
    const body = { username, password };
    if (email) body.email = email;
    const response = await api.post('/api/auth/register', body);
    return response.data;
  },

  login: async (username, password) => {
    const response = await api.post('/api/auth/login', {
      username,
      password,
    });
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/api/auth/me');
    return response.data;
  },
};

export const itemsAPI = {
  getAll: async () => {
    const response = await api.get('/api/items');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/items');
    const item = response.data.find((item) => item.id === parseInt(id));
    if (!item) throw new Error('Товар не найден');
    return item;
  },

  create: async (title, description, price, imageUrl) => {
    const response = await api.post('/api/items', {
      title,
      description,
      price,
      imageUrl,
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/api/items/${id}`);
    return response.data;
  },
};

export const bidsAPI = {
  getByItemId: async (itemId) => {
    const response = await api.get(`/api/items/${itemId}/bids`);
    return response.data;
  },

  create: async (itemId, amount) => {
    const response = await api.post(`/api/items/${itemId}/bids`, {
      amount,
    });
    return response.data;
  },

  getMyBids: async () => {
    const response = await api.get('/api/bids/my');
    return response.data;
  },
};

export const statsAPI = {
  getStats: async () => {
    const response = await api.get('/api/stats');
    return response.data;
  },
};

export default api;

