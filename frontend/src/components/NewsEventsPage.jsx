import { useEffect, useState } from "react";
import API from "../api";
import newsBackground from "/backgrounds/news.jpg";

const NewsEventsPage = () => {
  const [newsEvents, setNewsEvents] = useState([]);

  // -------------------------
  // Fetch news from backend
  // -------------------------
  useEffect(() => {
    API.get("/news")
      .then((res) => {
        setNewsEvents(
          res.data.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            image: `http://127.0.0.1:8000/${item.image_path}`,
            date: item.date,
          }))
        );
      })
      .catch((err) => {
        console.error("Failed to fetch news:", err);
      });
  }, []);

  return (
    <div className="relative bg-slate-900">
      {/* Background Image - Changed from fixed to absolute */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${newsBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'scroll',
        }}
      />

      {/* Content */}
      <div className="relative z-10 pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-12 lg:mb-16 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 tracking-tight drop-shadow-lg">
              News &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Events
              </span>
            </h1>
            <p className="text-white text-sm sm:text-base lg:text-lg max-w-3xl mx-auto drop-shadow-md px-4">
              Stay updated with our latest achievements and activities
            </p>
          </div>

          {/* News Grid */}
          {newsEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
              {newsEvents.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 hover:border-blue-300"
                >
                  {/* Image */}
                  <div className="relative h-48 sm:h-52 lg:h-56 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Date Badge */}
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/95 backdrop-blur-sm text-blue-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-md border border-blue-200">
                      {item.date}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Accent */}
                  <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-lg p-8 sm:p-10 lg:p-12 border border-gray-200 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
                  No News or Events Yet
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Check back soon for updates on our latest achievements and activities
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

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
      `}</style>
    </div>
  );
};

export default NewsEventsPage;