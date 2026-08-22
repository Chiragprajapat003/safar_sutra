import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { mockDestinations, mockActivities } from '../services/mockData';
import { useTrips } from '../context/TripContext';

const REGIONS = ['All', 'North India', 'North East India', 'Islands', 'International'];
const ACTIVITY_TYPES = ['All', 'Spiritual', 'Heritage', 'Nature', 'Adventure', 'Food & Dining', 'Culture'];

export default function ExplorePage() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const navigate = useNavigate();
  const { trips } = useTrips();

  const [activeTab, setActiveTab] = useState('cities'); // 'cities' | 'activities'
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCostIndex, setSelectedCostIndex] = useState('All');
  const [addedActivity, setAddedActivity] = useState(null);

  // Filter Cities
  const filteredCities = mockDestinations.filter((dest) => {
    const matchQuery =
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.state.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRegion = selectedRegion === 'All' || dest.region === selectedRegion;
    const matchCategory = selectedCategory === 'All' || dest.category === selectedCategory;
    const matchCost = selectedCostIndex === 'All' || dest.costIndex === selectedCostIndex;
    return matchQuery && matchRegion && matchCategory && matchCost;
  });

  // Filter Activities
  const filteredActivities = mockActivities.filter((act) => {
    const matchQuery =
      act.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = selectedCategory === 'All' || act.category === selectedCategory;
    return matchQuery && matchType;
  });

  const handleAddToTrip = (item, type = 'city') => {
    setAddedActivity(`Added ${item.name} to trip wishlist!`);
    setTimeout(() => setAddedActivity(null), 2500);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-12 py-8">
      {/* Toast alert when item is added */}
      {addedActivity && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#4A2E18] text-[#FFFDF9] px-5 py-3 rounded-2xl shadow-warm-lg flex items-center gap-2 text-xs font-semibold animate-slideUp">
          <span className="material-symbols-outlined text-[#E8C59A] text-base">check_circle</span>
          <span>{addedActivity}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#2A180C] tracking-tight">Explore & Discover</h1>
        <p className="text-sm text-[#6B5646] mt-1">
          Search holy cities, heritage wonders, and authentic travel activities across India and the world.
        </p>
      </div>

      {/* Main Mode Toggle: Cities vs Activities */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-white p-3 rounded-3xl border border-[#EADBCE] shadow-warm-xs">
        <div className="flex bg-[#FAF7F2] p-1.5 rounded-2xl border border-[#EADBCE]">
          <button
            onClick={() => setActiveTab('cities')}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'cities'
                ? 'bg-[#4A2E18] text-[#FFFDF9] shadow-sm'
                : 'text-[#6B5646] hover:text-[#4A2E18]'
            }`}
          >
            <span className="material-symbols-outlined text-base">location_city</span>
            <span>City & Destination Search</span>
          </button>
          <button
            onClick={() => setActiveTab('activities')}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'activities'
                ? 'bg-[#4A2E18] text-[#FFFDF9] shadow-sm'
                : 'text-[#6B5646] hover:text-[#4A2E18]'
            }`}
          >
            <span className="material-symbols-outlined text-base">attractions</span>
            <span>Activity & Experience Search</span>
          </button>
        </div>

        {/* Global Search Bar */}
        <div className="relative w-full sm:w-80">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A715F] text-lg">
            search
          </span>
          <input
            type="text"
            placeholder={activeTab === 'cities' ? 'Search cities, state, region...' : 'Search Aarti, safaris, tours...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] border border-[#D8C6B6] rounded-2xl text-xs text-[#2A180C] placeholder:text-[#9E8777] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4A2E18]/15 focus:border-[#4A2E18] transition-all"
          />
        </div>
      </div>

      {/* ── CITY SEARCH TAB ── */}
      {activeTab === 'cities' && (
        <div>
          {/* Filters Bar */}
          <div className="flex flex-wrap gap-2.5 mb-6">
            <span className="text-xs font-bold text-[#8A715F] flex items-center gap-1 mr-2">
              <span className="material-symbols-outlined text-sm">filter_list</span> Region:
            </span>
            {REGIONS.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedRegion === region
                    ? 'bg-[#4A2E18] text-[#FFFDF9] shadow-xs'
                    : 'bg-white text-[#6B5646] border border-[#EADBCE] hover:border-[#4A2E18]'
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* City Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCities.map((dest) => (
              <div
                key={dest.id}
                className="bg-white rounded-3xl p-4 border border-[#EADBCE] shadow-warm-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-3.5">
                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#4A2E18]/85 text-[#E8C59A] backdrop-blur-xs">
                      {dest.badge}
                    </span>
                    <span className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-bold text-white">
                      Popularity: {dest.popularity}%
                    </span>
                  </div>

                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-base font-bold text-[#2A180C]">{dest.name}</h3>
                      <p className="text-xs text-[#8A715F] font-medium">{dest.state}, {dest.country}</p>
                    </div>
                    <span className="text-[10px] font-bold text-[#4A2E18] bg-[#FAF7F2] border border-[#EADBCE] px-2 py-0.5 rounded-md">
                      {dest.costIndex}
                    </span>
                  </div>

                  <p className="text-xs text-[#6B5646] line-clamp-2 my-2">{dest.description}</p>
                </div>

                <div className="pt-3 border-t border-[#EADBCE]/60 flex items-center justify-between gap-2 mt-2">
                  <div className="text-[11px] text-[#8A715F]">
                    <span className="font-semibold text-[#4A2E18]">Best: {dest.bestTime}</span>
                  </div>
                  <button
                    onClick={() => handleAddToTrip(dest, 'city')}
                    className="bg-[#4A2E18] hover:bg-[#341F0E] text-[#FFFDF9] px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm text-[#E8C59A]">add</span>
                    <span>Add to Trip</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── ACTIVITY SEARCH TAB ── */}
      {activeTab === 'activities' && (
        <div>
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2.5 mb-6">
            <span className="text-xs font-bold text-[#8A715F] flex items-center gap-1 mr-2">
              <span className="material-symbols-outlined text-sm">category</span> Category:
            </span>
            {ACTIVITY_TYPES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#4A2E18] text-[#FFFDF9] shadow-xs'
                    : 'bg-white text-[#6B5646] border border-[#EADBCE] hover:border-[#4A2E18]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Activity Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map((act) => (
              <div
                key={act.id}
                className="bg-white rounded-3xl p-5 border border-[#EADBCE] shadow-warm-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="flex gap-4 items-start mb-3">
                  <img
                    src={act.image}
                    alt={act.name}
                    className="w-20 h-20 rounded-2xl object-cover border border-[#EADBCE] shrink-0"
                  />
                  <div className="flex-1">
                    <span className="inline-block px-2 py-0.5 bg-[#FAF7F2] border border-[#EADBCE] text-[#C88A4B] text-[10px] font-bold rounded-md mb-1">
                      {act.category}
                    </span>
                    <h3 className="text-sm font-bold text-[#2A180C] leading-snug">{act.name}</h3>
                    <p className="text-xs text-[#8A715F] flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-xs">location_on</span>
                      <span>{act.city}</span>
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#6B5646] line-clamp-2 mb-4">{act.description}</p>

                <div className="pt-3 border-t border-[#EADBCE]/60 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs font-semibold text-[#5A4536]">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-[#C88A4B]">schedule</span>
                      {act.duration} min
                    </span>
                    <span className="text-[#4A2E18] font-bold">
                      {act.cost === 0 ? 'Free' : `$${act.cost}`}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddToTrip(act, 'activity')}
                    className="bg-[#4A2E18] hover:bg-[#341F0E] text-[#FFFDF9] px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm text-[#E8C59A]">add_task</span>
                    <span>Add to Itinerary</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
