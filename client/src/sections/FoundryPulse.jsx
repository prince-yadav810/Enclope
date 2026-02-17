import { motion } from 'framer-motion';

export default function FoundryPulse() {
  return (
    <section className="relative py-16 md:py-32 w-full bg-black overflow-hidden border-b border-white/5">

      {/* Ambient Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[400px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">

        {/* The Signal Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-[10px] font-mono text-accent tracking-[0.3em] uppercase">
            System Operational
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        </motion.div>

        {/* The Core Message */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-2xl sm:text-4xl md:text-7xl font-bold text-white tracking-tight mb-6 md:mb-8"
        >
          Bridging the gap between <br className="hidden sm:inline" />
          <span className="text-text-secondary opacity-50">Theory</span> and <span className="text-accent">Reality.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-base md:text-xl text-text-secondary font-light leading-relaxed">
            We are the student-led foundry where raw potential is calibrated, tested, and deployed into the real world.
          </p>
        </motion.div>

      </div>
    </section>
  );
}