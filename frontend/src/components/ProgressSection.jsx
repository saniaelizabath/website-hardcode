// import { useEffect, useRef, useState } from 'react';

// const ProgressSection = () => {
//   const canvasRef = useRef(null);
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

//     const section = document.getElementById('progress-section');
//     if (section) observer.observe(section);

//     return () => observer.disconnect();
//   }, []);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     canvas.width = window.innerWidth;
//     canvas.height = canvas.parentElement.clientHeight;

//     const particles = [];
//     const particleCount = 300;
//     const centerX = canvas.width / 2;
//     const centerY = canvas.height / 2;
//     let mouse = { x: null, y: null, radius: 150 };
//     let time = 0;

//     // Enhanced smooth settings
//     const config = {
//       minOrbitRadius: 150,
//       maxOrbitRadius: 400,
//       waveSpeed: 0.3,
//       waveAmplitude: 1,
//       particleSize: 1.5,
//       lerpSpeed: 0.06,
//       color: '#35373a',
//       particleVariance: 1,
//       pulseSpeed: 2,
//       fieldStrength: 12,
//       mouseDamping: 0.92,
//       returnSpeed: 0.04
//     };

//     class Particle {
//       constructor(index) {
//         this.index = index;
        
//         // Circular orbit setup - concentrated in the middle
//         this.orbitRadius = config.minOrbitRadius + Math.random() * (config.maxOrbitRadius - config.minOrbitRadius);
//         this.orbitAngle = (index / particleCount) * Math.PI * 2 + Math.random() * 0.5;
//         this.orbitSpeed = (Math.random() * 0.4 + 0.3) * (Math.random() > 0.5 ? 1 : -1);
        
//         // Calculate position on circular path
//         this.baseX = centerX + Math.cos(this.orbitAngle) * this.orbitRadius;
//         this.baseY = centerY + Math.sin(this.orbitAngle) * this.orbitRadius;
        
//         this.x = this.baseX;
//         this.y = this.baseY;
//         this.vx = 0;
//         this.vy = 0;
        
//         // Visual properties
//         this.size = config.particleSize + (Math.random() * config.particleVariance - config.particleVariance / 2);
//         this.rotation = this.orbitAngle;
//         this.pulseOffset = Math.random() * Math.PI * 2;
//         this.depth = Math.random();
        
//         // Swimming animation
//         this.swimOffset = Math.random() * Math.PI * 2;
//       }

//       draw() {
//         // Smooth pulse effect
//         const pulse = Math.sin(time * config.pulseSpeed + this.pulseOffset) * 0.2 + 0.9;
//         const size = this.size * pulse;
        
//         // Color with opacity
//         const alpha = 0.5 + this.depth * 0.3;
//         const rgb = this.hexToRgb(config.color);
        
//         ctx.save();
//         ctx.translate(this.x, this.y);
//         ctx.rotate(this.rotation);
        
//         // Smooth capsule shape
//         ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
//         ctx.beginPath();
        
//         const width = size * 3.5;
//         const height = size;
//         ctx.ellipse(0, 0, width, height, 0, 0, Math.PI * 2);
//         ctx.fill();
        
//         // Subtle glow
//         ctx.shadowBlur = 12;
//         ctx.shadowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`;
//         ctx.fill();
        
//         ctx.restore();
//       }

//       update() {
//         // Smooth circular orbit movement
//         this.orbitAngle += this.orbitSpeed * 0.008;
        
//         // Gentle wave motion
//         const wave = Math.sin(time * config.waveSpeed + this.swimOffset) * config.waveAmplitude * 15;
        
//         // Target position on circular path
//         const targetX = centerX + Math.cos(this.orbitAngle) * (this.orbitRadius + wave);
//         const targetY = centerY + Math.sin(this.orbitAngle) * (this.orbitRadius + wave);
        
//         // Mouse interaction - ULTRA SMOOTH flee behavior
//         let fleeX = 0;
//         let fleeY = 0;
        
