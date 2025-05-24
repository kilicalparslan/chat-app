export interface AuthState {
  authUser: any;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
}

export interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
}
