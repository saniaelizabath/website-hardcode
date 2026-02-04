// import { useState } from "react";
// import founderImage from "/backgrounds/ceo.jpeg";
// import CircularGallery from './Circulargallery';
// import backgroundImage from "/backgrounds/ab.jpg";

// // Import all gallery images
// import img1 from "/aboutus/img1.jpeg";
// import img2 from "/aboutus/img2.jpeg";
// import img3 from "/aboutus/img3.jpeg";
// import img4 from "/aboutus/img4.jpeg";
// import img5 from "/aboutus/img5.jpeg";
// import img6 from "/aboutus/img6.jpeg";
// import img7 from "/aboutus/img7.jpeg";
// import img8 from "/aboutus/img8.jpeg";
// import img9 from "/aboutus/img9.jpeg";
// import img10 from "/aboutus/img10.jpeg";
// import img11 from "/aboutus/img11.jpeg";
// import img12 from "/aboutus/img12.jpeg";
// import img13 from "/aboutus/img13.jpeg";
// import img14 from "/aboutus/img14.jpeg";

// const AboutUsPage = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
  
//   // Format images for CircularGallery component
//   // The component expects an array of objects with { image, text } properties
//   const galleryItems = [
//     { image: img1, text: '' },
//     { image: img2, text: '' },
//     { image: img3, text: '' },
//     { image: img4, text: '' },
//     { image: img5, text: '' },
//     { image: img6, text: '' },
//     { image: img7, text: '' },
//     { image: img8, text: '' },
//     { image: img9, text: '' },
//     { image: img10, text: '' },
//     { image: img11, text: '' },
//     { image: img12, text: '' },
//     { image: img13, text: '' },
//     { image: img14, text: '' },
//   ];

//   return (
//     <div 
//       className="min-h-screen bg-gradient-to-b from-slate-200 via-slate-100 to-blue-50 pt-32 pb-20"
//       style={{
//         backgroundImage: `url(${backgroundImage})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundAttachment: 'fixed',
//       }}
//     >
//       <div className="container mx-auto px-6">
        
//         {/* Page Header */}
//         <div className="text-center mb-16 animate-fade-in">
//           <h1 className="text-6xl font-bold text-slate-800 mb-4 tracking-tight">
//             About{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
//               Mag Marine
//             </span>
//           </h1>
//           <p className="text-slate-700 text-lg max-w-3xl mx-auto">
//             Building India's marine engineering future with discipline, technical excellence, and commitment
//           </p>
//         </div>

//         <div className="max-w-7xl mx-auto mb-20">
//         <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-cyan-500/20 overflow-hidden shadow-2xl">
            
//             {/* Section Title */}
//              <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border-b border-cyan-500/20 px-8 py-6">
//                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
//                  <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
//                  </svg>
//                  Founder's Vision
//                </h2>
//              </div>

//              <div className="p-8 md:p-12">
//                <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-start">
                
//                  {/* Founder Image */}
//                  <div className="md:col-span-2">
//                    <div className="relative group">
//                      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
//                      <div className="relative">
//                        <img
//                          src={founderImage}
//                          alt="Hrishikesh M Anilkumar - Founder & Managing Director"
//                          className="w-full rounded-2xl shadow-2xl border-4 border-slate-300/10"
//                        />
//                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
//                      </div>
//                    </div>
                  
//                    {/* Founder Info Card */}
//                    <div className="mt-6 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 text-center">
//                      <h3 className="text-2xl font-bold text-white mb-2">
//                        Hrishikesh M Anilkumar
//                      </h3>
//                      <p className="text-cyan-400 font-semibold mb-1">
//                        Founder & Managing Director
//                      </p>
//                      <p className="text-blue-300 text-sm">
//                        Mag Marine Services Private Limited
//                      </p>
//                    </div>
//                   </div>

//                  {/* Vision Content */}
//                  <div className="md:col-span-3 space-y-6">
//                    <div className="space-y-5 text-blue-100 leading-relaxed">
//                      <p className="text-lg">
//                        Mag Marine was founded with a clear belief — that the marine engineering sector in India requires not just skilled execution, but structured leadership, accountable systems, and long-term institutional thinking.
//                      </p>

//                      <p>
//                        Having worked closely within ship repair and shipbuilding environments, both in India and overseas, I witnessed firsthand the challenges caused by fragmented execution, lack of process discipline, and short-term contractor mindsets. Mag Marine was created to address these gaps and to build an organisation that operates with clarity, professionalism, and purpose.
//                      </p>

