
import bg from '/backgrounds/waves.jpg';

const PortalPage = ({ setCurrentPage, setIsAdmin }) => {
  const handleAdminLogin = () => {
    setCurrentPage("admin-login");
  };

  const handleEmployeePortal = () => {
    setIsAdmin(false);
    setCurrentPage('employee-portal'); // Changed to go to employee selection page
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 pt-32 pb-20 flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
            Portal <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Login</span>
          </h1>
          <p className="text-blue-200 text-lg">
            Select your portal to continue
          </p>
        </div>

        {/* Portal Options */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Admin Portal */}
          <button
            onClick={handleAdminLogin}
            className="group relative bg-gradient-to-br from-slate-800/50 to-blue-950/30 backdrop-blur-sm p-12 rounded-2xl border border-blue-500/20 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/30 transform hover:-translate-y-3"
          >
            <div className="flex flex-col items-center">
              {/* Icon */}
              <div className="p-6 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              
              {/* Title */}
              <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                Admin Portal
              </h2>
              
              {/* Description */}
              <p className="text-blue-200 text-center mb-6">
                Manage news, events, careers, and system settings
              </p>
              
              {/* Arrow */}
              <div className="flex items-center text-cyan-400 font-medium">
                <span>Access Portal</span>
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </button>

          {/* Employee Portal */}
          <button
            onClick={handleEmployeePortal}
            className="group relative bg-gradient-to-br from-slate-800/50 to-blue-950/30 backdrop-blur-sm p-12 rounded-2xl border border-blue-500/20 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/30 transform hover:-translate-y-3"
          >
            <div className="flex flex-col items-center">
              {/* Icon */}
              <div className="p-6 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              
              {/* Title */}
              <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                Employee Portal
              </h2>
              
              {/* Description */}
              <p className="text-blue-200 text-center mb-6">
                Mark attendance and view your records
              </p>
              
              {/* Arrow */}
              <div className="flex items-center text-blue-400 font-medium">
                <span>Access Portal</span>
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </button>
        </div>

        {/* Info Note */}
        <div className="max-w-2xl mx-auto mt-12 text-center">
          <p className="text-blue-300 text-sm">
            <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            For security purposes, please ensure you're using an authorized device
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
      `}</style>
    </div>
  );
};

export default PortalPage;