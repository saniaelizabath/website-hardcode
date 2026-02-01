// src/App.jsx - INTEGRATED WITH EMPLOYEE PORTAL - MOBILE RESPONSIVE
import { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProgressSection from './components/ProgressSection';
import WhyChooseUs from './components/WhyChooseUs';
import Certifications from './components/Certifications';
import Awards from './components/Awards';
import Clients from './components/Clients';
import Locations from './components/Locations';
import ServicesPage from './components/ServicesPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import PortalPage from './components/PortalPage';
import AdminDashboard from './components/AdminDashboard';
import NewsEventsPage from './components/NewsEventsPage';
import CareersPage from './components/CareersPage';
import Footer from './components/Footer';
import AdminLoginPage from "./components/AdminLoginPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import ResetPasswordPage from "./components/PasswordResetPage";

// Employee Portal Components
import EmployeePortalPage from "./components/EmployeePortalPage";
import EmployeeLoginPage from "./components/EmployeeLoginPage";
import EmployeeForgotPasswordPage from "./components/EmployeeForgotPasswordPage";
import EmployeeResetPasswordPage from "./components/EmployeeResetPasswordPage";
import EmployeeDashboard from "./components/EmployeeDashboard";

function App() {
  // Initialize currentPage based on URL parameters
  const getInitialPage = () => {
    console.log('🔍 Checking URL for parameters...');
    console.log('Full URL:', window.location.href);
    console.log('Search params:', window.location.search);
    
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const type = urlParams.get('type');
    
    console.log('Token from URL:', token);
    console.log('Type from URL:', type);
    
    if (token) {
      if (type === 'employee') {
        console.log('✅ Employee reset token found! Setting page to employee-reset-password');
        return 'employee-reset-password';
      }
      console.log('✅ Admin reset token found! Setting page to reset-password');
      return 'reset-password';
    }
    
    console.log('❌ No token found. Setting page to home');
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [isAdmin, setIsAdmin] = useState(false);
  const [resetToken, setResetToken] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('token');
  });
  
  // State for admin-added content
  const [newsEvents, setNewsEvents] = useState([]);
  const [careers, setCareers] = useState([]);

  // Employee state
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loggedInEmployee, setLoggedInEmployee] = useState(null);

  // Extract token from URL on component mount
  useEffect(() => {
    console.log('🚀 App mounted, checking for token...');
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const type = urlParams.get('type');
    
    if (token) {
      console.log('✅ Token found in useEffect:', token);
      setResetToken(token);
      
      if (type === 'employee') {
        setCurrentPage('employee-reset-password');
      } else {
        setCurrentPage('reset-password');
      }
      
      // Clean up URL (remove token from address bar)
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      console.log('❌ No token in useEffect');
    }
  }, []);

  // Debug: Log whenever currentPage changes
  useEffect(() => {
    console.log('📄 Current page changed to:', currentPage);
  }, [currentPage]);

  // Smooth scroll to top when changing pages
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to top whenever page changes
  useEffect(() => {
    scrollToTop();
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="flex-1 w-full">
        {/* Home Page with Smooth Scroll Snapping */}
        {currentPage === 'home' && (
          <div className="snap-y snap-mandatory h-[calc(100vh-64px)] md:h-screen overflow-y-scroll scroll-smooth">
            <div className="snap-start snap-always">
              <HeroSection />
            </div>
            <div className="snap-start snap-always">
              <ProgressSection />
            </div>
            <div className="snap-start snap-always">
              <WhyChooseUs />
            </div>
            <div className="snap-start snap-always">
              <Certifications />
            </div>
            <div className="snap-start snap-always">
              <Awards />
            </div>
            <div className="snap-start snap-always">
              <Clients />
            </div>
            <div className="snap-start snap-always">
              <Locations />
            </div>
          </div>
        )}

        {/* About Page */}
        {currentPage === 'about' && (
          <div className="w-full">
            <AboutPage />
          </div>
        )}

        {/* Services Page */}
        {currentPage === 'services' && (
          <div className="w-full">
            <ServicesPage />
          </div>
        )}

        {/* Contact Page */}
        {currentPage === 'contact' && (
          <div className="w-full">
            <ContactPage />
          </div>
        )}

        {/* Portal Page */}
        {currentPage === 'portal' && (
          <div className="w-full">
            <PortalPage 
              setCurrentPage={setCurrentPage} 
              setIsAdmin={setIsAdmin} 
            />
          </div>
        )}

        {/* Admin Login Page */}
        {currentPage === "admin-login" && (
          <div className="w-full">
            <AdminLoginPage setCurrentPage={setCurrentPage} />
          </div>
        )}

        {/* Admin Forgot Password */}
        {currentPage === "forgot-password" && (
          <div className="w-full">
            <ForgotPasswordPage setCurrentPage={setCurrentPage} />
          </div>
        )}

        {/* Admin Reset Password */}
        {currentPage === "reset-password" && (
          <div className="w-full">
            {console.log('🔐 Rendering Admin ResetPasswordPage with token:', resetToken)}
            <ResetPasswordPage 
              setCurrentPage={setCurrentPage} 
              token={resetToken}
            />
          </div>
        )}

        {/* Admin Dashboard */}
        {currentPage === 'admin-dashboard' && (
          <div className="w-full">
            <AdminDashboard 
              newsEvents={newsEvents}
              setNewsEvents={setNewsEvents}
              careers={careers}
              setCareers={setCareers}
            />
          </div>
        )}

        {/* Employee Portal Page - Select Employee */}
        {currentPage === 'employee-portal' && (
          <div className="w-full">
            <EmployeePortalPage 
              setCurrentPage={setCurrentPage}
              setSelectedEmployee={setSelectedEmployee}
            />
          </div>
        )}

        {/* Employee Login Page */}
        {currentPage === 'employee-login' && (
          <div className="w-full">
            <EmployeeLoginPage 
              setCurrentPage={setCurrentPage}
              selectedEmployee={selectedEmployee}
              setLoggedInEmployee={setLoggedInEmployee}
            />
          </div>
        )}

        {/* Employee Forgot Password */}
        {currentPage === 'employee-forgot-password' && (
          <div className="w-full">
            <EmployeeForgotPasswordPage 
              setCurrentPage={setCurrentPage}
              selectedEmployee={selectedEmployee}
            />
          </div>
        )}

        {/* Employee Reset Password */}
        {currentPage === 'employee-reset-password' && (
          <div className="w-full">
            {console.log('🔐 Rendering Employee ResetPasswordPage with token:', resetToken)}
            <EmployeeResetPasswordPage 
              setCurrentPage={setCurrentPage}
              token={resetToken}
            />
          </div>
        )}

        {/* Employee Dashboards - Separate dashboard for each employee */}
        {currentPage.startsWith('employee-dashboard-') && loggedInEmployee && (
          <div className="w-full">
            <EmployeeDashboard 
              loggedInEmployee={loggedInEmployee}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}

        {/* News & Events Page */}
        {currentPage === 'news' && (
          <div className="w-full">
            <NewsEventsPage newsEvents={newsEvents} />
          </div>
        )}

        {/* Careers Page */}
        {currentPage === 'careers' && (
          <div className="w-full">
            <CareersPage careers={careers} />
          </div>
        )}
      </main>

      {/* Footer - Always visible on all pages except home */}
      {currentPage !== 'home' && (
        <Footer setCurrentPage={setCurrentPage} />
      )}

      {/* Scroll to Top Button - Only show on non-home pages */}
      {currentPage !== 'home' && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-4 md:bottom-8 md:right-8 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-3 md:p-4 rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-110 z-50 group"
          aria-label="Scroll to top"
        >
          <svg 
            className="w-5 h-5 md:w-6 md:h-6 transform group-hover:-translate-y-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* Global scroll behavior styles */}
      <style jsx="true" global="true">{`
        /* Smooth scrolling for the entire app */
        html {
          scroll-behavior: smooth;
        }

        /* Prevent horizontal overflow on mobile */
        body {
          overflow-x: hidden;
        }

        /* Custom scrollbar styling */
        .snap-y::-webkit-scrollbar {
          width: 6px;
        }

        .snap-y::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
        }

        .snap-y::-webkit-scrollbar-thumb {
          background: rgba(56, 189, 248, 0.3);
          border-radius: 4px;
        }

        .snap-y::-webkit-scrollbar-thumb:hover {
          background: rgba(56, 189, 248, 0.5);
        }

        /* Ensure sections take full viewport height */
        .snap-start > * {
          min-height: 100vh;
        }

        /* Mobile-specific adjustments */
        @media (max-width: 768px) {
          .snap-y::-webkit-scrollbar {
            width: 4px;
          }
          
          /* Adjust snap behavior on mobile for better UX */
          .snap-y {
            scroll-snap-type: y proximity;
          }
        }

        /* Prevent text from overflowing on small screens */
        * {
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

        /* Ensure all containers respect viewport width on mobile */
        .w-full {
          max-width: 100vw;
        }
      `}</style>
    </div>
  );
}

export default App;