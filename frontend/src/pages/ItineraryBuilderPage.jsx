import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTrips } from '../context/TripContext';
import { mockActivities } from '../services/mockData';

const CATEGORY_ICONS = {
  hotel: 'hotel', restaurant: 'restaurant', museum: 'account_balance',
  sightseeing: 'photo_camera', adventure: 'hiking', transport: 'train',
  entertainment: 'theater_comedy', food: 'restaurant', accommodation: 'hotel',
  culture: 'museum', relax: 'spa', star: 'star',
};

const CATEGORY_ACCENT = {
  hotel: '#624315', accommodation: '#624315',
  restaurant: '#fe7944', food: '#fe7944',
  sightseeing: '#0057d9', culture: '#0057d9',
  adventure: '#2ecc71', relax: '#9b59b6',
  entertainment: '#e91e63',
};

function ActivityCard({ activity, onRemove }) {
  const iconName = CATEGORY_ICONS[activity.category] || CATEGORY_ICONS[activity.icon] || 'star';
  const accentColor = CATEGORY_ACCENT[activity.category] || '#0057d9';
  return (
    <div className="bg-white rounded-2xl p-4 shadow-ambient-low border border-[#c3c6d7]/20 flex gap-4 items-start group hover:shadow-ambient-md transition-shadow relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ backgroundColor: accentColor }} />
      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
        <span className="material-symbols-outlined">{iconName}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h3 className="text-base font-semibold text-[#191c1e] truncate">{activity.name}</h3>
          <span className="text-sm text-[#424654] ml-2 shrink-0">{activity.time}</span>
        </div>
        {activity.notes && <p className="text-sm text-[#424654] mt-0.5 truncate">{activity.notes}</p>}
        {activity.cost > 0 && (
          <span className="text-xs text-[#424654] bg-[#eceef0] px-2 py-0.5 rounded mt-1.5 inline-block">${activity.cost}</span>
        )}
      </div>
      <button onClick={onRemove} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#737686] hover:text-[#ba1a1a] p-1 shrink-0">
        <span className="material-symbols-outlined text-lg">delete</span>
      </button>
    </div>
  );
}

