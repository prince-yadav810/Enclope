import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- SUB-COMPONENT: 3D TILT CARD (The Apple Effect) ---
const TiltCard = ({ image, label }) => {
  const ref = useRef(null);

  // Mouse Position Tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Physics: Map mouse position to rotation (limit to 15 degrees for subtlety)
  const rotateX = useTransform(y, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Lighting: Create a "Sheen" that moves with the mouse
  const sheenOpacity = useTransform(y, [-0.5, 0.5], [0, 0.3]);
  const sheenX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    // Calculate mouse position relative to center of card (-0.5 to 0.5)
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full h-[280px] md:h-[500px] rounded-[32px] overflow-hidden bg-surface border border-white/5 cursor-pointer group shadow-2xl"
    >
      {/* 1. The Image Layer (Parallax Scale) */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        />
        {/* Dark Overlay for contrast */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
      </div>

      {/* 2. The Glass Reflection (Apple Gloss) */}
      <motion.div
        style={{
          background: useMotionTemplate`linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.2) 40%, transparent 60%)`,
          opacity: sheenOpacity,
          x: sheenX
        }}
        className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay"
      />

      {/* 3. Floating UI Elements (Depth) */}
      <motion.div
        style={{ translateZ: 40 }}
        className="absolute bottom-8 left-8 z-20"
      >
        <span className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-white tracking-widest uppercase">
          {label}
        </span>
      </motion.div>
    </motion.div>
  );
};


// --- MAIN COMPONENT ---
export default function SectionPreview({
  title,
  subtitle,
  description,
  image,
  linkText,
  linkUrl,
  reversed = false, // If true, image is on the right
  label = "Preview"
}) {
  return (
    <section className="relative py-16 md:py-32 w-full overflow-hidden">

      <div className="container mx-auto px-4 md:px-6">
        <div className={`flex flex-col gap-8 md:gap-16 md:items-center ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'}`}>

          {/* 1. TEXT CONTENT (Clean, Structural, Organized) */}
          <div className="w-full md:w-1/2 flex flex-col items-start space-y-8">

            {/* Minimal Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-accent"></span>
                <span className="text-xs font-mono text-accent uppercase tracking-widest">{subtitle}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                {title}
              </h2>
            </div>

            {/* Description - High Readability */}
            <p className="text-lg text-text-secondary font-light leading-relaxed max-w-md">
              {description}
            </p>

            {/* The "Apple" Button - Glass & Blur */}
            <Link to={linkUrl} className="group flex items-center gap-4 mt-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                <ArrowRight className="w-5 h-5 text-white group-hover:text-black transition-colors" />
              </div>
              <span className="text-sm font-medium text-white group-hover:translate-x-2 transition-transform duration-300">
                {linkText}
              </span>
            </Link>

          </div>

          {/* 2. VISUAL CONTENT (3D Tilt Card) */}
          <div className="w-full md:w-1/2 perspective-[1000px]">
            <TiltCard image={image} label={label} />
          </div>

        </div>
      </div>
    </section>
  );
}