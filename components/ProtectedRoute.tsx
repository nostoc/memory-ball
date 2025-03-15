import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { state } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!state.loading && !state.isAuthenticated) {
      router.push("/auth/login");
    }
  }, [state.loading, state.isAuthenticated, router]);

  if (state.loading) {
    return <div>Loading...</div>;
  }

  return state.isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
