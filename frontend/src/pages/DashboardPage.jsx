import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTrips } from '../context/TripContext';
import { mockDestinations, mockBudgetOverview } from '../services/mockData';
import AITripGeneratorModal from '../components/AITripGeneratorModal';

export default function DashboardPage() {
  const { user } = useAuth();
  const { trips } = useTrips();
  const navigate = useNavigate();
  const [showAIGenerator, setShowAIGenerator] = useState(false);

  const upcomingTrips = trips.filter((t) => t.status === 'upcoming' || t.status === 'planning');

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-12 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* ── Left Sidebar (3 cols) ── */}
      <aside className="lg:col-span-4 flex flex-col gap-6">
        {/* Welcome & Quick Actions Card */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl shadow-warm-md border border-[#EADBCE]">
          <div className="flex items-center gap-3.5 mb-4">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={user?.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-[#D4A373]/60 shadow-sm"
            />
            <div>
              <h1 className="text-xl font-bold text-[#2A180C]">Namaste, {user?.name?.split(' ')[0] || 'Traveler'}!</h1>
              <p className="text-xs text-[#8A715F] font-medium">Ready for your next spiritual & global yatra?</p>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 pt-2">
            <Link
              to="/trips"
              className="w-full bg-[#4A2E18] hover:bg-[#341F0E] text-[#FFFDF9] rounded-2xl py-3 px-4 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-[#4A2E18]/20"
            >
              <span className="material-symbols-outlined text-lg text-[#E8C59A]">luggage</span>
              <span>View My Trips</span>
            </Link>

            <Link
              to="/explore"
              className="w-full bg-[#FAF7F2] hover:bg-[#F5ECE1] text-[#4A2E18] border border-[#D8C6B6] rounded-2xl py-3 px-4 text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg text-[#C88A4B]">travel_explore</span>
              <span>Explore Holy & Heritage Cities</span>
            </Link>

            <Link
              to="/budget"
              className="w-full bg-[#FAF7F2] hover:bg-[#F5ECE1] text-[#4A2E18] border border-[#D8C6B6] rounded-2xl py-3 px-4 text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg text-[#C88A4B]">payments</span>
              <span>Trip Budget & Cost Overview</span>
            </Link>
          </div>
        </div>

        {/* Travel & Pilgrimage Stats Card */}
        <div className="bg-white p-6 rounded-3xl shadow-warm-md border border-[#EADBCE]">
          <h3 className="text-xs font-bold text-[#8A715F] uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-base text-[#C88A4B]">explore</span>
            Traveler Statistics
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EADBCE]">
              <span className="text-3xl font-extrabold text-[#4A2E18]">{user?.countriesVisited || 14}</span>
              <p className="text-xs font-semibold text-[#8A715F] mt-1">Destinations</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EADBCE]">
              <span className="text-3xl font-extrabold text-[#C88A4B]">{trips.length}</span>
              <p className="text-xs font-semibold text-[#8A715F] mt-1">Trips Planned</p>
            </div>
          </div>
        </div>

        {/* Budget Highlights Box */}
        <div className="bg-white p-6 rounded-3xl shadow-warm-md border border-[#EADBCE]">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xs font-bold text-[#8A715F] uppercase tracking-wider">Budget Highlights</h3>
            <Link to="/budget" className="text-xs font-bold text-[#C88A4B] hover:underline">Details</Link>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-[#5A4536]">
              <span>Total Spent: ${mockBudgetOverview.totalSpent.toLocaleString()}</span>
              <span>Allocated: ${mockBudgetOverview.totalAllocated.toLocaleString()}</span>
            </div>
            <div className="w-full bg-[#FAF7F2] h-2.5 rounded-full overflow-hidden border border-[#EADBCE]">
              <div
                className="bg-[#4A2E18] h-full rounded-full"
                style={{ width: `${Math.round((mockBudgetOverview.totalSpent / mockBudgetOverview.totalAllocated) * 100)}%` }}
              />
            </div>
            <p className="text-[11px] text-[#8A715F] pt-1">Avg. Cost per day: <strong className="text-[#2A180C]">${mockBudgetOverview.avgCostPerDay}</strong></p>
          </div>
        </div>

        {/* AI Travel Inspiration Box */}
        <div className="bg-gradient-to-br from-[#4A2E18] to-[#2B180B] p-6 rounded-3xl text-white shadow-warm-lg relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <span className="material-symbols-outlined" style={{ fontSize: 110 }}>temple_hindu</span>
          </div>
          <div className="flex items-center gap-2 text-[#E8C59A] text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-base">auto_awesome</span>
            <span>AI Itinerary Generator</span>
          </div>
          <h4 className="text-base font-bold text-[#FFFDF9] mb-1.5">Personalized Divine Yatras</h4>
          <p className="text-xs text-[#EADBCE] mb-4">
            Let Safar-sutra AI craft the perfect day-by-day temple visits, Aarti timings, and travel routes.
          </p>
          <button
            onClick={() => setShowAIGenerator(true)}
            className="bg-[#D4A373] hover:bg-[#C88A4B] text-[#2A180C] font-bold text-xs px-4 py-2.5 rounded-xl w-full transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
            <span>Launch AI Itinerary Builder</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content Area (8 cols) ── */}
      <main className="lg:col-span-8 flex flex-col gap-10">
        {/* Upcoming Trips Section */}
        <section>
          <div className="flex justify-between items-end mb-5">
            <div>
              <h2 className="text-2xl font-bold text-[#2A180C]">Upcoming Yatras & Journeys</h2>
              <p className="text-xs text-[#8A715F] mt-0.5">Your scheduled travel itineraries</p>
            </div>
            <Link to="/trips" className="text-xs font-bold text-[#4A2E18] hover:text-[#C88A4B] flex items-center gap-1">
              <span>View all ({trips.length})</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingTrips.slice(0, 4).map((trip) => (
              <div
                key={trip.id}
                onClick={() => navigate(`/trips/${trip.id}`)}
                className="group relative rounded-3xl overflow-hidden shadow-warm-md border border-[#EADBCE] cursor-pointer h-[320px] transition-transform duration-500 hover:-translate-y-1"
              >
                <img
                  src={trip.coverImage}
                  alt={trip.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5 shadow">
                  <span className="w-2 h-2 rounded-full bg-[#D4A373] animate-pulse" />
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                    {trip.daysUntil ? `In ${trip.daysUntil} days` : trip.status}
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 p-6 w-full text-white">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs font-semibold text-[#EADBCE] mb-1.5 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-xs text-[#D4A373]">calendar_today</span>
                        <span>{trip.startDate} – {trip.endDate}</span>
                      </p>
                      <h3 className="text-xl font-bold text-[#FFFDF9] leading-tight">{trip.name}</h3>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#4A2E18] group-hover:text-[#E8C59A] transition-all">
                      <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4 space-y-1.5">
                    <div className="flex justify-between text-[11px] font-semibold text-[#EADBCE]">
                      <span>Planning Progress</span>
                      <span>{trip.progress}%</span>
                    </div>
                    <div className="w-full bg-white/25 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#D4A373] h-full rounded-full transition-all duration-500"
                        style={{ width: `${trip.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Destinations Section */}
        <section>
          <div className="flex justify-between items-end mb-5">
            <div>
              <h2 className="text-2xl font-bold text-[#2A180C]">Recommended Sacred & Heritage Destinations</h2>
              <p className="text-xs text-[#8A715F] mt-0.5">Top trending places to explore with Safar-sutra</p>
            </div>
            <Link to="/explore" className="text-xs font-bold text-[#4A2E18] hover:text-[#C88A4B] flex items-center gap-1">
              <span>Explore all</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockDestinations.slice(0, 3).map((dest) => (
              <div
                key={dest.id}
                onClick={() => navigate(`/explore?destination=${dest.id}`)}
                className="bg-white rounded-3xl p-4 shadow-warm-md border border-[#EADBCE] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
              >
                <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-3.5">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-md bg-[#4A2E18]/85 text-[#E8C59A] backdrop-blur-xs">
                    {dest.badge}
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-bold text-white">
                    {dest.priceLevel}
                  </div>
                </div>

                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-base font-bold text-[#2A180C]">{dest.name}</h3>
                    <p className="text-xs text-[#8A715F] font-medium">{dest.state}, {dest.country}</p>
                  </div>
                  <span className="text-[11px] font-bold text-[#C88A4B] bg-[#FAF7F2] border border-[#EADBCE] px-2 py-0.5 rounded-md">
                    {dest.category}
                  </span>
                </div>

                <p className="text-xs text-[#6B5646] line-clamp-2 mt-1 mb-3">{dest.description}</p>

                <div className="mt-auto pt-2 border-t border-[#EADBCE]/50 flex justify-between items-center text-[11px] text-[#8A715F]">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-[#C88A4B]">wb_sunny</span>
                    Best: {dest.bestTime}
                  </span>
                  <span className="font-semibold text-[#4A2E18]">View Details →</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* AI Trip Generator Modal */}
      {showAIGenerator && (
        <AITripGeneratorModal
          isOpen={showAIGenerator}
          onClose={() => setShowAIGenerator(false)}
        />
      )}
    </div>
  );
}
