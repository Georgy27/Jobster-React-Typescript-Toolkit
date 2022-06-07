import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";

interface ProtectedRoute {
  children: JSX.Element;
}

const ProtectedRout = ({ children }: ProtectedRoute) => {
  const { user } = useAppSelector((store) => store.user);

  if (!user) {
    return <Navigate to="/landing" />;
  }
  return children;
};

export default ProtectedRout;
