import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AIChatBot from '../components/AIChatBot';

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeTourIndex, setActiveTourIndex] = useState(0);

  const tours = [
    {
      title: 'Sacred Ayodhya & Kashi Yatra',
      location: 'Ayodhya & Varanasi, India',
      rating: '4.9',
      reviews: '184 Reviews',
      tag: 'Most Popular',
      price: '$349',
      duration: '5 days',
      image: '/assets/Ayodhya-Ram-Mandir-Images15.jpg',
      included: [
        { label: '4-Star Satvik Stay', icon: 'hotel' },
        { label: 'VIP Aarti Pass', icon: 'temple_hindu' },
        { label: 'Sarayu Boat Cruise', icon: 'sailing' },
        { label: 'Dedicated Guide', icon: 'person_pin' },
      ],
      desc: 'Arrival at Ayodhya Dham. Temple corridor walk, evening Sarayu Aarti, followed by morning Kashi Vishwanath Darshan.',
    },
    {
      title: 'Royal Forts & Desert Kingdom',
      location: 'Jaipur & Udaipur, Rajasthan',
      rating: '4.8',
      reviews: '96 Reviews',
      tag: 'Royal Heritage',
      price: '$420',
      duration: '6 days',
      image: '/assets/Jaipur.jpeg',
      included: [
        { label: 'Palace Heritage Stay', icon: 'castle' },
        { label: 'Royal Breakfasts', icon: 'restaurant' },
        { label: 'Fort Safari Tour', icon: 'directions_car' },
        { label: 'Folk Cultural Night', icon: 'theater_comedy' },
      ],
      desc: 'Explore Amber Fort, Hawa Mahal, Lake Pichola sunset cruise, and authentic royal Rajasthani dining.',
    },
    {
      title: 'Wild Kaziranga & Tea Valleys',
      location: 'Assam & Brahmaputra, India',
      rating: '4.9',
      reviews: '64 Reviews',
      tag: 'Nature & Wildlife',
      price: '$290',
      duration: '4 days',
      image: '/assets/Assam.jpeg',
      included: [
        { label: 'Eco Forest Lodge', icon: 'forest' },
        { label: 'Elephant Safari', icon: 'pets' },
        { label: 'Tea Estate Walk', icon: 'local_cafe' },
        { label: 'River Sunset Cruise', icon: 'water' },
      ],
      desc: 'Sunrise wildlife safari into Kaziranga sanctuary, Brahmaputra river island tour, and organic tea tasting.',
    },
  ];

  const currentTour = tours[activeTourIndex];

  return (
    <div className="min-h-screen bg-[#EAE2D6] text-[#24150B] relative overflow-x-hidden select-none font-sans">
      {/* Background Natural Mountain Horizon Overlay across bottom */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-bottom opacity-35 pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format&fit=crop&q=80')`,
        }}
      />

      {/* Top Ambient Glow */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[#EAE2D6] via-[#EAE2D6]/90 to-transparent z-0 pointer-events-none" />

      {/* ── Top Header Navigation ── */}
      <header className="relative z-20 max-w-[1440px] mx-auto px-6 sm:px-12 py-6 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#E25C38] flex items-center justify-center text-white shadow-md shadow-[#E25C38]/30">
            <span className="material-symbols-outlined text-2xl">temple_hindu</span>
          </div>
          <span className="text-2xl font-black tracking-tight text-[#24150B]">Safar-sutra</span>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#4A3222]">
          <a href="#about" className="hover:text-[#E25C38] transition-colors">About Safar-sutra</a>
          <a href="#reviews" className="hover:text-[#E25C38] transition-colors">Reviews</a>
          <a href="#blog" className="hover:text-[#E25C38] transition-colors">Yatras & News</a>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden sm:inline-block px-5 py-2.5 text-xs font-bold text-[#24150B] hover:text-[#E25C38] transition-colors"
          >
            Sign In
          </Link>
          <button
            onClick={() => navigate('/login')}
            className="bg-[#1A120B] hover:bg-[#342416] text-[#FFFDF9] rounded-full px-6 py-2.5 text-xs font-bold shadow-lg shadow-black/15 transition-all cursor-pointer active:scale-95"
          >
            Get Safar-sutra App
          </button>
        </div>
      </header>

      {/* ── Hero Main Section ── */}
      <main className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-12 pt-6 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[calc(100vh-100px)]">
        {/* Left Column: Hero Text & CTAs (6 cols) */}
        <div className="lg:col-span-6 space-y-8 lg:pr-6">
          {/* Main Display Headline with Serif Italic Accent */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] text-[#24150B] tracking-tight">
            <span
              className="text-[#E25C38] italic font-serif block mb-1"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Explore the World
            </span>
            <span
              className="text-[#E25C38] italic font-serif block"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              with Safar-sutra App
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#5A4332] max-w-lg leading-relaxed font-normal">
            Discover, plan, and experience unforgettable spiritual yatras and global heritage tours — all in one AI-powered app.
          </p>

          {/* Start Now Button */}
          <div className="pt-2">
            <button
              onClick={() => navigate('/login')}
              className="bg-white hover:bg-[#FDFBF7] text-[#1A120B] font-bold text-sm sm:text-base px-8 py-3.5 rounded-2xl shadow-xl shadow-[#4A2E18]/10 hover:shadow-2xl transition-all cursor-pointer active:scale-98 border border-white"
            >
              Start Now
            </button>
          </div>

          {/* App Store & Google Play Badges */}
          <div className="pt-8 flex flex-wrap items-center gap-4">
            {/* Apple App Store */}
            <div className="flex items-center gap-2.5 bg-black/85 hover:bg-black text-white px-4 py-2.5 rounded-2xl cursor-pointer shadow-md transition-transform hover:-translate-y-0.5 border border-white/10">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 1.04-2.85 0-.15-.01-.29-.04-.44-.99.04-2.19.66-2.9 1.49-.55.63-.99 1.66-.99 2.7 0 .15.02.3.05.37 1.13.09 2.22-.52 2.84-1.27z"/>
              </svg>
              <div className="text-left leading-none">
                <span className="text-[9px] text-[#C2B5A5] uppercase tracking-wider block">Download on</span>
                <span className="text-xs font-bold">App Store</span>
              </div>
            </div>

            {/* Google Play Store */}
            <div className="flex items-center gap-2.5 bg-black/85 hover:bg-black text-white px-4 py-2.5 rounded-2xl cursor-pointer shadow-md transition-transform hover:-translate-y-0.5 border border-white/10">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a2.38 2.38 0 0 1-.61-1.636V3.45c0-.623.228-1.2.61-1.636zm11.235 11.238l2.585 2.585-12.01 6.945 9.425-9.53zm0-2.104L5.42 1.418l12.01 6.945-2.586 2.585zm1.488 1.052l3.413 1.974c1.173.678 1.173 1.786 0 2.464l-3.413 1.974-2.202-2.206 2.202-2.206z"/>
              </svg>
              <div className="text-left leading-none">
                <span className="text-[9px] text-[#C2B5A5] uppercase tracking-wider block">Download on</span>
                <span className="text-xs font-bold">Google Play</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dual 3D iPhone App Mockups (6 cols) */}
        <div className="lg:col-span-6 relative flex justify-center items-center py-6">
          {/* ── Back Angled Phone Mockup ── */}
          <div className="hidden sm:block absolute right-0 lg:-right-4 top-4 w-[280px] xl:w-[305px] h-[580px] xl:h-[620px] rounded-[52px] p-3.5 bg-[#1F1B18] shadow-2xl border-[4px] border-[#3B342F] rotate-[9deg] scale-95 opacity-90 transition-transform duration-700 hover:rotate-[6deg] overflow-hidden z-10">
            {/* Inner Screen */}
            <div className="w-full h-full bg-[#FAF7F2] rounded-[42px] overflow-hidden p-4 flex flex-col justify-between">
              {/* Dynamic Island */}
              <div className="w-24 h-5 bg-black rounded-full mx-auto mb-2" />

              <div className="text-center">
                <span
                  className="text-xl font-bold text-[#E25C38] italic font-serif"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Travel
                </span>
                <p className="text-[10px] text-[#8A715F] leading-tight mt-0.5">
                  Explore holy corridors and vibrant heritage easily with our yatras
                </p>
              </div>

              {/* Photo Collage Grid */}
              <div className="grid grid-cols-2 gap-2 my-3">
                <div className="h-28 rounded-2xl overflow-hidden shadow-xs">
                  <img src="/assets/Ayodhya-Ram-Mandir-Images15.jpg" alt="Ayodhya" className="w-full h-full object-cover" />
                </div>
                <div className="h-28 rounded-2xl overflow-hidden shadow-xs">
                  <img src="/assets/Jaipur.jpeg" alt="Jaipur" className="w-full h-full object-cover" />
                </div>
                <div className="h-28 rounded-2xl overflow-hidden shadow-xs">
                  <img src="/assets/Assam.jpeg" alt="Assam" className="w-full h-full object-cover" />
                </div>
                <div className="h-28 rounded-2xl overflow-hidden shadow-xs">
                  <img src="/assets/andaman-nicobar.jpg" alt="Andaman" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Bottom Quick Sign-in Button */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => navigate('/login')}
                  className="w-full py-2.5 bg-[#E25C38] text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  Sign in by phone / Google
                </button>
                <div className="py-2 bg-white border border-[#EADBCE] text-[#24150B] rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-2xs">
                  <span>Sign in with Apple</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Front Hero iPhone Mockup ── */}
          <div className="relative w-[320px] sm:w-[340px] xl:w-[365px] h-[640px] xl:h-[680px] rounded-[56px] p-3.5 bg-[#120E0B] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border-[5px] border-[#2C241E] z-20 transition-transform duration-500 hover:scale-[1.02]">
            {/* Screen Content Container */}
            <div className="w-full h-full bg-[#FAF7F2] rounded-[46px] overflow-hidden flex flex-col justify-between p-4 relative">
              {/* Dynamic Island Notch */}
              <div className="absolute top-3 inset-x-0 flex justify-center z-30 pointer-events-none">
                <div className="w-28 h-6 bg-black rounded-full flex items-center justify-end px-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A] border border-white/20" />
                </div>
              </div>

              {/* Top Bar Navigation inside Phone */}
              <div className="flex justify-between items-center pt-8 pb-3 px-1">
                <button
                  onClick={() => setActiveTourIndex((prev) => (prev > 0 ? prev - 1 : tours.length - 1))}
                  className="w-9 h-9 rounded-full bg-white border border-[#EADBCE] flex items-center justify-center text-[#24150B] shadow-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">chevron_left</span>
                </button>
                <span className="text-[11px] font-bold text-[#8A715F] uppercase tracking-wider">
                  Safar-sutra App
                </span>
                <button
                  onClick={() => setActiveTourIndex((prev) => (prev + 1) % tours.length)}
                  className="w-9 h-9 rounded-full bg-white border border-[#EADBCE] flex items-center justify-center text-[#E25C38] shadow-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base filled">favorite</span>
                </button>
              </div>

              {/* Tour Photo Card */}
              <div className="relative h-44 rounded-3xl overflow-hidden shadow-md border border-[#EADBCE]">
                <img
                  src={currentTour.image}
                  alt={currentTour.title}
                  className="w-full h-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 bg-[#E25C38] text-white text-[10px] font-extrabold rounded-full shadow-md">
                  {currentTour.tag}
                </span>
                <span className="absolute top-3 right-3 px-2 py-0.5 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold rounded-md">
                  0{activeTourIndex + 1}/0{tours.length}
                </span>
              </div>

              {/* Tour Header & Rating */}
              <div className="pt-2">
                <h3
                  className="text-xl font-bold text-[#24150B] italic font-serif leading-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {currentTour.title}
                </h3>
                <div className="flex items-center gap-2 text-[11px] text-[#8A715F] font-semibold mt-1">
                  <span className="flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-xs text-[#E25C38]">location_on</span>
                    {currentTour.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5 text-[#E25C38]">
                    ★ {currentTour.rating} ({currentTour.reviews})
                  </span>
                </div>
              </div>

              {/* "Included in tour" Feature Badges */}
              <div className="space-y-1.5 pt-1">
                <p className="text-[10px] font-extrabold text-[#8A715F] uppercase tracking-wider">
                  Included in tour
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {currentTour.included.map((item) => (
                    <div
                      key={item.label}
                      className="bg-white border border-[#EADBCE] rounded-xl px-2 py-1.5 flex items-center gap-1.5 shadow-2xs"
                    >
                      <span className="material-symbols-outlined text-sm text-[#E25C38]">{item.icon}</span>
                      <span className="text-[10px] font-bold text-[#3D291D] truncate">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tour Program Snippet */}
              <div className="bg-[#FAF7F2] p-2.5 rounded-2xl border border-[#EADBCE]/80">
                <p className="text-[10px] font-extrabold text-[#4A3222] uppercase tracking-wider mb-0.5">
                  Tour Program
                </p>
                <p className="text-[10px] text-[#6B5646] line-clamp-2 leading-relaxed">
                  {currentTour.desc}
                </p>
              </div>

              {/* Bottom Sticky Action Bar */}
              <div className="pt-2 flex items-center justify-between gap-3 border-t border-[#EADBCE]">
                <div>
                  <span className="text-base font-black text-[#24150B]">{currentTour.price}</span>
                  <span className="text-[10px] text-[#8A715F] font-medium"> / {currentTour.duration}</span>
                </div>
                <button
                  onClick={() => navigate('/login')}
                  className="bg-[#E25C38] hover:bg-[#C94826] text-white px-5 py-2.5 rounded-2xl text-xs font-bold shadow-md shadow-[#E25C38]/30 flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                >
                  <span>Book Yatra</span>
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating AI Chatbot Assistant */}
      <AIChatBot />
    </div>
  );
}
