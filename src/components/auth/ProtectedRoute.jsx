import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "../ui/LoadingSpinner";

function ProtectedRoute({ children }) {
  const { user, loading, isConfigured } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas px-6">
        <LoadingSpinner
          title="Preparing workspace"
          message="Checking your AgriVision AI session..."
        />
      </div>
    );
  }

  if (!isConfigured) {
    return children;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
