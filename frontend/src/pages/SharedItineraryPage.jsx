import { useParams, Link } from 'react-router-dom';
import { useTrips } from '../context/TripContext';

const ICONS = { hotel: 'hotel', restaurant: 'restaurant', museum: 'account_balance', sightseeing: 'photo_camera', adventure: 'hiking', transport: 'train', entertainment: 'theater_comedy', food: 'restaurant', accommodation: 'hotel', culture: 'museum', relax: 'spa' };

export default function SharedItineraryPage() {
  const { id } = useParams();
  const { getTripById } = useTrips();
  const trip = getTripById(id);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: trip?.name, url: window.location.href });
    } else {
      handleCopyLink();
    }
  };

  if (!trip) return (
    <div className="flex items-center justify-center min-h-screen flex-col gap-4 bg-[#f8f9fc]">
      <span className="material-symbols-outlined text-6xl text-[#737686]">luggage</span>
      <p className="text-[#424654]">Itinerary not found or not shared.</p>
      <Link to="/dashboard" className="text-[#0041a7] underline text-sm">Go to Dashboard</Link>
    </div>
  );

  const totalCost = (trip.days || []).reduce((sum, d) => sum + (d.activities || []).reduce((s, a) => s + (a.cost || 0), 0), 0);
  const totalActivities = (trip.days || []).reduce((s, d) => s + (d.activities?.length || 0), 0);

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      {/* Public Header */}
      <header className="bg-white border-b border-[#c3c6d7]/20 px-4 md:px-16 py-4 flex items-center justify-between max-w-[1440px] mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#0057d9] flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-xl">flight_takeoff</span>
          </div>
          <span className="text-xl font-black text-[#0041a7]">GlobeTrotter</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm text-[#0041a7] font-medium hover:underline">Sign in</Link>
          <Link to="/signup" className="bg-[#0057d9] text-white rounded-full px-4 py-2 text-sm font-medium hover:bg-[#0041a7] transition-colors">Join free</Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-10">
        {/* Hero */}
        <div className="relative rounded-3xl overflow-hidden h-72 mb-8">
          <img src={trip.coverImage} alt={trip.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8">
            <span className="bg-[#fe7944] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">{trip.status}</span>
            <h1 className="text-4xl font-bold text-white">{trip.name}</h1>
            <p className="text-white/80 mt-1.5">{trip.startDate} – {trip.endDate}</p>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <button onClick={handleCopyLink} className="bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium border border-white/30 hover:bg-white/30 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">link</span>Copy Link
            </button>
            <button onClick={handleShare} className="bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium border border-white/30 hover:bg-white/30 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">share</span>Share
            </button>
          </div>
        </div>

        {/* Trip stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Days', value: trip.days?.length || 0, icon: 'calendar_today' },
            { label: 'Destinations', value: trip.stops?.length || 0, icon: 'location_on' },
            { label: 'Activities', value: totalActivities, icon: 'attractions' },
            { label: 'Est. Cost', value: `$${totalCost.toLocaleString()}`, icon: 'account_balance_wallet' },
          ].map(({ label, value, icon }) => (
            <div key={label} className="bg-white rounded-2xl p-4 shadow-ambient-low border border-[#c3c6d7]/20 text-center">
              <span className="material-symbols-outlined text-[#0041a7] text-2xl">{icon}</span>
              <p className="text-2xl font-bold text-[#191c1e] mt-1">{value}</p>
              <p className="text-xs text-[#424654] mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* CTA — Copy Trip */}
        <div className="bg-gradient-to-br from-[#0041a7] to-[#0057d9] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-white">Love this itinerary?</h3>
            <p className="text-white/80 text-sm mt-1">Copy it to your account and start personalizing!</p>
          </div>
          <Link to="/signup" className="bg-white text-[#0041a7] font-semibold px-6 py-3 rounded-xl text-sm hover:bg-[#f8f9fc] transition-colors whitespace-nowrap flex items-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-lg">content_copy</span>Copy This Trip
          </Link>
        </div>

        {/* Day-by-Day */}
        {(!trip.days || trip.days.length === 0) ? (
          <div className="bg-white rounded-2xl border-2 border-dashed border-[#c3c6d7]/50 p-12 text-center">
            <p className="text-[#424654]">No itinerary days added yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {trip.days.map((dayBlock, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-ambient-md border border-[#c3c6d7]/20">
                <div className="flex items-center gap-4 mb-5 pb-4 border-b border-[#c3c6d7]/30">
                  <div className="w-14 h-14 rounded-2xl bg-[#0057d9] text-white flex flex-col items-center justify-center shadow-ambient-md shrink-0">
                    <span className="text-[10px] font-semibold uppercase leading-tight opacity-80">Day</span>
                    <span className="text-xl font-bold leading-tight">{dayBlock.day}</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-[#191c1e]">{dayBlock.city || `Day ${dayBlock.day}`}</h2>
                    <p className="text-sm text-[#424654]">{dayBlock.activities?.length || 0} activities</p>
                  </div>
                </div>
                {(!dayBlock.activities || dayBlock.activities.length === 0) ? (
                  <p className="text-sm text-[#424654] text-center py-3">No activities for this day.</p>
                ) : (
                  <div className="space-y-3">
                    {dayBlock.activities.map((act) => {
                      const iconName = ICONS[act.category] || 'star';
                      return (
                        <div key={act.id} className="flex gap-4 items-start">
                          <div className="w-10 h-10 rounded-xl bg-[#0057d9]/10 text-[#0057d9] flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-lg">{iconName}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h3 className="text-sm font-semibold text-[#191c1e]">{act.name}</h3>
                              <span className="text-sm text-[#424654]">{act.time}</span>
                            </div>
                            {act.notes && <p className="text-xs text-[#424654] mt-0.5">{act.notes}</p>}
                            {act.cost > 0 && <span className="text-xs text-[#424654] bg-[#eceef0] px-2 py-0.5 rounded mt-1 inline-block">${act.cost}</span>}
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

        {/* Footer signup */}
        <div className="mt-10 text-center">
          <p className="text-[#424654] text-sm mb-3">Want to plan your own adventure?</p>
          <Link to="/signup" className="inline-flex items-center gap-2 bg-[#0057d9] text-white rounded-full px-6 py-3 text-sm font-medium hover:bg-[#0041a7] transition-colors">
            <span className="material-symbols-outlined text-lg">flight_takeoff</span>Start Planning for Free
          </Link>
        </div>
      </div>
    </div>
  );
}
