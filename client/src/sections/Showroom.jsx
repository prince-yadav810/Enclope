import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { getProjects } from '../lib/api';

// Fallback data if database is empty or unavailable
const fallbackExhibits = [
  {
    id: "fallback-01",
    title: "Sage Utility",
    tag: "Open Source Infrastructure",
    image_url: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop",
    description: "A centralized academic repository bridging the gap between students and resources. Features secure peer-to-peer sharing and legacy paper archives.",
    tech_stack: ["React Native", "Node.js", "Firebase"],
    status: "deployed",
    type: "mobile"
  },
  {
    id: "fallback-02",
    title: "Quizzie AI",
    tag: "Generative SaaS",
    image_url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop",
    description: "An intelligent engine that transforms raw text into gamified assessments using NLP. Designed for rapid educational scaling.",
    tech_stack: ["Next.js", "OpenAI API", "GCP"],
    status: "beta",
    type: "web"
  },
  {
    id: "fallback-03",
    title: "Foundry OS",
    tag: "Internal System",
    image_url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    description: "The operating system for our community. Manages member progressions, code reviews, and squad assignments.",
    tech_stack: ["Turborepo", "Supabase", "TypeScript"],
    status: "concept",
    type: "dashboard"
  }
];

// --- COMPONENT: SHOWROOM DISPLAY CASE ---
const DisplayCase = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Normalize data from database or fallback
  const title = item.title;
  const tag = item.tag || item.type || 'Project';
  const image = item.image_url || item.image;
  const desc = item.description || item.desc;
  const stack = item.tech_stack || item.stack || [];
  const status = (item.status || '').toLowerCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative w-full h-[320px] md:h-[450px] overflow-hidden rounded-xl bg-[#050505] border border-white/5 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. THE IMAGE (The Artifact) */}
      <div className="absolute inset-0">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover opacity-50 grayscale transition-all duration-700 group-hover:opacity-40 group-hover:grayscale-0 group-hover:scale-105"
        />
        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* 2. THE SPOTLIGHT EFFECT */}
      <div
        className={`absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 transition-opacity duration-700 ${isHovered ? 'opacity-100' : ''}`}
        style={{ mixBlendMode: 'overlay' }}
      />

      {/* 3. THE INFO PLACARD */}
      <div className="absolute inset-0 p-5 md:p-8 flex flex-col justify-between">

        {/* Top Row: Identification */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-white/40 border border-white/10 px-2 py-1 rounded bg-black/50 backdrop-blur-md uppercase tracking-widest">
              Exhibit_0{index + 1}
            </span>
            {status === "deployed" && (
              <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-green-500/10 border border-green-500/20">
                <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] font-mono text-green-500 uppercase tracking-wide">Live</span>
              </div>
            )}
            {status === "beta" && (
              <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-yellow-500/10 border border-yellow-500/20">
                <span className="text-[9px] font-mono text-yellow-500 uppercase tracking-wide">Beta</span>
              </div>
            )}
          </div>

          {/* Icon Badge */}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500 ${isHovered ? 'bg-white text-black border-white' : 'bg-black/50 text-white/50 border-white/10'}`}>
            <ArrowUpRight size={14} />
          </div>
        </div>

        {/* Bottom Row: Details */}
        <div className="transform transition-transform duration-500 group-hover:-translate-y-2">

          {/* Category Label */}
          <span className="text-accent font-mono text-[10px] uppercase tracking-[0.2em] mb-2 block">
            {tag}
          </span>

          {/* Title */}
          <h3 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4 tracking-tight">
            {title}
          </h3>

          {/* The Spec Sheet (Slides Up) */}
          <div className={`overflow-hidden transition-all duration-500 ease-out ${isHovered ? 'max-h-[150px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <p className="text-sm text-text-secondary font-light leading-relaxed mb-4 max-w-sm">
              {desc}
            </p>

            {/* Tech Specs */}
            {stack.length > 0 && (
              <div className="flex items-center gap-4 border-t border-white/10 pt-4 flex-wrap">
                {stack.map((tech, i) => (
                  <span key={i} className="text-[10px] font-mono text-white/60 uppercase tracking-wider">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
};

// Loading Skeleton
const SkeletonCase = ({ wide = false }) => (
  <div className={`relative w-full h-[450px] overflow-hidden rounded-xl bg-[#0a0a0a] border border-white/5 animate-pulse`}>
    <div className="absolute inset-0 p-8 flex flex-col justify-between">
      <div className="flex justify-between">
        <div className="h-6 w-20 bg-white/5 rounded" />
        <div className="h-8 w-8 bg-white/5 rounded-full" />
      </div>
      <div>
        <div className="h-3 w-32 bg-white/5 rounded mb-4" />
        <div className="h-10 w-48 bg-white/10 rounded mb-4" />
        <div className="h-4 w-full max-w-sm bg-white/5 rounded" />
      </div>
    </div>
  </div>
);

export default function Showroom() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const result = await getProjects();

      if (result.success && result.data && result.data.length > 0) {
        setProjects(result.data);
      } else {
        // Use fallback data if no projects in database
        setProjects(fallbackExhibits);
        if (!result.success) {
          console.warn('Using fallback project data:', result.error);
        }
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  // Determine grid layout based on number of projects
  const getGridLayout = (index, total) => {
    if (total <= 1) return 'md:col-span-12';
    if (total === 2) return 'md:col-span-6';
    if (index === 0) return 'md:col-span-8';
    if (index === 1) return 'md:col-span-4';
    return 'md:col-span-12';
  };

  return (
    <section className="py-16 md:py-32 bg-black relative border-b border-white/5">

      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-[0.02] hidden md:block"
        style={{
          backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">

        {/* HEADER */}
        <div className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              The <span className="text-white/40">Showroom.</span>
            </h2>
            <p className="text-text-secondary max-w-lg text-base font-light">
              Where theory meets reality. Browse the artifacts forged by our engineers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden md:block"
          >
            <button className="text-xs font-mono text-white/40 hover:text-white uppercase tracking-widest border-b border-transparent hover:border-white transition-all pb-1">
              View Full Archive
            </button>
          </motion.div>
        </div>

        {/* THE GALLERY GRID */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8"><SkeletonCase wide /></div>
            <div className="md:col-span-4"><SkeletonCase /></div>
            <div className="md:col-span-12"><SkeletonCase wide /></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {projects.map((project, index) => (
              <div key={project.id} className={getGridLayout(index, projects.length)}>
                <DisplayCase item={project} index={index} />
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}