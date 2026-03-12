
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../App';

const Home: React.FC = () => {
  const { tournaments } = useApp();
  const [showWarning, setShowWarning] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const hasSeenWarning = localStorage.getItem('ff_warning_accepted');
    if (!hasSeenWarning) {
      setShowWarning(true);
    }
  }, []);

  const acceptWarning = () => {
    localStorage.setItem('ff_warning_accepted', 'true');
    setShowWarning(false);
  };

  const categories = ['All', 'Full Map', '1v1', '2v2', '4v4'];

  const filteredTournaments = selectedCategory === 'All' 
    ? tournaments 
    : tournaments.filter(t => t.matchType === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Warning Popup */}
      {showWarning && (
        <div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-slate-900 border-2 border-red-600/50 rounded-3xl p-8 w-full max-w-sm text-center shadow-[0_0_50px_rgba(220,38,38,0.2)] animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-red-600/30">
              <svg className="w-12 h-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <h3 className="gaming-font text-2xl font-bold text-white mb-4">FAIR PLAY WARNING</h3>
            
            <div className="space-y-4 text-sm leading-relaxed overflow-y-auto max-h-[40vh] pr-2 custom-scrollbar">
              <div className="p-4 bg-red-600/10 rounded-2xl border border-red-600/20">
                <p className="text-red-400 font-bold mb-2">ENGLISH</p>
                <p className="text-slate-300">
                  If you use a panel or any hack in the tournament, your wallet balance will be zeroed, your Free Fire ID may be banned, and you will never be able to play tournaments on this application again.
                </p>
              </div>

              <div className="p-4 bg-red-600/10 rounded-2xl border border-red-600/20 text-right">
                <p className="text-red-400 font-bold mb-2">HINDI / हिंदी</p>
                <p className="text-slate-300" dir="rtl">
                  अगर आप टूर्नामेंट में पैनल या हैक का उपयोग करते हैं तो आपकी वॉलेट जीरो हो जाएगी और फ्री फायर आईडी बैन हो सकती है और आप इस एप्लीकेशन पर कभी भी टूर्नामेंट नहीं खेल सकते हैं।
                </p>
              </div>
            </div>

            <button 
              onClick={acceptWarning}
              className="w-full mt-8 bg-red-600 hover:bg-red-500 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-red-600/20 active:scale-95 transition-all"
            >
              I AGREE / मैं सहमत हूँ
            </button>
          </div>
        </div>
      )}

      {/* Banner */}
      <div className="relative h-40 rounded-2xl overflow-hidden ff-gradient shadow-2xl shadow-orange-500/10">
        <img 
          src="https://picsum.photos/seed/game-banner/800/400" 
          className="w-full h-full object-cover opacity-40 mix-blend-overlay" 
          alt="Banner" 
        />
        <div className="absolute inset-0 p-6 flex flex-col justify-center">
          <h2 className="gaming-font text-3xl font-bold leading-tight">Elite FF<br/>Tournaments</h2>
          <p className="text-sm opacity-90 mt-1">Join, Win, and Withdraw instantly!</p>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button 
            key={cat} 
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap px-5 py-2 rounded-xl glass-panel text-sm font-semibold border-slate-700 transition-all ${
              selectedCategory === cat 
              ? 'border-orange-500 bg-orange-500/10 text-orange-500' 
              : 'hover:border-slate-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Matches List */}
      <div className="space-y-4">
        <h3 className="gaming-font text-xl font-bold text-orange-500 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-orange-500 rounded-full"></span>
          {selectedCategory === 'All' ? 'Ongoing Tournaments' : `${selectedCategory} Matches`}
        </h3>
        
        {filteredTournaments.length > 0 ? (
          filteredTournaments.map((match) => (
            <NavLink 
              key={match.id} 
              to={`/tournament/${match.id}`} 
              className="block group"
            >
              <div className="glass-panel rounded-2xl overflow-hidden border-slate-800 group-hover:border-orange-500/50 transition-all duration-300 transform active:scale-[0.98]">
                <div className="relative h-44">
                  <img src={match.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={match.title} />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold border border-slate-700">
                    {match.matchType} • {match.map}
                  </div>
                  <div className="absolute top-3 right-3 bg-orange-600 px-3 py-1 rounded-lg text-xs font-bold text-white shadow-lg">
                    ENTRY: ₹{match.entryFee}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950 to-transparent">
                    <h4 className="gaming-font text-lg font-bold">{match.title}</h4>
                  </div>
                </div>
                
                <div className="p-4 grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Per Kill</p>
                    <p className="text-sm font-bold text-green-400">₹{match.perKillPrize}</p>
                  </div>
                  <div className="text-center border-x border-slate-800">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Prize Pool</p>
                    <p className="text-sm font-bold text-orange-400">₹{match.prizePool}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Date/Time</p>
                    <p className="text-sm font-bold truncate">
                      {new Date(match.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                <div className="px-4 pb-4">
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full ff-gradient" 
                      style={{ width: `${(match.joinedSlots / match.slots) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-[10px] font-bold">
                    <span className="text-orange-500">{match.slots - match.joinedSlots} Slots Left</span>
                    <span className="text-slate-500">{match.joinedSlots}/{match.slots} Joined</span>
                  </div>
                </div>
              </div>
            </NavLink>
          ))
        ) : (
          <div className="text-center py-12 glass-panel rounded-3xl border-dashed border-slate-800">
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No {selectedCategory} matches currently available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
