import {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
} from "../types/authTypes";


import api from "@/utils/api";



export const register = async (
  userData: RegisterCredentials
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/auth/register",
    userData
  );
  return response.data;
};

export const login = async (
  userData: LoginCredentials
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", userData);
  return response.data;
};

export const getCurrentUser = async (): Promise<AuthResponse> => {
  const response = await api.get<AuthResponse>("/auth/me");
  return response.data;
};
