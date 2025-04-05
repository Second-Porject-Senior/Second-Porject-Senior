import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Create Axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, 
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Add request interceptor for token (JWT) handling
  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        // If user is logged in, attach token to every request
        if (user?.token) {
          config.headers['Authorization'] = `Bearer ${user.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Clean up interceptors on component unmount
    return () => {
      api.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);

  // Check authentication status on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await api.get('/auth/check'); // Assuming /auth/check exists in your backend
        setUser(data); // Set the user data if authenticated
      } catch (error) {
        setUser(null); // Set user to null if not authenticated
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      await api.post('/auth/login', credentials); // Assuming the backend handles login
      const { data } = await api.get('/auth/check'); // Fetch user info after successful login
      setUser(data); // Set the user state
      navigate('/dashboard'); // Redirect to dashboard (or wherever you'd like)
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await api.delete('/auth/logout'); // Logout endpoint on the backend
      setUser(null); // Clear user state
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Role-based access control (if user roles are included in token)
  const hasRole = (requiredRole) => {
    if (!user) return false;
    return user.roles.includes(requiredRole);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user, // Boolean indicating if the user is logged in
    hasRole,
    api, // Export the axios instance for direct API calls
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Only render children once loading is complete */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
