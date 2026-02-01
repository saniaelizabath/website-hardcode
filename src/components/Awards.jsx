// // src/components/Awards.jsx
// import { useEffect, useState } from 'react';

// const Awards = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       },
//       { threshold: 0.1 }
//     );

//     const section = document.getElementById('awards');
//     if (section) observer.observe(section);

//     return () => observer.disconnect();
//   }, []);

//   const awards = [
//     {
//       title: "Rising Kerala Business Summit 2025",
//       subtitle: "Kerala Marine Enterprise Excellence Award",
//       icon: (
//         <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
//         </svg>
//       )
//     },
//     {
//       title: "Best of Kerala Business Summit 2025",
//       subtitle: "Promising Startup Award",
//       icon: (
//         <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
//         </svg>
//       )
//     }
//   ];

//   return (
//     <section 
//       id="awards"
//       className="relative min-h-screen flex items-center overflow-hidden"
//     >
//       {/* Background Image with Overlay */}
//       <div className="absolute inset-0">
//         <div 
//           className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//           style={{
//             backgroundImage: "url('/awlogo/certback.webp')",
//           }}
//         />
//         {/* Dark overlay for contrast */}
//         <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/50 to-transparent" />
//       </div>

//       {/* Content Container */}
//       <div className="relative z-10 w-full px-6 py-20">
//         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
//           {/* Left Side - Header */}
//           <div className={`transition-all duration-1000 ${
//             isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
//           }`}>
//             <div className="space-y-6">
//               <div className="inline-block">
//                 {/* <span className="text-cyan-400 font-semibold text-sm tracking-widest uppercase bg-cyan-400/10 px-4 py-2 rounded-full border border-cyan-400/30">
//                   Recognition & Excellence
//                 </span> */}
//               </div>
              
//               <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
//                 AWARDS &<br />
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
//                   ACHIEVEMENTS
//                 </span>
//               </h2>
              
//               <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
              
//               <p className="text-blue-200 text-lg leading-relaxed max-w-xl">
//                 Recognition for excellence and innovation in marine services. Our commitment to quality and innovation has been acknowledged by leading institutions.
//               </p>

//               {/* Achievement Badge */}
//               <div className="inline-flex items-center gap-3 bg-slate-800/60 backdrop-blur-md px-6 py-4 rounded-2xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
//                 {/* <span className="text-3xl">🏆</span> */}
//                 <div>
//                   {/* <p className="text-cyan-400 font-bold text-sm">Leading Excellence</p>
//                   <p className="text-blue-200 text-xs">Since Establishment</p> */}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Awards Vertical Stack */}
//           <div className="relative">
//             <div className="space-y-6">
//               {awards.map((award, index) => (
//                 <div
//                   key={index}
//                   className={`transform transition-all duration-700 ${
//                     isVisible 
//                       ? 'translate-x-0 opacity-100' 
//                       : 'translate-x-20 opacity-0'
//                   }`}
//                   style={{ transitionDelay: `${(index + 1) * 200}ms` }}
//                 >
//                   <div className="group relative bg-gradient-to-br from-slate-800/80 to-blue-950/60 backdrop-blur-xl p-8 rounded-2xl border border-blue-500/30 hover:border-cyan-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/30 transform hover:-translate-y-2 hover:scale-[1.02]">
                    
//                     {/* Glowing Effect on Hover */}
//                     <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                    
//                     <div className="relative flex items-start gap-6">
//                       {/* Award Icon */}
//                       <div className="flex-shrink-0">
//                         <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-cyan-500/20">
//                           {award.icon}
//                         </div>
//                       </div>

//                       {/* Award Content */}
//                       <div className="flex-grow">
//                         <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
//                           {award.title}
//                         </h3>
//                         <p className="text-blue-200 text-base leading-relaxed">
//                           {award.subtitle}
//                         </p>
                        
//                         {/* Decorative Bottom Line */}
//                         <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-500 rounded-full" />
//                       </div>
//                     </div>

//                     {/* Corner Accent */}
//                     <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Decorative Element */}
//             <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl" />
//           </div>
//         </div>
//       </div>

