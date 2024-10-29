import { Navigate } from "react-router-dom";
import { useIsAuthenticated } from "@/lib/isUser";
import { Loader2 } from "lucide-react";
import { ProtectedRouteProps } from "@/Types/types";

const ProtectedRoute = ({ children, redirectTo = "/login", isDashboardRoute }: ProtectedRouteProps) => {
    const { data: authData, isLoading } = useIsAuthenticated();

    if (isLoading) {
        return (
          <div className="min-h-screen flex items-center justify-center">
            <Loader2 />
          </div>
        );
    }

    // Redirect unauthenticated users from protected dashboard routes
    if (!authData?.isAuthenticated && isDashboardRoute) {
        return <Navigate to={redirectTo} />;
    }

    // Redirect authenticated users from login or register pages back to the dashboard
    if (authData?.isAuthenticated && !isDashboardRoute) {
        return <Navigate to="/dashboard/board" />;
    }

    return children;
};

export default ProtectedRoute;