//         if (mouse.x !== null && mouse.y !== null) {
//           let dx = this.x - mouse.x;
//           let dy = this.y - mouse.y;
//           let distance = Math.sqrt(dx * dx + dy * dy);
          
//           if (distance < mouse.radius && distance > 0) {
//             // Super smooth repulsion with gradual falloff
//             let force = ((mouse.radius - distance) / mouse.radius);
//             force = Math.pow(force, 3) * config.fieldStrength; // Cubic falloff for ultra smoothness
//             let angle = Math.atan2(dy, dx);
//             fleeX = Math.cos(angle) * force;
//             fleeY = Math.sin(angle) * force;
//           }
//         }
        
//         // Ultra smooth lerp towards target position
//         this.vx += (targetX - this.x) * config.returnSpeed + fleeX * 0.5;
//         this.vy += (targetY - this.y) * config.returnSpeed + fleeY * 0.5;
        
//         // Enhanced smooth damping for fluid motion
//         this.vx *= config.mouseDamping;
//         this.vy *= config.mouseDamping;
        
//         // Update position
//         this.x += this.vx;
//         this.y += this.vy;
        
//         // Ultra smooth rotation to face movement direction
//         const targetRotation = Math.atan2(this.vy, this.vx);
//         let rotDiff = targetRotation - this.rotation;
        
//         // Normalize angle difference
//         while (rotDiff > Math.PI) rotDiff -= Math.PI * 2;
//         while (rotDiff < -Math.PI) rotDiff += Math.PI * 2;
        
//         this.rotation += rotDiff * 0.08;
//       }

//       hexToRgb(hex) {
//         const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//         return result ? {
//           r: parseInt(result[1], 16),
//           g: parseInt(result[2], 16),
//           b: parseInt(result[3], 16)
//         } : { r: 122, g: 133, b: 153 };
//       }
//     }

//     function init() {
//       particles.length = 0;
//       for (let i = 0; i < particleCount; i++) {
//         particles.push(new Particle(i));
//       }
//     }

//     function animate() {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       ctx.shadowBlur = 0;
      
//       time += 0.016;

//       // Sort by depth for proper layering
//       particles.sort((a, b) => a.depth - b.depth);

//       for (let i = 0; i < particles.length; i++) {
//         particles[i].update();
//         particles[i].draw();
//       }

//       requestAnimationFrame(animate);
//     }

//     const handleMouseMove = (e) => {
//       const rect = canvas.getBoundingClientRect();
//       mouse.x = e.clientX - rect.left;
//       mouse.y = e.clientY - rect.top;
//     };

//     const handleMouseLeave = () => {
//       mouse.x = null;
//       mouse.y = null;
//     };

//     const handleResize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = canvas.parentElement.clientHeight;
//       init();
//     };

//     canvas.addEventListener('mousemove', handleMouseMove);
//     canvas.addEventListener('mouseleave', handleMouseLeave);
//     window.addEventListener('resize', handleResize);

//     init();
//     animate();

//     return () => {
//       canvas.removeEventListener('mousemove', handleMouseMove);
//       canvas.removeEventListener('mouseleave', handleMouseLeave);
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <section 
//       id="progress-section"
//       className="relative min-h-screen flex items-center justify-center overflow-hidden"
//     >
//       {/* Background Image - Blurred */}
//       <div className="absolute inset-0 z-0">
//         <img 
//           src="/src/images/water-view.jpg" 
//           alt="background" 
//           // className="w-full h-full object-cover blur-md"
//         />
//       </div>

//       {/* Overlay for better particle and text visibility */}
//       <div className="absolute inset-0 bg-slate-900/40 z-5"></div>

//       {/* Interactive Canvas Background */}
//       <canvas
//         ref={canvasRef}
//         className="absolute inset-0 z-10"
//       ></canvas>

