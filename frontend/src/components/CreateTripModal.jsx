import { useState } from 'react';
import { useTrips } from '../context/TripContext';

export default function CreateTripModal({ onClose, onCreated }) {
  const { addTrip } = useTrips();
  const [form, setForm] = useState({
    name: '',
    startDate: '',
    endDate: '',
    description: '',
    budget: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Trip name is required';
    if (!form.startDate) e.startDate = 'Start date is required';
    if (!form.endDate) e.endDate = 'End date is required';
    if (form.startDate && form.endDate && form.endDate < form.startDate)
      e.endDate = 'End date must be after start date';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const trip = addTrip({
      ...form,
      budget: Number(form.budget) || 0,
      coverImage: `https://lh3.googleusercontent.com/aida-public/AB6AXuAbvyzdwWjwWx72cKKz2KZuZL6EhydF9tvP8WmNlQIlajYbY8UVWfnKwElr7NJ6Y8awOTlV4HMd_CITNB1UVEnjp4np7zr33DoGVK0fp7YWj_0TDDjRs3RdPA5G_iTZ7zUYKHUwdfYI0sB8APid_Z7JH19yRi2JkRY2xtJrPigwhz1ljvOwmjs0J-dZq4UlBRv8Y3bSLsxJnneGcZpetdzbNRJ-HAzjOWExjMTdZe73KhD0I7Rn3wEW`,
    });
    onCreated(trip);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-ambient-high w-full max-w-lg animate-[fadeIn_0.2s_ease]">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-[#c3c6d7]/30">
          <h2 className="text-2xl font-semibold text-[#191c1e] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0057d9]">flight_takeoff</span>
            Plan New Trip
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-[#eceef0] text-[#424654] transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
          {/* Trip Name */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-[#191c1e]">Trip Name *</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#737686]">luggage</span>
              <input
                type="text"
                placeholder="e.g. Tokyo Adventure 2024"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0041a7]/20 focus:border-[#0041a7] transition-all shadow-sm ${errors.name ? 'border-[#ba1a1a]' : 'border-[#c3c6d7]'}`}
              />
            </div>
            {errors.name && <p className="text-xs text-[#ba1a1a]">{errors.name}</p>}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[#191c1e]">Start Date *</label>
              <input
                type="date"
                value={form.startDate}
                onChange={e => setForm(p => ({ ...p, startDate: e.target.value }))}
                className={`w-full px-3 py-3 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0041a7]/20 focus:border-[#0041a7] transition-all shadow-sm ${errors.startDate ? 'border-[#ba1a1a]' : 'border-[#c3c6d7]'}`}
              />
              {errors.startDate && <p className="text-xs text-[#ba1a1a]">{errors.startDate}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[#191c1e]">End Date *</label>
              <input
                type="date"
                value={form.endDate}
                onChange={e => setForm(p => ({ ...p, endDate: e.target.value }))}
                className={`w-full px-3 py-3 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0041a7]/20 focus:border-[#0041a7] transition-all shadow-sm ${errors.endDate ? 'border-[#ba1a1a]' : 'border-[#c3c6d7]'}`}
              />
              {errors.endDate && <p className="text-xs text-[#ba1a1a]">{errors.endDate}</p>}
            </div>
          </div>

          {/* Budget */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-[#191c1e]">Budget (USD)</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#737686]">attach_money</span>
              <input
                type="number"
                placeholder="e.g. 3000"
                value={form.budget}
                onChange={e => setForm(p => ({ ...p, budget: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 bg-white border border-[#c3c6d7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0041a7]/20 focus:border-[#0041a7] transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-[#191c1e]">Description</label>
            <textarea
              rows={3}
              placeholder="What are you looking forward to?"
              value={form.description}
              onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              className="w-full px-4 py-3 bg-white border border-[#c3c6d7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0041a7]/20 focus:border-[#0041a7] transition-all shadow-sm resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 px-4 border border-[#c3c6d7] rounded-xl text-sm font-medium text-[#424654] hover:bg-[#eceef0] transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-3 px-4 bg-[#0057d9] text-white rounded-xl text-sm font-medium hover:bg-[#0041a7] transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
              Create & Build Itinerary
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

