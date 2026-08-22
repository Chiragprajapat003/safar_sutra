import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { to: '/dashboard', label: 'Home', icon: 'home' },
  { to: '/trips', label: 'My Trips', icon: 'luggage' },
  { to: '/explore', label: 'Explore', icon: 'explore' },
  { to: '/calendar', label: 'Calendar', icon: 'calendar_month' },
  { to: '/budget', label: 'Budget', icon: 'payments' },
];

export default function TopNavBar({ onPlanTrip }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [searchVal, setSearchVal] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="hidden md:flex justify-between items-center w-full px-16 h-20 max-w-[1440px] mx-auto z-50 bg-white shadow-ambient-low sticky top-0">
      {/* Brand + Nav Links */}
      <div className="flex items-center gap-8">
        <Link
          to="/dashboard"
          className="text-2xl font-black text-[#0041a7] tracking-tight"
          style={{ fontSize: 24, fontWeight: 900 }}
        >
          GlobeTrotter
        </Link>
        <div className="flex items-center gap-6">
          {navLinks.slice(0, 3).map(link => {
            const active = location.pathname === link.to || location.pathname.startsWith(link.to + '/');
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors pb-1 ${
                  active
                    ? 'text-[#0041a7] border-b-2 border-[#0041a7]'
                    : 'text-[#424654] hover:text-[#0041a7]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative hidden lg:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#737686] text-xl">search</span>
          <input
            type="text"
            placeholder="Search destinations..."
            className="pl-10 pr-4 py-2 bg-[#f2f4f6] border border-[#c3c6d7]/50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#0041a7]/20 focus:border-[#0041a7] transition-all w-64"
          />
        </div>
        {/* CTA */}
        <button
          onClick={onPlanTrip}
          className="bg-[#0057d9] text-white rounded-full px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2 shadow-ambient-low"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Plan New Trip
        </button>
        {/* Notifications */}
        <button className="p-2 text-[#424654] hover:text-[#0041a7] transition-colors rounded-full hover:bg-[#e1e2e5]/50">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        {/* Avatar with logout */}
        <div className="relative group">
          <button className="w-10 h-10 rounded-full overflow-hidden border border-[#c3c6d7]/30 hover:border-[#0041a7] transition-colors">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-full h-full object-cover"
            />
          </button>
          <div className="absolute right-0 top-12 bg-white rounded-xl shadow-ambient-high border border-[#c3c6d7]/30 py-2 w-48 hidden group-hover:block z-50">
            <div className="px-4 py-2 border-b border-[#c3c6d7]/30">
              <p className="text-sm font-semibold text-[#191c1e]">{user?.name}</p>
              <p className="text-xs text-[#424654]">{user?.email}</p>
            </div>
            <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-[#424654] hover:bg-[#f2f4f6] hover:text-[#0041a7] transition-colors">
              <span className="material-symbols-outlined text-base">account_circle</span> Profile
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm text-[#424654] hover:bg-[#f2f4f6] hover:text-[#ba1a1a] transition-colors w-full text-left">
              <span className="material-symbols-outlined text-base">logout</span> Log out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

