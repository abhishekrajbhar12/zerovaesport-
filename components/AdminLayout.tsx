
import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../App';

const AdminLayout: React.FC = () => {
  const { logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-800">
          <h1 className="gaming-font text-2xl font-bold text-orange-500">ADMIN PANEL</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavLink to="/admin" end className={({isActive}) => `block px-4 py-2.5 rounded-lg transition-colors ${isActive ? 'bg-orange-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/tournaments" className={({isActive}) => `block px-4 py-2.5 rounded-lg transition-colors ${isActive ? 'bg-orange-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
            Manage Matches
          </NavLink>
          <NavLink to="/admin/users" className={({isActive}) => `block px-4 py-2.5 rounded-lg transition-colors ${isActive ? 'bg-orange-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
            Manage Users
          </NavLink>
          <NavLink to="/admin/withdrawals" className={({isActive}) => `block px-4 py-2.5 rounded-lg transition-colors ${isActive ? 'bg-orange-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
            Withdrawal Requests
          </NavLink>
          <NavLink to="/admin/settings" className={({isActive}) => `block px-4 py-2.5 rounded-lg transition-colors ${isActive ? 'bg-orange-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
            General Settings
          </NavLink>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="w-full px-4 py-2 bg-slate-800 rounded-lg text-slate-300 hover:bg-red-600 hover:text-white transition-colors">
            Logout Admin
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-slate-950 md:hidden p-4 flex justify-between items-center border-b border-slate-800">
          <span className="gaming-font font-bold text-orange-500">ADMIN</span>
          <div className="flex gap-2">
             <NavLink to="/" className="text-xs px-2 py-1 bg-slate-800 rounded">View Site</NavLink>
             <button onClick={handleLogout} className="text-xs px-2 py-1 bg-red-600 rounded">Exit</button>
          </div>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
