import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate, useNavigate } from "react-router-dom";

const useAuth = () => {
  const [token, setToken] = useState(() => localStorage.getItem("auth_token"));
  const [user, setUser] = useState(null);
  const [isLibrarian, setIsLibrarian] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const decodeAndSetUser = (token) => {
    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
      setIsLibrarian(decoded?.role === "librarian");
    } catch (error) {
      console.error("Invalid token:", error);
      clearAuthData();
    } finally {
      setLoading(false);
    }
  };

  const clearAuthData = () => {
    localStorage.removeItem("auth_token");
    setToken(null);
    setUser(null);
    setIsLibrarian(false);
  };

  const logout = () => {
    clearAuthData();
    setLoading(false);
    navigate("/");
  };

  useEffect(() => {
    if (token) {
      decodeAndSetUser(token);
    } else {
      setLoading(false);
    }
  }, [token]);

  return { token, user, isLibrarian, loading, logout };
};

export default useAuth;
