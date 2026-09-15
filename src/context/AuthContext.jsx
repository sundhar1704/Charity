import { createContext, useContext, useEffect, useState } from "react";
import {
  getCurrentUser,
  setCurrentUser,
  clearCurrentUser,
} from "../utils/authStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  function login(userObj) {
    setCurrentUser(userObj.email);
    setUser(userObj);
  }

  function logout() {
    clearCurrentUser();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}