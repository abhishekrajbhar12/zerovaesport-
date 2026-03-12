
import React, { useState, useEffect } from 'react';
import { useApp } from '../App';
import { useNavigate } from 'react-router-dom';

type AuthView = 'LOGIN' | 'REGISTER' | 'FORGOT_PASSWORD';

const Auth: React.FC = () => {
  const [view, setView] = useState<AuthView>('REGISTER');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [ffUid, setFfUid] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isResetVerified, setIsResetVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  
  const { login } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (view === 'REGISTER') {
      if (!phone || !name || !ffUid || !password) {
        alert("Please fill all fields first / कृपया सभी फ़ील्ड भरें");
        return;
      }
    } else if (view === 'FORGOT_PASSWORD') {
      if (!phone) {
        alert("Please enter phone number / कृपया फोन नंबर दर्ज करें");
        return;
      }
    }

    if (phone.length !== 10) {
      alert("Please enter a valid 10-digit number / कृपया मान्य 10-अंकों का नंबर दर्ज करें");
      return;
    }

    setIsLoading(true);
    // Simulate API call to send OTP
    setTimeout(() => {
      setIsOtpSent(true);
      setIsLoading(false);
      setTimer(60);
      alert(`OTP sent to ${phone} (Simulated: 123456)`);
    }, 1200);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== '123456' && otp !== '') { 
      alert("Invalid OTP / अमान्य ओटीपी");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (view === 'REGISTER') {
        login(phone, ffUid);
        navigate('/');
      } else if (view === 'FORGOT_PASSWORD') {
        setIsResetVerified(true);
        setIsOtpSent(false); // Move to password reset view
      }
    }, 1000);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters / पासवर्ड कम से कम 6 अक्षरों का होना चाहिए");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Password changed successfully! Please login. / पासवर्ड सफलतापूर्वक बदल गया! कृपया लॉगिन करें।");
      resetFlow('LOGIN');
    }, 1500);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !password) {
      alert("Please enter phone and password / कृपया फोन और पासवर्ड दर्ज करें");
      return;
    }
    if (phone.length !== 10) {
      alert("Please enter a valid 10-digit number / कृपया मान्य 10-अंकों का नंबर दर्ज करें");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      login(phone, '12345678'); 
      setIsLoading(false);
      navigate('/');
    }, 1000);
  };

  const resetFlow = (newView: AuthView) => {
    setView(newView);
    setIsOtpSent(false);
    setIsResetVerified(false);
    setPhone('');
    setPassword('');
    setOtp('');
    setNewPassword('');
    setName('');
    setFfUid('');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-orange-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-red-600/10 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center space-y-2">
          <div className="w-20 h-20 ff-gradient rounded-3xl mx-auto shadow-2xl shadow-orange-600/30 flex items-center justify-center font-black text-3xl text-white transform rotate-3 hover:rotate-0 transition-transform cursor-default">
            FF
          </div>
          <h1 className="gaming-font text-3xl font-bold tracking-widest text-white mt-4">FF TOURNEY PRO</h1>
          <p className="text-slate-500 text-sm">Play Elite. Win Real Cash.</p>
        </div>

        <div className="glass-panel rounded-[2.5rem] p-8 border-slate-800 shadow-2xl relative overflow-hidden">
          {/* Tab Switcher (only show if not in OTP or Reset mode) */}
          {(!isOtpSent && !isResetVerified) && (
            <div className="flex bg-slate-950/50 rounded-2xl p-1.5 mb-8 border border-slate-800/50">
              <button 
                onClick={() => resetFlow('REGISTER')}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${view === 'REGISTER' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'text-slate-500 hover:text-slate-300'}`}
              >
                REGISTER
              </button>
              <button 
                onClick={() => resetFlow('LOGIN')}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${view === 'LOGIN' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'text-slate-500 hover:text-slate-300'}`}
              >
                LOGIN
              </button>
            </div>
          )}

          {/* FORGOT PASSWORD FORM */}
          {view === 'FORGOT_PASSWORD' && !isOtpSent && !isResetVerified && (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <h3 className="gaming-font text-xl text-center text-orange-500">Reset Password</h3>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase px-1 tracking-widest">Phone Number</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 font-bold">+91</span>
                  <input 
                    type="tel"
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 pl-14 outline-none focus:border-orange-500 transition-colors text-white"
                  />
                </div>
              </div>
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full ff-gradient py-4 rounded-2xl font-bold text-lg shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'SEND OTP'}
              </button>
              <button 
                type="button" 
                onClick={() => resetFlow('LOGIN')}
                className="w-full text-center text-xs text-slate-500 font-bold hover:text-orange-500"
              >
                BACK TO LOGIN
              </button>
            </form>
          )}

          {/* OTP VERIFICATION VIEW (REGISTER & FORGOT PASSWORD) */}
          {isOtpSent && !isResetVerified && (
            <form onSubmit={handleVerifyOtp} className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="text-center space-y-2">
                <p className="text-sm text-slate-400">Verify your phone number</p>
                <p className="text-xs text-orange-500 font-bold">OTP sent to +91 {phone}</p>
              </div>
              
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase px-1 tracking-widest text-center block">Enter 6-Digit OTP</label>
                <input 
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-5 text-center text-3xl font-black tracking-[1em] outline-none focus:border-orange-500 transition-colors text-white"
                />
              </div>

              <div className="space-y-4">
                <button 
                  type="submit"
                  disabled={isLoading || otp.length < 6}
                  className="w-full bg-green-600 hover:bg-green-500 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-green-600/20 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'VERIFY OTP'}
                </button>
                
                <div className="text-center">
                  {timer > 0 ? (
                    <p className="text-xs text-slate-600">Resend OTP in <span className="text-orange-500 font-bold">{timer}s</span></p>
                  ) : (
                    <button type="button" onClick={handleSendOtp} className="text-xs text-orange-500 font-bold hover:underline">RESEND OTP</button>
                  )}
                </div>
              </div>
            </form>
          )}

          {/* RESET PASSWORD VIEW */}
          {isResetVerified && (
            <form onSubmit={handleResetPassword} className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h3 className="gaming-font text-xl text-center text-orange-500">Create New Password</h3>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase px-1 tracking-widest">New Password</label>
                <input 
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 outline-none focus:border-orange-500 transition-colors text-white"
                />
              </div>
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full ff-gradient py-4 rounded-2xl font-bold text-lg shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'UPDATE PASSWORD'}
              </button>
            </form>
          )}

          {/* REGISTER FLOW (FORM ONLY) */}
          {view === 'REGISTER' && !isOtpSent && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase px-1 tracking-widest">Full Name</label>
                <input 
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 outline-none focus:border-orange-500 transition-colors text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase px-1 tracking-widest">Phone Number</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 font-bold">+91</span>
                  <input 
                    type="tel"
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 pl-14 outline-none focus:border-orange-500 transition-colors text-white"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase px-1 tracking-widest">Free Fire UID</label>
                <input 
                  type="text"
                  placeholder="Game UID"
                  value={ffUid}
                  onChange={(e) => setFfUid(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 outline-none focus:border-orange-500 transition-colors text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase px-1 tracking-widest">Create Password</label>
                <input 
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 outline-none focus:border-orange-500 transition-colors text-white"
                />
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full ff-gradient py-4 rounded-2xl font-bold text-lg mt-4 shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'SEND OTP'}
              </button>
            </form>
          )}

          {/* LOGIN FLOW (FORM ONLY) */}
          {view === 'LOGIN' && !isOtpSent && !isResetVerified && (
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase px-1 tracking-widest">Phone Number</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 font-bold">+91</span>
                  <input 
                    type="tel"
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 pl-14 outline-none focus:border-orange-500 transition-colors text-white"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase px-1 tracking-widest">Password</label>
                <input 
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 outline-none focus:border-orange-500 transition-colors text-white"
                />
              </div>

              <div className="text-right">
                <button 
                  type="button" 
                  onClick={() => resetFlow('FORGOT_PASSWORD')}
                  className="text-[10px] font-bold text-orange-500 uppercase tracking-widest hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full ff-gradient py-4 rounded-2xl font-bold text-lg shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'LOG IN'}
              </button>
            </form>
          )}

          <p className="text-center text-[10px] text-slate-600 mt-8 leading-relaxed uppercase tracking-tighter">
            By continuing, you agree to our <span className="text-slate-400 underline">Terms of Service</span> & <span className="text-slate-400 underline">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
