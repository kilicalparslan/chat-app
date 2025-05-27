export interface AuthState {
  authUser: any;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  signup: (formData: SignupFormData) => Promise<void>;
  login: (formData: LoginFormData) => Promise<void>;
  logout: () => Promise<void>;
}

export interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface AuthImagePatternProps {
  title: string;
  description: string;
}
