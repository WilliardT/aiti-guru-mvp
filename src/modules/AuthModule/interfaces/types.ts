export interface IAuthCredentials {
  username: string;
  password: string;
  expiresInMins?: number;
}

export interface IAuthResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender?: string;
  image?: string;
  accessToken: string;
  refreshToken: string;
}

export interface IAuthApiError {
  message?: string;
}

export interface IAuthModuleState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