//       {/* Animated Background Elements */}
//       <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
//       <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
//     </section>
//   );
// };

// export default Awards;





// src/components/Awards.jsx
import { useEffect, useState, useRef } from 'react';
import certBackImage from '/awlogo/certback.webp'; // Proper import for Vercel

const Awards = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  const awards = [
    {
      title: "Rising Kerala Business Summit 2025",
      subtitle: "Kerala Marine Enterprise Excellence Award",
      icon: (
        <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    {
      title: "Best of Kerala Business Summit 2025",
      subtitle: "Promising Startup Award",
      icon: (
        <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="awards"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image with Overlay - Properly imported */}
      <div className="absolute inset-0">
        <img
          src={certBackImage}
          alt="Awards background"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        {/* Dark overlay for contrast - adjusted for mobile */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/70 to-slate-900/60 sm:from-slate-900/70 sm:via-slate-900/50 sm:to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          
          {/* Left Side - Header */}
          <div className={`transition-all duration-1000 ease-out ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 sm:-translate-x-20 opacity-0'
          }`}>
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-block">
                {/* Optional badge - uncomment if needed */}
                {/* <span className="text-cyan-400 font-semibold text-xs sm:text-sm tracking-widest uppercase bg-cyan-400/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-cyan-400/30">
                  Recognition & Excellence
                </span> */}
              </div>
              
              <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight transition-all duration-1000 delay-100 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                AWARDS &<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  ACHIEVEMENTS
                </span>
              </h2>
              
              <div className={`w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-1000 delay-200 ${
                isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
              }`} />
              
              <p className={`text-blue-200 text-base sm:text-lg leading-relaxed max-w-xl transition-all duration-1000 delay-300 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                Recognition for excellence and innovation in marine services. Our commitment to quality and innovation has been acknowledged by leading institutions.
              </p>

              {/* Achievement Badge - Optional */}
              <div className={`inline-flex items-center gap-3 bg-slate-800/60 backdrop-blur-md px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10 transition-all duration-1000 delay-400 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                {/* Optional content - uncomment if needed */}
                {/* <span className="text-2xl sm:text-3xl">🏆</span>
                <div>
                  <p className="text-cyan-400 font-bold text-xs sm:text-sm">Leading Excellence</p>
                  <p className="text-blue-200 text-xs">Since Establishment</p>
                </div> */}
              </div>
            </div>
          </div>

          {/* Right Side - Awards Vertical Stack */}
          <div className="relative">
            <div className="space-y-4 sm:space-y-6">
              {awards.map((award, index) => (
                <div
                  key={index}
                  className={`transform transition-all duration-700 ease-out ${
                    isVisible 
                      ? 'translate-x-0 opacity-100' 
                      : 'translate-x-12 sm:translate-x-20 opacity-0'
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                >
                  <div className="group relative bg-gradient-to-br from-slate-800/90 to-blue-950/70 sm:from-slate-800/80 sm:to-blue-950/60 backdrop-blur-xl p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-blue-500/30 hover:border-cyan-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/30 transform hover:-translate-y-2 hover:scale-[1.02]">
                    
                    {/* Glowing Effect on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl sm:rounded-2xl" />
                    
                    <div className="relative flex items-start gap-4 sm:gap-5 lg:gap-6">
                      {/* Award Icon */}
                      <div className="flex-shrink-0">
                        <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-cyan-500/20">
                          {award.icon}
                        </div>
                      </div>

                      {/* Award Content */}
                      <div className="flex-grow">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                          {award.title}
                        </h3>
                        <p className="text-blue-200 text-sm sm:text-base leading-relaxed">
                          {award.subtitle}
                        </p>
                        
                        {/* Decorative Bottom Line */}
                        <div className="mt-3 sm:mt-4 h-0.5 w-0 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-500 rounded-full" />
                      </div>
                    </div>

                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative Element - Hidden on mobile */}
            <div className="hidden lg:block absolute -right-10 top-1/2 -translate-y-1/2 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>

      {/* Animated Background Elements - Adjusted for mobile */}
      <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-60 h-60 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-cyan-500/5 rounded-full blur-3xl" />
    </section>
  );
};

export default Awards;