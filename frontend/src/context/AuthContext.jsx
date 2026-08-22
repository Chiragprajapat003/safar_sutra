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
    if (email && password) {
      const authedUser = { ...mockUser, email, authProvider: 'email' };
      setUser(authedUser);
      localStorage.setItem('gt_user', JSON.stringify(authedUser));
      return true;
    }
    return false;
  };

  const signup = (name, email, password) => {
    if (name && email && password) {
      const newUser = { ...mockUser, name, email, authProvider: 'email' };
      setUser(newUser);
      localStorage.setItem('gt_user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const loginWithGoogle = async (googleData = null) => {
    // Simulates instant or custom Google OAuth authentication
    const googleUser = googleData || {
      id: 101,
      name: 'Alex Johnson',
      email: 'alex.traveler@gmail.com',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlBy-yCwRN_SXsMlaM4lZx1TGx3g1_o33z6eONLlrWYTDYJyZqGv7sAO7Ydu2yUwahMv9psKT3tkUwi10kwrtdZOrURcKgetzQxTTALFhqAGPdbcVl69LqluPxtMSt8tOlvS_2tRE7nrmSSW_kKk1sv49CIkbis5poNzgsw2iAS4xpTmmHi6WqZthbptv45LRJhdU37KbYw2_94_idgzvFyqmSW3IXnizwXC-A7gBbt0HNFATojzkR',
      countriesVisited: 14,
      tripsPlanned: 4,
      authProvider: 'google',
    };
    setUser(googleUser);
    localStorage.setItem('gt_user', JSON.stringify(googleUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gt_user');
  };

  const updateUser = (updates) => {
    setUser((prev) => {
      if (!prev) return null;
      const next = { ...prev, ...updates };
      localStorage.setItem('gt_user', JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, loginWithGoogle, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
