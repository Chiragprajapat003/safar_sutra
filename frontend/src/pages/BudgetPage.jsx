import { useTrips } from '../context/TripContext';
import { mockBudget } from '../services/mockData';

function DonutChart({ categories }) {
  const total = categories.reduce((s, c) => s + Math.abs(c.amount), 0);
  let cumulative = 0;
  const r = 60, cx = 70, cy = 70, stroke = 24;
  const circumference = 2 * Math.PI * r;
  const segments = categories.map(cat => {
    const pct = Math.abs(cat.amount) / total;
    const dasharray = pct * circumference;
    const offset = circumference - cumulative * circumference;
    cumulative += pct;
    return { ...cat, dasharray, offset };
  });

  return (
    <svg width={140} height={140} viewBox="0 0 140 140">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#eceef0" strokeWidth={stroke} />
      {segments.map((seg, i) => (
        <circle
          key={i}
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={seg.color}
          strokeWidth={stroke}
          strokeDasharray={`${seg.dasharray} ${circumference - seg.dasharray}`}
          strokeDashoffset={seg.offset}
          style={{ transform: 'rotate(-90deg)', transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}
      <text x={cx} y={cy - 6} textAnchor="middle" className="text-[10px] fill-[#424654]" style={{ fontSize: 10 }}>Spent</text>
      <text x={cx} y={cy + 14} textAnchor="middle" className="text-[18px] font-bold fill-[#191c1e]" style={{ fontSize: 18, fontWeight: 700 }}>
        ${mockBudget.spent.toLocaleString()}
      </text>
    </svg>
  );
}

export default function BudgetPage() {
  const { trips } = useTrips();
  const budget = mockBudget;
  const remaining = budget.total - budget.spent;
  const pct = Math.round((budget.spent / budget.total) * 100);

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-16 py-10">
      <h1 className="text-3xl font-semibold text-[#191c1e] mb-2">Budget Dashboard</h1>
      <p className="text-base text-[#424654] mb-8">Track your travel expenses across all trips.</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Budget', value: `$${budget.total.toLocaleString()}`, icon: 'account_balance_wallet', color: '#0057d9' },
          { label: 'Total Spent', value: `$${budget.spent.toLocaleString()}`, icon: 'payments', color: '#fe7944' },
          { label: 'Remaining', value: `$${remaining.toLocaleString()}`, icon: 'savings', color: '#2ecc71' },
          { label: 'Trips Active', value: trips.length, icon: 'luggage', color: '#624315' },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-5 shadow-ambient-md border border-[#c3c6d7]/20">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${color}15` }}>
              <span className="material-symbols-outlined" style={{ color }}>{icon}</span>
            </div>
            <p className="text-2xl font-bold text-[#191c1e]">{value}</p>
            <p className="text-xs text-[#424654] mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Donut Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-ambient-md border border-[#c3c6d7]/20">
          <h2 className="text-lg font-semibold text-[#191c1e] mb-6">Spending by Category</h2>
          <div className="flex items-center gap-8">
            <DonutChart categories={budget.categories} />
            <div className="flex-1 space-y-3">
              {budget.categories.map(cat => (
                <div key={cat.name} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                  <div className="flex-1 flex justify-between items-center">
                    <span className="text-sm text-[#424654]">{cat.name}</span>
                    <span className="text-sm font-semibold text-[#191c1e]">${Math.abs(cat.amount)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-ambient-md border border-[#c3c6d7]/20">
          <h2 className="text-lg font-semibold text-[#191c1e] mb-6">Budget Progress</h2>

          {/* Overall */}
          <div className="mb-5">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-[#191c1e]">Overall Budget</span>
              <span className="text-[#424654]">{pct}% used</span>
            </div>
            <div className="w-full bg-[#eceef0] h-3 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${pct}%`, backgroundColor: pct > 80 ? '#ba1a1a' : pct > 60 ? '#fe7944' : '#0057d9' }}
              />
            </div>
            <div className="flex justify-between text-xs text-[#424654] mt-1">
              <span>$0</span><span>${budget.total.toLocaleString()}</span>
            </div>
          </div>

          {/* Per-category bars */}
          {budget.categories.map(cat => {
            const p = Math.round((cat.amount / budget.total) * 100);
            return (
              <div key={cat.name} className="mb-3">
                <div className="flex justify-between text-xs text-[#424654] mb-1">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm" style={{ color: cat.color }}>{cat.icon}</span>
                    {cat.name}
                  </span>
                  <span className="font-medium text-[#191c1e]">${Math.abs(cat.amount)}</span>
                </div>
                <div className="w-full bg-[#eceef0] h-2 rounded-full">
                  <div className="h-full rounded-full" style={{ width: `${Math.abs(p)}%`, backgroundColor: cat.color }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Per-trip breakdown */}
      <div className="bg-white rounded-2xl p-6 shadow-ambient-md border border-[#c3c6d7]/20">
        <h2 className="text-lg font-semibold text-[#191c1e] mb-5">Budget by Trip</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#c3c6d7]/30">
                {['Trip', 'Dates', 'Total Budget', 'Spent', 'Remaining', 'Progress'].map(h => (
                  <th key={h} className="text-left py-2 px-3 text-xs font-semibold text-[#424654] uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3c6d7]/20">
              {trips.map(trip => {
                const spent = (trip.days || []).reduce((s, d) => s + (d.activities || []).reduce((a, act) => a + (act.cost || 0), 0), 0);
                const rem = (trip.budget || 0) - spent;
                const p = trip.budget ? Math.round((spent / trip.budget) * 100) : 0;
                return (
                  <tr key={trip.id} className="hover:bg-[#f8f9fc] transition-colors">
                    <td className="py-3 px-3 font-medium text-[#191c1e]">{trip.name}</td>
                    <td className="py-3 px-3 text-[#424654]">{trip.startDate} – {trip.endDate}</td>
                    <td className="py-3 px-3 font-semibold">${trip.budget?.toLocaleString()}</td>
                    <td className="py-3 px-3 text-[#fe7944] font-medium">${spent.toLocaleString()}</td>
                    <td className={`py-3 px-3 font-medium ${rem >= 0 ? 'text-green-600' : 'text-[#ba1a1a]'}`}>${rem.toLocaleString()}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-[#eceef0] h-2 rounded-full">
                          <div className="h-full rounded-full bg-[#0057d9]" style={{ width: `${Math.min(p, 100)}%` }} />
                        </div>
                        <span className="text-xs text-[#424654] w-8">{p}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

