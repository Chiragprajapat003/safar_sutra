import { createContext, useContext, useState, useEffect } from 'react';
import { mockUser } from '../services/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('gt_user');
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock: accept any non-empty credentials
    if (email && password) {
      const authedUser = { ...mockUser, email };
      setUser(authedUser);
      localStorage.setItem('gt_user', JSON.stringify(authedUser));
      return true;
    }
    return false;
  };

  const signup = (name, email, password) => {
    if (name && email && password) {
      const newUser = { ...mockUser, name, email };
      setUser(newUser);
      localStorage.setItem('gt_user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gt_user');
  };

  const updateUser = (updates) => {
    setUser(prev => {
      if (!prev) return null;
      const next = { ...prev, ...updates };
      localStorage.setItem('gt_user', JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

