// import { useEffect, useState, useRef } from 'react';
// import CLOUDS from 'vanta/dist/vanta.clouds.min';
// import * as THREE from 'three';

// const WhyChooseUs = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const vantaRef = useRef(null);
//   const vantaEffect = useRef(null);

//   // Intersection Observer for scroll animation
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       },
//       { threshold: 0.1 }
//     );

//     const section = document.getElementById('why-choose-us');
//     if (section) observer.observe(section);

//     return () => observer.disconnect();
//   }, []);

//   // Vanta.js initialization
//   useEffect(() => {
//     if (!vantaEffect.current && vantaRef.current) {
//       vantaEffect.current = CLOUDS({
//         el: vantaRef.current,
//         THREE: THREE,
//         mouseControls: true,
//         touchControls: true,
//         gyroControls: false,
//         minHeight: 200.00,
//         minWidth: 200.00,
//         skyColor: 0x2a86b6,
//         cloudColor: 0x94a5b8,
//         cloudShadowColor: 0x183550,
//         sunColor: 0xff9919,
//         sunGlareColor: 0xff6633,
//         sunlightColor: 0xff9933,
//         speed: 0.8
//       });
//     }


//     return () => {
//       if (vantaEffect.current) {
//         vantaEffect.current.destroy();
//       }
//     };
//   }, []);

//   const points = [
//     "Trusted by leading shipyards across India.",
//     "Skilled, certified workforce with marine expertise.",
//     "ISO-certified systems ensuring quality & safety.",
//     "End-to-end shipbuilding and repair capabilities.",
//     "On-time delivery with reliable project execution."
//   ];

//   const features = [
//     {
//       icon: (
//         <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       ),
//       title: "Our Vision",
//       description: "To deliver top-quality shipbuilding, repair, and marine engineering services with unmatched precision and reliability."
//     },
//     {
//       icon: (
//         <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
//         </svg>
//       ),
//       title: "Our Mission",
//       description: "To be the leading marine solutions provider in South India, driving quality and innovation in every project."
//     }
//   ];

//   return (
//     <section 
//       id="why-choose-us"
//       className="relative py-32 overflow-hidden min-h-screen flex items-center"
//     >
//       {/* Vanta.js Background */}
//       <div 
//         ref={vantaRef} 
//         className="absolute inset-0"
//         style={{ zIndex: 0 }}
//       />

//       {/* Light overlay for better text readability */}
//       <div 
//         className="absolute inset-0 bg-white/5" 
//         style={{ zIndex: 1 }}
//       />

//       <div 
//         className={`container mx-auto px-6 relative transition-all duration-1000 w-full ${
//           isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//         }`}
//         style={{ zIndex: 2 }}
//       >
//         {/* Section Header */}
//         <div className="text-center mb-24">
//           <h2 className="text-6xl md:text-7xl font-light text-white mb-3 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
//             Why Choose <span className="font-normal text-blue-200">Us</span><span className="text-blue-200">?</span>
//           </h2>
//           <div className="w-20 h-0.5 bg-blue-300 mx-auto mt-8"></div>
//         </div>

//         {/* Main Content Grid */}
//         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-start">
//           {/* Left Side - Key Points */}
//           <div className="space-y-6">
//             <h3 className="text-3xl font-light text-blue-900 mb-12 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
//               Our Strengths
//             </h3>
//             {points.map((point, index) => (
//               <div 
//                 key={index}
//                 className="flex items-start gap-6 group transition-all duration-300 hover:translate-x-2"
//               >
//                 <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-400/80 backdrop-blur-sm flex items-center justify-center text-white font-light text-xl shadow-lg group-hover:bg-blue-500/90 transition-all">
//                   {index + 1}
//                 </div>
//                 <p className="text-slate-800 leading-relaxed pt-2.5 text-lg font-light tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
//                   {point}
//                 </p>
//               </div>
//             ))}
//           </div>

//           {/* Right Side - Vision & Mission */}
//           <div className="space-y-12">
//             <h3 className="text-3xl font-light text-blue-900 mb-12 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
//               Our Direction
//             </h3>
//             {features.map((feature, index) => (
//               <div 
//                 key={index}
//                 className="group transition-all duration-500 transform hover:-translate-y-1"
//               >
//                 <div className="flex items-start gap-6 mb-6">
//                   <div className="flex-shrink-0 text-blue-700 bg-white/10 backdrop-blur-sm rounded-full p-3 group-hover:bg-white/20 transition-all">
//                     {feature.icon}
//                   </div>
//                   <div className="flex-1">
//                     <h4 className="text-3xl font-light text-slate-900 mb-5 tracking-wide group-hover:text-blue-900 transition-colors" style={{ fontFamily: 'Georgia, serif' }}>
//                       {feature.title}
//                     </h4>
//                     <p className="text-slate-800 leading-relaxed text-lg font-light tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
//                       {feature.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyChooseUs;



