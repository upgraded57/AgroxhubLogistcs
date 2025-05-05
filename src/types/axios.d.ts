import "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    showToast?: boolean;
  }
}

interface ApiErrorResponse<> {
  status: boolean;
  message: string;
  error: any;
  order?: any;
}
