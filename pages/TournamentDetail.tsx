
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../App';

const TournamentDetail: React.FC = () => {
  const { id } = useParams();
  // Fixed: Added 'transactions' to destructuring to support direct array updates
  const { tournaments, user, setUser, settings, setTransactions, transactions } = useApp();
  const navigate = useNavigate();
  const [isJoining, setIsJoining] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  const match = tournaments.find(t => t.id === id);

  if (!match) return <div className="p-8 text-center">Tournament not found</div>;

  const handleJoin = () => {
    if (!user) return navigate('/auth');
    
    if (user.walletBalance < match.entryFee) {
      alert("Insufficient Balance! Please add money to your wallet.");
      return navigate('/wallet');
    }

    setIsJoining(true);
    
    // Simulate Backend API Call
    setTimeout(() => {
      // 1. Deduct money
      const updatedUser = { ...user, walletBalance: user.walletBalance - match.entryFee };
      setUser(updatedUser);
      localStorage.setItem('ff_user', JSON.stringify(updatedUser));

      // 2. Add transaction
      const newTx = {
        id: Math.random().toString(36).substr(2, 9),
        userId: user.id,
        amount: match.entryFee,
        type: 'entry_fee' as any,
        status: 'success' as any,
        timestamp: new Date().toISOString()
      };
      
      // Fixed: Replaced functional update with direct array to satisfy Transaction[] type requirement
      setTransactions([newTx, ...transactions]);

      setIsJoining(false);
      setShowWhatsApp(true);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="relative rounded-2xl overflow-hidden glass-panel border-slate-800">
        <img src={match.image} className="w-full h-48 object-cover" alt={match.title} />
        <div className="p-6">
          <h2 className="gaming-font text-2xl font-bold">{match.title}</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="bg-slate-800 px-3 py-1 rounded text-xs font-semibold text-slate-300 border border-slate-700">{match.matchType}</span>
            <span className="bg-slate-800 px-3 py-1 rounded text-xs font-semibold text-slate-300 border border-slate-700">{match.map}</span>
            <span className="bg-orange-500/20 px-3 py-1 rounded text-xs font-bold text-orange-500 border border-orange-500/30">ID-PASS on WhatsApp</span>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Prize Per Kill</p>
              <p className="text-xl gaming-font text-green-400">₹{match.perKillPrize}</p>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Total Prize</p>
              <p className="text-xl gaming-font text-orange-500">₹{match.prizePool}</p>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Entry Fee</p>
              <p className="text-xl gaming-font text-blue-400">₹{match.entryFee}</p>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Time</p>
              <p className="text-lg font-bold">{new Date(match.startTime).toLocaleString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })}</p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-bold text-slate-300 mb-2">Instructions</h4>
            <div className="text-sm text-slate-400 space-y-2 leading-relaxed">
              <p>• Join the room at least 10 minutes before the start time.</p>
              <p>• Use your Free Fire UID: <span className="text-orange-500 font-bold">{user?.ffUid}</span>.</p>
              <p>• Do not use hacks or third-party tools (instant ban).</p>
              <p>• Screenshots are required for prize claims in 1v1 matches.</p>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={handleJoin}
        disabled={isJoining}
        className="w-full ff-gradient py-4 rounded-2xl font-bold gaming-text text-lg shadow-xl shadow-orange-600/20 active:scale-95 transition-transform disabled:opacity-50"
      >
        {isJoining ? 'PROCESSING...' : `JOIN NOW (₹${match.entryFee})`}
      </button>

      {/* WhatsApp Modal */}
      {showWhatsApp && (
        <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 w-full max-w-sm text-center animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">Joined Successfully!</h3>
            <p className="text-slate-400 text-sm mb-6">Click below to get Room ID & Password on WhatsApp. Send a hi to get credentials.</p>
            <a 
              href={`https://wa.me/${settings.whatsappNumber}?text=Hi,%20I%20joined%20the%20tournament%20${match.title}.%20My%20UID%20is%20${user?.ffUid}.%20Please%20give%20me%20the%20ID%20Pass.`}
              target="_blank"
              className="block w-full bg-green-600 hover:bg-green-500 py-3 rounded-xl font-bold transition-colors mb-3"
            >
              Contact on WhatsApp
            </a>
            <button onClick={() => navigate('/')} className="w-full text-slate-500 font-semibold py-2 hover:text-white transition-colors">
              Close & Go Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TournamentDetail;
