// src/components/Clients.jsx
import { useEffect, useRef } from 'react';

// Import all client logos
import ltShipbuilding from '/clientlogo/LT-Shipbuilding.png';
import indianCoastGuard from '/clientlogo/indiancoastguard.avif';
import johnsonControls from '/clientlogo/johnsoncontrols.png';
import grse from '/clientlogo/grse.jpg';
import oceanSparkle from '/clientlogo/Ocean-Sparkle-Limited.jpg';
import kongsberg from '/clientlogo/kongsberg-digital.png';
import chowgule from '/clientlogo/chowglue.jpeg';
import indianNavy from '/clientlogo/indiannavyusnavy.png';
import solasMarine from '/clientlogo/solas.jpg';
import gmmcoCat from '/clientlogo/gmmco.png';
import cochinShipyard from '/clientlogo/cochin-shipyard.jpg';
import msc from '/clientlogo/msc.jpg';
import wspl from '/clientlogo/wspl.png';
import mazagonDock from '/clientlogo/naval-ship-karwar.png';
import udupi from '/clientlogo/udupi.jpeg';
import ltDefence from '/clientlogo/LTdefence.jpg';
import hsl from '/clientlogo/hsl.jpg';
import adaniPorts from '/clientlogo/Adani-Port-Container-Tracking.webp';
import ussSalvor from '/clientlogo/USS_Salvor.jpg';

const Clients = () => {
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);

  const clientsRow1 = [
    { name: "L&T Shipbuilding", logo: ltShipbuilding },
    { name: "Indian Coast Guard", logo: indianCoastGuard },
    { name: "Johnson Controls", logo: johnsonControls },
    { name: "Garden Reach Shipbuilders", logo: grse },
    { name: "Ocean Sparkle Limited", logo: oceanSparkle },
    { name: "Kongsberg", logo: kongsberg },
    { name: "Chowgule SBD", logo: chowgule },
    { name: "Indian Navy", logo: indianNavy },
    { name: "Solas Marine", logo: solasMarine },
    { name: "Gmmco CAT", logo: gmmcoCat }
  ];

  const clientsRow2 = [
    { name: "Cochin Shipyard", logo: cochinShipyard },
    { name: "MSC Kreuzfahrten", logo: msc },
    { name: "WSPL", logo: wspl },
    { name: "Mazagon Dock", logo: mazagonDock },
    { name: "UDUPI", logo: udupi },
    { name: "L&T Defence", logo: ltDefence },
    { name: "Hindustan Shipyard", logo: hsl },
    { name: "Adani Ports", logo: adaniPorts },
    { name: "USS Salvor", logo: ussSalvor }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-50 to-blue-50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-light text-slate-800 mb-4 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
            Our <span className="text-blue-700">Clients</span>
          </h2>
          <div className="w-20 h-0.5 bg-blue-600 mx-auto mt-6"></div>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto mt-8 font-light" style={{ fontFamily: 'Georgia, serif' }}>
            Trusted partnerships with leading organizations
          </p>
        </div>

        {/* Infinite Scrolling Row 1 - Left to Right */}
        <div className="relative mb-12 overflow-hidden">
          <div className="flex gap-12 animate-scroll-left">
            {[...clientsRow1, ...clientsRow1].map((client, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-48 h-32 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 flex items-center justify-center group hover:scale-110 border border-slate-200"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-70 group-hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Infinite Scrolling Row 2 - Right to Left */}
        <div className="relative overflow-hidden">
          <div className="flex gap-12 animate-scroll-right">
            {[...clientsRow2, ...clientsRow2].map((client, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-48 h-32 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 flex items-center justify-center group hover:scale-110 border border-slate-200"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-70 group-hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div className="text-center group">
            <div className="text-5xl font-light text-blue-700 mb-3 group-hover:scale-110 transition-transform" style={{ fontFamily: 'Georgia, serif' }}>
              50<span className="text-blue-500">+</span>
            </div>
            <div className="text-slate-600 text-sm uppercase tracking-widest font-light">
              Active Clients
            </div>
          </div>
          <div className="text-center group">
            <div className="text-5xl font-light text-blue-700 mb-3 group-hover:scale-110 transition-transform" style={{ fontFamily: 'Georgia, serif' }}>
              500<span className="text-blue-500">+</span>
            </div>
            <div className="text-slate-600 text-sm uppercase tracking-widest font-light">
              Projects Delivered
            </div>
          </div>
          <div className="text-center group">
            <div className="text-5xl font-light text-blue-700 mb-3 group-hover:scale-110 transition-transform" style={{ fontFamily: 'Georgia, serif' }}>
              15<span className="text-blue-500">+</span>
            </div>
            <div className="text-slate-600 text-sm uppercase tracking-widest font-light">
              Years Experience
            </div>
          </div>
          <div className="text-center group">
            <div className="text-5xl font-light text-blue-700 mb-3 group-hover:scale-110 transition-transform" style={{ fontFamily: 'Georgia, serif' }}>
              100<span className="text-blue-500">%</span>
            </div>
            <div className="text-slate-600 text-sm uppercase tracking-widest font-light">
              Client Satisfaction
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }

        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Clients;