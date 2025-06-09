export interface AuthState {
  authUser: any;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  onlineUsers: string[];
  socket: any | null;
  checkAuth: () => Promise<void>;
  signup: (formData: SignupFormData) => Promise<void>;
  login: (formData: LoginFormData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export interface ChatState {
  messages: Message[];
  users: User[];
  selectedUser: User | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  sendMessage: (messageData: SendMessageParams) => Promise<void>;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
  setSelectedUser: (user: User | null) => void;
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  avatar?: string;
  profilePicture?: string;
}

export interface Message {
  _id: string;
  sender: string;
  receiver: string;
  text: string;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
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

export type SendMessageParams = {
  text: string;
  image?: string | null;
  userId: string;
};

export type UpdateProfileData = {
  fullName?: string;
  email?: string;
  password?: string;
  avatar?: File | null;
  profilePicture?: string;
};
