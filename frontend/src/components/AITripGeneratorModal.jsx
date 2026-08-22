import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateAITripPlan, getStoredApiKey, setStoredApiKey } from '../services/aiService';
import { useTrips } from '../context/TripContext';

export default function AITripGeneratorModal({ isOpen, onClose }) {
  const { addTrip } = useTrips();
  const navigate = useNavigate();

  const [destination, setDestination] = useState('Kedarnath & Badrinath');
  const [days, setDays] = useState(4);
  const [budget, setBudget] = useState(1800);
  const [interests, setInterests] = useState('Spiritual, Mountain Treks, Aarti');
  const [travelers, setTravelers] = useState('Family');
  const [apiKey, setApiKey] = useState(getStoredApiKey());
  const [showKeyInput, setShowKeyInput] = useState(false);

  const [loading, setLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);

  if (!isOpen) return null;

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!destination.trim()) return;
    setLoading(true);

    try {
      const plan = await generateAITripPlan({
        destination,
        days: Number(days),
        budget: Number(budget),
        interests,
        travelers,
      });
      setGeneratedPlan(plan);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToMyTrips = () => {
    if (!generatedPlan) return;
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 14);
    const endDate = new Date(futureDate);
    endDate.setDate(futureDate.getDate() + (Number(days) || 3));

    const newTrip = addTrip({
      name: generatedPlan.name || `${destination} Yatra`,
      startDate: futureDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      budget: Number(generatedPlan.budget) || Number(budget) || 2000,
      description: generatedPlan.description || `AI-generated custom trip for ${destination}.`,
      coverImage: destination.toLowerCase().includes('ayodhya')
        ? '/assets/Ayodhya-Ram-Mandir-Images15.jpg'
        : destination.toLowerCase().includes('jaipur')
        ? '/assets/Jaipur.jpeg'
        : destination.toLowerCase().includes('assam')
        ? '/assets/Assam.jpeg'
        : '/assets/andaman-nicobar.jpg',
      status: 'planning',
      progress: 25,
      stops: generatedPlan.stops || [destination],
      days: generatedPlan.days || [],
    });

    onClose();
    navigate(`/trips/${newTrip.id}/builder`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fadeIn select-none">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-[#EADBCE] shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-5 pb-3 border-b border-[#EADBCE]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#4A2E18] text-[#E8C59A] flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-2xl">auto_awesome</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#C88A4B] uppercase tracking-wider">
                Real AI Recommendation Engine
              </span>
              <h2 className="text-xl font-extrabold text-[#2A180C]">Safar-sutra AI Trip Builder</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#FAF7F2] text-[#8A715F] flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* API Key Toggle Banner */}
        <div className="mb-5 p-3.5 bg-[#FAF7F2] border border-[#EADBCE] rounded-2xl flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#5A4536]">
              <span className="material-symbols-outlined text-base text-[#C88A4B]">key</span>
              <span>{apiKey ? '✓ Custom AI API Key Connected' : 'Using Smart AI Engine (Add Gemini/OpenAI Key for live models)'}</span>
            </div>
            <button
              onClick={() => setShowKeyInput(!showKeyInput)}
              className="text-[11px] font-bold text-[#4A2E18] hover:underline cursor-pointer"
            >
              {showKeyInput ? 'Hide' : 'Configure Key'}
            </button>
          </div>

          {showKeyInput && (
            <div className="flex gap-2 pt-2 border-t border-[#EADBCE]">
              <input
                type="password"
                placeholder="Paste Google Gemini API Key or OpenAI Key (sk-...)"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1 px-3 py-1.5 bg-white border border-[#D8C6B6] rounded-xl text-xs text-[#2A180C]"
              />
              <button
                type="button"
                onClick={() => {
                  setStoredApiKey(apiKey);
                  setShowKeyInput(false);
                }}
                className="bg-[#4A2E18] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
              >
                Save
              </button>
            </div>
          )}
        </div>

        {!generatedPlan ? (
          /* Step 1: Input Form */
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#5A4536] mb-1">Destination / Sacred Place *</label>
              <input
                type="text"
                placeholder="e.g. Kedarnath & Badrinath, Varanasi, Jaipur & Udaipur..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#D8C6B6] rounded-xl text-xs text-[#2A180C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4A2E18]/15"
                required
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#5A4536] mb-1">Duration (Days)</label>
                <input
                  type="number"
                  min="1"
                  max="15"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D8C6B6] rounded-xl text-xs text-[#2A180C]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#5A4536] mb-1">Total Budget ($)</label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D8C6B6] rounded-xl text-xs text-[#2A180C]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#5A4536] mb-1">Travelers</label>
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D8C6B6] rounded-xl text-xs text-[#2A180C]"
                >
                  {['Family', 'Couple', 'Solo Explorer', 'Friends Group'].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#5A4536] mb-1">Interests & Highlights</label>
              <input
                type="text"
                placeholder="e.g. Aarti timings, temple corridors, photography, satvik thali, wildlife"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                className="w-full px-4 py-2 bg-[#FAF7F2] border border-[#D8C6B6] rounded-xl text-xs text-[#2A180C]"
              />
            </div>

            {/* Quick Inspiration Pills */}
            <div>
              <span className="text-[11px] font-bold text-[#8A715F] block mb-1.5">Try popular destinations:</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Kedarnath & Rishikesh Yatra',
                  'Ayodhya & Kashi Corridors',
                  'Royal Jaipur & Udaipur',
                  'Kaziranga & Brahmaputra',
                  'Andaman Coral Islands',
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setDestination(item)}
                    className="px-2.5 py-1 rounded-lg bg-[#FAF7F2] hover:bg-[#F5ECE1] border border-[#D8C6B6] text-[11px] font-semibold text-[#5A4536] cursor-pointer"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

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
                className="px-6 py-2.5 bg-[#4A2E18] hover:bg-[#341F0E] text-[#FFFDF9] rounded-xl text-xs font-bold shadow-md shadow-[#4A2E18]/25 flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                    <span>AI Crafting Itinerary...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-sm text-[#E8C59A]">auto_awesome</span>
                    <span>Generate AI Itinerary</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Step 2: Generated AI Plan Preview */
          <div className="space-y-5 animate-fadeIn">
            <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#EADBCE]">
              <span className="px-2.5 py-0.5 rounded-md bg-[#4A2E18] text-[#E8C59A] text-[10px] font-bold uppercase">
                AI Generated Itinerary
              </span>
              <h3 className="text-lg font-bold text-[#2A180C] mt-1.5">{generatedPlan.name}</h3>
              <p className="text-xs text-[#6B5646] mt-1">{generatedPlan.description}</p>
              <div className="flex gap-4 text-xs font-semibold text-[#8A715F] mt-2 pt-2 border-t border-[#EADBCE]">
                <span>Budget: <strong>${generatedPlan.budget}</strong></span>
                <span>Stops: <strong>{generatedPlan.stops?.join(', ')}</strong></span>
                <span>Days: <strong>{generatedPlan.days?.length} Days</strong></span>
              </div>
            </div>

            {/* Day by Day Activity List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {generatedPlan.days?.map((d) => (
                <div key={d.day} className="p-3.5 bg-white rounded-xl border border-[#EADBCE] shadow-2xs">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded-full bg-[#4A2E18] text-[#E8C59A] flex items-center justify-center text-[10px] font-bold">
                      {d.day}
                    </span>
                    <span className="text-xs font-bold text-[#2A180C]">{d.city || `Day ${d.day}`}</span>
                  </div>
                  <div className="space-y-1.5 pl-7">
                    {d.activities?.map((act, idx) => (
                      <div key={idx} className="text-xs text-[#5A4536] flex justify-between items-center">
                        <span className="flex items-center gap-1.5">
                          <span className="text-[#C88A4B] font-bold text-[10px]">{act.time || '09:00'}</span>
                          <span>{act.name}</span>
                        </span>
                        <span className="text-[11px] font-semibold text-[#8A715F]">
                          {act.cost > 0 ? `$${act.cost}` : 'Free'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-2 border-t border-[#EADBCE]">
              <button
                type="button"
                onClick={() => setGeneratedPlan(null)}
                className="px-4 py-2 bg-[#FAF7F2] text-[#5A4536] rounded-xl text-xs font-bold cursor-pointer"
              >
                ← Regenerate / Modify
              </button>
              <button
                type="button"
                onClick={handleSaveToMyTrips}
                className="px-6 py-2.5 bg-[#4A2E18] hover:bg-[#341F0E] text-[#FFFDF9] rounded-xl text-xs font-bold shadow-md shadow-[#4A2E18]/25 flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm text-[#E8C59A]">save</span>
                <span>Save to My Yatras & Edit</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
