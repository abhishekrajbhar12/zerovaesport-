
import React from 'react';
import { useApp } from '../App';

const Referral: React.FC = () => {
  const { user, settings } = useApp();

  const shareText = `Hey! Join me on FF Tourney Pro and win real cash playing Free Fire. Use my referral code: ${user?.referralCode} and get a bonus! Register here:`;
  const shareLink = `${window.location.origin}/#/auth?ref=${user?.referralCode}`;
  const fullMessage = `${shareText} ${shareLink}`;

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink);
    alert("Referral link copied!");
  };

  const shareOnWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(fullMessage)}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`, '_blank');
  };

  const shareOnInstagram = () => {
    // Instagram doesn't support direct link sharing via URL like others for feed/stories
    // but we can open the app/site for them to paste it in bio or DM
    alert("Copy the link and paste it in your Instagram Bio or Story!");
    copyLink();
    window.open(`https://www.instagram.com/`, '_blank');
  };

  return (
    <div className="space-y-8 py-4">
      <div className="text-center space-y-2">
        <div className="w-24 h-24 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-orange-500/20">
          <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>
        </div>
        <h2 className="gaming-font text-3xl font-bold text-white">Invite & Earn</h2>
        <p className="text-slate-400 max-w-xs mx-auto text-sm">Earn <span className="text-orange-500 font-bold">₹{settings.referralReward.toFixed(2)}</span> for every friend who registers and joins a match!</p>
      </div>

      <div className="glass-panel rounded-3xl p-6 text-center space-y-6">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Your Referral Code</p>
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl text-2xl font-black gaming-font tracking-widest text-orange-500">
            {user?.referralCode}
          </div>
        </div>

        <div className="space-y-4">
          <button 
            onClick={copyLink}
            className="w-full bg-slate-100 text-slate-900 py-4 rounded-2xl font-bold text-lg hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
            <span>COPY SHARE LINK</span>
          </button>

          <div className="pt-2">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Or Share Via</p>
            <div className="grid grid-cols-3 gap-4">
              <button 
                onClick={shareOnWhatsApp}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-600/20 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">WhatsApp</span>
              </button>

              <button 
                onClick={shareOnInstagram}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-14 h-14 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-600/20 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Instagram</span>
              </button>

              <button 
                onClick={shareOnFacebook}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-14 h-14 bg-blue-700 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-700/20 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 text-center shadow-lg">
           <p className="text-xs font-bold text-slate-500 uppercase mb-1 tracking-widest">Total Invites</p>
           <p className="text-3xl gaming-font text-white">{user?.referralCount}</p>
        </div>
        <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 text-center shadow-lg">
           <p className="text-xs font-bold text-slate-500 uppercase mb-1 tracking-widest">Total Earned</p>
           <p className="text-3xl gaming-font text-green-500">₹{(user?.referralCount || 0) * settings.referralReward}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-slate-300 gaming-font text-lg tracking-wide">How it works?</h3>
        <div className="space-y-3">
          {[
            { step: '01', title: 'Share your link', desc: 'Copy and send your unique referral link to your squad via WhatsApp or Socials.' },
            { step: '02', title: 'Friend Registers', desc: 'Your friend signs up using your link or code.' },
            { step: '03', title: 'Get Reward', desc: 'Receive ₹1 instantly in your wallet for every successful join!' }
          ].map((item) => (
            <div key={item.step} className="flex gap-4 items-start p-3 bg-slate-900/30 rounded-2xl border border-slate-800/50">
              <span className="gaming-font text-orange-600/50 text-2xl font-bold mt-1">{item.step}</span>
              <div>
                <p className="font-bold text-slate-200">{item.title}</p>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Referral;
