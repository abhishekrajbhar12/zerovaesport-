
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { User, Tournament, AppSettings, Transaction } from './types';
import { INITIAL_APP_SETTINGS, MOCK_TOURNAMENTS } from './constants';

// Context for global state
interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  usersList: User[];
  setUsersList: (users: User[]) => void;
  settings: AppSettings;
  setSettings: (settings: AppSettings) => void;
  tournaments: Tournament[];
  setTournaments: (tournaments: Tournament[]) => void;
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  login: (phone: string, ffUid: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

// Layout Components
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';

// Pages
import Home from './pages/Home';
import TournamentDetail from './pages/TournamentDetail';
import Wallet from './pages/Wallet';
import Profile from './pages/Profile';
import Referral from './pages/Referral';
import Auth from './pages/Auth';
import AdminDashboard from './pages/admin/Dashboard';
import AdminTournaments from './pages/admin/Tournaments';
import AdminWithdrawals from './pages/admin/Withdrawals';
import AdminSettings from './pages/admin/Settings';
import AdminUsers from './pages/admin/Users';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [settings, setSettings] = useState<AppSettings>(INITIAL_APP_SETTINGS);
  const [tournaments, setTournaments] = useState<Tournament[]>(MOCK_TOURNAMENTS);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Persistent Login Simulation
  useEffect(() => {
    const savedUser = localStorage.getItem('ff_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Mock initial user list for admin
    const mockUsers: User[] = [
      { id: '1', name: 'Ravi Kumar', phone: '9876543210', ffUid: '10293847', walletBalance: 120, referralCode: 'FFRAVI', referralCount: 2, role: 'user' },
      { id: '2', name: 'Aman Singh', phone: '8765432109', ffUid: '56473829', walletBalance: 45, referralCode: 'FFAMAN', referralCount: 0, role: 'user' },
      { id: '3', name: 'Super Admin', phone: '9999999999', ffUid: '00000000', walletBalance: 99999, referralCode: 'FFADMIN', referralCount: 0, role: 'admin' },
    ];
    setUsersList(mockUsers);
  }, []);

  const login = (phone: string, ffUid: string) => {
    // Check if admin login
    const isHostAdmin = phone === '9999999999';
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: isHostAdmin ? 'Super Admin' : 'Survivor',
      phone,
      ffUid,
      walletBalance: isHostAdmin ? 99999 : 0,
      referralCode: `FF${ffUid.slice(-4)}`,
      referralCount: 0,
      role: isHostAdmin ? 'admin' : 'user'
    };
    setUser(newUser);
    localStorage.setItem('ff_user', JSON.stringify(newUser));
    
    // Add to list if not present
    if (!usersList.some(u => u.phone === phone)) {
      setUsersList([...usersList, newUser]);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ff_user');
  };

  return (
    <AppContext.Provider value={{ 
      user, setUser, usersList, setUsersList, settings, setSettings, tournaments, setTournaments, 
      transactions, setTransactions, login, logout 
    }}>
      <HashRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/auth" element={user ? <Navigate to="/" /> : <Auth />} />

          {/* User Protected Routes */}
          <Route element={user ? <Layout /> : <Navigate to="/auth" />}>
            <Route path="/" element={<Home />} />
            <Route path="/tournament/:id" element={<TournamentDetail />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/referral" element={<Referral />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Admin Protected Routes */}
          <Route element={user?.role === 'admin' ? <AdminLayout /> : <Navigate to="/" />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/tournaments" element={<AdminTournaments />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/withdrawals" element={<AdminWithdrawals />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;
