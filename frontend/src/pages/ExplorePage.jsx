import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { mockDestinations, mockActivities } from '../services/mockData';
import { useTrips } from '../context/TripContext';

const REGIONS = ['All', 'North India', 'North East India', 'Islands', 'International'];
const ACTIVITY_TYPES = ['All', 'Spiritual', 'Heritage', 'Nature', 'Adventure', 'Food & Dining', 'Culture'];

// Haversine formula to compute accurate distance in km
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export default function ExplorePage() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const navigate = useNavigate();
  const { trips } = useTrips();

  const [activeTab, setActiveTab] = useState('cities'); // 'cities' | 'activities' | 'map'
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCostIndex, setSelectedCostIndex] = useState('All');
  const [addedActivity, setAddedActivity] = useState(null);

  // User Geolocation State
  const [userCoords, setUserCoords] = useState(null);
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState(null);
  const [selectedMapDest, setSelectedMapDest] = useState(mockDestinations[0]);

  // Detect user's current location via browser GPS
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setLocError('Geolocation is not supported by your browser.');
      return;
    }
    setLocating(true);
    setLocError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLocating(false);
      },
      (err) => {
        // Fallback demo coordinates: New Delhi, India
        setUserCoords({ lat: 28.6139, lng: 77.2090, isFallback: true });
        setLocError('Location access blocked or timeout. Using New Delhi as reference.');
        setLocating(false);
      },
      { timeout: 8000 }
    );
  };

  useEffect(() => {
    // Auto-detect on mount
    handleDetectLocation();
  }, []);

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

  const getDistanceDisplay = (dest) => {
    if (!userCoords || !dest.lat || !dest.lng) return null;
    const km = calculateDistanceKm(userCoords.lat, userCoords.lng, dest.lat, dest.lng);
    const miles = Math.round(km * 0.621371);
    return { km, miles };
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-12 py-8 select-none">
      {/* Toast alert when item is added */}
      {addedActivity && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#4A2E18] text-[#FFFDF9] px-5 py-3 rounded-2xl shadow-warm-lg flex items-center gap-2 text-xs font-semibold animate-slideUp">
          <span className="material-symbols-outlined text-[#E8C59A] text-base">check_circle</span>
          <span>{addedActivity}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#2A180C] tracking-tight">Explore Destinations & Activities</h1>
          <p className="text-sm text-[#6B5646] mt-1">
            Discover sacred pilgrimage cities, calculate distances from your location, and find curated experiences.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-white p-1 rounded-2xl border border-[#EADBCE] shadow-xs">
          <button
            onClick={() => setActiveTab('cities')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'cities'
                ? 'bg-[#4A2E18] text-[#FFFDF9] shadow-xs'
                : 'text-[#6B5646] hover:text-[#4A2E18]'
            }`}
          >
            <span className="material-symbols-outlined text-base">location_city</span>
            <span>City Search</span>
          </button>
          <button
            onClick={() => setActiveTab('activities')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'activities'
                ? 'bg-[#4A2E18] text-[#FFFDF9] shadow-xs'
                : 'text-[#6B5646] hover:text-[#4A2E18]'
            }`}
          >
            <span className="material-symbols-outlined text-base">local_activity</span>
            <span>Activities</span>
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'map'
                ? 'bg-[#4A2E18] text-[#FFFDF9] shadow-xs'
                : 'text-[#6B5646] hover:text-[#4A2E18]'
            }`}
          >
            <span className="material-symbols-outlined text-base">map</span>
            <span>Live Map & Distance</span>
          </button>
        </div>
      </div>

      {/* ── User GPS Location Bar ── */}
      <div className="mb-6 bg-white p-4 rounded-3xl border border-[#EADBCE] shadow-warm-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FAF7F2] border border-[#D8C6B6] flex items-center justify-center text-[#4A2E18]">
            <span className="material-symbols-outlined text-2xl text-[#C88A4B]">my_location</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#2A180C]">Your Location:</span>
              <span className="text-xs font-semibold text-[#5A4536]">
                {userCoords
                  ? userCoords.isFallback
                    ? 'New Delhi (Default Reference)'
                    : `Detected (${userCoords.lat.toFixed(2)}° N, ${userCoords.lng.toFixed(2)}° E)`
                  : 'Detecting GPS...'}
              </span>
            </div>
            {locError && <p className="text-[10px] text-[#8A715F]">{locError}</p>}
          </div>
        </div>

        <button
          onClick={handleDetectLocation}
          disabled={locating}
          className="bg-[#FAF7F2] hover:bg-[#F5ECE1] text-[#4A2E18] border border-[#D8C6B6] px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
        >
          <span className={`material-symbols-outlined text-sm text-[#C88A4B] ${locating ? 'animate-spin' : ''}`}>
            {locating ? 'progress_activity' : 'refresh'}
          </span>
          <span>{locating ? 'Locating...' : 'Refresh My Location'}</span>
        </button>
      </div>

      {/* ── Search & Filter Controls (For Cities & Activities) ── */}
      {activeTab !== 'map' && (
        <div className="bg-white rounded-3xl p-5 border border-[#EADBCE] shadow-warm-md mb-8 space-y-4">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#8A715F] text-lg">
              search
            </span>
            <input
              type="text"
              placeholder={activeTab === 'cities' ? 'Search cities, states, temples...' : 'Search Aarti, safaris, boat rides, sightseeing...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#FAF7F2] border border-[#D8C6B6] rounded-2xl text-xs text-[#2A180C] placeholder:text-[#9E8777] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4A2E18]/15"
            />
          </div>

          <div className="flex flex-wrap gap-2 pt-1 border-t border-[#EADBCE]/60">
            <span className="text-xs font-bold text-[#8A715F] self-center mr-2">Filter By:</span>
            {activeTab === 'cities'
              ? REGIONS.map((r) => (
                  <button
                    key={r}
                    onClick={() => setSelectedRegion(r)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      selectedRegion === r
                        ? 'bg-[#4A2E18] text-[#FFFDF9]'
                        : 'bg-[#FAF7F2] text-[#6B5646] border border-[#EADBCE] hover:border-[#4A2E18]'
                    }`}
                  >
                    {r}
                  </button>
                ))
              : ACTIVITY_TYPES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCategory(c)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      selectedCategory === c
                        ? 'bg-[#4A2E18] text-[#FFFDF9]'
                        : 'bg-[#FAF7F2] text-[#6B5646] border border-[#EADBCE] hover:border-[#4A2E18]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
          </div>
        </div>
      )}

      {/* ── TAB 1: CITIES WITH LIVE DISTANCE BADGES ── */}
      {activeTab === 'cities' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCities.map((dest) => {
            const dist = getDistanceDisplay(dest);
            return (
              <div
                key={dest.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#EADBCE] shadow-warm-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    
                    {/* Badge */}
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D4A373] text-[#2A180C] shadow-sm">
                      {dest.badge}
                    </span>

                    {/* Live Distance Pill */}
                    {dist && (
                      <span className="absolute bottom-3 left-3 bg-black/65 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs text-[#E8C59A]">near_me</span>
                        <span>{dist.km.toLocaleString()} km away ({dist.miles.toLocaleString()} mi)</span>
                      </span>
                    )}

                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/50 text-white text-[10px] font-bold">
                      {dest.costIndex}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="text-lg font-bold text-[#2A180C]">{dest.name}</h3>
                        <p className="text-xs text-[#8A715F]">{dest.state}, {dest.country}</p>
                      </div>
                      <span className="text-xs font-bold text-[#C88A4B] bg-[#FAF7F2] border border-[#EADBCE] px-2 py-0.5 rounded-lg">
                        Best: {dest.bestTime}
                      </span>
                    </div>

                    <p className="text-xs text-[#6B5646] line-clamp-2 mt-2 leading-relaxed">{dest.description}</p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-[#EADBCE]/60 flex items-center justify-between gap-2 mt-2">
                  <button
                    onClick={() => {
                      setSelectedMapDest(dest);
                      setActiveTab('map');
                    }}
                    className="bg-[#FAF7F2] hover:bg-[#F5ECE1] border border-[#D8C6B6] text-[#4A2E18] px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm text-[#C88A4B]">map</span>
                    <span>View Map</span>
                  </button>

                  <button
                    onClick={() => handleAddToTrip(dest, 'city')}
                    className="bg-[#4A2E18] hover:bg-[#341F0E] text-[#FFFDF9] px-4 py-2 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm text-[#E8C59A]">bookmark_add</span>
                    <span>Add to Trip</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── TAB 2: ACTIVITIES SEARCH ── */}
      {activeTab === 'activities' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((act) => (
            <div
              key={act.id}
              className="bg-white rounded-3xl p-5 border border-[#EADBCE] shadow-warm-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-[#FAF7F2] border border-[#EADBCE] text-[#C88A4B]">
                    {act.category}
                  </span>
                  <span className="text-xs font-bold text-[#4A2E18]">
                    {act.cost > 0 ? `$${act.cost}` : 'Free'}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#2A180C] mb-1">{act.name}</h3>
                <p className="text-xs text-[#8A715F] mb-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-[#C88A4B]">location_on</span>
                  {act.city} • {act.duration}
                </p>
                <p className="text-xs text-[#6B5646] line-clamp-3 leading-relaxed">{act.description}</p>
              </div>

              <div className="pt-4 mt-3 border-t border-[#EADBCE]/60 flex justify-end">
                <button
                  onClick={() => handleAddToTrip(act, 'activity')}
                  className="bg-[#4A2E18] hover:bg-[#341F0E] text-[#FFFDF9] px-4 py-2 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm text-[#E8C59A]">add_circle</span>
                  <span>Add to Itinerary</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── TAB 3: LIVE GOOGLE MAP & DISTANCE CALCULATOR ── */}
      {activeTab === 'map' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Destination Selector Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-[#EADBCE] shadow-warm-md">
              <h2 className="text-sm font-bold text-[#2A180C] uppercase tracking-wider mb-3">
                Select Destination
              </h2>
              <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                {mockDestinations.map((dest) => {
                  const dist = getDistanceDisplay(dest);
                  const isSelected = selectedMapDest.id === dest.id;
                  return (
                    <div
                      key={dest.id}
                      onClick={() => setSelectedMapDest(dest)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#4A2E18] text-[#FFFDF9] border-[#4A2E18] shadow-sm'
                          : 'bg-[#FAF7F2] text-[#2A180C] border-[#EADBCE] hover:border-[#4A2E18]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={dest.image}
                          alt={dest.name}
                          className="w-12 h-12 rounded-xl object-cover border border-[#EADBCE]"
                        />
                        <div>
                          <p className="text-xs font-bold">{dest.name}</p>
                          <p className={`text-[11px] ${isSelected ? 'text-[#EADBCE]' : 'text-[#8A715F]'}`}>
                            {dest.state}
                          </p>
                        </div>
                      </div>

                      {dist && (
                        <div className="text-right">
                          <span className={`text-xs font-extrabold block ${isSelected ? 'text-[#E8C59A]' : 'text-[#C88A4B]'}`}>
                            {dist.km.toLocaleString()} km
                          </span>
                          <span className={`text-[9px] ${isSelected ? 'text-[#EADBCE]' : 'text-[#8A715F]'}`}>
                            {dist.miles.toLocaleString()} mi
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Interactive Google Map & Route Details (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBCE] shadow-warm-md">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 mb-4 border-b border-[#EADBCE]">
                <div>
                  <span className="text-[10px] font-bold text-[#C88A4B] uppercase tracking-wider">
                    Google Maps Satellite & Terrain View
                  </span>
                  <h2 className="text-2xl font-extrabold text-[#2A180C]">
                    {selectedMapDest.name}, {selectedMapDest.state}
                  </h2>
                </div>

                {/* Google Maps Route Action */}
                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin=${userCoords?.lat || 28.6139},${userCoords?.lng || 77.2090}&destination=${selectedMapDest.lat},${selectedMapDest.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#4A2E18] hover:bg-[#341F0E] text-[#FFFDF9] px-5 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-[#4A2E18]/20 flex items-center gap-2 cursor-pointer transition-all active:scale-95 whitespace-nowrap"
                >
                  <span className="material-symbols-outlined text-base text-[#E8C59A]">directions</span>
                  <span>Get Live Directions in Google Maps</span>
                </a>
              </div>

              {/* Travel Time Estimates Breakdown */}
              {(() => {
                const dist = getDistanceDisplay(selectedMapDest);
                if (!dist) return null;
                const roadHours = Math.round(dist.km / 65);
                const trainHours = Math.round(dist.km / 85);
                const flightHours = (dist.km / 600 + 1.5).toFixed(1);
                return (
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#EADBCE] text-center">
                      <span className="material-symbols-outlined text-[#4A2E18] text-xl">directions_car</span>
                      <p className="text-xs font-bold text-[#2A180C] mt-0.5">~{roadHours} Hours</p>
                      <p className="text-[10px] text-[#8A715F]">Road / Cab</p>
                    </div>
                    <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#EADBCE] text-center">
                      <span className="material-symbols-outlined text-[#4A2E18] text-xl">train</span>
                      <p className="text-xs font-bold text-[#2A180C] mt-0.5">~{trainHours} Hours</p>
                      <p className="text-[10px] text-[#8A715F]">Express Train</p>
                    </div>
                    <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#EADBCE] text-center">
                      <span className="material-symbols-outlined text-[#4A2E18] text-xl">flight</span>
                      <p className="text-xs font-bold text-[#2A180C] mt-0.5">~{flightHours} Hours</p>
                      <p className="text-[10px] text-[#8A715F]">Flight Transfer</p>
                    </div>
                  </div>
                );
              })()}

              {/* Embedded Google Map Iframe */}
              <div className="relative h-[380px] rounded-2xl overflow-hidden border border-[#EADBCE] shadow-inner">
                <iframe
                  title={`Google Map for ${selectedMapDest.name}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://maps.google.com/maps?q=${selectedMapDest.lat},${selectedMapDest.lng}&hl=en&z=11&output=embed`}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
