import { useState } from 'react';
import { useTrips } from '../context/TripContext';
import { useNavigate } from 'react-router-dom';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDay(year, month) {
  return new Date(year, month, 1).getDay();
}

export default function CalendarPage() {
  const { trips } = useTrips();
  const navigate = useNavigate();
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDay(viewYear, viewMonth);
  const cells = Array(firstDay).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  const getEventsForDay = (day) => {
    const d = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return trips.filter(t => t.startDate <= d && t.endDate >= d);
  };

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-16 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Calendar */}
        <div className="flex-1 bg-white rounded-2xl shadow-ambient-md border border-[#c3c6d7]/20 p-6">
          {/* Nav */}
          <div className="flex items-center justify-between mb-6">
            <button onClick={prevMonth} className="p-2 rounded-full hover:bg-[#eceef0] text-[#424654] transition-colors">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <h2 className="text-xl font-semibold text-[#191c1e]">{MONTHS[viewMonth]} {viewYear}</h2>
            <button onClick={nextMonth} className="p-2 rounded-full hover:bg-[#eceef0] text-[#424654] transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map(d => (
              <div key={d} className="text-center text-xs font-semibold text-[#424654] py-2">{d}</div>
            ))}
          </div>

          {/* Cells */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              if (!day) return <div key={i} />;
              const events = getEventsForDay(day);
              const isToday = day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
              return (
                <div key={i} className={`min-h-[70px] rounded-xl p-1.5 cursor-pointer transition-colors ${isToday ? 'bg-[#0057d9]/10 ring-2 ring-[#0057d9]/30' : 'hover:bg-[#f2f4f6]'}`}>
                  <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-[#0057d9] text-white' : 'text-[#191c1e]'}`}>{day}</span>
                  {events.slice(0, 2).map(evt => (
                    <div
                      key={evt.id}
                      onClick={() => navigate(`/trips/${evt.id}`)}
                      className="mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium truncate bg-[#0057d9]/10 text-[#0041a7] hover:bg-[#0057d9]/20 transition-colors"
                      title={evt.name}
                    >
                      {evt.name}
                    </div>
                  ))}
                  {events.length > 2 && <div className="text-[10px] text-[#424654] px-1">+{events.length - 2} more</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar: Upcoming */}
        <div className="w-full md:w-72 flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-[#191c1e]">Upcoming Trips</h2>
          {trips.filter(t => t.startDate >= today.toISOString().split('T')[0]).slice(0, 5).map(trip => (
            <div
              key={trip.id}
              onClick={() => navigate(`/trips/${trip.id}`)}
              className="bg-white rounded-2xl p-4 shadow-ambient-low border border-[#c3c6d7]/20 cursor-pointer hover:-translate-y-0.5 transition-transform"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                  <img src={trip.coverImage} alt={trip.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-[#191c1e] truncate">{trip.name}</h3>
                  <p className="text-xs text-[#424654] mt-0.5">{trip.startDate} – {trip.endDate}</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <div className="flex-1 bg-[#eceef0] h-1.5 rounded-full">
                      <div className="bg-[#0057d9] h-full rounded-full" style={{ width: `${trip.progress}%` }} />
                    </div>
                    <span className="text-[10px] text-[#424654]">{trip.progress}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {trips.filter(t => t.startDate >= today.toISOString().split('T')[0]).length === 0 && (
            <div className="bg-white rounded-2xl p-6 text-center shadow-ambient-low border border-[#c3c6d7]/20">
              <span className="material-symbols-outlined text-3xl text-[#737686] block mb-2">event_note</span>
              <p className="text-sm text-[#424654]">No upcoming trips</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

