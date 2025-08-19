import axios, { AxiosInstance } from 'axios';

const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.warn('OPENAI_API_KEY is not set in app.config.js');
}

export const createApiClient = (): AxiosInstance => {
  return axios.create({
    baseURL: 'https://api.openai.com/v1',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    timeout: 30000, // 30 seconds
  });
};

export const apiClient = createApiClient();
