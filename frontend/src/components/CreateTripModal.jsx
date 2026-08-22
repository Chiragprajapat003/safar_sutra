import { useState } from 'react';
import { useTrips } from '../context/TripContext';

const DEFAULT_COVERS = [
  { label: 'Ayodhya Mandir', url: '/assets/Ayodhya-Ram-Mandir-Images15.jpg' },
  { label: 'Jaipur Fort', url: '/assets/Jaipur.jpeg' },
  { label: 'Assam Hills', url: '/assets/Assam.jpeg' },
  { label: 'Andaman Beach', url: '/assets/andaman-nicobar.jpg' },
];

export default function CreateTripModal({ isOpen, onClose, onCreated }) {
  const { addTrip } = useTrips();
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState(DEFAULT_COVERS[0].url);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !startDate || !endDate) return;

    setLoading(true);
    const newTrip = addTrip({
      name,
      startDate,
      endDate,
      budget: Number(budget) || 2500,
      description: description || 'Sacred pilgrimage and cultural tour created with Safar-sutra.',
      coverImage,
      status: 'planning',
      progress: 10,
      stops: [name.split(' ')[0] || 'Destination'],
      days: [],
    });
    setLoading(false);
    onClose();
    if (onCreated) onCreated(newTrip);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#EADBCE] shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-5 pb-3 border-b border-[#EADBCE]">
          <div>
            <span className="text-[10px] font-bold text-[#C88A4B] uppercase tracking-wider">Plan New Journey</span>
            <h2 className="text-xl font-bold text-[#2A180C]">Create Trip / Yatra</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#FAF7F2] text-[#8A715F] flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Trip Name */}
          <div>
            <label className="block text-xs font-bold text-[#5A4536] mb-1">Trip Name *</label>
            <input
              type="text"
              placeholder="e.g. Sacred Ayodhya & Varanasi Heritage"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#D8C6B6] rounded-xl text-xs text-[#2A180C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4A2E18]/15"
              required
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#5A4536] mb-1">Start Date *</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D8C6B6] rounded-xl text-xs text-[#2A180C]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#5A4536] mb-1">End Date *</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D8C6B6] rounded-xl text-xs text-[#2A180C]"
                required
              />
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-xs font-bold text-[#5A4536] mb-1">Estimated Budget ($)</label>
            <input
              type="number"
              placeholder="3500"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-4 py-2 bg-[#FAF7F2] border border-[#D8C6B6] rounded-xl text-xs text-[#2A180C]"
            />
          </div>

          {/* Cover Photo Selection */}
          <div>
            <label className="block text-xs font-bold text-[#5A4536] mb-2">Select Cover Photo</label>
            <div className="grid grid-cols-4 gap-2">
              {DEFAULT_COVERS.map((cov) => (
                <div
                  key={cov.url}
                  onClick={() => setCoverImage(cov.url)}
                  className={`relative h-16 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                    coverImage === cov.url ? 'border-[#4A2E18] scale-95 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={cov.url} alt={cov.label} className="w-full h-full object-cover" />
                  {coverImage === cov.url && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-[#4A2E18] text-[#E8C59A] rounded-full flex items-center justify-center text-[10px]">
                      ✓
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-[#5A4536] mb-1">Description & Goals</label>
            <textarea
              rows="2"
              placeholder="What are you hoping to experience on this sacred journey?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D8C6B6] rounded-xl text-xs text-[#2A180C]"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2.5 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#FAF7F2] text-[#5A4536] rounded-xl text-xs font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-[#4A2E18] hover:bg-[#341F0E] text-[#FFFDF9] rounded-xl text-xs font-bold shadow-md shadow-[#4A2E18]/20 cursor-pointer disabled:opacity-60"
            >
              {loading ? 'Creating...' : 'Create & Plan Itinerary'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
