export interface IAuthCredentials {
  email: string;
  password: string;
}

export interface IAuthModuleState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
