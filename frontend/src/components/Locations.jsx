// // src/components/Locations.jsx
// import { useState, useEffect, useRef } from 'react';
// import locationImage from '/backgrounds/location.png';

// const Locations = () => {
//   const [hoveredIndex, setHoveredIndex] = useState(null);
//   const [isVisible, setIsVisible] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const sectionRef = useRef(null);

//   // Check for mobile devices
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 1024);
//     };
    
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
    
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   // Intersection Observer for scroll animation
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       },
//       { 
//         threshold: 0.1,
//         rootMargin: '-50px'
//       }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   const locations = [
//     {
//       name: "KOCHI OFFICE",
//       address: "FIDA TOWER, KK PADMANABHAN ROAD, ERNAKULAM NORTH, 682018",
//       mapUrl: "https://www.google.com/maps/search/?api=1&query=FIDA+TOWER+KK+PADMANABHAN+ROAD+ERNAKULAM+NORTH+682018",
//       position: { top: '280px', left: '170px' },
//       color: "from-cyan-500 to-blue-500"
//     },
//     {
//       name: "CHENNAI OFFICE",
//       address: "71, L&T SHIPBUILDING, KATTUPALLI, TAMIL NADU 600120",
//       mapUrl: "https://www.google.com/maps/search/?api=1&query=71+L%26T+SHIPBUILDING+KATTUPALLI+TAMIL+NADU+600120",
//       position: { top: '380px', left: '-25px' },
//       color: "from-blue-500 to-indigo-500"
//     },
//     {
//       name: "MANGLORE BRANCH",
//       address: "CSBD, KASBA BENGRE, MANGALURU, KARNATAKA 575001",
//       mapUrl: "https://www.google.com/maps/search/?api=1&query=CSBD+KASBA+BENGRE+MANGALURU+KARNATAKA+575001",
//       position: { top: '220px', left: '485px' },
//       color: "from-indigo-500 to-purple-500"
//     },
//     {
//       name: "VIZAG BRANCH",
//       address: "SITE OFFICE, HINDUSTAN SHIPYARD, VISAKHAPATNAM, ANDHRA PRADESH 530005",
//       mapUrl: "https://www.google.com/maps/search/?api=1&query=HINDUSTAN+SHIPYARD+VISAKHAPATNAM+ANDHRA+PRADESH+530005",
//       position: { top: '380px', left: '1050px' },
//       color: "from-purple-500 to-pink-500"
//     },
//     {
//       name: "OVERSEAS BRANCH",
//       address: "6A, LUMBARE AVE, KAMPALA, UGANDA",
//       mapUrl: "https://www.google.com/maps/search/?api=1&query=6A+LUMBARE+AVE+KAMPALA+UGANDA",
//       position: { top: '250px', left: '850px' },
//       color: "from-pink-500 to-rose-500"
//     }
//   ];

//   return (
//     <section 
//       ref={sectionRef}
//       className="relative min-h-screen flex items-center overflow-hidden bg-slate-900"
//     >
//       {/* Background Image - Properly imported */}
//       <div className="absolute inset-0">
//         <img
//           src={locationImage}
//           alt="Locations map background"
//           className="absolute inset-0 w-full h-full object-cover"
//           loading="lazy"
//         />
//         {/* Overlay for better pin visibility */}
//         <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-slate-900/40" />
//       </div>

//       {/* Content Container */}
//       <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        
//         {/* Section Header */}
//         <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
//           isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//         }`}>
//           <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
//             OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">LOCATIONS</span>
//           </h2>
//           <div className={`w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto mb-4 sm:mb-6 transition-all duration-1000 delay-200 ${
//             isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
//           }`} />
//           <p className="text-blue-200 text-base sm:text-lg lg:text-xl px-4">
//             Serving clients across India and internationally
//           </p>
//         </div>

