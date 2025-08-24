import { Result } from "@/types/api";
import axios, { AxiosError, AxiosResponse } from "axios";
import Constants from "expo-constants";

const api = axios.create({
  baseURL: Constants.expoConfig?.extra?.BASE_URL || "http://localhost:3001",
});

const handleApiError = (error: AxiosError): string => {
  if (error.response) {
    // on error response
    const status = error.response.status;
    const responseData = error.response.data as any;
    const message = responseData?.message || error.message;

    switch (status) {
      case 400:
        return `Bad Request: ${message}`;
      case 401:
        return "Unauthorized. Please log in again.";
      case 403:
        return "Access forbidden.";
      case 404:
        return "Resource not found.";
      case 500:
        return "Server error. Please try again later.";
      default:
        return `Error ${status}: ${message}`;
    }
  } else if (error.request) {
    // Network error
    return "Network error. Please check your connection.";
  } else {
    // Other error
    return error.message || "An unexpected error occurred.";
  }
};

// Generic API request wrapper
export const apiRequest = async <T>(
  requestFn: () => Promise<AxiosResponse<T>>
): Promise<Result<T>> => {
  try {
    const response = await requestFn();
    return { success: true, data: response.data };
  } catch (error) {
    console.error("API Error:", error);
    const errorMessage = handleApiError(error as AxiosError);
    return { success: false, error: errorMessage };
  }
};

// methods
export const apiGet = <T>(url: string): Promise<Result<T>> =>
  apiRequest(() => api.get<T>(url));

export const apiPost = <T, dataType>(
  url: string,
  data?: dataType
): Promise<Result<T>> => apiRequest(() => api.post<T>(url, data));

export const apiPut = <T, dataType>(
  url: string,
  data?: dataType
): Promise<Result<T>> => apiRequest(() => api.put<T>(url, data));

export const apiPatch = <T, dataType>(
  url: string,
  data?: Partial<dataType>
): Promise<Result<T>> => apiRequest(() => api.patch<T>(url, data));

export const apiDelete = <T>(url: string): Promise<Result<T>> =>
  apiRequest(() => api.delete<T>(url));

export default api;
