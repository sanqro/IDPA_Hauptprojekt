/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { IAuthContext } from "../interfaces/props";
export const AuthContext = createContext<IAuthContext>(null!);

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token") as string
  );
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("username") as string
  );

  const isLoggedIn = () => {
    if (token && username) {
      const decoded: any = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        setToken(null);
        localStorage.removeItem("token");
        return false;
      }
      return true;
    }
    return false;
  };

  const handleLogOut = () => {
    setToken(null);
    setUsername(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    location.replace("/");
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ token, username, isLoggedIn, handleLogOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
