export interface AuthState {
  authUser: any;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  onlineUsers: User[];
  checkAuth: () => Promise<void>;
  signup: (formData: SignupFormData) => Promise<void>;
  login: (formData: LoginFormData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
}

export interface ChatState {
  messages: Message[];
  users: User[];
  selectedUser: User | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  setSelectedUser: (user: User) => void;
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  avatar?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
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

export type UpdateProfileData = {
  fullName?: string;
  email?: string;
  password?: string;
  avatar?: File | null;
  profilePicture?: string;
};
