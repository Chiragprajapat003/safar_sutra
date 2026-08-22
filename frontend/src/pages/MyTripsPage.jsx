import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrips } from '../context/TripContext';

const STATUS_COLORS = {
  upcoming: 'bg-green-100 text-green-700',
  planning: 'bg-blue-100 text-blue-700',
  idea: 'bg-yellow-100 text-yellow-700',
  past: 'bg-[#eceef0] text-[#424654]',
};

export default function MyTripsPage() {
  const { trips, deleteTrip } = useTrips();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = filter === 'all' ? trips : trips.filter(t => t.status === filter);

  const handleDelete = (id) => {
    deleteTrip(id);
    setConfirmDelete(null);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-16 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-[#191c1e]">My Trips</h1>
          <p className="text-base text-[#424654] mt-1">{trips.length} trips planned</p>
        </div>
        <button
          onClick={() => navigate('/trips/new')}
          className="bg-[#0057d9] text-white rounded-full px-5 py-2.5 text-sm font-medium hover:bg-[#0041a7] transition-colors flex items-center gap-2 self-start shadow-ambient-low"
        >
          <span className="material-symbols-outlined text-lg">add</span>Plan New Trip
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-7 flex-wrap">
        {['all', 'upcoming', 'planning', 'idea', 'past'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
              filter === f ? 'bg-[#0057d9] text-white' : 'bg-white text-[#424654] border border-[#c3c6d7]/50 hover:bg-[#eceef0]'
            }`}
          >
            {f === 'all' ? 'All Trips' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border-2 border-dashed border-[#c3c6d7]/50 p-16 text-center">
          <span className="material-symbols-outlined text-5xl text-[#737686] mb-3 block">luggage</span>
          <p className="font-semibold text-[#191c1e] text-lg mb-1">No {filter !== 'all' ? filter : ''} trips yet</p>
          <p className="text-[#424654] text-sm">Start planning your next adventure!</p>
        </div>
      )}

      {/* Trip Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(trip => (
          <div key={trip.id} className="bg-white rounded-2xl overflow-hidden shadow-ambient-md border border-[#c3c6d7]/20 group flex flex-col">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img src={trip.coverImage} alt={trip.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${STATUS_COLORS[trip.status] || STATUS_COLORS.idea}`}>
                {trip.status}
              </span>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-lg font-semibold text-[#191c1e] mb-1">{trip.name}</h3>
              <div className="flex items-center gap-1 text-sm text-[#424654] mb-1">
                <span className="material-symbols-outlined text-sm">calendar_today</span>
                {trip.startDate} – {trip.endDate}
              </div>
              <div className="flex items-center gap-4 text-xs text-[#424654] mb-4">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  {trip.stops?.length || 0} destinations
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">account_balance_wallet</span>
                  ${trip.budget?.toLocaleString()}
                </span>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-[#424654] mb-1">
                  <span>Planning Progress</span><span className="font-semibold">{trip.progress}%</span>
                </div>
                <div className="w-full bg-[#eceef0] h-1.5 rounded-full">
                  <div className="bg-[#0057d9] h-full rounded-full" style={{ width: `${trip.progress}%` }} />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-auto pt-2 border-t border-[#c3c6d7]/20">
                <button
                  onClick={() => navigate(`/trips/${trip.id}`)}
                  className="flex-1 bg-[#0057d9] text-white rounded-lg py-2 text-xs font-medium hover:bg-[#0041a7] transition-colors"
                >
                  View
                </button>
                <button
                  onClick={() => navigate(`/trips/${trip.id}/builder`)}
                  className="flex-1 bg-[#eceef0] text-[#191c1e] rounded-lg py-2 text-xs font-medium hover:bg-[#e1e2e5] transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => navigate(`/trips/${trip.id}/share`)}
                  className="p-2 rounded-lg bg-[#eceef0] text-[#424654] hover:bg-[#e1e2e5] transition-colors"
                  title="Share"
                >
                  <span className="material-symbols-outlined text-sm">share</span>
                </button>
                <button
                  onClick={() => setConfirmDelete(trip.id)}
                  className="p-2 rounded-lg bg-[#eceef0] text-[#424654] hover:bg-[#ffdad6] hover:text-[#ba1a1a] transition-colors"
                  title="Delete"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirm Dialog */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-ambient-high">
            <span className="material-symbols-outlined text-4xl text-[#ba1a1a] mb-3 block">warning</span>
            <h3 className="text-lg font-semibold text-[#191c1e] mb-2">Delete this trip?</h3>
            <p className="text-sm text-[#424654] mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 border border-[#c3c6d7] rounded-xl py-2.5 text-sm font-medium text-[#424654] hover:bg-[#eceef0]">Cancel</button>
              <button onClick={() => handleDelete(confirmDelete)} className="flex-1 bg-[#ba1a1a] text-white rounded-xl py-2.5 text-sm font-medium hover:bg-[#93000a]">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

