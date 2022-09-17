export {};

declare global {
  type ApiResponse<T = void> = {
    status: number;
    success: boolean;
    message?: string | null;
    data?: T;
    [key: string]: any;
  };
  type ApiError = {
    status: number;
    message: string;
  };
}
