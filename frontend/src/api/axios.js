import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://virtual-library-hq39.onrender.com/api',
});

// Request interceptor to add the auth token to headers
instance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
