import { useState, useEffect } from 'react';
import logo from '/backgrounds/logonew.png';

const Header = ({ currentPage, setCurrentPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About Us', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Portal', id: 'portal' },
    { name: 'Contact Us', id: 'contact' },
    { name: 'News & Events', id: 'news' },
    { name: 'Careers', id: 'careers' }
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-slate-900/20 backdrop-blur-xl border border-slate-400/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Center - Logo & Title */}
            <div className="flex-1 flex items-center justify-center gap-3">
              {/* Logo */}
              <div 
                onClick={() => handleNavClick('home')}
                className="cursor-pointer hover:opacity-80 transition-opacity duration-300"
              >
                <img 
                  src={logo} 
                  alt="Mag Marine Logo"
                  className="h-12 w-12 md:h-14 md:w-14 object-contain"
                />
              </div>

              {/* Title */}
              <h1 
                onClick={() => handleNavClick('home')}
                className="text-sm md:text-lg font-bold text-white tracking-wide cursor-pointer hover:text-gray-300 transition-colors duration-300 whitespace-nowrap"
              >
                MAG MARINE SERVICES PVT. LTD.
              </h1>
            </div>

            {/* Right - Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-12 h-12 flex items-center justify-center text-white hover:text-gray-300 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {menuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Side Menu with Glassmorphism and Stacked Card Animation */}
      <div
        className={`fixed top-0 right-0 h-full w-80 z-40 transition-all duration-500 ease-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="relative h-full w-full pt-20 px-6 pb-6">
          {/* Stacked Cards */}
          <div className="relative h-full">
            {navItems.map((item, index) => {
              const totalItems = navItems.length;
              const isActive = currentPage === item.id;
              const baseDelay = menuOpen ? index * 80 : (totalItems - index - 1) * 40;
              
              return (
                <button
                  key={index}
                  onClick={() => handleNavClick(item.id)}
                  className={`absolute top-0 left-0 w-full rounded-2xl transition-all duration-700 ease-out cursor-pointer group ${
                    isActive
                      ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-xl shadow-cyan-500/30'
                      : 'bg-slate-900/40 backdrop-blur-xl text-gray-300 hover:bg-slate-800/60 border border-white/10'
                  }`}
                  style={{
                    transform: menuOpen 
                      ? `translateY(${index * 90}px) scale(${1 - index * 0.02}) translateZ(0)`
                      : `translateY(${index * 5}px) scale(${1 - index * 0.05}) translateZ(0)`,
                    opacity: menuOpen ? 1 : 0,
                    zIndex: totalItems - index,
                    transitionDelay: `${baseDelay}ms`,
                    transformOrigin: 'top center',
                    boxShadow: menuOpen 
                      ? `0 ${4 + index * 2}px ${20 + index * 5}px rgba(0, 0, 0, 0.3)`
                      : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive && menuOpen) {
                      e.currentTarget.style.transform = `translateY(${index * 90 - 10}px) scale(${1 - index * 0.02 + 0.03}) translateZ(0)`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive && menuOpen) {
                      e.currentTarget.style.transform = `translateY(${index * 90}px) scale(${1 - index * 0.02}) translateZ(0)`;
                    }
                  }}
                >
                  <div className="px-8 py-6 flex items-center justify-between">
                    <span className="text-lg font-semibold tracking-wide transition-transform duration-300 group-hover:translate-x-2">
                      {item.name}
                    </span>
                    <svg 
                      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Overlay - Completely removed */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-30"
        />
      )}
    </>
  );
};

export default Header;