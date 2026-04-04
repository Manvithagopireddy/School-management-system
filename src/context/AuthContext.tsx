import { createContext, useContext, useState, type ReactNode } from 'react';

export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  department?: string;
  grade?: string;
  childName?: string;
  badge?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => boolean;
  logout: () => void;
}

const MOCK_USERS: User[] = [
  { id: 'a1', name: 'John Doe', email: 'admin@edunexus.com', role: 'admin', avatar: 'JD', badge: 'System Admin' },
  { id: 't1', name: 'Dr. Priya Nair', email: 'teacher@edunexus.com', role: 'teacher', avatar: 'PN', department: 'Mathematics', badge: 'Senior Faculty' },
  { id: 's1', name: 'Arjun Sharma', email: 'student@edunexus.com', role: 'student', avatar: 'AS', grade: 'Grade 10-A', badge: 'Roll #21' },
  { id: 'p1', name: 'Mr. Suresh Sharma', email: 'parent@edunexus.com', role: 'parent', avatar: 'SS', childName: 'Arjun Sharma', badge: 'Verified Parent' },
];

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, _password: string, role: UserRole): boolean => {
    const found = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase() && u.role === role);
    if (found) { setUser(found); return true; }
    return false;
  };

  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