//       {/* Content */}
//       <div className={`relative z-20 container mx-auto px-6 py-20 transition-all duration-1000 ${
//         isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//       }`}>
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight drop-shadow-lg">
//             Driven by <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-blue-400">Dedication</span>
//           </h2>
//           <p className="text-base md:text-lg text-white leading-relaxed mb-4 drop-shadow-md">
//             At <strong>Mag Marine Services</strong>, our progress is driven by the dedication of our team and the trust of our partners. 
//             Their continued support has helped us grow rapidly and build a strong presence in the marine sector.
//           </p>
//           <p className="text-base md:text-lg text-white leading-relaxed mb-4 drop-shadow-md">
//             We are expanding our operations and capabilities to meet the evolving needs of the industry. 
//             With a focus on quality, efficiency, and innovation, we aim to deliver even greater value to our clients.
//           </p>
//           <p className="text-base md:text-lg text-white leading-relaxed drop-shadow-md">
//             As we move forward, we remain committed to progress, adaptability, and excellence—while staying true to 
//             the values that have shaped our journey so far.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProgressSection;




import { useEffect, useRef, useState } from 'react';
import waterViewImage from '../images/water-view.jpg'; // Proper import for Vercel

const ProgressSection = () => {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection Observer for smooth scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { 
        threshold: 0.2, // Trigger when 20% visible
        rootMargin: '-50px' // Slight delay for better effect
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    updateCanvasSize();

    const particles = [];
    // Reduce particle count on mobile for better performance
    const particleCount = isMobile ? 150 : 300;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    let mouse = { x: null, y: null, radius: isMobile ? 100 : 150 };
    let time = 0;

    // Enhanced smooth settings
    const config = {
      minOrbitRadius: isMobile ? 80 : 150,
      maxOrbitRadius: isMobile ? 200 : 400,
      waveSpeed: 0.3,
      waveAmplitude: 1,
      particleSize: isMobile ? 1 : 1.5,
      lerpSpeed: 0.06,
      color: '#35373a',
      particleVariance: 1,
      pulseSpeed: 2,
      fieldStrength: 12,
      mouseDamping: 0.92,
      returnSpeed: 0.04
    };

    class Particle {
      constructor(index) {
        this.index = index;
        
        // Circular orbit setup - concentrated in the middle
        this.orbitRadius = config.minOrbitRadius + Math.random() * (config.maxOrbitRadius - config.minOrbitRadius);
        this.orbitAngle = (index / particleCount) * Math.PI * 2 + Math.random() * 0.5;
        this.orbitSpeed = (Math.random() * 0.4 + 0.3) * (Math.random() > 0.5 ? 1 : -1);
        
        // Calculate position on circular path
        this.baseX = centerX + Math.cos(this.orbitAngle) * this.orbitRadius;
        this.baseY = centerY + Math.sin(this.orbitAngle) * this.orbitRadius;
        
        this.x = this.baseX;
        this.y = this.baseY;
        this.vx = 0;
        this.vy = 0;
        
        // Visual properties
        this.size = config.particleSize + (Math.random() * config.particleVariance - config.particleVariance / 2);
        this.rotation = this.orbitAngle;
        this.pulseOffset = Math.random() * Math.PI * 2;
        this.depth = Math.random();
        
        // Swimming animation
        this.swimOffset = Math.random() * Math.PI * 2;
      }

      draw() {
        // Smooth pulse effect
        const pulse = Math.sin(time * config.pulseSpeed + this.pulseOffset) * 0.2 + 0.9;
        const size = this.size * pulse;
        
        // Color with opacity
        const alpha = 0.5 + this.depth * 0.3;
        const rgb = this.hexToRgb(config.color);
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Smooth capsule shape
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
        ctx.beginPath();
        
        const width = size * 3.5;
        const height = size;
        ctx.ellipse(0, 0, width, height, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Subtle glow (reduce on mobile for performance)
        if (!isMobile) {
          ctx.shadowBlur = 12;
          ctx.shadowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`;
          ctx.fill();
        }
        
        ctx.restore();
      }

      update() {
        // Smooth circular orbit movement
        this.orbitAngle += this.orbitSpeed * 0.008;
        
        // Gentle wave motion
        const wave = Math.sin(time * config.waveSpeed + this.swimOffset) * config.waveAmplitude * 15;
        
        // Target position on circular path
        const targetX = centerX + Math.cos(this.orbitAngle) * (this.orbitRadius + wave);
        const targetY = centerY + Math.sin(this.orbitAngle) * (this.orbitRadius + wave);
        
        // Mouse interaction - ULTRA SMOOTH flee behavior
        let fleeX = 0;
        let fleeY = 0;
        
        if (mouse.x !== null && mouse.y !== null) {
          let dx = this.x - mouse.x;
          let dy = this.y - mouse.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius && distance > 0) {
            // Super smooth repulsion with gradual falloff
            let force = ((mouse.radius - distance) / mouse.radius);
            force = Math.pow(force, 3) * config.fieldStrength; // Cubic falloff for ultra smoothness
            let angle = Math.atan2(dy, dx);
            fleeX = Math.cos(angle) * force;
            fleeY = Math.sin(angle) * force;
          }
        }
        
        // Ultra smooth lerp towards target position
        this.vx += (targetX - this.x) * config.returnSpeed + fleeX * 0.5;
        this.vy += (targetY - this.y) * config.returnSpeed + fleeY * 0.5;
        
        // Enhanced smooth damping for fluid motion
        this.vx *= config.mouseDamping;
        this.vy *= config.mouseDamping;
        
        // Update position
        this.x += this.vx;
        this.y += this.vy;
        
        // Ultra smooth rotation to face movement direction
        const targetRotation = Math.atan2(this.vy, this.vx);
        let rotDiff = targetRotation - this.rotation;
        
        // Normalize angle difference
        while (rotDiff > Math.PI) rotDiff -= Math.PI * 2;
        while (rotDiff < -Math.PI) rotDiff += Math.PI * 2;
        
        this.rotation += rotDiff * 0.08;
      }

      hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : { r: 122, g: 133, b: 153 };
      }
    }

    function init() {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(i));
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.shadowBlur = 0;
      
      time += 0.016;

      // Sort by depth for proper layering
      particles.sort((a, b) => a.depth - b.depth);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      requestAnimationFrame(animate);
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleTouchMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouse.x = touch.clientX - rect.left;
      mouse.y = touch.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      updateCanvasSize();
      init();
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchend', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    init();
    animate();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchend', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  return (
    <section 
      ref={sectionRef}
      id="progress-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image - Properly imported and blurred */}
      <div className="absolute inset-0 z-0">
        <img 
          src={waterViewImage}
          alt="Water view background" 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Overlay for better particle and text visibility */}
      <div className="absolute inset-0 bg-slate-900/40 z-5"></div>

      {/* Interactive Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10"
      ></canvas>

      {/* Content with smooth scroll animation */}
      <div className={`relative z-20 container mx-auto px-4 sm:px-6 py-12 sm:py-20 transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-16'
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 tracking-tight drop-shadow-lg transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Driven by{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-blue-400">
              Dedication
            </span>
          </h2>
          
          <div className="space-y-4">
            <p className={`text-sm sm:text-base md:text-lg text-white leading-relaxed drop-shadow-md transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              At <strong>Mag Marine Services</strong>, our progress is driven by the dedication of our team and the trust of our partners. 
              Their continued support has helped us grow rapidly and build a strong presence in the marine sector.
            </p>
            
            <p className={`text-sm sm:text-base md:text-lg text-white leading-relaxed drop-shadow-md transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              We are expanding our operations and capabilities to meet the evolving needs of the industry. 
              With a focus on quality, efficiency, and innovation, we aim to deliver even greater value to our clients.
            </p>
            
            <p className={`text-sm sm:text-base md:text-lg text-white leading-relaxed drop-shadow-md transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              As we move forward, we remain committed to progress, adaptability, and excellence—while staying true to 
              the values that have shaped our journey so far.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgressSection;