export default function Toast({ message, type = 'success' }) {
  const bg = type === 'success' ? 'bg-[#0057d9]' : type === 'info' ? 'bg-[#424654]' : 'bg-[#ba1a1a]';
  const icon = type === 'success' ? 'check_circle' : type === 'info' ? 'info' : 'error';
  return (
    <div className={`fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-[200] ${bg} text-white px-5 py-3 rounded-full shadow-ambient-high flex items-center gap-2 text-sm font-medium animate-[slideUp_0.3s_ease]`}>
      <span className="material-symbols-outlined text-lg">{icon}</span>
      {message}
    </div>
  );
}