//                      <p>
//                        My vision is to develop Mag Marine into a leading marine engineering organisation that contributes meaningfully to India's defence and shipbuilding ecosystem. Every project we execute is treated as a step towards building scalable capability and strengthening systems.
//                      </p> 

//                      <p>
//                        With India's growing focus on indigenous shipbuilding, defence self-reliance, and the Make in India initiative, I strongly believe this is a defining period for the marine sector. Mag Marine is being built to grow alongside this national transformation.
//                      </p> 

//                      <div className="bg-gradient-to-r from-cyan-600/10 to-blue-600/10 border-l-4 border-cyan-500 rounded-r-xl p-6 my-6">
//                        <p className="text-white font-semibold text-lg">
//                          Our objective is not short-term expansion, but sustained leadership — where reliability, safety, quality, and accountability define our identity.
//                        </p>
//                      </div>
                     

//                      <p>
//                        Through structured growth, skilled teams, and strong governance, Mag Marine aims to become a trusted name in defence and commercial marine engineering, both in India and beyond.
//                      </p>
//                    </div>

//                    {/* Key Pillars */}
//                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
//                      {[
//                        {  label: "Reliability" },
//                        {  label: "Safety" },
//                        {  label: "Quality" },
//                        {  label: "Accountability" },
//                      ].map((pillar, index) => (
//                        <div
//                          key={index}
//                          className="bg-slate-700/30 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-4 text-center hover:border-cyan-500/50 hover:scale-105 transition-all duration-300"
//                        >
//                          <div className="text-3xl mb-2">{pillar.icon}</div>
//                          <div className="text-white font-semibold text-sm">{pillar.label}</div>
//                        </div>
//                      ))}
//                    </div>
//                  </div>
//                </div>
//              </div>
//            </div>
//          </div>

//         {/* Circular Gallery Section */}
//         <div className="max-w-7xl mx-auto mb-20">
//           <div className="text-center">
//             <h2 className="text-4xl font-bold text-slate-800 mb-4">
//               Our{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
//                 Journey
//               </span>
//             </h2>
//             <p className="text-slate-700 text-lg">
//               Explore our work, projects, and the Mag Marine story
//             </p>
//           </div>

//           {/* CircularGallery Component with proper styling */}
//           <div style={{ height: '700px', position: 'relative' }} className="bg-transparent">
//             <CircularGallery 
//               items={galleryItems}
//               bend={1}
//               textColor="#0e7490"
//               borderRadius={0.05}
//               font="bold 30px system-ui"
//               scrollSpeed={2}
//               scrollEase={0.05}
//             />
//           </div>
          
//           {/* Info Badge */}
//           <div className="text-center mt-8">
//             <div className="inline-flex items-center gap-2 text-slate-700 text-sm bg-white/90 backdrop-blur-sm px-8 py-3 rounded-full border border-cyan-200 shadow-lg font-semibold">
//               <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
//               </svg>
//               Drag or scroll to explore • {galleryItems.length} images in gallery
//             </div>
//           </div>
//         </div>

//         {/* Company Values */}
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-4xl font-bold text-slate-800 text-center mb-12">
//             Our{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
//               Core Values
//             </span>
//           </h2>
          
