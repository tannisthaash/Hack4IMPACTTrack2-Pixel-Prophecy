import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Role = 'restaurant' | 'ngo' | 'volunteer' | null;

interface AuthState {
  isAuthenticated: boolean;
  role: Role;
  userName: string;
  userEmail: string;
  login: (role: Role, name?: string, email?: string) => void;
  setRole: (role: Role) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      role: null,
      userName: '',
      userEmail: '',
      login: (role, name = '', email = '') =>
        set({ isAuthenticated: true, role, userName: name, userEmail: email }),
      setRole: (role) => set({ role }),
      logout: () =>
        set({ isAuthenticated: false, role: null, userName: '', userEmail: '' }),
    }),
    {
      name: 'lastbite-auth',
    }
  )
);