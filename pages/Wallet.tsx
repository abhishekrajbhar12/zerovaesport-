
import React, { useState, useEffect } from 'react';
import { useApp } from '../App';

const Wallet: React.FC = () => {
  const { user, setUser, settings, transactions, setTransactions } = useApp();
  const [amount, setAmount] = useState<string>('');
  const [refNumber, setRefNumber] = useState<string>('');
  const [tab, setTab] = useState<'add' | 'withdraw' | 'history'>('add');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Default to 'withdraw' if 'add' is disabled on load
  useEffect(() => {
    if (!settings.depositEnabled && tab === 'add') {
      setTab('withdraw');
    }
  }, [settings.depositEnabled]);

  const handlePayViaGateway = () => {
    setErrorMsg(null);
    const numAmt = parseFloat(amount);
    if (!numAmt || numAmt < settings.minDeposit) {
      setErrorMsg(`Minimum deposit is ₹${settings.minDeposit}`);
      return;
    }
    
    // Redirect to configured payment gateway
    window.open(settings.paymentGatewayLink, '_blank');
    alert("Please complete payment on the gateway and check history in 5 minutes.");
  };

  const handleWhatsAppVerify = () => {
    setErrorMsg(null);
    const numAmt = parseFloat(amount);
    if (!numAmt || numAmt < settings.minDeposit) {
      setErrorMsg(`Minimum deposit is ₹${settings.minDeposit}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const message = `Hello Admin,\n\nI have deposited money manually via QR/UPI.\n\n👤 Name: ${user?.name}\n🆔 FF UID: ${user?.ffUid}\n📞 Phone: ${user?.phone}\n💰 Amount: ₹${numAmt}\n🔢 UTR/Ref ID: ${refNumber || 'pending'}\n\nI am sending the screenshot below for verification.`;
    const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Manual verification request sent! Our team will approve it shortly.");
    }, 2000);
  };

  const handleWithdraw = () => {
    setErrorMsg(null);
    const numAmt = parseFloat(amount);
    
    if (!numAmt || numAmt < settings.minWithdrawal) {
      setErrorMsg(`Withdrawal amount ₹${settings.minWithdrawal} se kam hai! (Min: ₹${settings.minWithdrawal})`);
      return;
    }
    
    if (user && numAmt > user.walletBalance) {
      setErrorMsg("Insufficient Balance / आपके पास पर्याप्त पैसे नहीं हैं!");
      return;
    }
    
    if (numAmt > settings.maxDailyWithdrawal) {
      setErrorMsg(`Maximum daily withdrawal is ₹${settings.maxDailyWithdrawal}`);
      return;
    }

    setLoading(true);
    setTimeout(() => {
       if (user) {
        const updatedUser = { ...user, walletBalance: user.walletBalance - numAmt };
        setUser(updatedUser);
        localStorage.setItem('ff_user', JSON.stringify(updatedUser));
        
        const newTx = {
          id: Math.random().toString(36).substr(2, 9),
          userId: user.id,
          amount: numAmt,
          type: 'withdrawal' as any,
          status: 'pending' as any,
          timestamp: new Date().toISOString()
        };
        setTransactions([newTx, ...transactions]);
        setAmount('');
        setLoading(false);
        alert("Withdrawal Request Sent! Approved within 24 hours.");
      }
    }, 1500);
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText(settings.upiId);
    alert("UPI ID Copied!");
  };

  const downloadQR = async () => {
    try {
      const response = await fetch(settings.qrCodeImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'payment-qr.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert("Error downloading QR.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Balance Card */}
      <div className="ff-gradient rounded-3xl p-8 shadow-2xl shadow-orange-500/20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <p className="text-white/80 text-sm font-bold uppercase tracking-widest mb-1 relative z-10">Available Balance</p>
        <h2 className="text-5xl font-extrabold gaming-font relative z-10">₹{user?.walletBalance.toFixed(2)}</h2>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-900/50 p-1.5 rounded-2xl border border-slate-800">
        {settings.depositEnabled && (
          <button 
            onClick={() => { setTab('add'); setErrorMsg(null); }}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${tab === 'add' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'text-slate-400'}`}
          >
            Add Money
          </button>
        )}
        <button 
          onClick={() => { setTab('withdraw'); setErrorMsg(null); }}
          className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${tab === 'withdraw' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'text-slate-400'}`}
        >
          Withdraw
        </button>
        <button 
          onClick={() => { setTab('history'); setErrorMsg(null); }}
          className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${tab === 'history' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'text-slate-400'}`}
        >
          History
        </button>
      </div>

      <div className="glass-panel p-6 rounded-3xl border-slate-800">
        {tab !== 'history' ? (
          <div className="space-y-4">
            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-4 rounded-2xl text-xs font-bold text-center animate-bounce">
                ⚠️ {errorMsg}
              </div>
            )}
            
            {tab === 'add' && !settings.depositEnabled ? (
              <div className="py-10 text-center space-y-2">
                 <p className="text-slate-400 font-bold">Deposits are temporarily closed.</p>
              </div>
            ) : (
              <>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block px-1">
                    {tab === 'add' ? 'Deposit Amount' : 'Withdraw Amount'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-slate-400">₹</span>
                    <input 
                      type="number"
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value);
                        if (errorMsg) setErrorMsg(null);
                      }}
                      placeholder="0.00"
                      className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 pl-10 pr-4 text-2xl font-bold focus:border-orange-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                {tab === 'add' && (
                  <div className="grid grid-cols-4 gap-2">
                    {[50, 100, 200, 500].map(val => (
                      <button 
                        key={val}
                        onClick={() => setAmount(val.toString())}
                        className="bg-slate-800/50 py-2 rounded-lg text-sm font-bold border border-slate-700 hover:border-orange-500 transition-colors"
                      >
                        +₹{val}
                      </button>
                    ))}
                  </div>
                )}

                {/* Instant Gateway Option */}
                {tab === 'add' && settings.gatewayEnabled && (
                  <div className="pt-4 space-y-3">
                     <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest text-center">Fastest Method</p>
                     <button 
                      onClick={handlePayViaGateway}
                      className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-600/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                     >
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                       <span>PAY ONLINE (INSTANT)</span>
                     </button>
                  </div>
                )}

                {tab === 'withdraw' && (
                  <button 
                    onClick={handleWithdraw}
                    disabled={loading}
                    className="w-full py-4 rounded-2xl font-bold text-lg shadow-xl bg-blue-600 shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'REQUEST WITHDRAWAL'}
                  </button>
                )}

                <p className="text-[10px] text-center text-slate-500 italic uppercase tracking-wider font-bold pt-2">
                  {tab === 'add' ? `* Minimum deposit ₹${settings.minDeposit}` : `* Minimum withdrawal ₹${settings.minWithdrawal}`}
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.length === 0 ? (
              <div className="text-center py-10 text-slate-500">No transactions yet</div>
            ) : (
              transactions.map(tx => (
                <div key={tx.id} className="flex justify-between items-center p-3 border-b border-slate-800/50 last:border-0">
                  <div>
                    <p className="font-bold text-sm capitalize text-slate-200">{tx.type.replace('_', ' ')}</p>
                    <p className="text-[10px] text-slate-500">{new Date(tx.timestamp).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${['deposit', 'winning', 'referral'].includes(tx.type) ? 'text-green-500' : 'text-red-500'}`}>
                      {['deposit', 'winning', 'referral'].includes(tx.type) ? '+' : '-'} ₹{tx.amount}
                    </p>
                    <p className={`text-[10px] font-bold uppercase ${tx.status === 'success' ? 'text-green-600' : tx.status === 'pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                      {tx.status}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Manual Deposit Section - Moved QR and UTR inside this section specifically */}
      {tab === 'add' && settings.depositEnabled && settings.qrCodeEnabled && (
        <div className="text-center p-6 glass-panel rounded-3xl border-2 border-dashed border-orange-500/20 space-y-6">
           <div className="space-y-2">
             <div className="inline-block bg-orange-600/10 px-3 py-1 rounded-full border border-orange-500/30">
               <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Manual Method (QR/UPI)</span>
             </div>
             <p className="text-xs text-slate-400">Scan QR, enter UTR and send screenshot</p>
           </div>
           
           <div className="relative group inline-block">
             <div className="bg-white p-2 rounded-2xl shadow-xl">
               <img src={settings.qrCodeImage} alt="Payment QR" className="w-44 h-44 rounded-xl" />
             </div>
             <button 
              onClick={downloadQR}
              className="absolute -bottom-2 -right-2 bg-orange-600 text-white p-2 rounded-full shadow-lg hover:bg-orange-500 transition-colors"
             >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
             </button>
           </div>

           <div className="space-y-2">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">UPI ID:</p>
              <div className="flex items-center justify-center gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-sm font-bold text-orange-500">{settings.upiId}</span>
                <button onClick={copyUpiId} className="text-slate-500 hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                </button>
              </div>
           </div>

           <div className="pt-4 border-t border-slate-800 space-y-4">
              <div className="text-left">
                <label className="text-[10px] font-bold text-slate-500 uppercase px-1 tracking-widest mb-1 block">
                  Reference ID / UTR (12 Digits)
                </label>
                <input 
                  type="text"
                  value={refNumber}
                  onChange={(e) => setRefNumber(e.target.value)}
                  placeholder="Paste UTR from payment app"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm outline-none focus:border-orange-500 transition-colors text-white text-center font-mono"
                />
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handleWhatsAppVerify}
                  disabled={loading}
                  className="flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-500 py-4 rounded-2xl font-bold text-white transition-all shadow-lg shadow-green-600/20 active:scale-95 disabled:opacity-50"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  <span>VERIFY ON WHATSAPP</span>
                </button>
                <p className="text-xs text-orange-500 font-bold tracking-widest">Support: +{settings.whatsappNumber}</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
