import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";

const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem("auth_token"));
  const [user, setUser] = useState();
  const [isLibrarian, setIsLibrarian] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleToken = (token) => {
    try {
      const decodeToken = jwtDecode(token);
      setUser(decodeToken);
      setIsLibrarian(decodeToken.role === "librarian");
    } catch (error) {
      console.log("Error token:", error);
      localStorage.removeItem("auth_token");
      setToken(null);
      setUser(null);
      setIsLibrarian(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("auth_token");
    if (stored) {
      setToken(stored);
      handleToken(stored);
    } else {
      setToken(null);
      setUser(null);
      setIsLibrarian(null);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("auth_token");
    setToken(null);
    setUser(null);
    setIsLibrarian(null);
    setLoading(null);
  };

  return { token, user, isLibrarian, loading, logout };
};

export default useAuth;
