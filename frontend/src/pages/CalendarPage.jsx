import { useState } from 'react';
import { useTrips } from '../context/TripContext';
import { useNavigate } from 'react-router-dom';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
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
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' | 'timeline'
  const [selectedDayEvents, setSelectedDayEvents] = useState(null);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDay(viewYear, viewMonth);
  const cells = Array(firstDay).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  const getEventsForDay = (day) => {
    const d = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return trips.filter((t) => t.startDate <= d && t.endDate >= d);
  };

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-12 py-8">
      {/* Header & View Mode Switch */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#2A180C] tracking-tight">Trip Calendar & Timeline</h1>
          <p className="text-sm text-[#6B5646] mt-1">Visualize your spiritual yatras and multi-city itineraries over time.</p>
        </div>

        <div className="flex bg-white p-1 rounded-2xl border border-[#EADBCE] shadow-xs">
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'calendar'
                ? 'bg-[#4A2E18] text-[#FFFDF9] shadow-xs'
                : 'text-[#6B5646] hover:text-[#4A2E18]'
            }`}
          >
            <span className="material-symbols-outlined text-base">calendar_view_month</span>
            <span>Monthly Grid</span>
          </button>
          <button
            onClick={() => setViewMode('timeline')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'timeline'
                ? 'bg-[#4A2E18] text-[#FFFDF9] shadow-xs'
                : 'text-[#6B5646] hover:text-[#4A2E18]'
            }`}
          >
            <span className="material-symbols-outlined text-base">timeline</span>
            <span>Vertical Timeline</span>
          </button>
        </div>
      </div>

      {viewMode === 'calendar' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Calendar Grid (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 shadow-warm-md border border-[#EADBCE]">
            {/* Nav Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#EADBCE]">
              <button
                onClick={prevMonth}
                className="w-10 h-10 rounded-full hover:bg-[#FAF7F2] border border-[#EADBCE] text-[#4A2E18] flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">chevron_left</span>
              </button>
              <h2 className="text-xl font-bold text-[#2A180C]">
                {MONTHS[viewMonth]} {viewYear}
              </h2>
              <button
                onClick={nextMonth}
                className="w-10 h-10 rounded-full hover:bg-[#FAF7F2] border border-[#EADBCE] text-[#4A2E18] flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">chevron_right</span>
              </button>
            </div>

            {/* Day Header */}
            <div className="grid grid-cols-7 mb-2">
              {DAYS.map((d) => (
                <div key={d} className="text-center text-xs font-bold text-[#8A715F] uppercase py-2">
                  {d}
                </div>
              ))}
            </div>

            {/* Matrix Cells */}
            <div className="grid grid-cols-7 gap-1.5">
              {cells.map((day, i) => {
                if (!day) return <div key={i} className="min-h-[85px] bg-[#FAF7F2]/40 rounded-2xl" />;
                const events = getEventsForDay(day);
                const isToday =
                  day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
                return (
                  <div
                    key={i}
                    onClick={() => setSelectedDayEvents({ day, events })}
                    className={`min-h-[85px] rounded-2xl p-2 cursor-pointer transition-all border ${
                      isToday
                        ? 'bg-[#F5ECE1] border-[#D4A373] shadow-xs'
                        : 'bg-white border-[#EADBCE]/70 hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <span
                      className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ${
                        isToday ? 'bg-[#4A2E18] text-[#FFFDF9]' : 'text-[#2A180C]'
                      }`}
                    >
                      {day}
                    </span>

                    <div className="mt-1 space-y-1">
                      {events.slice(0, 2).map((evt) => (
                        <div
                          key={evt.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/trips/${evt.id}`);
                          }}
                          className="px-1.5 py-0.5 rounded-md text-[9px] font-bold truncate bg-[#4A2E18]/10 text-[#4A2E18] hover:bg-[#4A2E18] hover:text-white transition-colors"
                          title={evt.name}
                        >
                          {evt.name}
                        </div>
                      ))}
                      {events.length > 2 && (
                        <div className="text-[9px] text-[#C88A4B] font-bold px-1">+{events.length - 2} more</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar: Upcoming & Day Details (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Selected Day popup card */}
            {selectedDayEvents && (
              <div className="bg-white rounded-3xl p-6 shadow-warm-md border border-[#D4A373] animate-fadeIn">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-bold text-[#2A180C]">
                    Events for {MONTHS[viewMonth]} {selectedDayEvents.day}
                  </h3>
                  <button onClick={() => setSelectedDayEvents(null)} className="text-xs text-[#8A715F] font-bold">✕</button>
                </div>
                {selectedDayEvents.events.length === 0 ? (
                  <p className="text-xs text-[#8A715F]">No trips scheduled for this date.</p>
                ) : (
                  <div className="space-y-2">
                    {selectedDayEvents.events.map((evt) => (
                      <div
                        key={evt.id}
                        onClick={() => navigate(`/trips/${evt.id}`)}
                        className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EADBCE] cursor-pointer hover:border-[#4A2E18]"
                      >
                        <p className="text-xs font-bold text-[#2A180C]">{evt.name}</p>
                        <p className="text-[11px] text-[#8A715F]">{evt.stops?.join(' → ')}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Upcoming Yatras List */}
            <div className="bg-white rounded-3xl p-6 shadow-warm-md border border-[#EADBCE]">
              <h2 className="text-lg font-bold text-[#2A180C] mb-4">Upcoming Yatras</h2>
              <div className="space-y-3.5">
                {trips.map((trip) => (
                  <div
                    key={trip.id}
                    onClick={() => navigate(`/trips/${trip.id}`)}
                    className="flex gap-3.5 items-center p-2.5 rounded-2xl hover:bg-[#FAF7F2] border border-transparent hover:border-[#EADBCE] transition-all cursor-pointer"
                  >
                    <img
                      src={trip.coverImage}
                      alt={trip.name}
                      className="w-14 h-14 rounded-xl object-cover border border-[#EADBCE]"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-bold text-[#2A180C] truncate">{trip.name}</h3>
                      <p className="text-[11px] text-[#8A715F]">{trip.startDate} – {trip.endDate}</p>
                      <div className="w-full bg-[#FAF7F2] h-1.5 rounded-full overflow-hidden mt-1 border border-[#EADBCE]">
                        <div className="bg-[#4A2E18] h-full rounded-full" style={{ width: `${trip.progress}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Vertical Timeline View */
        <div className="bg-white rounded-3xl p-8 shadow-warm-md border border-[#EADBCE]">
          <h2 className="text-xl font-bold text-[#2A180C] mb-6">Vertical Trip Timeline</h2>
          <div className="relative border-l-2 border-[#D4A373]/50 ml-4 space-y-8 pl-6">
            {trips.map((trip) => (
              <div key={trip.id} className="relative group">
                <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#4A2E18] border-2 border-white ring-4 ring-[#FAF7F2]" />
                <div
                  onClick={() => navigate(`/trips/${trip.id}`)}
                  className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#EADBCE] hover:border-[#4A2E18] transition-all cursor-pointer max-w-2xl"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-[#C88A4B]">{trip.startDate} to {trip.endDate}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-[#EADBCE] uppercase text-[#4A2E18]">
                      {trip.status}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#2A180C]">{trip.name}</h3>
                  <p className="text-xs text-[#6B5646] mt-1">{trip.description}</p>
                  <p className="text-[11px] text-[#8A715F] mt-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">location_on</span>
                    Stops: {trip.stops?.join(' → ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
