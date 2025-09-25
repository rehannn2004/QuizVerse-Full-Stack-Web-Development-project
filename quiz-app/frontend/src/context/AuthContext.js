import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  login as authLogin,
  register as authRegister,
  logout as authLogout,
  getCurrentUser,
} from '../services/authService';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (err) {
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    const user = await authLogin(email, password);
    setCurrentUser(user);
    return user;
  };

  const register = async (name, email, contactNumber, usn, password) => {
    const user = await authRegister(name, email, contactNumber, usn, password);
    setCurrentUser(user);
    return user;
  };

  const logout = async () => {
    await authLogout();
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}