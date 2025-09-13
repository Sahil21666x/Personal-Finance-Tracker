import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // redirect to login if not authenticated
    }
  }, [navigate]);

  const token = localStorage.getItem("token");
  return token ? children : null; // render children only if authenticated
};

export default ProtectedRoute;