//           <div className="grid md:grid-cols-3 gap-6">
//             {[
//               {
//                 title: "Technical Excellence",
//                 description: "Delivering world-class marine engineering solutions with precision and expertise",
//                 icon: (
//                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                   </svg>
//                 ),
//               },
//               {
//                 title: "Systematic Approach",
//                 description: "Building robust processes and systems for consistent, reliable project delivery",
//                 icon: (
//                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
//                   </svg>
//                 ),
//               },
//               {
//                 title: "Nation Building",
//                 description: "Contributing to India's defence self-reliance and maritime infrastructure growth",
//                 icon: (
//                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 ),
//               },
//             ].map((value, index) => (
//               <div
//                 key={index}
//                 className="bg-white/70 backdrop-blur-sm border border-slate-300/50 rounded-2xl p-8 hover:border-cyan-400/70 hover:scale-105 transition-all duration-300 group"
//               >
//                 <div className="w-16 h-16 bg-cyan-50/80 rounded-full flex items-center justify-center text-cyan-600 mb-6 group-hover:scale-110 transition-transform">
//                   {value.icon}
//                 </div>
//                 <h3 className="text-2xl font-bold text-slate-800 mb-4">{value.title}</h3>
//                 <p className="text-slate-600 leading-relaxed">{value.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Image Modal */}
//       {selectedImage && (
//         <div
//           className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in"
//           onClick={() => setSelectedImage(null)}
//         >
//           <div className="relative max-w-6xl max-h-[90vh]">
//             <button
//               onClick={() => setSelectedImage(null)}
//               className="absolute -top-12 right-0 text-white hover:text-cyan-400 transition-colors group"
//             >
//               <div className="bg-slate-800/50 backdrop-blur-sm rounded-full p-2 group-hover:bg-slate-700/50 transition-colors">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </div>
//             </button>
//             <div className="relative">
//               <img
//                 src={selectedImage}
//                 alt="Gallery"
//                 className="max-w-full max-h-[90vh] rounded-xl shadow-2xl border-4 border-cyan-500/50"
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fade-in {
//           animation: fade-in 0.6s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AboutUsPage;



import { useState } from "react";
import founderImage from "/backgrounds/ceo.jpeg";
import CircularGallery from './Circulargallery';
import backgroundImage from "/backgrounds/ab.jpg";

// Import all gallery images
import img1 from "/aboutus/img1.jpeg";
import img2 from "/aboutus/img2.jpeg";
import img3 from "/aboutus/img3.jpeg";
import img4 from "/aboutus/img4.jpeg";
import img5 from "/aboutus/img5.jpeg";
import img6 from "/aboutus/img6.jpeg";
import img7 from "/aboutus/img7.jpeg";
import img8 from "/aboutus/img8.jpeg";
import img9 from "/aboutus/img9.jpeg";
import img10 from "/aboutus/img10.jpeg";
import img11 from "/aboutus/img11.jpeg";
import img12 from "/aboutus/img12.jpeg";
import img13 from "/aboutus/img13.jpeg";
import img14 from "/aboutus/img14.jpeg";

const AboutUsPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Format images for CircularGallery component
  const galleryItems = [
    { image: img1, text: '' },
    { image: img2, text: '' },
    { image: img3, text: '' },
    { image: img4, text: '' },
    { image: img5, text: '' },
    { image: img6, text: '' },
    { image: img7, text: '' },
    { image: img8, text: '' },
    { image: img9, text: '' },
    { image: img10, text: '' },
    { image: img11, text: '' },
    { image: img12, text: '' },
    { image: img13, text: '' },
    { image: img14, text: '' },
  ];

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-slate-200 via-slate-100 to-blue-50 pt-24 pb-12 sm:pt-28 md:pt-32 sm:pb-16 md:pb-20"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-3 sm:mb-4 tracking-tight">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
              Mag Marine
            </span>
          </h1>
          <p className="text-slate-700 text-sm sm:text-base md:text-lg max-w-3xl mx-auto px-4">
            Building India's marine engineering future with discipline, technical excellence, and commitment
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-10 sm:mb-12 md:mb-14">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-cyan-500/20 overflow-hidden shadow-2xl">
            
            {/* Section Title */}
            <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border-b border-cyan-500/20 px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white flex items-center gap-2 sm:gap-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Founder's Vision
              </h2>
            </div>

            <div className="p-4 sm:p-6 md:p-8">
              <div className="grid md:grid-cols-5 gap-4 sm:gap-6 md:gap-8 items-start">
                
                {/* Founder Image */}
                <div className="md:col-span-2">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg sm:rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                    <div className="relative">
                      <img
                        src={founderImage}
                        alt="Hrishikesh M Anilkumar - Founder & Managing Director"
                        className="w-full rounded-lg sm:rounded-xl shadow-2xl border-2 sm:border-4 border-slate-300/10"
                      />
                      <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                    </div>
                  </div>
                  
                  {/* Founder Info Card */}
                  <div className="mt-3 sm:mt-4 md:mt-6 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 backdrop-blur-sm border border-cyan-500/20 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 text-center">
                    <h3 className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2">
                      Hrishikesh M Anilkumar
                    </h3>
                    <p className="text-cyan-400 font-semibold text-xs sm:text-sm mb-0.5 sm:mb-1">
                      Founder & Managing Director
                    </p>
                    <p className="text-blue-300 text-[10px] sm:text-xs md:text-sm">
                      Mag Marine Services Private Limited
                    </p>
                  </div>
                </div>

                {/* Vision Content */}
                <div className="md:col-span-3 space-y-3 sm:space-y-4 md:space-y-6">
                  <div className="space-y-2.5 sm:space-y-3 md:space-y-5 text-blue-100 leading-relaxed">
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg">
                      Mag Marine was founded with a clear belief — that the marine engineering sector in India requires not just skilled execution, but structured leadership, accountable systems, and long-term institutional thinking.
                    </p>

                    

                    <p className="text-xs sm:text-sm md:text-base">
                      My vision is to develop Mag Marine into a leading marine engineering organisation that contributes meaningfully to India's defence and shipbuilding ecosystem. 
                    </p> 

                    <p className="text-xs sm:text-sm md:text-base">
                      With India's growing focus on indigenous shipbuilding, defence self-reliance, and the Make in India initiative, I strongly believe this is a defining period for the marine sector. 
                    </p> 

                    <div className="bg-gradient-to-r from-cyan-600/10 to-blue-600/10 border-l-3 sm:border-l-4 border-cyan-500 rounded-r-lg sm:rounded-r-xl p-3 sm:p-4 md:p-6 my-3 sm:my-4 md:my-6">
                      <p className="text-white font-semibold text-xs sm:text-sm md:text-base lg:text-lg">
                        Our objective is not short-term expansion, but sustained leadership — where reliability, safety, quality, and accountability define our identity.
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm md:text-base">
                      Through structured growth, skilled teams, and strong governance, Mag Marine aims to become a trusted name in defence and commercial marine engineering, both in India and beyond.
                    </p>
                  </div>

                  {/* Key Pillars */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-6 md:mt-8">
                    {[
                      { label: "Reliability" },
                      { label: "Safety" },
                      { label: "Quality" },
                      { label: "Accountability" },
                    ].map((pillar, index) => (
                      <div
                        key={index}
                        className="bg-slate-700/30 backdrop-blur-sm border border-cyan-500/20 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 text-center hover:border-cyan-500/50 hover:scale-105 transition-all duration-300"
                      >
                        <div className="text-white font-semibold text-xs sm:text-sm">{pillar.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Circular Gallery Section */}
        <div className="max-w-7xl mx-auto mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-2 sm:mb-3 md:mb-4">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
                Journey
              </span>
            </h2>
            <p className="text-slate-700 text-sm sm:text-base md:text-lg px-4">
              Explore our work, projects, and the Mag Marine story
            </p>
          </div>

          {/* CircularGallery Component with improved mobile responsiveness */}
          <div className="w-full overflow-hidden touch-pan-y" style={{ WebkitOverflowScrolling: 'touch' }}>
            <div 
              className="bg-transparent mx-auto"
              style={{ 
                height: '400px',
                maxWidth: '100%',
                transform: 'translateZ(0)',
                willChange: 'transform'
              }}
            >
              <CircularGallery 
                items={galleryItems}
                bend={0.8}
                textColor="#0e7490"
                borderRadius={0.08}
                font="bold 24px system-ui"
                scrollSpeed={1.5}
                scrollEase={0.08}
              />
            </div>
          </div>
          
          {/* Info Badge */}
          <div className="text-center mt-6 sm:mt-8">
            <div className="inline-flex items-center gap-2 text-slate-700 text-xs sm:text-sm bg-white/90 backdrop-blur-sm px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full border border-cyan-200 shadow-lg font-semibold">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              <span className="hidden sm:inline">Drag or scroll to explore • {galleryItems.length} images in gallery</span>
              <span className="sm:hidden">{galleryItems.length} images • Swipe to explore</span>
            </div>
          </div>
        </div>

        {/* Company Values */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
              Core Values
            </span>
          </h2>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {[
              {
                title: "Technical Excellence",
                description: "Delivering world-class marine engineering solutions with precision and expertise",
                icon: (
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                title: "Systematic Approach",
                description: "Building robust processes and systems for consistent, reliable project delivery",
                icon: (
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                ),
              },
              {
                title: "Nation Building",
                description: "Contributing to India's defence self-reliance and maritime infrastructure growth",
                icon: (
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm border border-slate-300/50 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 hover:border-cyan-400/70 hover:scale-105 transition-all duration-300 group"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-cyan-50/80 rounded-full flex items-center justify-center text-cyan-600 mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 mb-2 sm:mb-3 md:mb-4">{value.title}</h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl max-h-[90vh]">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-cyan-400 transition-colors group"
            >
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-full p-2 group-hover:bg-slate-700/50 transition-colors">
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </button>
            <div className="relative">
              <img
                src={selectedImage}
                alt="Gallery"
                className="max-w-full max-h-[90vh] rounded-lg sm:rounded-xl shadow-2xl border-2 sm:border-4 border-cyan-500/50"
              />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        /* Additional mobile optimizations for gallery */
        @media (max-width: 640px) {
          .touch-pan-y {
            -webkit-overflow-scrolling: touch;
            transform: translateZ(0);
            -webkit-transform: translateZ(0);
          }
        }
        
        /* Improve gallery performance */
        .touch-pan-y > div {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          perspective: 1000px;
          -webkit-perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default AboutUsPage;
