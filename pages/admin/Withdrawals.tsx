
import React from 'react';
import { useApp } from '../../App';

const AdminWithdrawals: React.FC = () => {
  const { transactions, setTransactions } = useApp();

  const requests = transactions.filter(t => t.type === 'withdrawal' && t.status === 'pending');

  const handleAction = (id: string, newStatus: 'success' | 'failed') => {
    setTransactions(transactions.map(t => t.id === id ? { ...t, status: newStatus } : t));
    alert(`Withdrawal ${newStatus === 'success' ? 'Approved' : 'Rejected'}!`);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold gaming-font">Withdrawal Requests</h2>

      <div className="grid grid-cols-1 gap-4">
        {requests.length === 0 ? (
          <div className="bg-slate-950 p-12 text-center rounded-2xl border border-slate-800 text-slate-500">
             No pending withdrawal requests.
          </div>
        ) : (
          requests.map(req => (
            <div key={req.id} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-wrap justify-between items-center gap-4">
               <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-orange-600/10 rounded-full flex items-center justify-center text-orange-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M2.25 18.75a60.07 60.07 0 0115.797 2.1c.827.158 1.604-.445 1.604-1.282V6.062c0-.837-.777-1.44-1.604-1.282a60.07 60.07 0 01-15.797 2.1c-.827.158-1.604-.445-1.604-1.282V6.062c0-.837.777-1.44 1.604-1.282z" /></svg>
                  </div>
                  <div>
                    <p className="font-bold text-lg">₹{req.amount}</p>
                    <p className="text-xs text-slate-500">User ID: {req.userId}</p>
                    <p className="text-[10px] text-slate-600">{new Date(req.timestamp).toLocaleString()}</p>
                  </div>
               </div>
               <div className="flex gap-3">
                  <button onClick={() => handleAction(req.id, 'failed')} className="bg-slate-800 px-6 py-2 rounded-lg text-sm font-bold text-red-500 border border-red-500/20 hover:bg-red-500/10 transition-colors">REJECT</button>
                  <button onClick={() => handleAction(req.id, 'success')} className="bg-green-600 px-6 py-2 rounded-lg text-sm font-bold text-white shadow-lg shadow-green-600/20 hover:bg-green-500 transition-colors">APPROVE</button>
               </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-bold mb-4">Past Withdrawals</h3>
        <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
           {transactions.filter(t => t.type === 'withdrawal' && t.status !== 'pending').slice(0, 10).map(tx => (
             <div key={tx.id} className="p-4 border-b border-slate-800 flex justify-between items-center text-sm">
                <div>
                   <span className="text-slate-500 mr-2">#{tx.id}</span>
                   <span className="font-bold">₹{tx.amount}</span>
                </div>
                <div className="flex gap-4 items-center">
                   <span className="text-xs text-slate-500">{new Date(tx.timestamp).toDateString()}</span>
                   <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${tx.status === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>{tx.status}</span>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default AdminWithdrawals;