//         {/* Desktop View - Interactive Map with Pins */}
//         {!isMobile && (
//           <div className="max-w-6xl mx-auto relative" style={{ minHeight: '500px' }}>
//             {/* Location Pins */}
//             {locations.map((location, index) => (
//               <div
//                 key={index}
//                 className={`absolute transform -translate-x-1/2 -translate-y-full transition-all duration-700 ${
//                   isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
//                 }`}
//                 style={{ 
//                   top: location.position.top, 
//                   left: location.position.left,
//                   transitionDelay: `${300 + index * 150}ms`
//                 }}
//                 onMouseEnter={() => setHoveredIndex(index)}
//                 onMouseLeave={() => setHoveredIndex(null)}
//               >
//                 {/* Pin */}
//                 <a
//                   href={location.mapUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="relative block cursor-pointer group"
//                 >
//                   {/* Animated Pulse Ring */}
//                   <div className={`absolute -top-2 -left-2 w-16 h-16 rounded-full bg-gradient-to-r ${location.color} opacity-0 group-hover:opacity-30 animate-ping`} />
                  
//                   {/* Pin Icon */}
//                   <div className={`relative w-12 h-12 transition-all duration-300 ${
//                     hoveredIndex === index ? 'scale-125' : 'scale-100'
//                   }`}>
//                     <svg 
//                       viewBox="0 0 24 24" 
//                       fill="none" 
//                       className="w-full h-full drop-shadow-2xl"
//                     >
//                       <path 
//                         d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" 
//                         className={`fill-current transition-all duration-300 ${
//                           hoveredIndex === index 
//                             ? 'text-cyan-400' 
//                             : 'text-blue-500'
//                         }`}
//                         stroke="white"
//                         strokeWidth="1"
//                       />
//                       <circle 
//                         cx="12" 
//                         cy="9" 
//                         r="2.5" 
//                         fill="white"
//                       />
//                     </svg>
//                   </div>

//                   {/* Info Card - Shows on Hover */}
//                   <div className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 transition-all duration-300 ${
//                     hoveredIndex === index 
//                       ? 'opacity-100 translate-y-0 pointer-events-auto' 
//                       : 'opacity-0 -translate-y-4 pointer-events-none'
//                   }`}>
//                     <div className={`bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl p-6 rounded-2xl border-2 border-cyan-400/50 shadow-2xl shadow-cyan-500/30`}>
//                       {/* Arrow */}
//                       <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-800 border-t-2 border-l-2 border-cyan-400/50 transform rotate-45" />
                      
//                       {/* Content */}
//                       <h3 className="text-xl font-bold text-white mb-3 text-center">
//                         {location.name}
//                       </h3>
//                       <p className="text-blue-200 text-sm text-center leading-relaxed mb-4">
//                         {location.address}
//                       </p>
                      
//                       {/* View Map Button */}
//                       <div className="flex items-center justify-center gap-2 text-cyan-400 font-semibold text-sm">
//                         <span>View on Google Maps</span>
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//                         </svg>
//                       </div>
//                     </div>
//                   </div>
//                 </a>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Mobile View - List Cards */}
//         {isMobile && (
//           <div className="max-w-2xl mx-auto space-y-4">
//             {locations.map((location, index) => (
//               <a
//                 key={index}
//                 href={location.mapUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={`block bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl p-5 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-cyan-400/30 hover:border-cyan-400/60 shadow-xl shadow-cyan-500/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/30 ${
//                   isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//                 }`}
//                 style={{ transitionDelay: `${300 + index * 150}ms` }}
//               >
//                 <div className="flex items-start gap-4">
//                   {/* Pin Icon */}
//                   <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12`}>
//                     <svg 
//                       viewBox="0 0 24 24" 
//                       fill="none" 
//                       className="w-full h-full drop-shadow-lg"
//                     >
//                       <path 
//                         d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" 
//                         className={`fill-current bg-gradient-to-r ${location.color} text-cyan-400`}
//                         stroke="white"
//                         strokeWidth="1"
//                       />
//                       <circle 
//                         cx="12" 
//                         cy="9" 
//                         r="2.5" 
//                         fill="white"
//                       />
//                     </svg>
//                   </div>