import { useEffect, useState, useRef } from 'react';
import CLOUDS from 'vanta/dist/vanta.clouds.min';
import * as THREE from 'three';

const WhyChooseUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);
  const sectionRef = useRef(null);

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

  // Vanta.js initialization
  useEffect(() => {
    if (!vantaEffect.current && vantaRef.current) {
      vantaEffect.current = CLOUDS({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        skyColor: 0x2a86b6,
        cloudColor: 0x94a5b8,
        cloudShadowColor: 0x183550,
        sunColor: 0xff9919,
        sunGlareColor: 0xff6633,
        sunlightColor: 0xff9933,
        speed: 0.8
      });
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, []);

  const points = [
    "Trusted by leading shipyards across India.",
    "Skilled, certified workforce with marine expertise.",
    "ISO-certified systems ensuring quality & safety.",
    "End-to-end shipbuilding and repair capabilities.",
    "On-time delivery with reliable project execution."
  ];

  const features = [
    {
      icon: (
        <svg className="w-12 h-12 sm:w-14 sm:h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Our Vision",
      description: "To deliver top-quality shipbuilding, repair, and marine engineering services with unmatched precision and reliability."
    },
    {
      icon: (
        <svg className="w-12 h-12 sm:w-14 sm:h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Our Mission",
      description: "To be the leading marine solutions provider in South India, driving quality and innovation in every project."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="why-choose-us"
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden min-h-screen flex items-center"
    >
      {/* Vanta.js Background */}
      <div 
        ref={vantaRef} 
        className="absolute inset-0"
        style={{ zIndex: 0 }}
      />

      {/* Light overlay for better text readability */}
      <div 
        className="absolute inset-0 bg-white/5" 
        style={{ zIndex: 1 }}
      />

      <div 
        className={`container mx-auto px-4 sm:px-6 lg:px-8 relative transition-all duration-1000 w-full ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ zIndex: 2 }}
      >
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-24">
          <h2 
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-3 tracking-wide transition-all duration-1000 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Why Choose <span className="font-normal text-blue-200">Us</span><span className="text-blue-200">?</span>
          </h2>
          <div 
            className={`w-16 sm:w-20 h-0.5 bg-blue-300 mx-auto mt-6 sm:mt-8 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`}
          />
        </div>

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-start">
          {/* Left Side - Key Points */}
          <div 
            className={`space-y-5 sm:space-y-6 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <h3 
              className="text-2xl sm:text-3xl font-light text-blue-900 mb-8 sm:mb-12 tracking-wide" 
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Our Strengths
            </h3>
            {points.map((point, index) => (
              <div 
                key={index}
                className={`flex items-start gap-4 sm:gap-6 group transition-all duration-300 hover:translate-x-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-400/80 backdrop-blur-sm flex items-center justify-center text-white font-light text-lg sm:text-xl shadow-lg group-hover:bg-blue-500/90 transition-all">
                  {index + 1}
                </div>
                <p 
                  className="text-slate-800 leading-relaxed pt-2 sm:pt-2.5 text-base sm:text-lg font-light tracking-wide" 
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {point}
                </p>
              </div>
            ))}
          </div>

          {/* Right Side - Vision & Mission */}
          <div 
            className={`space-y-8 sm:space-y-12 transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <h3 
              className="text-2xl sm:text-3xl font-light text-blue-900 mb-8 sm:mb-12 tracking-wide" 
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Our Direction
            </h3>
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`group transition-all duration-500 transform hover:-translate-y-1 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${500 + index * 150}ms` }}
              >
                <div className="flex items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div className="flex-shrink-0 text-blue-700 bg-white/10 backdrop-blur-sm rounded-full p-2.5 sm:p-3 group-hover:bg-white/20 transition-all">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h4 
                      className="text-2xl sm:text-3xl font-light text-slate-900 mb-3 sm:mb-5 tracking-wide group-hover:text-blue-900 transition-colors" 
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      {feature.title}
                    </h4>
                    <p 
                      className="text-slate-800 leading-relaxed text-base sm:text-lg font-light tracking-wide" 
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;