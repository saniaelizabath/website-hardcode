import { useEffect, useRef, useState } from 'react';
import ship from '../assets/videos/ship.mp4';
import sailingShip from '../assets/videos/sailing-ship.mp4';
import shipInside from '../assets/videos/ship-inside.mp4';
import shipRepair from '../assets/videos/new.mp4';
import diving from '../assets/videos/diving.mp4';

const HeroSection = () => {
  const videoARef = useRef(null);
  const videoBRef = useRef(null);

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeVideo, setActiveVideo] = useState('A');

  // Import videos from src/assets/videos folder
  const videos = [
    ship,
    sailingShip,
    shipInside,
    shipRepair,
    diving,
  ];

  const activeRef = activeVideo === 'A' ? videoARef : videoBRef;
  const inactiveRef = activeVideo === 'A' ? videoBRef : videoARef;

  // Set playback rate and preload next video
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.playbackRate = 0.75;
    }

    const nextIndex = (currentVideoIndex + 1) % videos.length;
    if (inactiveRef.current) {
      inactiveRef.current.src = videos[nextIndex];
      inactiveRef.current.load();
      inactiveRef.current.playbackRate = 0.75;
    }
  }, [currentVideoIndex, activeVideo]);

  const handleVideoEnd = () => {
    setIsTransitioning(true);

    setTimeout(() => {
      if (inactiveRef.current) {
        inactiveRef.current.currentTime = 0;
        inactiveRef.current.play();
      }

      setActiveVideo(prev => (prev === 'A' ? 'B' : 'A'));
      setCurrentVideoIndex(prev => (prev + 1) % videos.length);
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        {/* Video A */}
        <video
          ref={videoARef}
          src={videos[0]}
          autoPlay
          muted
          playsInline
          onEnded={activeVideo === 'A' ? handleVideoEnd : undefined}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            activeVideo === 'A' && !isTransitioning ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Video B */}
        <video
          ref={videoBRef}
          muted
          playsInline
          onEnded={activeVideo === 'B' ? handleVideoEnd : undefined}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            activeVideo === 'B' && !isTransitioning ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/30 z-10"></div>

      {/* Content - Left Aligned */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight animate-slide-up">
              YOUR CHALLENGE,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-300 to-blue-400 animate-glow-pulse">
                OUR MISSION
              </span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 font-light leading-relaxed animate-slide-up-delay">
              Delivering excellence in marine engineering and diving services
              <br />
              with innovation, precision, and unwavering commitment to safety
            </p>

            <div className="mt-10 animate-slide-up-delay-2">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300">
                Explore Our Services
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Progress Indicators */}
      <div className="absolute bottom-20 left-6 md:left-12 lg:left-20 z-20 flex gap-2">
        {videos.map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === currentVideoIndex
                ? 'w-12 bg-cyan-400'
                : 'w-8 bg-white/30 hover:bg-white/50 cursor-pointer'
            }`}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentVideoIndex(index);
                setIsTransitioning(false);
              }, 500);
            }}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <svg
          className="w-6 h-6 text-cyan-400"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes glow-pulse {
          0% { filter: brightness(1); }
          50% { filter: brightness(1.3) drop-shadow(0 0 20px rgba(56,189,248,0.6)); }
          100% { filter: brightness(1); }
        }

        .animate-fade-in { animation: fade-in 1s ease-out; }
        .animate-slide-up { animation: slide-up 1s ease-out 0.3s both; }
        .animate-slide-up-delay { animation: slide-up 1s ease-out 0.6s both; }
        .animate-slide-up-delay-2 { animation: slide-up 1s ease-out 0.9s both; }
        .animate-glow-pulse {
          animation: slide-up 1s ease-out 0.3s both,
                     glow-pulse 2.5s ease-in-out 1.5s infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
