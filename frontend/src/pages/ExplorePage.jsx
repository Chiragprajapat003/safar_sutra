import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockDestinations } from '../services/mockData';
import { mockActivities } from '../services/mockData';

const REGIONS = ['All', 'Europe', 'Asia', 'Southeast Asia', 'Africa', 'North America'];
const PRICE_LEVELS = ['All', '$', '$$', '$$$', '$$$$'];
const CATEGORIES = ['All', 'Beach', 'Adventure', 'Culture', 'City'];

export default function ExplorePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('All');
  const [price, setPrice] = useState('All');
  const [category, setCategory] = useState('All');
  const [tab, setTab] = useState('destinations'); // 'destinations' | 'activities'

  const filteredDests = mockDestinations.filter(d => {
    if (search && !d.name.toLowerCase().includes(search.toLowerCase()) && !d.country.toLowerCase().includes(search.toLowerCase())) return false;
    if (region !== 'All' && d.region !== region) return false;
    if (price !== 'All' && d.priceLevel !== price) return false;
    if (category !== 'All' && d.category !== category) return false;
    return true;
  });

  const filteredActs = mockActivities.filter(a => {
    if (search && !a.name.toLowerCase().includes(search.toLowerCase()) && !a.category.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-16 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[#191c1e] mb-1">Explore</h1>
        <p className="text-base text-[#424654]">Discover your next destination or activity.</p>
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#737686] text-xl">search</span>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search destinations, countries, activities..."
          className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#c3c6d7] rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-[#0041a7]/20 focus:border-[#0041a7] transition-all shadow-ambient-low"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[{ key: 'destinations', label: 'Destinations', icon: 'location_on' }, { key: 'activities', label: 'Activities', icon: 'attractions' }].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${tab === t.key ? 'bg-[#0057d9] text-white' : 'bg-white text-[#424654] border border-[#c3c6d7]/50 hover:bg-[#eceef0]'}`}>
            <span className="material-symbols-outlined text-base">{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      {/* Destination Filters */}
      {tab === 'destinations' && (
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-2 bg-white border border-[#c3c6d7]/50 rounded-xl px-3 py-2">
            <span className="text-xs font-medium text-[#424654]">Region:</span>
            <select value={region} onChange={e => setRegion(e.target.value)} className="text-xs font-medium text-[#191c1e] bg-transparent focus:outline-none cursor-pointer">
              {REGIONS.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2 bg-white border border-[#c3c6d7]/50 rounded-xl px-3 py-2">
            <span className="text-xs font-medium text-[#424654]">Price:</span>
            <select value={price} onChange={e => setPrice(e.target.value)} className="text-xs font-medium text-[#191c1e] bg-transparent focus:outline-none cursor-pointer">
              {PRICE_LEVELS.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2 bg-white border border-[#c3c6d7]/50 rounded-xl px-3 py-2">
            <span className="text-xs font-medium text-[#424654]">Category:</span>
            <select value={category} onChange={e => setCategory(e.target.value)} className="text-xs font-medium text-[#191c1e] bg-transparent focus:outline-none cursor-pointer">
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
      )}

      {/* Results count */}
      <p className="text-sm text-[#424654] mb-5">
        {tab === 'destinations' ? `${filteredDests.length} destinations found` : `${filteredActs.length} activities found`}
      </p>

      {/* Destination Grid */}
      {tab === 'destinations' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDests.map(dest => (
            <div key={dest.id} className="bg-white rounded-2xl overflow-hidden shadow-ambient-md border border-[#c3c6d7]/20 group hover:-translate-y-1 transition-transform duration-300 cursor-pointer flex flex-col">
              <div className="relative h-52">
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                {dest.badge && (
                  <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-semibold shadow-sm ${dest.badgeVariant === 'secondary' ? 'bg-[#fe7944]/90 text-white' : 'bg-white/90 text-[#191c1e]'}`}>
                    {dest.badge}
                  </div>
                )}
                <div className="absolute bottom-3 right-3 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-white border border-white/30">
                  {dest.priceLevel}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-[#191c1e] mb-1">{dest.name}</h3>
                <div className="flex items-center gap-3 text-xs text-[#424654] mb-1">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">flag</span>{dest.country}</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">public</span>{dest.region}</span>
                </div>
                <p className="text-xs text-[#424654] flex items-center gap-1 mb-4">
                  <span className="material-symbols-outlined text-sm">wb_sunny</span>Best: {dest.bestTime}
                </p>
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => navigate('/trips')}
                    className="flex-1 bg-[#0057d9] text-white rounded-xl py-2 text-xs font-medium hover:bg-[#0041a7] transition-colors flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>Add to Trip
                  </button>
                  <button className="px-3 py-2 bg-[#eceef0] text-[#424654] rounded-xl text-xs font-medium hover:bg-[#e1e2e5] transition-colors">
                    <span className="material-symbols-outlined text-sm">bookmark_border</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredDests.length === 0 && (
            <div className="col-span-full text-center py-16 text-[#424654]">
              <span className="material-symbols-outlined text-5xl block mb-3">search_off</span>
              No destinations match your filters.
            </div>
          )}
        </div>
      )}

      {/* Activities Grid */}
      {tab === 'activities' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredActs.map(act => (
            <div key={act.id} className="bg-white rounded-2xl overflow-hidden shadow-ambient-md border border-[#c3c6d7]/20 group hover:-translate-y-1 transition-transform duration-300 cursor-pointer flex flex-col">
              <div className="h-36 overflow-hidden">
                <img src={act.image} alt={act.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="text-xs font-semibold text-[#fe7944] capitalize mb-1">{act.category}</span>
                <h3 className="text-sm font-semibold text-[#191c1e] mb-1">{act.name}</h3>
                <p className="text-xs text-[#424654] line-clamp-2 mb-3">{act.description}</p>
                <div className="flex justify-between items-center mt-auto">
                  <div className="text-xs text-[#424654]">
                    <span className="font-semibold text-[#191c1e]">${act.cost}</span> · {act.duration}min
                  </div>
                  <button onClick={() => navigate('/trips')} className="bg-[#0057d9] text-white rounded-lg px-3 py-1.5 text-xs font-medium hover:bg-[#0041a7] transition-colors">
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

