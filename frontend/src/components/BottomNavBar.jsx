import { Link, useLocation } from 'react-router-dom';

const tabs = [
  { to: '/dashboard', label: 'Home', icon: 'home' },
  { to: '/trips', label: 'Trips', icon: 'luggage' },
  { to: '/explore', label: 'Explore', icon: 'explore' },
  { to: '/calendar', label: 'Calendar', icon: 'calendar_month' },
  { to: '/profile', label: 'Menu', icon: 'menu' },
];

export default function BottomNavBar({ onPlanTrip }) {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 pb-safe border-t border-[#c3c6d7]/20 shadow-lg bg-[#f8f9fc] rounded-t-2xl">
      {tabs.map((tab, i) => {
        // FAB center button
        if (i === 2) {
          return (
            <div key="fab" className="flex flex-col items-center -mt-6">
              <button
                onClick={onPlanTrip}
                className="bg-[#0057d9] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-ambient-high"
              >
                <span className="material-symbols-outlined text-3xl">add</span>
              </button>
            </div>
          );
        }
        const active = location.pathname === tab.to || location.pathname.startsWith(tab.to + '/');
        return (
          <Link
            key={tab.to}
            to={tab.to}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
              active ? 'text-[#0041a7]' : 'text-[#424654]'
            }`}
          >
            <span className={`material-symbols-outlined text-2xl ${active ? 'filled' : ''}`}>{tab.icon}</span>
            <span className="text-xs font-semibold mt-0.5">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

