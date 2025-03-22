"use client";
import { useState } from "react";
import { login } from "../services/authService";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    try {
      const userData = { email, password };
      const { token } = await login(userData);
      localStorage.setItem("token", token);
      alert("Login successful");
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
