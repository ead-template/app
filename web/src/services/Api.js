import axios from 'axios';
import AuthService from './AuthService';
import { getEnv } from './getEnv.js';
import Router from 'next/navigation';
const baseURL = process.env.NEXT_PUBLIC_HOST_API,
  isServer = typeof window === 'undefined';

console.log('baseURL: ' + baseURL);

const instance = axios.create({
  baseURL,
  timeout: 60000,
});

instance.interceptors.request.use((config) => {
  const token = AuthService.token();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      AuthService.logout(() => {
        Router.push('/login');
      });
    }
    return Promise.reject(error);
  },
);

export default instance;
