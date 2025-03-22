"use client";

import AuthForm from "../../../../components/AuthForm";
import { useAuth } from "../../../../hooks/useAuth";
import {
  RegisterCredentials,
  LoginCredentials,
} from "../../../../types/authTypes";

export default function Register() {
  const { register, state } = useAuth();

  const handleRegister = async (
    data: LoginCredentials | RegisterCredentials
  ) => {
    if ("name" in data) {
      await register(data);
    } else {
      // Handle the case where data is not RegisterCredentials
      console.error("Invalid credentials for registration");
    }
  };

  return (
    <div className="mb-16">
      <AuthForm type="register" onSubmit={handleRegister} error={state.error} />
    </div>
  );
}
