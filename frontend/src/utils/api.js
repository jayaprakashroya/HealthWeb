import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const getToken = () => localStorage.getItem('token');

axios.interceptors.request.use(config => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const login = async (credentials) => {
  const params = new URLSearchParams();
  params.append('username', credentials.username);
  params.append('password', credentials.password);
  const res = await axios.post(`${API_URL}/auth/login`, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  localStorage.setItem('token', res.data.access_token);
};

export const register = async (credentials) => {
  await axios.post(`${API_URL}/auth/register`, credentials);
};

export const getHabits = async () => (await axios.get(`${API_URL}/habits`)).data;
export const getMoods = async () => (await axios.get(`${API_URL}/moods`)).data;
export const getPredictions = async () => (await axios.get(`${API_URL}/predictions`)).data;
export const postHabit = async (data) => (await axios.post(`${API_URL}/habits`, data)).data;
export const postMood = async (data) => (await axios.post(`${API_URL}/moods`, data)).data;