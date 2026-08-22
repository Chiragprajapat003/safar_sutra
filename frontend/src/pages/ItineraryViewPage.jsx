import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTrips } from '../context/TripContext';

export default function ItineraryViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTripById } = useTrips();
  const trip = getTripById(id);

  const [viewMode, setViewMode] = useState('timeline'); // 'timeline' | 'list'
  const [copied, setCopied] = useState(false);

  if (!trip) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center">
        <h2 className="text-xl font-bold text-[#2A180C]">Trip Not Found</h2>
        <button onClick={() => navigate('/trips')} className="mt-4 px-4 py-2 bg-[#4A2E18] text-white rounded-xl text-xs font-bold">
          Back to My Trips
        </button>
      </div>
    );
  }

  const days = trip.days || [];
  const totalCost = days.reduce((sum, d) => sum + (d.activities || []).reduce((s, a) => s + (a.cost || 0), 0), 0);
  const totalActivities = days.reduce((s, d) => s + (d.activities?.length || 0), 0);

  const handleCopyPublicLink = () => {
    const shareUrl = `${window.location.origin}/trips/${trip.id}/share`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-12 py-8">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden h-72 sm:h-80 mb-8 border border-[#EADBCE] shadow-warm-lg">
        <img src={trip.coverImage} alt={trip.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

        <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-white">
          <div>
            <span className="px-3 py-1 rounded-full bg-[#D4A373] text-[#2A180C] text-[10px] font-extrabold uppercase tracking-wider mb-2 inline-block">
              {trip.status}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight text-[#FFFDF9]">{trip.name}</h1>
            <p className="text-xs text-[#EADBCE] mt-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-[#D4A373]">calendar_today</span>
              <span>{trip.startDate} – {trip.endDate}</span>
              <span>•</span>
              <span>Stops: {trip.stops?.join(', ')}</span>
            </p>
          </div>

          <div className="flex gap-2.5">
            <button
              onClick={handleCopyPublicLink}
              className="bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/30 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">{copied ? 'done' : 'share'}</span>
              <span>{copied ? 'Link Copied!' : 'Share Itinerary'}</span>
            </button>
            <button
              onClick={() => navigate(`/trips/${trip.id}/builder`)}
              className="bg-[#D4A373] hover:bg-[#C88A4B] text-[#2A180C] px-5 py-2 rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">edit</span>
              <span>Edit Itinerary</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Duration', value: `${days.length} Days`, icon: 'calendar_month' },
          { label: 'Stops & Destinations', value: `${trip.stops?.length || 0} Cities`, icon: 'location_on' },
          { label: 'Scheduled Activities', value: `${totalActivities} Items`, icon: 'attractions' },
          { label: 'Estimated Expenses', value: `$${totalCost.toLocaleString()}`, icon: 'payments' },
        ].map(({ label, value, icon }) => (
          <div key={label} className="bg-white rounded-3xl p-5 border border-[#EADBCE] shadow-warm-md text-center">
            <span className="material-symbols-outlined text-[#4A2E18] text-2xl">{icon}</span>
            <p className="text-xl font-bold text-[#2A180C] mt-1">{value}</p>
            <p className="text-xs text-[#8A715F]">{label}</p>
          </div>
        ))}
      </div>

      {/* View Mode Toggle */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#2A180C]">Day-by-Day Journey Plan</h2>
        <div className="flex bg-white p-1 rounded-2xl border border-[#EADBCE]">
          <button
            onClick={() => setViewMode('timeline')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'timeline' ? 'bg-[#4A2E18] text-[#FFFDF9]' : 'text-[#6B5646]'
            }`}
          >
            Timeline
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'list' ? 'bg-[#4A2E18] text-[#FFFDF9]' : 'text-[#6B5646]'
            }`}
          >
            Grouped List
          </button>
        </div>
      </div>

      {/* Day-by-Day Cards */}
      {days.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-[#D8C6B6]">
          <span className="material-symbols-outlined text-4xl text-[#8A715F] mb-2">calendar_today</span>
          <p className="text-sm font-bold text-[#2A180C]">No itinerary days added yet.</p>
          <button
            onClick={() => navigate(`/trips/${trip.id}/builder`)}
            className="mt-3 px-4 py-2 bg-[#4A2E18] text-white rounded-xl text-xs font-bold"
          >
            Open Itinerary Builder
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {days.map((dayBlock) => (
            <div key={dayBlock.day} className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EADBCE] shadow-warm-md">
              <div className="flex items-center gap-4 pb-4 mb-5 border-b border-[#EADBCE]">
                <div className="w-12 h-12 rounded-2xl bg-[#4A2E18] text-[#FFFDF9] flex flex-col items-center justify-center font-bold">
                  <span className="text-[9px] uppercase text-[#E8C59A]">Day</span>
                  <span className="text-base leading-none">{dayBlock.day}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#2A180C]">{dayBlock.city || `Day ${dayBlock.day}`}</h3>
                  <p className="text-xs text-[#8A715F]">{dayBlock.activities?.length || 0} activities scheduled</p>
                </div>
              </div>

              {(!dayBlock.activities || dayBlock.activities.length === 0) ? (
                <p className="text-xs text-[#8A715F] py-2">No activities for this day.</p>
              ) : (
                <div className="space-y-3">
                  {dayBlock.activities.map((act) => (
                    <div
                      key={act.id}
                      className="flex items-center justify-between p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#EADBCE]/80"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-[#C88A4B] bg-white border border-[#EADBCE] px-2 py-1 rounded-lg">
                          {act.time}
                        </span>
                        <div>
                          <h4 className="text-xs font-bold text-[#2A180C]">{act.name}</h4>
                          {act.notes && <p className="text-[11px] text-[#6B5646]">{act.notes}</p>}
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#4A2E18]">
                        {act.cost > 0 ? `$${act.cost}` : 'Free'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