export default function ItineraryBuilderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTripById, addActivity, removeActivity, updateTrip } = useTrips();
  const trip = getTripById(id);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDay, setActiveDay] = useState(0);
  const [newCity, setNewCity] = useState('');

  if (!trip) return (
    <div className="flex items-center justify-center h-screen flex-col gap-4">
      <span className="material-symbols-outlined text-6xl text-[#737686]">luggage</span>
      <p className="text-[#424654]">Trip not found.</p>
      <button onClick={() => navigate('/trips')} className="text-[#0041a7] underline text-sm">Back to My Trips</button>
    </div>
  );

  const days = trip.days || [];
  const filteredActivities = mockActivities.filter(a =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addDay = () => {
    const updated = [...days, { day: days.length + 1, date: '', city: newCity || `City ${days.length + 1}`, activities: [] }];
    updateTrip(trip.id, { days: updated });
    setActiveDay(updated.length - 1);
    setNewCity('');
  };

  const updateDayCity = (dayIdx, city) => {
    const updated = [...days];
    updated[dayIdx] = { ...updated[dayIdx], city };
    updateTrip(trip.id, { days: updated });
  };

  const handleAddActivity = (activity) => {
    addActivity(trip.id, activeDay, {
      name: activity.name, time: '09:00',
      icon: CATEGORY_ICONS[activity.category] || 'star',
      category: activity.category, cost: activity.cost, notes: activity.description,
    });
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-16 py-8 pb-[100px] md:pb-8 flex flex-col lg:flex-row gap-6">
      {/* Left: Timeline */}
      <section className="w-full lg:w-2/3 flex flex-col gap-6">
        {/* Trip Header */}
        <div className="bg-white rounded-2xl p-6 shadow-ambient-md border border-[#e1e2e5] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-full bg-gradient-to-l from-[#0041a7]/5 to-transparent pointer-events-none" />
          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="bg-[#fe7944] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">{trip.status}</span>
                <span className="text-[#424654] text-sm">{trip.startDate} – {trip.endDate}</span>
              </div>
              <h1 className="text-4xl font-bold text-[#0041a7]">{trip.name}</h1>
              <p className="text-[#424654] mt-1">{days.length} Days • {trip.stops?.join(', ') || 'No stops added yet'}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => navigate(`/trips/${trip.id}/share`)} className="w-10 h-10 rounded-full bg-[#eceef0] text-[#424654] hover:bg-[#e1e2e5] flex items-center justify-center transition-colors" title="Share">
                <span className="material-symbols-outlined">share</span>
              </button>
              <button onClick={() => navigate(`/trips/${trip.id}`)} className="bg-[#0057d9] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#0041a7] transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">visibility</span>Preview
              </button>
            </div>
          </div>
        </div>

        {/* Day Tabs */}
        {days.length > 0 && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {days.map((d, i) => (
              <button key={i} onClick={() => setActiveDay(i)} className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeDay === i ? 'bg-[#0057d9] text-white' : 'bg-white text-[#424654] border border-[#c3c6d7]/50 hover:bg-[#eceef0]'}`}>
                Day {d.day}{d.city ? ` — ${d.city}` : ''}
              </button>
            ))}
          </div>
        )}

        {/* Timeline */}
        <div className="flex flex-col gap-6 relative">
          {days.length > 0 && <div className="absolute left-[39px] top-4 bottom-4 w-0.5 bg-[#c3c6d7]/30 z-0 hidden sm:block" />}
          {days.map((dayBlock, dayIdx) => (
            <div key={dayIdx} className={`relative z-10 transition-opacity duration-300 ${dayIdx !== activeDay && days.length > 1 ? 'opacity-40' : ''}`}>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div className="flex sm:flex-col items-center sm:w-20 pt-2 shrink-0">
                  <div className={`w-12 h-12 rounded-full flex flex-col items-center justify-center shadow-ambient-md shrink-0 ${dayIdx === activeDay ? 'bg-[#0057d9] text-white' : 'bg-[#eceef0] border border-[#c3c6d7] text-[#191c1e]'}`}>
                    <span className="text-[10px] font-semibold uppercase leading-tight opacity-80">Day</span>
                    <span className="text-lg font-bold leading-tight">{dayBlock.day}</span>
                  </div>
                  <input value={dayBlock.city} onChange={e => updateDayCity(dayIdx, e.target.value)} placeholder="City" className="ml-3 sm:ml-0 sm:mt-2 text-xs font-medium text-[#0041a7] bg-transparent border-none focus:outline-none focus:bg-[#eceef0] rounded px-1 py-0.5 w-full text-center" />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  {dayBlock.activities.length === 0 && (
                    <button onClick={() => setActiveDay(dayIdx)} className="w-full flex items-center justify-center gap-2 py-8 border-2 border-dashed border-[#c3c6d7]/50 rounded-2xl text-[#424654] text-sm font-medium hover:bg-[#f2f4f6] transition-colors">
                      <span className="material-symbols-outlined">add</span>Search activities on the right to add them here
                    </button>
                  )}
                  {dayBlock.activities.map(act => (
                    <ActivityCard key={act.id} activity={act} onRemove={() => removeActivity(trip.id, dayIdx, act.id)} />
                  ))}
                  {dayBlock.activities.length > 0 && (
                    <button onClick={() => setActiveDay(dayIdx)} className="mt-1 flex items-center justify-center gap-2 py-3 border-2 border-dashed border-[#c3c6d7]/50 rounded-2xl text-[#0041a7] text-sm font-medium hover:bg-[#0041a7]/5 transition-colors">
                      <span className="material-symbols-outlined">add</span>Add Activity
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Day */}
        <div className="flex items-center gap-3">
          <input value={newCity} onChange={e => setNewCity(e.target.value)} placeholder="New city (optional)" className="flex-1 px-4 py-2.5 bg-white border border-[#c3c6d7] rounded-xl text-sm focus:outline-none focus:border-[#0041a7] transition-all" onKeyDown={e => e.key === 'Enter' && addDay()} />
          <button onClick={addDay} className="bg-[#eceef0] text-[#191c1e] border border-[#c3c6d7]/50 text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-[#e1e2e5] flex items-center gap-2 transition-colors">
            <span className="material-symbols-outlined text-sm">add_location_alt</span>Add Day
          </button>
        </div>
      </section>

      {/* Right: Search & Add Panel */}
      <aside className="w-full lg:w-1/3 lg:sticky lg:top-[88px] h-fit">
        <div className="bg-white rounded-2xl shadow-ambient-high border border-[#e1e2e5] p-5 flex flex-col gap-5">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#737686]">search</span>
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search activities, places..." className="w-full pl-10 pr-3 py-3 border border-[#c3c6d7]/50 rounded-xl text-sm bg-[#f2f4f6] text-[#191c1e] placeholder-[#737686] focus:outline-none focus:ring-1 focus:ring-[#0041a7] focus:border-[#0041a7] transition-all" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#191c1e] mb-3">{searchQuery ? `Results for "${searchQuery}"` : 'Popular Activities'}</h4>
            <div className="space-y-2 max-h-[55vh] overflow-y-auto no-scrollbar">
              {filteredActivities.map(act => (
                <div key={act.id} className="flex items-center gap-3 p-3 rounded-xl border border-[#c3c6d7]/30 hover:border-[#0041a7]/50 cursor-pointer transition-colors group">
                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                    <img src={act.image} alt={act.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-medium text-[#191c1e] group-hover:text-[#0041a7] transition-colors truncate">{act.name}</h5>
                    <p className="text-xs text-[#424654] capitalize">{act.category} • {act.duration}min • ${act.cost}</p>
                  </div>
                  <button onClick={() => handleAddActivity(act)} className="text-[#0041a7] hover:bg-[#0041a7]/10 p-1.5 rounded-full shrink-0">
                    <span className="material-symbols-outlined text-lg">add_circle</span>
                  </button>
                </div>
              ))}
              {filteredActivities.length === 0 && <p className="text-center text-sm text-[#424654] py-6">No activities found.</p>}
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#0041a7]/10 to-[#dae2ff] rounded-2xl p-4 relative overflow-hidden">
            <div className="absolute -right-3 -bottom-3 opacity-10">
              <span className="material-symbols-outlined" style={{ fontSize: 70 }}>auto_awesome</span>
            </div>
            <h4 className="text-sm font-bold text-[#001848] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>Need inspiration?
            </h4>
            <p className="text-xs text-[#424654] mt-1 mb-3">Let AI suggest the perfect itinerary.</p>
            <button className="bg-[#0057d9] text-white text-xs font-medium px-4 py-2 rounded-full w-full hover:bg-[#0041a7] transition-colors">Generate Ideas</button>
          </div>
        </div>
      </aside>
    </div>
  );
}

