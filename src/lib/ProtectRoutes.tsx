import { PUBLIC_ROUTES, PRIVATE_ROUTES, DEFAULT_ROUTE } from "../constant/ProtectedRouteData";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { UserInterface } from "../constant/TypeNotes";

type Props = {
  children: React.ReactNode;
};

export const ProtectedRoutes = ({ children }: Props) => {
  const navigate = useNavigate();
  const userReduxData = useSelector((state: { auth: UserInterface }) => state.auth);
  const location = useLocation();
  
  const isAuthenticated = userReduxData?.isAuthenticated ?? false;
  const token = userReduxData?.userToken ?? null;
  const currentPath = location.pathname;

  const isBrowser = typeof window !== "undefined";


  const isProtectedRoute = Object.values(PRIVATE_ROUTES).includes(currentPath);
  const isPublicRoute = Object.values(PUBLIC_ROUTES).includes(currentPath);
  const isDefaultRoute = Object.values(DEFAULT_ROUTE).includes(currentPath);


  const checkRoutes = () => {
   
    if (isProtectedRoute && (!isAuthenticated || !token)) {
      navigate("/"); 
      return;
    }


    if (isPublicRoute || isDefaultRoute) {
      if (isAuthenticated && token) {
        navigate("/dashboard"); 
      }
    }
  };

  useEffect(() => {
    if (isBrowser) {
      checkRoutes();
    }
  }, [location.pathname, isAuthenticated, token]);

  return <>{children}</>;
};
