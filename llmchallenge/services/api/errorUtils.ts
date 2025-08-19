import { AxiosError } from 'axios';

type ApiError = Error & {
  status?: number;
  code?: string;
};

export const handleApiError = (error: unknown): never => {
  if (error instanceof Error) {
    const axiosError = error as AxiosError;
    
    if (axiosError.response) {
      const { status, data } = axiosError.response;
      const errorData = data as { error?: { message?: string; code?: string } };
      
      const apiError: ApiError = new Error(errorData.error?.message || 'An unknown error occurred');
      apiError.status = status;
      apiError.code = errorData.error?.code;
      throw apiError;
    } else if (axiosError.request) {
      const noResponseError: ApiError = new Error('No response received from the server. Please check your connection.');
      noResponseError.status = 0;
      throw noResponseError;
    }
  }

  const unknownError: ApiError = new Error('An unexpected error occurred');
  unknownError.status = 500;
  throw unknownError;
};
