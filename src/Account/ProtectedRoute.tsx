import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, sessionChecked } = useSelector((state: any) => state.accountReducer);
  const location = useLocation();

  if (!sessionChecked) {
    return null; // Or a loading spinner
  }

  if (!currentUser) {
    return <Navigate to="/Account/Signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}