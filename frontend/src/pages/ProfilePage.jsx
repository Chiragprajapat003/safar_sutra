import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', language: 'English' });
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-10">
      <h1 className="text-3xl font-semibold text-[#191c1e] mb-8">Profile & Settings</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-7 border-b border-[#c3c6d7]/30 pb-2">
        {[{ key: 'profile', label: 'Profile' }, { key: 'account', label: 'Account' }, { key: 'privacy', label: 'Privacy' }].map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${activeTab === t.key ? 'text-[#0041a7] border-b-2 border-[#0041a7]' : 'text-[#424654] hover:text-[#191c1e]'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          {/* Avatar */}
          <div className="bg-white rounded-2xl p-6 shadow-ambient-md border border-[#c3c6d7]/20">
            <div className="flex items-center gap-5 mb-5">
              <div className="relative">
                <img src={user?.avatar} alt={user?.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-[#c3c6d7]/30" />
                <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#0057d9] text-white rounded-full flex items-center justify-center shadow-sm hover:bg-[#0041a7] transition-colors">
                  <span className="material-symbols-outlined text-sm">edit</span>
                </button>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#191c1e]">{user?.name}</h2>
                <p className="text-sm text-[#424654]">{user?.email}</p>
                <p className="text-xs text-[#737686] mt-1">Member since 2024</p>
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {[
                { key: 'name', label: 'Full Name', icon: 'person', type: 'text' },
                { key: 'email', label: 'Email', icon: 'mail', type: 'email' },
              ].map(({ key, label, icon, type }) => (
                <div key={key} className="space-y-1.5">
                  <label className="block text-sm font-medium text-[#191c1e]">{label}</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#737686] text-xl">{icon}</span>
                    <input
                      type={type}
                      value={form[key]}
                      onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-[#c3c6d7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0041a7]/20 focus:border-[#0041a7] transition-all"
                    />
                  </div>
                </div>
              ))}

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-[#191c1e]">Language</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#737686] text-xl">language</span>
                  <select value={form.language} onChange={e => setForm(p => ({ ...p, language: e.target.value }))} className="w-full pl-10 pr-4 py-3 bg-white border border-[#c3c6d7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0041a7]/20 focus:border-[#0041a7] transition-all appearance-none">
                    {['English', 'Hindi', 'Spanish', 'French', 'German', 'Japanese'].map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>
              </div>

              <button type="submit" className="bg-[#0057d9] text-white rounded-xl py-3 px-6 text-sm font-medium hover:bg-[#0041a7] transition-colors flex items-center gap-2">
                {saved ? <><span className="material-symbols-outlined text-lg">check</span>Saved!</> : <><span className="material-symbols-outlined text-lg">save</span>Save Changes</>}
              </button>
            </form>
          </div>

          {/* Travel Stats */}
          <div className="bg-white rounded-2xl p-6 shadow-ambient-md border border-[#c3c6d7]/20">
            <h3 className="text-lg font-semibold text-[#191c1e] mb-4">Travel Statistics</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Countries', value: user?.countriesVisited, icon: 'flag', color: '#0057d9' },
                { label: 'Trips', value: '3', icon: 'luggage', color: '#fe7944' },
                { label: 'Activities', value: '12', icon: 'attractions', color: '#624315' },
              ].map(({ label, value, icon, color }) => (
                <div key={label} className="text-center">
                  <div className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center mb-2" style={{ backgroundColor: `${color}15` }}>
                    <span className="material-symbols-outlined" style={{ color }}>{icon}</span>
                  </div>
                  <p className="text-2xl font-bold text-[#191c1e]">{value}</p>
                  <p className="text-xs text-[#424654]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Account Tab */}
      {activeTab === 'account' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-ambient-md border border-[#c3c6d7]/20 space-y-4">
            <h3 className="text-lg font-semibold text-[#191c1e]">Account Settings</h3>
            {['Email notifications', 'Trip reminders', 'Weekly digest', 'Marketing emails'].map(item => (
              <div key={item} className="flex items-center justify-between py-2 border-b border-[#c3c6d7]/20 last:border-0">
                <span className="text-sm text-[#191c1e]">{item}</span>
                <button className="w-12 h-6 bg-[#0057d9] rounded-full relative">
                  <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </button>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-ambient-md border border-[#c3c6d7]/20">
            <h3 className="text-lg font-semibold text-[#191c1e] mb-4">Danger Zone</h3>
            <div className="space-y-3">
              <button onClick={handleLogout} className="w-full border border-[#c3c6d7] rounded-xl py-3 text-sm font-medium text-[#424654] hover:bg-[#eceef0] flex items-center justify-center gap-2 transition-colors">
                <span className="material-symbols-outlined">logout</span>Log Out
              </button>
              <button className="w-full border border-[#ba1a1a]/30 rounded-xl py-3 text-sm font-medium text-[#ba1a1a] hover:bg-[#ffdad6] flex items-center justify-center gap-2 transition-colors">
                <span className="material-symbols-outlined">delete_forever</span>Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Tab */}
      {activeTab === 'privacy' && (
        <div className="bg-white rounded-2xl p-6 shadow-ambient-md border border-[#c3c6d7]/20 space-y-4">
          <h3 className="text-lg font-semibold text-[#191c1e]">Privacy Settings</h3>
          {[
            { label: 'Public profile', desc: 'Allow others to find your profile' },
            { label: 'Share itineraries by default', desc: 'New itineraries are public by default' },
            { label: 'Show location in profile', desc: 'Display your city/country' },
            { label: 'Allow data collection', desc: 'Help us improve GlobeTrotter' },
          ].map(({ label, desc }, i) => (
            <div key={label} className="flex items-start justify-between py-3 border-b border-[#c3c6d7]/20 last:border-0">
              <div>
                <p className="text-sm font-medium text-[#191c1e]">{label}</p>
                <p className="text-xs text-[#424654] mt-0.5">{desc}</p>
              </div>
              <button className={`w-12 h-6 rounded-full relative shrink-0 ml-4 ${i % 2 === 0 ? 'bg-[#0057d9]' : 'bg-[#c3c6d7]'}`}>
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${i % 2 === 0 ? 'right-1' : 'left-1'}`} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

