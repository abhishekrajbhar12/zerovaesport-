
import React, { useState } from 'react';
import { useApp } from '../../App';
import { MatchType, MapName, Tournament } from '../../types';

const AdminTournaments: React.FC = () => {
  const { tournaments, setTournaments } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Partial<Tournament>>({
    title: '',
    matchType: MatchType.FULL_MAP,
    map: MapName.BERMUDA,
    entryFee: 10,
    perKillPrize: 2,
    prizePool: 100,
    slots: 48,
    startTime: new Date().toISOString().slice(0, 16),
    description: '',
    image: 'https://picsum.photos/800/400'
  });

  const handleCreate = () => {
    const newTourney: Tournament = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      joinedSlots: 0,
      status: 'upcoming'
    } as Tournament;

    setTournaments([newTourney, ...tournaments]);
    setShowModal(false);
    alert("Match Created!");
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this tournament?")) {
      setTournaments(tournaments.filter(t => t.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold gaming-font">Manage Tournaments</h2>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-orange-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-orange-500 transition-colors"
        >
          <span>+ Create New Match</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-500 text-xs uppercase tracking-widest">
              <th className="py-4 px-4">Image</th>
              <th className="py-4 px-4">Title & Info</th>
              <th className="py-4 px-4">Type/Map</th>
              <th className="py-4 px-4">Entry/Prize</th>
              <th className="py-4 px-4">Slots</th>
              <th className="py-4 px-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {tournaments.map(t => (
              <tr key={t.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="py-4 px-4">
                  <img src={t.image} className="w-20 h-12 object-cover rounded-lg border border-slate-700" alt="" />
                </td>
                <td className="py-4 px-4">
                  <p className="font-bold">{t.title}</p>
                  <p className="text-[10px] text-slate-500">{new Date(t.startTime).toLocaleString()}</p>
                </td>
                <td className="py-4 px-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-orange-500 border border-slate-700 w-fit">{t.matchType}</span>
                    <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-blue-500 border border-slate-700 w-fit">{t.map}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <p className="text-sm font-bold">Entry: ₹{t.entryFee}</p>
                  <p className="text-[10px] text-green-500">Prize: ₹{t.prizePool}</p>
                </td>
                <td className="py-4 px-4">
                   <p className="text-sm font-bold">{t.joinedSlots}/{t.slots}</p>
                   <div className="w-16 h-1 bg-slate-800 rounded-full mt-1">
                      <div className="h-full bg-orange-500 rounded-full" style={{width: `${(t.joinedSlots/t.slots)*100}%`}}></div>
                   </div>
                </td>
                <td className="py-4 px-4">
                   <div className="flex gap-2">
                     <button className="p-2 bg-slate-800 rounded-lg hover:text-orange-500"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg></button>
                     <button onClick={() => handleDelete(t.id)} className="p-2 bg-slate-800 rounded-lg hover:text-red-500"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg></button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-6 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 w-full max-w-2xl animate-in fade-in zoom-in duration-200 my-auto">
             <h3 className="text-2xl font-bold mb-6 gaming-font">Create New Tournament</h3>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                   <label className="text-xs text-slate-500 font-bold uppercase">Match Title</label>
                   <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 outline-none focus:border-orange-500" placeholder="e.g. Morning Blitz" />
                </div>
                <div className="space-y-1">
                   <label className="text-xs text-slate-500 font-bold uppercase">Match Type</label>
                   <select value={formData.matchType} onChange={e => setFormData({...formData, matchType: e.target.value as any})} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 outline-none focus:border-orange-500">
                      <option value={MatchType.FULL_MAP}>Full Map</option>
                      <option value={MatchType.ONE_V_ONE}>1v1</option>
                      <option value={MatchType.TWO_V_TWO}>2v2</option>
                      <option value={MatchType.FOUR_V_FOUR}>4v4</option>
                   </select>
                </div>
                <div className="space-y-1">
                   <label className="text-xs text-slate-500 font-bold uppercase">Map</label>
                   <select value={formData.map} onChange={e => setFormData({...formData, map: e.target.value as any})} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 outline-none focus:border-orange-500">
                      <option value={MapName.BERMUDA}>Bermuda</option>
                      <option value={MapName.KALAHARI}>Kalahari</option>
                      <option value={MapName.PURGATORY}>Purgatory</option>
                   </select>
                </div>
                <div className="space-y-1">
                   <label className="text-xs text-slate-500 font-bold uppercase">Start Time</label>
                   <input type="datetime-local" value={formData.startTime} onChange={e => setFormData({...formData, startTime: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 outline-none focus:border-orange-500" />
                </div>
                <div className="space-y-1">
                   <label className="text-xs text-slate-500 font-bold uppercase">Entry Fee (₹)</label>
                   <input type="number" value={formData.entryFee} onChange={e => setFormData({...formData, entryFee: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 outline-none focus:border-orange-500" />
                </div>
                <div className="space-y-1">
                   <label className="text-xs text-slate-500 font-bold uppercase">Prize Pool (₹)</label>
                   <input type="number" value={formData.prizePool} onChange={e => setFormData({...formData, prizePool: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 outline-none focus:border-orange-500" />
                </div>
                <div className="col-span-2 space-y-1">
                   <label className="text-xs text-slate-500 font-bold uppercase">Image URL</label>
                   <input type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 outline-none focus:border-orange-500" placeholder="https://..." />
                </div>
             </div>
             <div className="flex gap-4 mt-8">
                <button onClick={() => setShowModal(false)} className="flex-1 bg-slate-800 py-3 rounded-xl font-bold">CANCEL</button>
                <button onClick={handleCreate} className="flex-1 bg-orange-600 py-3 rounded-xl font-bold shadow-lg shadow-orange-600/20">CREATE MATCH</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTournaments;
