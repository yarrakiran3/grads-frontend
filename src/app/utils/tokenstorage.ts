import { User } from "../model/auth";

// Token storage utilities
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const tokenStorageUtils = {
  getToken: (): string | null => {
    try {
      // Check if we're in the browser
      if (typeof window === 'undefined') {
        return null;
      }
      return localStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error getting token from localStorage:', error);
      return null;
    }
  },
  
  setToken: (token: string): void => {
    try {
      // Check if we're in the browser
      if (typeof window === 'undefined') {
        return;
      }
      console.log('Setting token in localStorage:', token);
      localStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error('Error setting token in localStorage:', error);
    }
  },
  
  removeToken: (): void => {
    try {
      // Check if we're in the browser
      if (typeof window === 'undefined') {
        return;
      }
      localStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error removing token from localStorage:', error);
    }
  },
  
  getUser: (): User | null => {
    try {
      // Check if we're in the browser
      if (typeof window === 'undefined') {
        return null;
      }
      const userStr = localStorage.getItem(USER_KEY);
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error getting user from localStorage:', error);
      return null;
    }
  },
  
  setUser: (user: User): void => {
    try {
      // Check if we're in the browser
      if (typeof window === 'undefined') {
        return;
      }
      const usrStr = user?JSON.stringify(user):'';
      localStorage.setItem(USER_KEY,usrStr );
    } catch (error) {
      console.error('Error setting user in localStorage:', error);
    }
  },
  
  removeUser: (): void => {
    try {
      // Check if we're in the browser
      if (typeof window === 'undefined') {
        return;
      }
      localStorage.removeItem(USER_KEY);
    } catch (error) {
      console.error('Error removing user from localStorage:', error);
    }
  },
  
  clearAll: (): void => {
    tokenStorageUtils.removeToken();
    tokenStorageUtils.removeUser();
  }
};