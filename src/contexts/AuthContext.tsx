import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { User, AuthContextType } from '@/types/auth';

interface GoogleJwtPayload {
  sub: string;
  email: string;
  name: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (credentialResponse: any) => {
    try {
      const decoded = jwtDecode<GoogleJwtPayload>(credentialResponse.credential);
      const userData: User = {
        id: decoded.sub || '',
        email: decoded.email || '',
        name: decoded.name || '',
        picture: decoded.picture,
        givenName: decoded.given_name,
        familyName: decoded.family_name,
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Error decoding JWT:', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
