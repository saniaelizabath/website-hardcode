import { useState } from 'react';
import bg from '/backgrounds/portal.jpg'

const ContactPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const locations = [
    {
      name: "KOCHI OFFICE",
      address: "FIDA TOWER, KK PADMANABHAN ROAD, ERNAKULAM NORTH, 682018",
      phone: "0484 214 3140",
      email: "hello@magmarine.in",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3663.253357824076!2d76.2794716!3d9.992084599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d001e771e0d%3A0xd86d316f0d03ef88!2sMag%20Marine%20Services%20Pvt.%20Ltd.!5e1!3m2!1sen!2sin!4v1770209545323!5m2!1sen!2sin" 
    },
    {
      name: "CHENNAI OFFICE",
      address: "71, L&T SHIPBUILDING, KATTUPALLI, TAMIL NADU 600120",
      phone: "8714139489",
      email: "hello@magmarine.in",
      mapEmbed:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3882.660460504073!2d80.3456254!3d13.3091379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52776122992fe1%3A0x6059d1f40a2199a6!2sMag%20Marine%20Services%20Private%20Limited!5e0!3m2!1sen!2sin!4v1770209823448!5m2!1sen!2sin" 
    },
    {
      name: "MANGLORE BRANCH",
      address: "CSBD, KASBA BENGRE, MANGALURU, KARNATAKA 575001",
      phone: "9961866395",
      email: "hello@magmarine.in",
      mapEmbed:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.5064604398544!2d74.820809!3d12.875122000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35bfa8dce3661%3A0xbb969ec5f3f0f860!2sChowguleSBD%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1770209929408!5m2!1sen!2sin" 
    },
    {
      name: "VIZAG BRANCH",
      address: "SITE OFFICE, HINDUSTAN SHIPYARD, VISAKHAPATNAM, ANDHRA PRADESH 530005",
      phone: "9539759593",
      email: "hello@magmarine.in",
      mapEmbed:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3801.1223101522146!2d83.2779111!3d17.6916813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a39430040e85cad%3A0x50519fa7caf8bee4!2sMag%20Marine%20Services%20Private%20Limited!5e0!3m2!1sen!2sin!4v1770209984716!5m2!1sen!2sin" 
    },
    {
      name: "OVERSEAS BRANCH",
      address: "6A, LUMBARE AVE, KAMPALA, UGANDA",
      phone: "+256 752731787",
      email: "hello@magmarine.in",
      mapEmbed:"https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3989.755696914027!2d32.57453667496461!3d0.32101849967583085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMMKwMTknMTUuNyJOIDMywrAzNCczNy42IkU!5e0!3m2!1sen!2sin!4v1770210033553!5m2!1sen!2sin"
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('message', formData.message);

      // ✅ Using API instance instead of fetch
      const response = await API.post('/api/send-contact', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data && response.data.success) {
        alert('Message sent successfully! We will get back to you soon.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setShowForm(false);
      } else {
        alert('Failed to send message. Please try again or email us directly at hello@magmarine.in');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please email us directly at hello@magmarine.in');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 pt-24 pb-20" style={{
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed'
    }}>
      {/* Dark overlay for better text readability */}
      <div className="fixed inset-0 bg-black/40 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Us</span>
          </h1>
          <p className="text-blue-200 text-lg">
            Get in touch with us for any inquiries or support
          </p>
        </div>

        {/* Contact Info Card - GLASSMORPHISM EFFECT */}
        <div className="max-w-4xl mx-auto mb-12 glass-card rounded-2xl p-8 text-white text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div>
              <p className="text-sm uppercase tracking-wider mb-2 opacity-90">Phone</p>
              <a href="tel:0484312140" className="text-2xl md:text-3xl font-bold hover:text-cyan-300 transition-colors">
                0484 312140
              </a>
            </div>
            <div className="hidden md:block w-px h-16 bg-white/30"></div>
            <div>
              <p className="text-sm uppercase tracking-wider mb-2 opacity-90">Email</p>
              <a href="mailto:hello@magmarine.in" className="text-2xl md:text-3xl font-bold hover:text-cyan-300 transition-colors">
                hello@magmarine.in
              </a>
            </div>
          </div>
        </div>

        {/* Talk to Us Button - GLASSMORPHISM EFFECT */}
        <div className="text-center mb-12">
          <button
            onClick={() => setShowForm(!showForm)}
            className="glass-button text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 transform"
          >
            {showForm ? 'Close Form' : 'Talk to Us'}
          </button>
        </div>

        {/* Contact Form */}
        {showForm && (
          <div className="max-w-2xl mx-auto mb-16">
            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Send us a Message</h2>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-blue-200 mb-2 font-medium">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/15 transition-all placeholder:text-white/50"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-blue-200 mb-2 font-medium">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/15 transition-all placeholder:text-white/50"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-blue-200 mb-2 font-medium">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/15 transition-all placeholder:text-white/50"
                      placeholder="+91 1234567890"
                    />
                  </div>
                  <div>
                    <label className="block text-blue-200 mb-2 font-medium">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/15 transition-all placeholder:text-white/50"
                      placeholder="Subject"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-blue-200 mb-2 font-medium">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/15 transition-all resize-none placeholder:text-white/50"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full glass-button-submit text-white py-4 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Locations Grid - Horizontal Layout */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white text-center mb-10">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Locations</span>
          </h2>
          <div className="flex overflow-x-auto gap-6 pb-6 px-2 scroll-smooth" style={{ scrollbarWidth: 'thin' }}>
            {locations.map((location, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-80 glass-card rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300"
              >
                {/* Map */}
                <div className="h-48 bg-slate-700">
                  <iframe
                    src={location.mapEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                  ></iframe>
                </div>
                {/* Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{location.name}</h3>
                  <div className="space-y-2 text-blue-200">
                    <p className="flex items-start gap-2 text-sm">
                      <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{location.address}</span>
                    </p>
                    <p className="flex items-center gap-2 text-sm">
                      <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href={`tel:${location.phone.replace(/\s/g, '')}`} className="hover:text-cyan-400 transition-colors">{location.phone}</a>
                    </p>
                    <p className="flex items-center gap-2 text-sm">
                      <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href={`mailto:${location.email}`} className="hover:text-cyan-400 transition-colors">{location.email}</a>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Glassmorphism Card Effect */
        .glass-card {
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 
            0 8px 32px 0 rgba(0, 0, 0, 0.37),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
        }

        /* Glassmorphism Button Effect */
        .glass-button {
          background: rgba(30, 41, 59, 0.6);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 8px 32px 0 rgba(34, 211, 238, 0.3),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.2);
        }

        .glass-button:hover {
          background: rgba(30, 41, 59, 0.75);
          border: 1px solid rgba(34, 211, 238, 0.4);
          box-shadow: 
            0 8px 32px 0 rgba(34, 211, 238, 0.5),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.3);
        }

        /* Submit Button Glass Effect */
        .glass-button-submit {
          background: linear-gradient(135deg, rgba(34, 211, 238, 0.4), rgba(59, 130, 246, 0.4));
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 
            0 8px 32px 0 rgba(34, 211, 238, 0.4),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.2);
        }

        .glass-button-submit:hover:not(:disabled) {
          background: linear-gradient(135deg, rgba(34, 211, 238, 0.6), rgba(59, 130, 246, 0.6));
          box-shadow: 
            0 8px 32px 0 rgba(34, 211, 238, 0.6),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.3);
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.5);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.5);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.8);
        }
      `}</style>
    </div>
  );
};

export default ContactPage;