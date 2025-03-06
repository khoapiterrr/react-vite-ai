import { REDIRECT_URL_KEY } from "@/constants";
import appConfig from "@/constants/appConfig";
import { useAuthStore } from "@/store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const { unAuthenticatedEntryPath } = appConfig;

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore();

  const { pathname } = useLocation();

  const getPathName =
    pathname === "/" ? "" : `?${REDIRECT_URL_KEY}=${location.pathname}`;

  if (!isAuthenticated) {
    return (
      <Navigate replace to={`${unAuthenticatedEntryPath}${getPathName}`} />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
