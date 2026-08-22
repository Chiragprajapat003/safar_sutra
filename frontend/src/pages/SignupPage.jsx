import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthHeroCarousel from '../components/AuthHeroCarousel';

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email) e.email = 'Email is required';
    if (!form.password || form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    signup(form.name, form.email, form.password);
    navigate('/dashboard');
  };

  return (
    <div className="flex w-full min-h-screen bg-[#f8f9fc]">
      {/* Left Column — Auto-scrolling Hero Carousel with Assit images */}
      <AuthHeroCarousel />

      {/* Right Column — Signup Form */}
      <div className="w-full lg:w-5/12 flex flex-col justify-center items-center px-6 sm:px-12 xl:px-16 py-10 bg-white shadow-2xl z-10 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Brand Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-2xl bg-[#0057d9] flex items-center justify-center text-white shadow-md shadow-[#0057d9]/20">
              <span className="material-symbols-outlined text-2xl">flight_takeoff</span>
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#0041a7] tracking-tight">GlobeTrotter</h1>
              <p className="text-xs text-[#737686] font-semibold">Smart Travel Planner</p>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-[#191c1e] mb-1.5 tracking-tight">Create your account</h2>
            <p className="text-sm text-[#424654]">
              Join GlobeTrotter to curate dream itineraries and explore the world.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#424654] mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737686] text-xl">
                  person
                </span>
                <input
                  type="text"
                  placeholder="Alex Johnson"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className={`w-full pl-11 pr-4 py-2.5 bg-[#f8f9fc] border rounded-xl text-sm text-[#191c1e] placeholder:text-[#737686] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0057d9]/20 focus:border-[#0057d9] transition-all shadow-sm ${
                    errors.name ? 'border-red-500 bg-red-50/50' : 'border-[#c3c6d7]'
                  }`}
                  required
                />
              </div>
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#424654] mb-1.5">
                Email address
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737686] text-xl">
                  mail
                </span>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className={`w-full pl-11 pr-4 py-2.5 bg-[#f8f9fc] border rounded-xl text-sm text-[#191c1e] placeholder:text-[#737686] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0057d9]/20 focus:border-[#0057d9] transition-all shadow-sm ${
                    errors.email ? 'border-red-500 bg-red-50/50' : 'border-[#c3c6d7]'
                  }`}
                  required
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#424654] mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737686] text-xl">
                  lock
                </span>
                <input
                  type="password"
                  placeholder="At least 6 characters"
                  value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                  className={`w-full pl-11 pr-4 py-2.5 bg-[#f8f9fc] border rounded-xl text-sm text-[#191c1e] placeholder:text-[#737686] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0057d9]/20 focus:border-[#0057d9] transition-all shadow-sm ${
                    errors.password ? 'border-red-500 bg-red-50/50' : 'border-[#c3c6d7]'
                  }`}
                  required
                />
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#424654] mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737686] text-xl">
                  lock_reset
                </span>
                <input
                  type="password"
                  placeholder="Repeat your password"
                  value={form.confirm}
                  onChange={(e) => setForm((p) => ({ ...p, confirm: e.target.value }))}
                  className={`w-full pl-11 pr-4 py-2.5 bg-[#f8f9fc] border rounded-xl text-sm text-[#191c1e] placeholder:text-[#737686] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0057d9]/20 focus:border-[#0057d9] transition-all shadow-sm ${
                    errors.confirm ? 'border-red-500 bg-red-50/50' : 'border-[#c3c6d7]'
                  }`}
                  required
                />
              </div>
              {errors.confirm && <p className="mt-1 text-xs text-red-600">{errors.confirm}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#0057d9] text-white rounded-xl text-sm font-semibold shadow-md shadow-[#0057d9]/25 hover:bg-[#0041a7] active:scale-[0.99] transition-all duration-200 flex justify-center items-center gap-2 cursor-pointer disabled:opacity-60 mt-2"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
              ) : (
                <>
                  <span>Create Account</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Already have an account */}
          <p className="text-center text-sm text-[#424654] mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#0057d9] font-bold hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
