"use client";
import { AuthState, User } from "../model/auth";


// Action types
export type AuthAction =
   { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'AUTH_FAILURE'; payload: {status:number; message:string} }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'UPDATE_ERROR'; payload: {status:number; message:string} }



// Auth reducer
export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: {
    status: 0,
    message: ''
  },
      };
    
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: {
    status: 0,
    message: ''
  },
      };
    
    case 'AUTH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: {
    status: action.payload.status,
    message: action.payload. message
        },
      };
    
    case 'AUTH_LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error:  {
    status: 0,
    message: ''
        },
      };
    
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: {
    status: 0,
    message: ''
        },
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'UPDATE_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    
    default:
      return state;
  }
};