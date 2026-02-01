// src/components/Footer.jsx
const Footer = ({ setCurrentPage }) => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-blue-500/20">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <h3 className="text-lg md:text-2xl font-bold text-white mb-3 md:mb-4">
              MAG MARINE SERVICES
            </h3>
            <p className="text-sm md:text-base text-blue-200 mb-4 leading-relaxed">
              Your trusted partner in marine engineering, diving services, and maritime solutions.
              Committed to excellence, safety, and innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base md:text-lg text-white font-semibold mb-3 md:mb-4">Quick Links</h4>
            <ul className="space-y-2">
              { [
                { label: 'About Us', id: 'about' },
                { label: 'Services', id: 'services' },
                { label: 'Projects', id: 'projects' },
                { label: 'Careers', id: 'careers' }
              ].map((item) => (
                <li key={item.id}>
                  <button 
                    onClick={() => handleNavClick(item.id)}
                    className="text-sm md:text-base text-blue-300 hover:text-cyan-400 transition-colors duration-300 cursor-pointer bg-none border-none p-0"
                  >
                    {item.label}
                  </button>
                </li>
              )) }
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base md:text-lg text-white font-semibold mb-3 md:mb-4">Contact</h4>
            <ul className="space-y-2 text-sm md:text-base text-blue-200">
              <li>Email: hello@magmarine.in</li>
              <li>Phone: 0484 312140</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 md:pt-8 border-t border-blue-500/20 text-center text-sm md:text-base text-blue-300">
          <p>&copy; {currentYear} Mag Marine Services Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;