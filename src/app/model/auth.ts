export interface User {
  
  email: string;
  firstname: string;
  lastname:string;
  role: string;
  profileimageurl?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: {
    status: number;
    message: string;
  }
}

