import Link from "next/link";
import { useAuth } from "../hooks/useAuth";

const Navbar: React.FC = () => {
  const { state, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Auth System
        </Link>
        <div className="space-x-4">
          {state.isAuthenticated ? (
            <>
              <span>Welcome, {state.user?.name}</span>
              <Link href="/auth/profile" className="hover:text-gray-300">
                Profile
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link
                href="/auth/register"
                className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
