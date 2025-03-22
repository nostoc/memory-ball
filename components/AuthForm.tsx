import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoginCredentials, RegisterCredentials } from "../types/authTypes";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (data: LoginCredentials | RegisterCredentials) => Promise<void>;
  error: string | null;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit, error }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<
    LoginCredentials | RegisterCredentials
  >({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    router.push("/auth/profile");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-2xl font-poppins">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900">
        {type === "login" ? "Welcome Back!" : "Create an Account"}
      </h2>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {type === "register" && (
          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={(formData as RegisterCredentials).name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300  focus:ring-2 focus:ring-blue-200 transition duration-200 outline-none"
              placeholder="Enter your name"
              required
            />
          </div>
        )}

        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300  focus:ring-2 focus:ring-blue-200 transition duration-200 outline-none"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300  focus:ring-2 focus:ring-blue-200 transition duration-200 outline-none"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full  bg-oceanBlue text-white font-semibold py-3 rounded-lg hover:bg-background focus:outline-none focus:ring-2 focus:ring-bg-oceanBlue focus:ring-offset-2 transition-all duration-200"
        >
          {type === "login" ? "Sign In" : "Sign Up"}
        </button>

        <div className="text-center text-sm text-gray-600">
          {type === "login" ? (
            <p>
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className="text-blue-600 hover:text-blue-700 font-semibold underline"
              >
                Register
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-blue-600 hover:text-blue-700 font-semibold underline"
              >
                Login
              </Link>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
