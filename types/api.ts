export type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

export type ApiError = {
  message: string;
  status?: number;
  code?: string;
};
