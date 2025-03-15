"use client";

import AuthForm from "../../../../components/AuthForm";
import { useAuth } from "../../../../hooks/useAuth";
import { LoginCredentials } from "../../../../types";

export default function Login() {
  const { login, state } = useAuth();

  const handleLogin = async (data: LoginCredentials) => {
    await login(data);
  };

  return (
    <div>
      <AuthForm type="login" onSubmit={handleLogin} error={state.error} />
    </div>
  );
}
