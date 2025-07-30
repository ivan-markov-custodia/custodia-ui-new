"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface User {
  name: string;
  email: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  jwtToken: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("jwtToken");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setJwtToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    setJwtToken(token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("jwtToken", token);
  };

  const logout = () => {
    setUser(null);
    setJwtToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("jwtToken");
  };

  return (
    <AuthContext.Provider value={{ user, jwtToken, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
