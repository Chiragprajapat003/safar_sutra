import { useState, useEffect } from 'react';

const slides = [
  {
    image: '/assets/Ayodhya-Ram-Mandir-Images15.jpg',
    title: '"The world is a sacred journey, and every destination is a timeless story."',
    location: 'Shri Ram Janmabhoomi Mandir, Ayodhya, India',
    badge: 'Spiritual & Cultural Heritage',
    accent: 'from-amber-400 to-orange-500',
  },
  {
    image: '/assets/Jaipur.jpeg',
    title: '"Immerse in the royal grandeur and timeless colors of the Pink City."',
    location: 'Hawa Mahal & Amber Fort, Jaipur, Rajasthan',
    badge: 'Royal Heritage & Architecture',
    accent: 'from-pink-400 to-rose-600',
  },
  {
    image: '/assets/Assam.jpeg',
    title: '"Experience emerald tea valleys, majestic rivers, and pristine wildlife."',
    location: 'Kaziranga National Park & Brahmaputra, Assam',
    badge: 'Nature & Wildlife Sanctuary',
    accent: 'from-emerald-400 to-teal-600',
  },
  {
    image: '/assets/andaman-nicobar.jpg',
    title: '"Discover crystal turquoise waters, white sands, and tropical tranquility."',
    location: 'Radhanagar Beach, Havelock Island, Andaman & Nicobar',
    badge: 'Tropical Island Getaway',
    accent: 'from-cyan-400 to-blue-600',
  },
];

export default function AuthHeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000); // changes every 4 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hidden lg:relative lg:flex lg:w-7/12 min-h-screen bg-[#001848] overflow-hidden select-none">
      {/* Background Slides with crossfade */}
      {slides.map((slide, index) => {
        const isActive = index === current;
        return (
          <div
            key={slide.image}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.location}
              className={`w-full h-full object-cover object-center transition-transform duration-[4000ms] ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
            />
          </div>
        );
      })}

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/25 z-20 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/50 z-20 pointer-events-none" />

      {/* Top Floating Badge */}
      <div className="absolute top-8 left-8 z-30 flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-wide shadow-xl">
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
        <span className="bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
          {slides[current].badge}
        </span>
      </div>

      {/* Top Right Slide Counter */}
      <div className="absolute top-8 right-8 z-30 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/90 text-xs font-mono font-medium shadow-xl">
        {current + 1} / {slides.length}
      </div>

      {/* Bottom Content & Navigation */}
      <div className="absolute bottom-10 left-10 right-10 z-30 flex flex-col gap-6 text-white">
        {/* Animated Quote & Location */}
        <div className="space-y-3">
          <p className="text-2xl xl:text-3xl font-bold leading-snug drop-shadow-lg max-w-xl transition-all duration-500">
            {slides[current].title}
          </p>
          <div className="flex items-center gap-2 text-white/90 text-sm font-medium drop-shadow">
            <span className="material-symbols-outlined text-amber-300 text-xl">location_on</span>
            <span className="font-semibold tracking-wide">{slides[current].location}</span>
          </div>
        </div>

        {/* Carousel Indicators / Progress Bars */}
        <div className="flex items-center gap-2.5 pt-2">
          {slides.map((_, index) => {
            const isActive = index === current;
            return (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  isActive ? 'w-10 bg-amber-400 shadow-md shadow-amber-400/50' : 'w-3 bg-white/40 hover:bg-white/70'
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
