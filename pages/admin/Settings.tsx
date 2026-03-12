
import React from 'react';
import { useApp } from '../../App';

const AdminSettings: React.FC = () => {
  const { settings, setSettings } = useApp();

  const handleChange = (key: keyof typeof settings, val: any) => {
    setSettings({ ...settings, [key]: val });
  };

  const saveSettings = () => {
    alert("System Settings Updated!");
  };

  return (
    <div className="max-w-2xl space-y-8">
      <h2 className="text-3xl font-bold gaming-font">App Settings</h2>

      <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
             <label className="text-xs font-bold text-slate-500 uppercase">WhatsApp Number</label>
             <input 
               type="text" 
               value={settings.whatsappNumber}
               onChange={e => handleChange('whatsappNumber', e.target.value)}
               className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 outline-none focus:border-orange-500" 
             />
          </div>
          <div className="space-y-1">
             <label className="text-xs font-bold text-slate-500 uppercase">UPI ID</label>
             <input 
               type="text" 
               value={settings.upiId}
               onChange={e => handleChange('upiId', e.target.value)}
               className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 outline-none focus:border-orange-500" 
               placeholder="e.g. name@upi"
             />
          </div>
          <div className="space-y-1">
             <label className="text-xs font-bold text-slate-500 uppercase">Referral Reward (₹)</label>
             <input 
               type="number" 
               value={settings.referralReward}
               onChange={e => handleChange('referralReward', Number(e.target.value))}
               className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 outline-none focus:border-orange-500" 
             />
          </div>
          <div className="space-y-1">
             <label className="text-xs font-bold text-slate-500 uppercase">Min Deposit (₹)</label>
             <input 
               type="number" 
               value={settings.minDeposit}
               onChange={e => handleChange('minDeposit', Number(e.target.value))}
               className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 outline-none focus:border-orange-500" 
             />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 space-y-4">
           {/* Global Deposit Enable */}
           <div className="flex justify-between items-center">
              <div>
                <p className="font-bold">Allow Wallet Deposits</p>
                <p className="text-xs text-slate-500">Master switch for all deposit options</p>
              </div>
              <button 
                onClick={() => handleChange('depositEnabled', !settings.depositEnabled)}
                className={`w-12 h-6 rounded-full transition-colors relative ${settings.depositEnabled ? 'bg-green-600' : 'bg-slate-800'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.depositEnabled ? 'right-1' : 'left-1'}`}></div>
              </button>
           </div>

           {/* Payment Gateway Toggle */}
           <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-blue-500">Enable Payment Gateway</p>
                <p className="text-xs text-slate-500">Enable automated instant payments</p>
              </div>
              <button 
                onClick={() => handleChange('gatewayEnabled', !settings.gatewayEnabled)}
                className={`w-12 h-6 rounded-full transition-colors relative ${settings.gatewayEnabled ? 'bg-blue-600' : 'bg-slate-800'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.gatewayEnabled ? 'right-1' : 'left-1'}`}></div>
              </button>
           </div>

           {/* Manual QR Toggle */}
           <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-orange-500">Enable Manual QR/UPI</p>
                <p className="text-xs text-slate-500">Show QR and WhatsApp verify option</p>
              </div>
              <button 
                onClick={() => handleChange('qrCodeEnabled', !settings.qrCodeEnabled)}
                className={`w-12 h-6 rounded-full transition-colors relative ${settings.qrCodeEnabled ? 'bg-orange-600' : 'bg-slate-800'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.qrCodeEnabled ? 'right-1' : 'left-1'}`}></div>
              </button>
           </div>

           <div className="space-y-1">
             <label className="text-xs font-bold text-slate-500 uppercase">Gateway Link</label>
             <input 
               type="text" 
               value={settings.paymentGatewayLink}
               onChange={e => handleChange('paymentGatewayLink', e.target.value)}
               className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 outline-none focus:border-orange-500" 
             />
          </div>
        </div>

        <button onClick={saveSettings} className="w-full bg-orange-600 py-4 rounded-xl font-bold shadow-lg shadow-orange-600/20 hover:bg-orange-500 transition-colors">
           SAVE GLOBAL SETTINGS
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
