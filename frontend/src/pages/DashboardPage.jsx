import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTrips } from '../context/TripContext';
import { mockDestinations } from '../services/mockData';

export default function DashboardPage() {
  const { user } = useAuth();
  const { trips } = useTrips();
  const navigate = useNavigate();

  const upcomingTrips = trips.filter(t => t.status === 'upcoming' || t.status === 'planning');

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-16 py-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* ── Left Sidebar ── */}
      <aside className="hidden lg:flex flex-col col-span-3 gap-5">
        {/* Welcome Widget */}
        <div className="bg-white p-6 rounded-2xl shadow-ambient-md border border-[#c3c6d7]/20">
          <h1 className="text-2xl font-semibold text-[#191c1e] mb-1">Welcome back, {user?.name?.split(' ')[0]}!</h1>
          <p className="text-base text-[#424654] mb-6">Where to next?</p>
          <div className="flex flex-col gap-3">
            <Link to="/trips/new" className="w-full bg-[#0057d9] text-white rounded-xl py-3 px-4 text-sm font-medium hover:bg-[#0041a7] transition-colors flex items-center justify-center gap-2 shadow-ambient-low">
              <span className="material-symbols-outlined text-xl">flight_takeoff</span>Plan New Trip
            </Link>
            <Link to="/explore" className="w-full bg-[#eceef0] text-[#191c1e] rounded-xl py-3 px-4 text-sm font-medium hover:bg-[#e1e2e5] transition-colors flex items-center justify-center gap-2 border border-[#c3c6d7]/50">
              <span className="material-symbols-outlined text-xl">explore</span>Explore Destinations
            </Link>
            <Link to="/budget" className="w-full bg-[#eceef0] text-[#191c1e] rounded-xl py-3 px-4 text-sm font-medium hover:bg-[#e1e2e5] transition-colors flex items-center justify-center gap-2 border border-[#c3c6d7]/50">
              <span className="material-symbols-outlined text-xl">account_balance_wallet</span>Check Budget
            </Link>
          </div>
        </div>

        {/* Travel Stats */}
        <div className="bg-white p-6 rounded-2xl shadow-ambient-md border border-[#c3c6d7]/20">
          <h3 className="text-xs font-semibold text-[#424654] uppercase tracking-wider mb-4">Travel Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-4xl font-semibold text-[#0041a7]">{user?.countriesVisited}</span>
              <p className="text-xs font-semibold text-[#424654] mt-1">Countries</p>
            </div>
            <div>
              <span className="text-4xl font-semibold text-[#fe7944]">{trips.length}</span>
              <p className="text-xs font-semibold text-[#424654] mt-1">Trips Planned</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-gradient-to-br from-[#0041a7]/10 to-[#dae2ff] p-5 rounded-2xl relative overflow-hidden">
          <div className="absolute -right-3 -bottom-3 opacity-10">
            <span className="material-symbols-outlined" style={{ fontSize: 80 }}>auto_awesome</span>
          </div>
          <h4 className="text-sm font-bold text-[#001848] flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">auto_awesome</span>Need inspiration?
          </h4>
          <p className="text-xs text-[#424654] mt-1 mb-3">Let AI suggest the perfect itinerary based on your preferences.</p>
          <button className="bg-[#0057d9] text-white text-xs font-medium px-4 py-2 rounded-full w-full hover:bg-[#0041a7] transition-colors">Generate Ideas</button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="col-span-1 lg:col-span-9 flex flex-col gap-10">
        {/* Mobile Welcome */}
        <div className="lg:hidden">
          <h1 className="text-3xl font-semibold text-[#191c1e]">Welcome back, {user?.name?.split(' ')[0]}!</h1>
          <p className="text-lg text-[#424654] mt-1">Where to next?</p>
        </div>

        {/* Upcoming Trips */}
        <section>
          <div className="flex justify-between items-end mb-5">
            <h2 className="text-2xl font-semibold text-[#191c1e]">Upcoming Trips</h2>
            <Link to="/trips" className="text-sm font-medium text-[#0041a7] hover:underline">View all</Link>
          </div>
          {upcomingTrips.length === 0 ? (
            <div className="bg-white rounded-2xl border-2 border-dashed border-[#c3c6d7]/50 p-12 text-center">
              <span className="material-symbols-outlined text-5xl text-[#737686] mb-3 block">flight_takeoff</span>
              <p className="text-[#191c1e] font-semibold text-lg mb-1">No trips planned yet</p>
              <p className="text-[#424654] text-sm mb-4">Start planning your first adventure!</p>
              <Link to="/trips/new" className="inline-flex items-center gap-2 bg-[#0057d9] text-white rounded-full px-5 py-2.5 text-sm font-medium hover:bg-[#0041a7] transition-colors">
                <span className="material-symbols-outlined text-lg">add</span>Plan New Trip
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {upcomingTrips.slice(0, 4).map(trip => (
                <TripHeroCard key={trip.id} trip={trip} onClick={() => navigate(`/trips/${trip.id}`)} />
              ))}
            </div>
          )}
        </section>

        {/* Recommended */}
        <section>
          <h2 className="text-2xl font-semibold text-[#191c1e] mb-5">Recommended for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {mockDestinations.slice(0, 3).map(dest => (
              <DestinationCard key={dest.id} dest={dest} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function TripHeroCard({ trip, onClick }) {
  return (
    <div
      className="group relative rounded-2xl overflow-hidden shadow-ambient-md cursor-pointer h-[300px]"
      onClick={onClick}
    >
      <img
        src={trip.coverImage}
        alt={trip.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Status Badge */}
      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs font-semibold text-white">
          {trip.daysUntil ? `In ${trip.daysUntil} days` : trip.status}
        </span>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 p-5 w-full">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs font-semibold text-white/80 mb-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">calendar_today</span>
              {trip.startDate} – {trip.endDate}
            </p>
            <h3 className="text-2xl font-semibold text-white">{trip.name}</h3>
          </div>
          <button className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors">
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>

        {/* Progress */}
        <div className="mt-4 space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-white">
            <span>Planning Progress</span>
            <span>{trip.progress}%</span>
          </div>
          <div className="w-full bg-white/30 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#b2c5ff] h-full rounded-full transition-all" style={{ width: `${trip.progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function DestinationCard({ dest }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-ambient-md border border-[#c3c6d7]/20 hover:-translate-y-1 transition-transform duration-300 cursor-pointer">
      <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4">
        <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
        {dest.badge && (
          <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-semibold shadow-sm ${
            dest.badgeVariant === 'secondary' ? 'bg-[#fe7944]/90 text-white' : 'bg-white/90 text-[#191c1e]'
          }`}>
            {dest.badge}
          </div>
        )}
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-[#191c1e]">{dest.name}</h3>
          <p className="text-sm text-[#424654] flex items-center gap-1 mt-1">
            <span className="material-symbols-outlined text-sm">wb_sunny</span>Best: {dest.bestTime}
          </p>
        </div>
        <div className="bg-[#ffdbcf]/50 text-[#661f00] px-2 py-1 rounded-lg text-xs font-semibold">{dest.priceLevel}</div>
      </div>
    </div>
  );
}

