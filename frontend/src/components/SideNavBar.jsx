import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/dashboard', label: 'Home', icon: 'home' },
  { to: '/trips', label: 'My Trips', icon: 'luggage' },
  { to: '/explore', label: 'Explore', icon: 'explore' },
  { to: '/calendar', label: 'Calendar', icon: 'calendar_month' },
  { to: '/budget', label: 'Budget', icon: 'payments' },
  { to: '/profile', label: 'Profile', icon: 'account_circle' },
];

export default function SideNavBar({ onPlanTrip }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="hidden lg:flex flex-col h-screen fixed left-0 top-0 py-6 border-r border-[#c3c6d7]/30 bg-[#f2f4f6] w-64 z-40">
      {/* Brand */}
      <div className="px-6 mb-8 flex items-center gap-2.5">
        <span className="material-symbols-outlined text-3xl text-[#C88A4B]">temple_hindu</span>
        <div>
          <h1 className="text-xl font-black text-[#4A2E18]">Safar-sutra</h1>
          <p className="text-xs text-[#8A715F] font-medium">Travel Planner</p>
        </div>
      </div>

      {/* Plan New Trip CTA */}
      <div className="px-4 mb-6">
        <button
          onClick={onPlanTrip}
          className="w-full bg-[#0057d9] text-white text-sm font-medium rounded-xl py-3 px-4 flex items-center justify-center gap-2 hover:bg-[#0041a7] transition-colors"
        >
          <span className="material-symbols-outlined filled text-lg">add</span>
          Plan New Trip
        </button>
      </div>

      {/* Nav Links */}
      <ul className="flex-1 overflow-y-auto px-2 space-y-1">
        {navItems.map(item => {
          const active = location.pathname === item.to || location.pathname.startsWith(item.to + '/');
          return (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`rounded-xl mx-2 px-4 py-3 flex items-center gap-3 transition-all duration-200 text-sm font-medium ${
                  active
                    ? 'bg-[#fe7944] text-white'
                    : 'text-[#424654] hover:bg-[#e1e2e5]/50 hover:text-[#0041a7]'
                }`}
              >
                <span className={`material-symbols-outlined ${active ? 'filled' : ''}`}>{item.icon}</span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* User + Logout */}
      <div className="mt-auto px-2 pt-4 border-t border-[#c3c6d7]/30 space-y-1">
        <div className="flex items-center gap-3 px-4 py-3">
          <img src={user?.avatar} alt={user?.name} className="w-9 h-9 rounded-full object-cover border border-[#c3c6d7]/30" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#191c1e] truncate">{user?.name}</p>
            <p className="text-xs text-[#424654] truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="text-[#424654] hover:bg-[#e1e2e5]/50 hover:text-[#ba1a1a] rounded-xl mx-2 px-4 py-3 flex items-center gap-3 transition-all duration-200 text-sm font-medium w-[calc(100%-16px)]"
        >
          <span className="material-symbols-outlined">logout</span>
          Log out
        </button>
      </div>
    </nav>
  );
}