//                   {/* Content */}
//                   <div className="flex-1">
//                     <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
//                       {location.name}
//                     </h3>
//                     <p className="text-blue-200 text-sm sm:text-base leading-relaxed mb-3">
//                       {location.address}
//                     </p>
                    
//                     {/* View Map Link */}
//                     <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
//                       <span>View on Google Maps</span>
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
//               </a>
//             ))}
//           </div>
//         )}

//         {/* Coverage Info */}
//         <div className={`mt-12 sm:mt-16 text-center transition-all duration-1000 delay-700 ${
//           isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//         }`}>
//           <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-slate-800/80 backdrop-blur-xl px-6 sm:px-8 py-4 sm:py-5 rounded-full border border-cyan-500/40 shadow-xl shadow-cyan-500/20">
//             <svg className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <p className="text-cyan-400 font-bold text-base sm:text-lg text-center">
//               5 Strategic Locations | Pan-India & International Presence
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Locations;


// src/components/Locations.jsx
import { useState, useEffect, useRef } from 'react';
import locationImage from '/backgrounds/location.png';

const Locations = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  // Check for mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '-50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const locations = [
    {
      name: "KOCHI OFFICE",
      address: "FIDA TOWER, KK PADMANABHAN ROAD, ERNAKULAM NORTH, 682018",
      mapUrl: "https://maps.app.goo.gl/enSQsJhTfa7CtwZe6",
      position: { top: '280px', left: '170px' },
      color: "from-cyan-500 to-blue-500"
    },
    {
      name: "CHENNAI OFFICE",
      address: "71, L&T SHIPBUILDING, KATTUPALLI, TAMIL NADU 600120",
      mapUrl: "https://maps.app.goo.gl/rtzRzDhcjh8Kkfbm9",
      position: { top: '380px', left: '-25px' },
      color: "from-blue-500 to-indigo-500"
    },
    {
      name: "MANGLORE BRANCH",
      address: "CSBD, KASBA BENGRE, MANGALURU, KARNATAKA 575001",
      mapUrl: "https://maps.app.goo.gl/SCRVbjGhKfH2EHvE6?g_st=ipc",
      position: { top: '220px', left: '485px' },
      color: "from-indigo-500 to-purple-500"
    },
    {
      name: "VIZAG BRANCH",
      address: "SITE OFFICE, HINDUSTAN SHIPYARD, VISAKHAPATNAM, ANDHRA PRADESH 530005",
      mapUrl: "https://maps.app.goo.gl/SB9bjCrvsHAdVjcU7",
      position: { top: '380px', left: '1050px' },
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "OVERSEAS BRANCH",
      address: "6A, LUMBARE AVE, KAMPALA, UGANDA",
      mapUrl: "https://maps.app.goo.gl/wnmVLFtpjh7DLoHv7?g_st=ipc",
      position: { top: '250px', left: '850px' },
      color: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-slate-900 pt-20 pb-12 lg:py-20"
    >
      {/* Background Image - Properly imported */}
      <div className="absolute inset-0">
        <img
          src={locationImage}
          alt="Locations map background"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        {/* Overlay for better pin visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-slate-900/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        
        {/* Section Header */}
        <div className={`text-center mb-10 sm:mb-12 lg:mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 tracking-tight">
            OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">LOCATIONS</span>
          </h2>
          <div className={`w-16 sm:w-20 lg:w-24 h-0.5 sm:h-1 lg:h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto mb-3 sm:mb-4 lg:mb-6 transition-all duration-1000 delay-200 ${
            isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
          }`} />
          <p className="text-blue-200 text-sm sm:text-base lg:text-xl px-4">
            Serving clients across India and internationally
          </p>
        </div>

        {/* Desktop View - Interactive Map with Pins */}
        {!isMobile && (
          <div className="max-w-6xl mx-auto relative" style={{ minHeight: '500px' }}>
            {/* Location Pins */}
            {locations.map((location, index) => (
              <div
                key={index}
                className={`absolute transform -translate-x-1/2 -translate-y-full transition-all duration-700 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`}
                style={{ 
                  top: location.position.top, 
                  left: location.position.left,
                  transitionDelay: `${300 + index * 150}ms`
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Pin */}
                <a
                  href={location.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block cursor-pointer group"
                >
                  {/* Animated Pulse Ring */}
                  <div className={`absolute -top-2 -left-2 w-16 h-16 rounded-full bg-gradient-to-r ${location.color} opacity-0 group-hover:opacity-30 animate-ping`} />
                  
                  {/* Pin Icon */}
                  <div className={`relative w-12 h-12 transition-all duration-300 ${
                    hoveredIndex === index ? 'scale-125' : 'scale-100'
                  }`}>
                    <svg 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      className="w-full h-full drop-shadow-2xl"
                    >
                      <path 
                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" 
                        className={`fill-current transition-all duration-300 ${
                          hoveredIndex === index 
                            ? 'text-cyan-400' 
                            : 'text-blue-500'
                        }`}
                        stroke="white"
                        strokeWidth="1"
                      />
                      <circle 
                        cx="12" 
                        cy="9" 
                        r="2.5" 
                        fill="white"
                      />
                    </svg>
                  </div>

                  {/* Info Card - Shows on Hover */}
                  <div className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 transition-all duration-300 ${
                    hoveredIndex === index 
                      ? 'opacity-100 translate-y-0 pointer-events-auto' 
                      : 'opacity-0 -translate-y-4 pointer-events-none'
                  }`}>
                    <div className={`bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl p-6 rounded-2xl border-2 border-cyan-400/50 shadow-2xl shadow-cyan-500/30`}>
                      {/* Arrow */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-800 border-t-2 border-l-2 border-cyan-400/50 transform rotate-45" />
                      
                      {/* Content */}
                      <h3 className="text-xl font-bold text-white mb-3 text-center">
                        {location.name}
                      </h3>
                      <p className="text-blue-200 text-sm text-center leading-relaxed mb-4">
                        {location.address}
                      </p>
                      
                      {/* View Map Button */}
                      <div className="flex items-center justify-center gap-2 text-cyan-400 font-semibold text-sm">
                        <span>View on Google Maps</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Mobile View - List Cards */}
        {isMobile && (
          <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4">
            {locations.map((location, index) => (
              <a
                key={index}
                href={location.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`block bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl p-4 sm:p-6 rounded-xl border-2 border-cyan-400/30 hover:border-cyan-400/60 shadow-xl shadow-cyan-500/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/30 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${300 + index * 150}ms` }}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Pin Icon */}
                  <div className={`flex-shrink-0 w-9 h-9 sm:w-12 sm:h-12`}>
                    <svg 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      className="w-full h-full drop-shadow-lg"
                    >
                      <path 
                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" 
                        className={`fill-current bg-gradient-to-r ${location.color} text-cyan-400`}
                        stroke="white"
                        strokeWidth="1"
                      />
                      <circle 
                        cx="12" 
                        cy="9" 
                        r="2.5" 
                        fill="white"
                      />
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-base sm:text-xl font-bold text-white mb-1.5 sm:mb-2">
                      {location.name}
                    </h3>
                    <p className="text-blue-200 text-xs sm:text-base leading-relaxed mb-2 sm:mb-3">
                      {location.address}
                    </p>
                    
                    {/* View Map Link */}
                    <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs sm:text-sm">
                      <span>View on Google Maps</span>
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Coverage Info */}
        <div className={`mt-10 sm:mt-12 lg:mt-16 text-center transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-slate-800/80 backdrop-blur-xl px-5 sm:px-8 py-3 sm:py-5 rounded-full border border-cyan-500/40 shadow-xl shadow-cyan-500/20">
            <svg className="w-5 h-5 sm:w-7 sm:h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-cyan-400 font-bold text-sm sm:text-lg text-center">
              5 Strategic Locations | Pan-India & International Presence
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Locations;