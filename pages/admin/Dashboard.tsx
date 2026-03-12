
import React from 'react';
import { useApp } from '../../App';

const AdminDashboard: React.FC = () => {
  const { tournaments, transactions } = useApp();

  const totalRevenue = transactions.filter(t => t.type === 'deposit' && t.status === 'success').reduce((sum, t) => sum + t.amount, 0);
  const totalWinnings = transactions.filter(t => t.type === 'winning').reduce((sum, t) => sum + t.amount, 0);
  const activeTournaments = tournaments.filter(t => t.status !== 'completed').length;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold gaming-font">Overview Dashboard</h2>
        <div className="flex gap-2">
           <button className="bg-slate-800 px-4 py-2 rounded-lg text-sm border border-slate-700">Last 30 Days</button>
           <button className="bg-orange-600 px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-orange-600/20">Refresh Data</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Deposits', value: `₹${totalRevenue.toLocaleString()}`, color: 'text-green-500', bg: 'bg-green-500/10' },
          { label: 'Total Payouts', value: `₹${totalWinnings.toLocaleString()}`, color: 'text-orange-500', bg: 'bg-orange-500/10' },
          { label: 'Active Matches', value: activeTournaments.toString(), color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Platform Profit', value: `₹${(totalRevenue - totalWinnings).toLocaleString()}`, color: 'text-purple-500', bg: 'bg-purple-500/10' }
        ].map(stat => (
          <div key={stat.label} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center text-center">
             <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
             </div>
             <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
             <p className={`text-3xl font-bold gaming-font ${stat.color} mt-1`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
           <h3 className="text-xl font-bold mb-6">Recent Transactions</h3>
           <div className="space-y-4">
              {transactions.slice(0, 5).map(tx => (
                <div key={tx.id} className="flex justify-between items-center py-3 border-b border-slate-800">
                  <div className="flex gap-3 items-center">
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'deposit' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                        {tx.type === 'deposit' ? '+' : '-'}
                     </div>
                     <div>
                        <p className="text-sm font-bold capitalize">{tx.type}</p>
                        <p className="text-xs text-slate-500">{new Date(tx.timestamp).toDateString()}</p>
                     </div>
                  </div>
                  <p className="font-bold">₹{tx.amount}</p>
                </div>
              ))}
              {transactions.length === 0 && <p className="text-slate-500 text-center py-4">No recent activities</p>}
           </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
           <h3 className="text-xl font-bold mb-6">Upcoming Tournaments</h3>
           <div className="space-y-4">
              {tournaments.filter(t => t.status === 'upcoming').slice(0, 3).map(t => (
                <div key={t.id} className="flex gap-4 items-center">
                  <img src={t.image} className="w-16 h-12 object-cover rounded" alt="" />
                  <div className="flex-1">
                    <p className="text-sm font-bold truncate">{t.title}</p>
                    <p className="text-[10px] text-orange-500">{t.matchType} • {t.map}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold">₹{t.entryFee}</p>
                    <p className="text-[10px] text-slate-500">{t.joinedSlots}/{t.slots} Joined</p>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
