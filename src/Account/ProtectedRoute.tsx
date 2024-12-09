import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/Account/Signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
