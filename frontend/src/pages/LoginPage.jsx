import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthHeroCarousel from '../components/AuthHeroCarousel';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: 'alex@example.com', password: 'password123' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const ok = login(form.email, form.password);
    setLoading(false);
    if (ok) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-[#f8f9fc]">
      {/* Left Column — Auto-scrolling Hero Carousel with Assit images */}
      <AuthHeroCarousel />

      {/* Right Column — Authentication Form */}
      <div className="w-full lg:w-5/12 flex flex-col justify-center items-center px-6 sm:px-12 xl:px-16 py-12 bg-white shadow-2xl z-10">
        <div className="w-full max-w-md">
          {/* Brand Header */}
          <div className="flex items-center gap-3.5 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#0057d9] flex items-center justify-center text-white shadow-lg shadow-[#0057d9]/25">
              <span className="material-symbols-outlined text-2xl">flight_takeoff</span>
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#0041a7] tracking-tight">GlobeTrotter</h1>
              <p className="text-xs text-[#737686] font-semibold tracking-wide">AI-Powered Travel Planner</p>
            </div>
          </div>

          {/* Welcome heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#191c1e] mb-2 tracking-tight">Welcome back</h2>
            <p className="text-sm text-[#424654]">
              Log in to manage your itineraries, explore destinations, and track budgets.
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2.5">
              <span className="material-symbols-outlined text-red-500 text-lg">error</span>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#424654] mb-2" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737686] text-xl">
                  mail
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="alex@example.com"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className="w-full pl-11 pr-4 py-3 bg-[#f8f9fc] border border-[#c3c6d7] rounded-xl text-sm text-[#191c1e] placeholder:text-[#737686] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0057d9]/20 focus:border-[#0057d9] transition-all shadow-sm"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#424654]" htmlFor="password">
                  Password
                </label>
                <Link to="/login" className="text-xs font-medium text-[#0057d9] hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737686] text-xl">
                  lock
                </span>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                  className="w-full pl-11 pr-4 py-3 bg-[#f8f9fc] border border-[#c3c6d7] rounded-xl text-sm text-[#191c1e] placeholder:text-[#737686] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0057d9]/20 focus:border-[#0057d9] transition-all shadow-sm"
                  required
                />
              </div>
            </div>

            {/* Quick Demo Hint */}
            <div className="p-3 bg-[#0057d9]/5 border border-[#0057d9]/15 rounded-xl text-xs text-[#0041a7] flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">info</span>
              <span>Demo credentials pre-filled. Click Sign In to proceed.</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-[#0057d9] text-white rounded-xl text-sm font-semibold shadow-md shadow-[#0057d9]/25 hover:bg-[#0041a7] active:scale-[0.99] transition-all duration-200 flex justify-center items-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-grow border-t border-[#c3c6d7]/40" />
            <span className="px-3 text-xs text-[#737686] font-semibold uppercase tracking-wider">Or</span>
            <div className="flex-grow border-t border-[#c3c6d7]/40" />
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-[#424654]">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#0057d9] font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
