
"use client";

import { createContext, ReactNode, useEffect, useReducer,useState } from "react";
import {  AuthState, User } from "../model/auth";
import { authReducer } from "../reducers/authreducer";
import { tokenStorageUtils } from "@/app/utils/tokenstorage";
import { authAPI } from "../api/auth";


export interface AuthContextValue extends AuthState {
  
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, firstName: string, lastName:string) => Promise<void>;
  updateUser: (userData: User) => void;
  clearError: () => void;
  isHydrated: boolean;
}


export const AuthContext = createContext<AuthContextValue | null>(null);

  // Initial state
export const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
  error: {
    status: 0,
    message: ''
  }
};

// Auth provider component
export const AuthProvider: React.FC<{ children: ReactNode }> 
= ({ children }) => 
  {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [isHydrated, setIsHydrated] = useState(false);
  // Handle hydration first
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Only check auth after hydration
  useEffect(() => {
    if (!isHydrated) return;

    const initializeAuth = () => {
      console.log('🔍 Initializing auth after hydration...');
      
      try {
        const token = tokenStorageUtils.getToken();
        const user = tokenStorageUtils.getUser();
        
        console.log('📦 Token exists:', !!token);
        console.log('👤 User exists:', !!user);
        
        if (token && user) {
          console.log('✅ Restoring auth state');
          dispatch({ type: 'AUTH_SUCCESS', payload: { user, token } });
        } else {
          console.log('❌ No auth data found');
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        console.error('💥 Auth initialization error:', error);
        tokenStorageUtils.clearAll();
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initializeAuth();
  }, [isHydrated]);

  // Login function
  const login = async (form_email: string, password: string): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // Simulate API call - replace with your actual API endpoint
      const response =await authAPI.login({ email: form_email, password : password });
    
      console.log('Login response:', response.user);
      const token = response.token;

      const user: User = response.user;
      
      
      // Store in localStorage
      tokenStorageUtils.setToken(token);
      tokenStorageUtils.setUser(user);
      
      dispatch({ type: 'AUTH_SUCCESS', payload: { user, token } });

    } catch (error:any) {
      console.log("Error form auth context",error)
      const errorMessage = error ? error.message : 'Login failed';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  // Register function
  const register = 
  async (email: string, password: string, firstname: string, lastname:string): Promise<void> => {
    
    dispatch({ type: 'AUTH_START' });
    
    try {
      // Simulate API call - replace with your actual API endpoint
      const response = await authAPI.register({ email, password, firstname,lastname });
      const user = response.user;
      const token = response.token;
      console.log("setting up token for regstered user")
      // Store in localStorage
      tokenStorageUtils.setToken(token);
      tokenStorageUtils.setUser(user);
      dispatch({ type: 'AUTH_SUCCESS', payload: { user, token } });

    } catch (error) {
      
      console.error('Registration error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      // dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  // Logout function
  const logout = (): void => {
    authAPI.logout();
    dispatch({ type: 'AUTH_LOGOUT' });
  };

  // Update user function
  const updateUser = async (userData: User): Promise<void>=> {
    
  try{

    if (state.user) {
      const updatedUser = { ...state.user, ...userData };
      const res = await authAPI.updateProfile(updatedUser);

      if(res){
          tokenStorageUtils.setUser(res.user);
          dispatch({ type: 'UPDATE_USER', payload: res.user });
      }

    } }
     catch (error: any) {

    }
      
    
  };

  // Clear error function
  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const contextValue: AuthContextValue = {
    ...state,
    login,
    logout,
    register,
    updateUser,
    clearError,
    isHydrated: isHydrated
  };


  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};




