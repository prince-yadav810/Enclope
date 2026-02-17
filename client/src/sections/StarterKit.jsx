import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Box } from 'lucide-react';

// Import the image properly for Vite bundling
import starterKitImage from '../assets/Gemini_Generated_Image_b2ssevb2ssevb2ss.png';

export default function StarterKit() {
  return (
    <section className="py-16 md:py-24 bg-black border-b border-white/5 relative overflow-hidden">

      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none hidden md:block"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10">

        {/* THE BOX CONTAINER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
          className="relative bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl group"
        >

          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* LEFT: TEXT CONTENT */}
            <div className="p-8 md:p-12 flex flex-col justify-center items-start z-10">

              {/* Minimal Tag */}
              <div className="inline-flex items-center gap-2 mb-6 border border-white/10 bg-white/5 px-3 py-1 rounded-full backdrop-blur-md">
                <Box className="w-3 h-3 text-accent" />
                <span className="font-mono text-[10px] text-white/60 tracking-[0.2em] uppercase">
                  Welcome Package
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
                The Starter Kit.
              </h2>

              {/* Concise Description */}
              <p className="text-text-secondary text-base md:text-lg font-light leading-relaxed mb-8">
                Every initiate receives the physical tools required for the journey.
                Your uniform, your notebook, and your access credentials—delivered to your door upon acceptance.
              </p>

              {/* NEW BUTTON: Solid Fill Interaction */}
              <Link to="/apply">
                <button className="relative overflow-hidden inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold font-mono text-xs uppercase tracking-widest transition-all duration-300 hover:text-white group/btn">
                  <span className="relative z-10">Apply to Claim</span>
                  <ArrowRight className="relative z-10 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />

                  {/* The Fill Effect */}
                  <div className="absolute inset-0 bg-accent transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left ease-out" />
                </button>
              </Link>
            </div>

            {/* RIGHT: IMAGE with EFFECTS */}
            <div className="relative h-[300px] md:h-auto bg-[#050505] border-t md:border-t-0 md:border-l border-white/5 overflow-hidden">

              {/* 1. Base Image */}
              <img
                src={starterKitImage}
                alt="Enclope Starter Kit"
                className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />

              {/* 2. Noise/Grain Texture (Adds "Film" look) */}
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

              {/* 3. Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              {/* 4. The "Light Sweep" Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-150%] transition-transform duration-1000 ease-in-out group-hover:translate-x-[150%]" />

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}