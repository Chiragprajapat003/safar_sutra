import { Link, useLocation } from 'react-router-dom';

const tabs = [
  { to: '/dashboard', label: 'Home', icon: 'home' },
  { to: '/trips', label: 'Trips', icon: 'luggage' },
  { to: '/explore', label: 'Explore', icon: 'explore' },
  { to: '/calendar', label: 'Calendar', icon: 'calendar_month' },
  { to: '/budget', label: 'Budget', icon: 'account_balance_wallet' },
];

export default function BottomNavBar({ onPlanTrip }) {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-2 py-2 bg-white/95 backdrop-blur-lg border-t border-[#EADBCE] shadow-2xl rounded-t-3xl">
      {tabs.map((tab, i) => {
        if (i === 2) {
          return (
            <div key="fab" className="flex flex-col items-center -mt-6">
              <button
                onClick={onPlanTrip}
                className="bg-[#4A2E18] text-[#FFFDF9] w-12 h-12 rounded-full flex items-center justify-center shadow-lg shadow-[#4A2E18]/40 border-2 border-[#D4A373] active:scale-95 transition-transform"
                title="Plan New Trip"
              >
                <span className="material-symbols-outlined text-2xl text-[#E8C59A]">add</span>
              </button>
            </div>
          );
        }
        const active = location.pathname === tab.to || (tab.to !== '/dashboard' && location.pathname.startsWith(tab.to + '/'));
        return (
          <Link
            key={tab.to}
            to={tab.to}
            className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-xl transition-all ${
              active ? 'text-[#4A2E18] font-bold' : 'text-[#8A715F] font-medium'
            }`}
          >
            <span className={`material-symbols-outlined text-xl ${active ? 'text-[#4A2E18]' : 'text-[#8A715F]'}`}>
              {tab.icon}
            </span>
            <span className="text-[10px] mt-0.5">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
