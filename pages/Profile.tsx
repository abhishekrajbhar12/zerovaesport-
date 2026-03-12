
import React, { useState, useRef } from 'react';
import { useApp } from '../App';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, logout, setUser } = useApp();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [ffUid, setFfUid] = useState(user?.ffUid || '');
  const [profilePic, setProfilePic] = useState(user?.profilePic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const handleSave = () => {
    if (user) {
      if (!name.trim() || !ffUid.trim()) {
        alert("Name and UID cannot be empty!");
        return;
      }
      const updatedUser = { 
        ...user, 
        name, 
        ffUid, 
        profilePic 
      };
      setUser(updatedUser);
      localStorage.setItem('ff_user', JSON.stringify(updatedUser));
      setEditing(false);
      alert("Profile Updated Successfully!");
    }
  };

  const handleImageClick = () => {
    if (editing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header / Banner */}
      <div className="relative">
        <div className="h-32 ff-gradient rounded-3xl opacity-90"></div>
        <div className="absolute -bottom-10 left-6 flex items-end gap-4">
          <div 
            className={`relative w-24 h-24 rounded-full border-4 border-slate-950 bg-slate-900 overflow-hidden shadow-xl ${editing ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
            onClick={handleImageClick}
          >
            <img 
              src={profilePic} 
              alt="Avatar" 
              className="w-full h-full object-cover" 
            />
            {editing && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*"
            />
          </div>
          <div className="pb-2">
            <h2 className="text-xl font-bold truncate max-w-[150px]">{user?.name}</h2>
            <p className="text-sm text-slate-400">@{user?.phone}</p>
          </div>
        </div>
      </div>

      <div className="pt-8 space-y-4">
        {/* Profile Form Card */}
        <div className="glass-panel p-6 rounded-3xl border-slate-800 space-y-6">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Display Name</label>
            {editing ? (
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 outline-none focus:border-orange-500 transition-colors text-white"
              />
            ) : (
              <p className="text-lg font-bold text-slate-100">{user?.name}</p>
            )}
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Free Fire UID</label>
            {editing ? (
              <input 
                type="text" 
                value={ffUid} 
                onChange={(e) => setFfUid(e.target.value)}
                placeholder="Enter FF UID"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 outline-none focus:border-orange-500 transition-colors text-white"
              />
            ) : (
              <p className="text-lg font-bold text-orange-500">{user?.ffUid}</p>
            )}
          </div>

          <div className="flex gap-3">
            {editing ? (
              <>
                <button 
                  onClick={() => {
                    setEditing(false);
                    setName(user?.name || '');
                    setFfUid(user?.ffUid || '');
                    setProfilePic(user?.profilePic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`);
                  }} 
                  className="flex-1 bg-slate-800 py-3 rounded-xl font-bold border border-slate-700 hover:bg-slate-700 transition-colors"
                >
                  CANCEL
                </button>
                <button 
                  onClick={handleSave} 
                  className="flex-1 bg-green-600 py-3 rounded-xl font-bold shadow-lg shadow-green-600/20 hover:bg-green-500 transition-colors"
                >
                  SAVE
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setEditing(true)} 
                  className="flex-1 bg-slate-800 py-3 rounded-xl font-bold border border-slate-700 hover:bg-slate-700 transition-colors"
                >
                  EDIT PROFILE
                </button>
                <button 
                  onClick={handleLogout} 
                  className="flex-1 bg-red-600 py-3 rounded-xl font-bold shadow-lg shadow-red-600/20 hover:bg-red-700 transition-colors"
                >
                  LOGOUT
                </button>
              </>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-panel p-5 rounded-3xl border-slate-800 text-center">
             <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-1 tracking-widest">Matches Joined</h4>
             <p className="text-2xl font-bold gaming-font">12</p>
          </div>
          <div className="glass-panel p-5 rounded-3xl border-slate-800 text-center">
             <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-1 tracking-widest">Total Wins</h4>
             <p className="text-2xl font-bold gaming-font">4</p>
          </div>
        </div>

        {/* Verification Status */}
        <div className="p-4 bg-orange-500/10 rounded-2xl border border-orange-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
               </svg>
             </div>
             <div>
               <p className="text-xs font-bold text-orange-500 uppercase tracking-wider">KYC Verified</p>
               <p className="text-[10px] text-slate-400">Account secured via phone number</p>
             </div>
          </div>
          <span className="text-orange-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
