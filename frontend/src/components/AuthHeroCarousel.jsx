import { useState, useEffect } from 'react';

export const slides = [
  {
    image: '/assets/Ayodhya-Ram-Mandir-Images15.jpg',
    title: '"The world is a sacred journey, and every destination is a timeless story."',
    location: 'Shri Ram Janmabhoomi Mandir, Ayodhya, Uttar Pradesh, India',
    badge: 'Spiritual & Cultural Heritage',
    tag: 'Sacred Heritage',
  },
  {
    image: '/assets/Jaipur.jpeg',
    title: '"Immerse in the royal grandeur and timeless colors of the Pink City."',
    location: 'Hawa Mahal & Amber Fort, Jaipur, Rajasthan, India',
    badge: 'Royal Heritage & Architecture',
    tag: 'Royal Wonders',
  },
  {
    image: '/assets/Assam.jpeg',
    title: '"Experience emerald tea valleys, majestic rivers, and pristine wildlife."',
    location: 'Kaziranga National Park & Brahmaputra, Assam, India',
    badge: 'Nature & Wildlife Sanctuary',
    tag: 'Wild Serenity',
  },
  {
    image: '/assets/andaman-nicobar.jpg',
    title: '"Discover crystal turquoise waters, white sands, and tropical tranquility."',
    location: 'Radhanagar Beach, Havelock Island, Andaman & Nicobar, India',
    badge: 'Tropical Island Getaway',
    tag: 'Coastal Bliss',
  },
];

export default function AuthHeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Full-Screen Background Image Slider */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none bg-[#1A0F07]">
        {slides.map((slide, index) => {
          const isActive = index === current;
          return (
            <div
              key={slide.image}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.location}
                className={`w-full h-full object-cover object-center transition-transform duration-[4500ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
            </div>
          );
        })}

        {/* Cinematic Gradient Overlays across full screen */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />
      </div>

      {/* Left-Side Hero Details & Quotations Overlay */}
      <div className="hidden lg:flex flex-col justify-between w-7/12 min-h-screen p-12 xl:p-16 z-10 text-white select-none">
        {/* Top Badges */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#1F1209]/70 backdrop-blur-md border border-[#D4A373]/40 text-white text-xs font-semibold tracking-wide shadow-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4A373] animate-ping" />
            <span className="text-[#F8F4EE]">{slides[current].badge}</span>
          </div>
          <div className="px-3.5 py-1.5 rounded-full bg-[#1F1209]/70 backdrop-blur-md border border-[#D4A373]/30 text-[#EADBCE] text-xs font-mono font-medium shadow-xl">
            0{current + 1} / 0{slides.length}
          </div>
        </div>

        {/* Bottom Quote & Indicators */}
        <div className="space-y-6 max-w-xl">
          <div className="space-y-3">
            <span className="inline-block px-3 py-1 rounded-md bg-[#D4A373]/25 backdrop-blur-md border border-[#D4A373]/50 text-[#F5E6D3] text-xs font-semibold uppercase tracking-widest">
              {slides[current].tag}
            </span>
            <p className="text-3xl xl:text-4xl font-bold leading-snug drop-shadow-lg text-[#FFFDF9]">
              {slides[current].title}
            </p>
            <div className="flex items-center gap-2 text-[#EADBCE] text-sm font-medium pt-1 drop-shadow">
              <span className="material-symbols-outlined text-[#D4A373] text-xl">location_on</span>
              <span className="font-semibold tracking-wide">{slides[current].location}</span>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex items-center gap-2.5 pt-2 pointer-events-auto">
            {slides.map((_, index) => {
              const isActive = index === current;
              return (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                    isActive
                      ? 'w-10 bg-[#D4A373] shadow-md shadow-[#D4A373]/50'
                      : 'w-3 bg-white/30 hover:bg-white/60'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
