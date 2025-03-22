"use client";
import React, {
  createContext,
  useReducer,
  useEffect,
  ReactNode,
  JSX,
} from "react";
import {
  AuthState,
  LoginCredentials,
  RegisterCredentials,
} from "../types/authTypes";
import * as authService from "../services/authService";
import { saveToken, getToken, removeToken } from "../utils/tokenUtils";

// Define action types
type AuthAction =
  | { type: "REGISTER_REQUEST" | "LOGIN_REQUEST" | "USER_LOADED_REQUEST" }
  | { type: "REGISTER_SUCCESS" | "LOGIN_SUCCESS"; payload: AuthState }
  | { type: "USER_LOADED_SUCCESS"; payload: AuthState }
  | {
      type: "REGISTER_FAIL" | "LOGIN_FAIL" | "USER_LOADED_FAIL";
      payload: string;
    }
  | { type: "LOGOUT" };

// Initial state
const initialState: AuthState = {
  user: null,
  token: getToken(),
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Define the context type
interface AuthContextType {
  state: AuthState;
  register: (userData: RegisterCredentials) => Promise<void>;
  login: (userData: LoginCredentials) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
}

// Create context
export const AuthContext = createContext<AuthContextType>({
  state: initialState,
  register: async () => {},
  login: async () => {},
  logout: () => {},
  loadUser: async () => {},
});

// Reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "REGISTER_REQUEST":
    case "LOGIN_REQUEST":
    case "USER_LOADED_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case "USER_LOADED_SUCCESS":
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case "REGISTER_FAIL":
    case "LOGIN_FAIL":
    case "USER_LOADED_FAIL":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

// Provider component
export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Register user
  const register = async (userData: RegisterCredentials): Promise<void> => {
    try {
      dispatch({ type: "REGISTER_REQUEST" });
      const response = await authService.register(userData);
      saveToken(response.token);
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: {
          user: response.user,
          token: response.token,
          isAuthenticated: true,
          loading: false,
          error: null,
        },
      });
    } catch (error: Error | unknown) {
      removeToken();
      dispatch({
        type: "REGISTER_FAIL",
        payload:
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || "Registration failed",
      });
    }
  };
  // Login user
  const login = async (userData: LoginCredentials): Promise<void> => {
    try {
      dispatch({ type: "LOGIN_REQUEST" });
      const response = await authService.login(userData);
      saveToken(response.token);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: response.user,
          token: response.token,
          isAuthenticated: true,
          loading: false,
          error: null,
        },
      });
    } catch (error: Error | unknown) {
      removeToken();
      dispatch({
        type: "LOGIN_FAIL",
        payload:
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || "Login failed",
      });
    }
  };
  // Load user
  const loadUser = async (): Promise<void> => {
    const token = getToken();
    if (!token) {
      dispatch({
        type: "USER_LOADED_FAIL",
        payload: "No token",
      });
      return;
    }

    // Prevent duplicate requests
    if (state.loading || state.user) return;

    try {
      dispatch({ type: "USER_LOADED_REQUEST" });
      const response = await authService.getCurrentUser();
      dispatch({
        type: "USER_LOADED_SUCCESS",
        payload: {
          user: response.user,
          token: token,
          isAuthenticated: true,
          loading: false,
          error: null,
        },
      });
    } catch (error: Error | unknown) {
      removeToken();
      dispatch({
        type: "USER_LOADED_FAIL",
        payload:
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || "Authentication failed",
      });
    }
  };

  // Logout user
  const logout = (): void => {
    removeToken();
    dispatch({ type: "LOGOUT" });
  };

  // Load user on initial app load if token exists
  useEffect(() => {
    const token = getToken();
    if (token && !state.user) {
      loadUser();
    }
  }, [state.user]);

  return (
    <AuthContext.Provider value={{ state, register, login, logout, loadUser }}>
      {children}
    </AuthContext.Provider>
  );
};
