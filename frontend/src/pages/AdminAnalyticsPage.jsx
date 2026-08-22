import { useState } from 'react';
import { mockPlatformAnalytics, mockTrips, mockDestinations } from '../services/mockData';

export default function AdminAnalyticsPage() {
  const analytics = mockPlatformAnalytics;
  const [filterPeriod, setFilterPeriod] = useState('30d');

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-12 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-md bg-[#4A2E18] text-[#E8C59A] text-[11px] font-bold uppercase tracking-wider">
              Admin & Analytics
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#2A180C] tracking-tight">Safar-sutra Platform Insights</h1>
          <p className="text-xs text-[#8A715F] mt-0.5">Track user adoption, popular pilgrimage destinations, and trip engagement.</p>
        </div>

        {/* Period Selector */}
        <div className="flex bg-white p-1 rounded-2xl border border-[#EADBCE] shadow-xs">
          {['7d', '30d', '90d', 'All Time'].map((p) => (
            <button
              key={p}
              onClick={() => setFilterPeriod(p)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterPeriod === p
                  ? 'bg-[#4A2E18] text-[#FFFDF9] shadow-xs'
                  : 'text-[#6B5646] hover:text-[#4A2E18]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Top 4 Key Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
        {[
          { label: 'Total Registered Users', value: analytics.totalUsers.toLocaleString(), icon: 'group', color: '#4A2E18', trend: '+24% this month' },
          { label: 'Trips & Yatras Created', value: analytics.tripsCreated.toLocaleString(), icon: 'map', color: '#C88A4B', trend: '+38% this month' },
          { label: 'Active Travelers', value: analytics.activeTravelers.toLocaleString(), icon: 'travel_explore', color: '#8D582A', trend: '+19% this month' },
          { label: 'Destinations Covered', value: analytics.destinationsCovered, icon: 'location_on', color: '#A06D3B', trend: 'Across 18 states' },
        ].map(({ label, value, icon, color, trend }) => (
          <div key={label} className="bg-white rounded-3xl p-5 shadow-warm-md border border-[#EADBCE] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#8A715F] uppercase tracking-wider">{label}</span>
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                <span className="material-symbols-outlined text-xl" style={{ color }}>{icon}</span>
              </div>
            </div>
            <div>
              <p className="text-3xl font-black text-[#2A180C]">{value}</p>
              <p className="text-[11px] font-semibold text-[#8D582A] mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">trending_up</span>
                {trend}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts & Trends Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Top Cities Table (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-warm-md border border-[#EADBCE]">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h2 className="text-lg font-bold text-[#2A180C]">Top Trending Pilgrimage & Heritage Cities</h2>
              <p className="text-xs text-[#8A715F]">Most added destinations in user itineraries</p>
            </div>
            <span className="text-xs font-bold text-[#C88A4B] bg-[#FAF7F2] border border-[#EADBCE] px-2.5 py-1 rounded-lg">
              Live Data
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#EADBCE] text-[#8A715F] uppercase font-bold text-[10px] tracking-wider">
                  <th className="pb-3">Destination</th>
                  <th className="pb-3">Total Trips</th>
                  <th className="pb-3">Growth Trend</th>
                  <th className="pb-3 text-right">Popularity Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EADBCE]/50">
                {analytics.topDestinations.map((dest, idx) => (
                  <tr key={dest.city} className="hover:bg-[#FAF7F2] transition-colors">
                    <td className="py-3 font-bold text-[#2A180C] flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#4A2E18] text-[#E8C59A] flex items-center justify-center text-[10px] font-black">
                        {idx + 1}
                      </span>
                      <span>{dest.city}</span>
                    </td>
                    <td className="py-3 font-semibold text-[#5A4536]">{dest.trips.toLocaleString()}</td>
                    <td className="py-3 text-emerald-700 font-bold">{dest.trend}</td>
                    <td className="py-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        <div className="w-24 bg-[#FAF7F2] h-2 rounded-full border border-[#EADBCE]">
                          <div
                            className="bg-[#4A2E18] h-full rounded-full"
                            style={{ width: `${Math.round((dest.trips / 1420) * 100)}%` }}
                          />
                        </div>
                        <span className="font-bold text-[#4A2E18]">{Math.round((dest.trips / 1420) * 100)}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Popular Activity Breakdown (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-warm-md border border-[#EADBCE] flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#2A180C] mb-1">Activity Preference Breakdown</h2>
            <p className="text-xs text-[#8A715F] mb-6">User interests across all planned trips</p>

            <div className="space-y-4">
              {analytics.popularActivityTypes.map((item, i) => {
                const colors = ['#4A2E18', '#C88A4B', '#8D582A', '#A06D3B'];
                return (
                  <div key={item.type}>
                    <div className="flex justify-between text-xs font-bold text-[#2A180C] mb-1.5">
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[i % colors.length] }} />
                        {item.type}
                      </span>
                      <span>{item.pct}%</span>
                    </div>
                    <div className="w-full bg-[#FAF7F2] h-2.5 rounded-full overflow-hidden border border-[#EADBCE]">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${item.pct}%`, backgroundColor: colors[i % colors.length] }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-[#FAF7F2] border border-[#EADBCE] flex items-center justify-between text-xs font-semibold text-[#5A4536]">
            <span>💡 Pilgrimage & Aarti tours represent over 42% of all activity queries.</span>
          </div>
        </div>
      </div>

      {/* User Management & Quick Operations */}
      <div className="bg-white rounded-3xl p-6 shadow-warm-md border border-[#EADBCE]">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-bold text-[#2A180C]">Recent User Itinerary Logs</h2>
            <p className="text-xs text-[#8A715F]">Real-time travel plans created by active users</p>
          </div>
          <button className="bg-[#FAF7F2] hover:bg-[#F5ECE1] border border-[#D8C6B6] text-[#4A2E18] text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm">download</span>
            <span>Export CSV</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EADBCE] text-[#8A715F] uppercase font-bold text-[10px] tracking-wider">
                <th className="pb-3">Trip Name</th>
                <th className="pb-3">Destinations</th>
                <th className="pb-3">Dates</th>
                <th className="pb-3">Budget</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EADBCE]/50">
              {mockTrips.map((trip) => (
                <tr key={trip.id} className="hover:bg-[#FAF7F2] transition-colors">
                  <td className="py-3 font-bold text-[#2A180C]">{trip.name}</td>
                  <td className="py-3 text-[#5A4536]">{trip.stops?.join(', ')}</td>
                  <td className="py-3 text-[#8A715F]">{trip.startDate} – {trip.endDate}</td>
                  <td className="py-3 font-bold text-[#4A2E18]">${trip.budget?.toLocaleString()}</td>
                  <td className="py-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FAF7F2] border border-[#EADBCE] text-[#C88A4B]">
                      {trip.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
