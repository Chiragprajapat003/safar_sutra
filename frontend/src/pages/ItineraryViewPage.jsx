import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTrips } from '../context/TripContext';

const ICONS = { hotel: 'hotel', restaurant: 'restaurant', museum: 'account_balance', sightseeing: 'photo_camera', adventure: 'hiking', transport: 'train', entertainment: 'theater_comedy', food: 'restaurant', accommodation: 'hotel', culture: 'museum', relax: 'spa' };
const ACCENT = { hotel: '#624315', accommodation: '#624315', restaurant: '#fe7944', food: '#fe7944', sightseeing: '#0057d9', culture: '#0057d9', adventure: '#2ecc71', relax: '#9b59b6', entertainment: '#e91e63' };

export default function ItineraryViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTripById } = useTrips();
  const trip = getTripById(id);

  if (!trip) return (
    <div className="flex items-center justify-center h-screen flex-col gap-4">
      <span className="material-symbols-outlined text-6xl text-[#737686]">luggage</span>
      <p className="text-[#424654]">Trip not found.</p>
      <button onClick={() => navigate('/trips')} className="text-[#0041a7] underline text-sm">Back to My Trips</button>
    </div>
  );

  const totalCost = (trip.days || []).reduce((sum, d) => sum + (d.activities || []).reduce((s, a) => s + (a.cost || 0), 0), 0);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-10">
      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden h-64 mb-8">
        <img src={trip.coverImage} alt={trip.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-[#fe7944] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">{trip.status}</span>
          </div>
          <h1 className="text-4xl font-bold text-white">{trip.name}</h1>
          <p className="text-white/80 mt-1">{trip.startDate} – {trip.endDate} • ${totalCost.toLocaleString()} total cost</p>
        </div>
        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Link to={`/trips/${trip.id}/builder`} className="bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium border border-white/30 hover:bg-white/30 transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">edit</span>Edit
          </Link>
          <Link to={`/trips/${trip.id}/share`} className="bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium border border-white/30 hover:bg-white/30 transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">share</span>Share
          </Link>
        </div>
      </div>

      {/* Trip Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Days', value: trip.days?.length || 0, icon: 'calendar_today' },
          { label: 'Destinations', value: trip.stops?.length || 0, icon: 'location_on' },
          { label: 'Activities', value: (trip.days || []).reduce((s, d) => s + (d.activities?.length || 0), 0), icon: 'attractions' },
          { label: 'Budget', value: `$${trip.budget?.toLocaleString()}`, icon: 'account_balance_wallet' },
        ].map(({ label, value, icon }) => (
          <div key={label} className="bg-white rounded-2xl p-4 shadow-ambient-low border border-[#c3c6d7]/20 text-center">
            <span className="material-symbols-outlined text-[#0041a7] text-2xl">{icon}</span>
            <p className="text-2xl font-bold text-[#191c1e] mt-1">{value}</p>
            <p className="text-xs text-[#424654] mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Day-by-Day Itinerary */}
      {(!trip.days || trip.days.length === 0) ? (
        <div className="bg-white rounded-2xl border-2 border-dashed border-[#c3c6d7]/50 p-16 text-center">
          <span className="material-symbols-outlined text-5xl text-[#737686] mb-3 block">event_note</span>
          <p className="font-semibold text-[#191c1e] text-lg mb-2">No itinerary yet</p>
          <Link to={`/trips/${trip.id}/builder`} className="inline-flex items-center gap-2 bg-[#0057d9] text-white rounded-full px-5 py-2.5 text-sm font-medium hover:bg-[#0041a7] transition-colors mt-2">
            <span className="material-symbols-outlined text-lg">add</span>Start Building Itinerary
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {trip.days.map((dayBlock, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-ambient-md border border-[#c3c6d7]/20">
              {/* Day Header */}
              <div className="flex items-center gap-4 mb-5 pb-4 border-b border-[#c3c6d7]/30">
                <div className="w-14 h-14 rounded-2xl bg-[#0057d9] text-white flex flex-col items-center justify-center shadow-ambient-md">
                  <span className="text-[10px] font-semibold uppercase leading-tight opacity-80">Day</span>
                  <span className="text-xl font-bold leading-tight">{dayBlock.day}</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[#191c1e]">{dayBlock.city || `Day ${dayBlock.day}`}</h2>
                  <p className="text-sm text-[#424654]">{dayBlock.date || ''} • {dayBlock.activities?.length || 0} activities</p>
                </div>
              </div>

              {/* Activities */}
              {(!dayBlock.activities || dayBlock.activities.length === 0) ? (
                <p className="text-center text-sm text-[#424654] py-4">No activities planned for this day.</p>
              ) : (
                <div className="space-y-3">
                  {dayBlock.activities.map((act, ai) => {
                    const iconName = ICONS[act.category] || ICONS[act.icon] || 'star';
                    const accentColor = ACCENT[act.category] || '#0057d9';
                    return (
                      <div key={act.id} className="flex gap-4 items-start relative">
                        {/* Timeline dot + line */}
                        <div className="flex flex-col items-center shrink-0">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                            <span className="material-symbols-outlined text-lg">{iconName}</span>
                          </div>
                          {ai < dayBlock.activities.length - 1 && <div className="w-0.5 h-4 bg-[#c3c6d7]/50 mt-1" />}
                        </div>
                        <div className="flex-1 pb-2">
                          <div className="flex justify-between items-start">
                            <h3 className="text-base font-semibold text-[#191c1e]">{act.name}</h3>
                            <span className="text-sm text-[#424654] font-medium ml-2">{act.time}</span>
                          </div>
                          {act.notes && <p className="text-sm text-[#424654] mt-0.5">{act.notes}</p>}
                          {act.cost > 0 && (
                            <span className="text-xs text-[#424654] bg-[#eceef0] px-2 py-0.5 rounded mt-1.5 inline-block">${act.cost}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

