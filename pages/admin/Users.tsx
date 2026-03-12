
import React, { useState } from 'react';
import { useApp } from '../../App';
import { User } from '../../types';

const AdminUsers: React.FC = () => {
  const { usersList, setUsersList, transactions, setTransactions } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [actionType, setActionType] = useState<'add' | 'subtract'>('add');

  const filteredUsers = usersList.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.phone.includes(searchTerm) || 
    u.ffUid.includes(searchTerm)
  );

  const handleUpdateBalance = () => {
    if (!selectedUser) return;
    const numAmt = parseFloat(amount);
    if (isNaN(numAmt) || numAmt <= 0) {
      alert("Please enter a valid amount!");
      return;
    }

    const finalChange = actionType === 'add' ? numAmt : -numAmt;
    
    // Update the user list
    const updatedList = usersList.map(u => {
      if (u.id === selectedUser.id) {
        return { ...u, walletBalance: Math.max(0, u.walletBalance + finalChange) };
      }
      return u;
    });
    setUsersList(updatedList);

    // Add a log/transaction record
    const newTx = {
      id: Math.random().toString(36).substr(2, 9),
      userId: selectedUser.id,
      amount: numAmt,
      type: actionType === 'add' ? 'deposit' : 'withdrawal' as any,
      status: 'success' as any,
      timestamp: new Date().toISOString(),
      method: 'Admin Modification'
    };
    setTransactions([newTx, ...transactions]);

    alert(`Successfully ${actionType === 'add' ? 'added' : 'subtracted'} ₹${numAmt} from ${selectedUser.name}'s wallet.`);
    setSelectedUser(null);
    setAmount('');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold gaming-font">Manage Users</h2>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search Name/Phone/UID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 pl-10 outline-none focus:border-orange-500 w-64"
          />
          <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
      </div>

      <div className="overflow-x-auto glass-panel rounded-3xl border-slate-800">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-800 text-slate-500 text-xs uppercase tracking-widest">
              <th className="p-6">User Details</th>
              <th className="p-6">FF UID</th>
              <th className="p-6">Wallet Balance</th>
              <th className="p-6">Role</th>
              <th className="p-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filteredUsers.map(u => (
              <tr key={u.id} className="hover:bg-slate-800/20 transition-colors">
                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${u.id}`} className="w-10 h-10 rounded-full bg-slate-800" alt="" />
                    <div>
                      <p className="font-bold">{u.name}</p>
                      <p className="text-xs text-slate-500">{u.phone}</p>
                    </div>
                  </div>
                </td>
                <td className="p-6 font-mono text-orange-500 text-sm">{u.ffUid}</td>
                <td className="p-6 font-bold text-green-500 text-lg">₹{u.walletBalance.toFixed(2)}</td>
                <td className="p-6">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${u.role === 'admin' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="p-6 text-right">
                  <button 
                    onClick={() => setSelectedUser(u)}
                    className="bg-orange-600 hover:bg-orange-500 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-lg shadow-orange-600/20"
                  >
                    EDIT WALLET
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 w-full max-w-sm animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold mb-2 gaming-font">Modify Wallet</h3>
            <p className="text-sm text-slate-400 mb-6">User: <span className="text-white font-bold">{selectedUser.name}</span></p>
            
            <div className="space-y-4">
              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button 
                  onClick={() => setActionType('add')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${actionType === 'add' ? 'bg-green-600 text-white' : 'text-slate-500'}`}
                >
                  ADD
                </button>
                <button 
                  onClick={() => setActionType('subtract')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${actionType === 'subtract' ? 'bg-red-600 text-white' : 'text-slate-500'}`}
                >
                  SUBTRACT
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Amount (₹)</label>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-2xl font-bold text-center outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button onClick={() => setSelectedUser(null)} className="flex-1 bg-slate-800 py-3 rounded-xl font-bold hover:bg-slate-700">CANCEL</button>
                <button 
                  onClick={handleUpdateBalance} 
                  className={`flex-1 py-3 rounded-xl font-bold shadow-lg ${actionType === 'add' ? 'bg-green-600 shadow-green-600/20' : 'bg-red-600 shadow-red-600/20'}`}
                >
                  CONFIRM
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
