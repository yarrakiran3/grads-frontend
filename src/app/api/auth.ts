import axios from "axios";
import { User } from "../model/auth";
import apiClient from "./api";
import { AuthResponse, LoginRequest, RegisterRequest } from "../model/authmodel";
import { tokenStorageUtils } from "@/app/utils/tokenstorage";

// Auth API endpoints
export const authAPI = {
  // Login user
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      tokenStorageUtils.clearAll(); // Clear any existing tokens
      console.log("Logging in with credentials:", credentials);
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    const { token } = response.data;
    tokenStorageUtils.setToken(token);
    return response.data;
    
    } catch (err: any) {
      console.log("Error in authAPI login method",err);
          if (err.original.response) {
            if(err.original.response.status === 401) {
              tokenStorageUtils.clearAll();
            }
          throw {
            status: err.status,
            message: err.message || "Something went wrong",
          };
          }
        throw { status: 500, message: "Unknown error" };
    }
  },

  // Register user
 register: async (userData: RegisterRequest): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>('/auth/signup', userData);
    const { token } = response.data;
    tokenStorageUtils.setToken(token);
    return response.data;
  } catch (err: any) {
    if (axios.isAxiosError(err) && err.response) {
      throw {
        status: err.response.status,
        message: err.response.data.error || "Something went wrong",
      };
    }
    throw { status: 500, message: "Unknown error" };
  }
},


    // Update user profile

    updateProfile: async (userData: Partial<User>): Promise<AuthResponse> => {
    
    try{

    
      const response = await apiClient.put<AuthResponse>('/auth/updateprofile', userData);
      return response.data; 
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        throw {
          status: err.response.status,
          message: err.response.data.error || "Something went wrong",
        };
      }
      throw { status: 500, message: "Unknown error" };
    }
    },

  // Get current user profile
  getProfile: async (): Promise<User> => {
    try{
    const response = await apiClient.get<User>('/auth/profile');
    return response.data;
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        throw {
          status: err.response.status,
          message: err.response.data.error || "Something went wrong",
        };
      }
      throw { status: 500, message: "Unknown error" };
    }
  },

  // Logout user
  logout: (): void => {
    tokenStorageUtils.removeToken();
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return tokenStorageUtils.getToken() !== null;
  },
};
