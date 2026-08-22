import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { mockDestinations } from '../services/mockData';

export default function ProfilePage() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: user?.name || 'Alex Johnson',
    email: user?.email || 'alex.traveler@gmail.com',
    language: 'English / Hindi',
    bio: user?.bio || 'Cultural traveler and sacred pilgrimage explorer.',
  });
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const handleSave = (e) => {
    e.preventDefault();
    updateUser(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#2A180C] tracking-tight">Profile & Preferences</h1>
        <p className="text-sm text-[#6B5646] mt-1">Manage your personal traveler information, language, and privacy settings.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-8 border-b border-[#EADBCE] pb-3">
        {[
          { key: 'profile', label: 'User Profile & Bio' },
          { key: 'saved', label: 'Saved Destinations Wishlist' },
          { key: 'preferences', label: 'Preferences & Notifications' },
          { key: 'privacy', label: 'Privacy & Security' },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === t.key
                ? 'bg-[#4A2E18] text-[#FFFDF9] shadow-xs'
                : 'text-[#6B5646] hover:bg-[#FAF7F2]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab: Profile */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBCE] shadow-warm-md">
            <div className="flex items-center gap-5 mb-6 pb-6 border-b border-[#EADBCE]">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={user?.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-[#D4A373]/60 shadow-md"
              />
              <div>
                <h2 className="text-xl font-bold text-[#2A180C]">{user?.name}</h2>
                <p className="text-xs text-[#8A715F]">{user?.email}</p>
                <span className="inline-block mt-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FAF7F2] border border-[#EADBCE] text-[#C88A4B]">
                  Safar-sutra Explorer
                </span>
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#5A4536] mb-1">Full Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#D8C6B6] rounded-xl text-xs text-[#2A180C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#5A4536] mb-1">Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#D8C6B6] rounded-xl text-xs text-[#2A180C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5A4536] mb-1">Language Preference</label>
                <select
                  value={form.language}
                  onChange={(e) => setForm((p) => ({ ...p, language: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#D8C6B6] rounded-xl text-xs text-[#2A180C]"
                >
                  {['English / Hindi', 'Hindi (हिंदी)', 'English', 'Sanskrit (संस्कृतम्)', 'Tamil', 'Bengali'].map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5A4536] mb-1">Traveler Bio</label>
                <textarea
                  rows="3"
                  value={form.bio}
                  onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#D8C6B6] rounded-xl text-xs text-[#2A180C]"
                />
              </div>

              <button
                type="submit"
                className="bg-[#4A2E18] hover:bg-[#341F0E] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm text-[#E8C59A]">save</span>
                <span>{saved ? 'Changes Saved!' : 'Save Profile'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab: Saved Wishlist */}
      {activeTab === 'saved' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {mockDestinations.slice(0, 3).map((dest) => (
            <div key={dest.id} className="bg-white rounded-3xl p-4 border border-[#EADBCE] shadow-warm-md flex flex-col justify-between">
              <div>
                <img src={dest.image} alt={dest.name} className="w-full h-36 rounded-2xl object-cover mb-3" />
                <h3 className="text-sm font-bold text-[#2A180C]">{dest.name}</h3>
                <p className="text-xs text-[#8A715F]">{dest.state}, {dest.country}</p>
              </div>
              <button
                onClick={() => navigate('/explore')}
                className="mt-3 w-full bg-[#FAF7F2] hover:bg-[#F5ECE1] border border-[#D8C6B6] text-[#4A2E18] py-2 rounded-xl text-xs font-bold cursor-pointer"
              >
                Plan Itinerary Here
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Preferences */}
      {activeTab === 'preferences' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBCE] shadow-warm-md space-y-4">
          <h3 className="text-base font-bold text-[#2A180C] mb-4">Notification & Journey Preferences</h3>
          {[
            'Aarti & Temple Darshan reminders',
            'Trip budget alerts when over 80%',
            'Weekly pilgrimage & travel recommendations',
            'Weather and best-time advisories',
          ].map((item) => (
            <div key={item} className="flex justify-between items-center py-2.5 border-b border-[#EADBCE]/50 last:border-none">
              <span className="text-xs font-semibold text-[#5A4536]">{item}</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#4A2E18] cursor-pointer" />
            </div>
          ))}
        </div>
      )}

      {/* Tab: Privacy */}
      {activeTab === 'privacy' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBCE] shadow-warm-md space-y-5">
          <h3 className="text-base font-bold text-[#2A180C]">Privacy & Account Management</h3>
          <div className="p-4 bg-[#FFF5F2] border border-[#F4C2B8] rounded-2xl text-xs text-[#93000A] flex justify-between items-center">
            <div>
              <p className="font-bold">Delete Account</p>
              <p className="text-[11px] text-[#7A1F1D]">Permanently delete your account and all associated itineraries.</p>
            </div>
            <button className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold cursor-pointer">
              Delete
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 bg-[#FAF7F2] hover:bg-[#F5ECE1] border border-[#D8C6B6] text-[#4A2E18] rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              <span>Log out of Safar-sutra</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
