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

  const handleGoogleSignUp = async () => {
    setLoading(true);
    // Simulate standard Google authentication flow delay
    await new Promise((r) => setTimeout(r, 600));
    // Sign up and auto-log in with Google details
    signup('Google User', 'google.user@example.com', 'googlepassword123');
    setLoading(false);
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

          {/* Divider */}
          <div className="my-5 flex items-center">
            <div className="flex-grow border-t border-[#c3c6d7]/40" />
            <span className="px-3 text-xs text-[#737686] font-semibold uppercase tracking-wider">Or continue with</span>
            <div className="flex-grow border-t border-[#c3c6d7]/40" />
          </div>

          {/* Google Sign Up Button */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="w-full mb-4 py-2.5 px-4 bg-white border border-[#c3c6d7] hover:border-[#0057d9] hover:bg-[#0057d9]/5 text-[#191c1e] rounded-xl text-sm font-semibold flex justify-center items-center gap-2.5 shadow-sm active:scale-[0.99] transition-all duration-200 cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign up with Google</span>
          </button>

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
