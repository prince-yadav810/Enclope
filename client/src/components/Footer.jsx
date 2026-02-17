import { Link, useLocation } from 'react-router-dom';
import { Github, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';

export default function Footer() {
   const currentYear = new Date().getFullYear();
   const location = useLocation(); // Get current route

   // Logic: If we are on the Join/Apply page, hide the "Ready to Forge" section
   const isApplyPage = location.pathname === '/join' || location.pathname === '/apply';

   return (
      <footer className="bg-black border-t border-white/5 pt-12 md:pt-20 pb-10 relative overflow-hidden">

         {/* Background Texture */}
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none hidden md:block"
            style={{
               backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
               backgroundSize: '40px 40px'
            }}
         />

         <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">

            {/* 1. TOP SECTION: GIANT CTA */}
            {!isApplyPage && (
               <div className="mb-12 md:mb-20 pb-12 md:pb-20 border-b border-white/5">
                  <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
                     <div className="max-w-2xl">
                        <span className="font-mono text-xs text-accent tracking-[0.3em] uppercase mb-4 block">
                           Initiate Sequence
                        </span>
                        <h2 className="text-3xl sm:text-5xl md:text-8xl font-heading font-bold text-white tracking-tighter leading-[0.9]">
                           READY TO <br />
                           <span className="text-white/40 group-hover:text-white transition-colors">FORGE?</span>
                        </h2>
                     </div>

                     <Link to="/apply">
                        <button className="jelly-button">
                           <span className="text">Start Application</span>
                           <span className="svg-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" viewBox="0 0 38 15" fill="none">
                                 <path d="M10 7.519l-.939-.344h0l.939.344zm14.386-1.205l-.981-.192.981.192zm1.276 5.509l.537.843.148-.094.107-.139-.792-.611zm4.819-4.304l-.385-.923h0l.385.923zm7.227.707a1 1 0 0 0 0-1.414L31.343.448a1 1 0 0 0-1.414 0 1 1 0 0 0 0 1.414l5.657 5.657-5.657 5.657a1 1 0 0 0 1.414 1.414l6.364-6.364zM1 7.519l.554.833.029-.019.094-.061.361-.23 1.277-.77c1.054-.609 2.397-1.32 3.629-1.787.617-.234 1.17-.392 1.623-.455.477-.066.707-.008.788.034.025.013.031.021.039.034a.56.56 0 0 1 .058.235c.029.327-.047.906-.39 1.842l1.878.689c.383-1.044.571-1.949.505-2.705-.072-.815-.45-1.493-1.16-1.865-.627-.329-1.358-.332-1.993-.244-.659.092-1.367.305-2.056.566-1.381.523-2.833 1.297-3.921 1.925l-1.341.808-.385.245-.104.068-.028.018c-.011.007-.011.007.543.84zm8.061-.344c-.198.54-.328 1.038-.36 1.484-.032.441.024.94.325 1.364.319.45.786.64 1.21.697.403.054.824-.001 1.21-.09.775-.179 1.694-.566 2.633-1.014l3.023-1.554c2.115-1.122 4.107-2.168 5.476-2.524.329-.086.573-.117.742-.115s.195.038.161.014c-.15-.105.085-.139-.076.685l1.963.384c.192-.98.152-2.083-.74-2.707-.405-.283-.868-.37-1.28-.376s-.849.069-1.274.179c-1.65.43-3.888 1.621-5.909 2.693l-2.948 1.517c-.92.439-1.673.743-2.221.87-.276.064-.429.065-.492.057-.043-.006.066.003.155.127.07.099.024.131.038-.063.014-.187.078-.49.243-.94l-1.878-.689zm14.343-1.053c-.361 1.844-.474 3.185-.413 4.161.059.95.294 1.72.811 2.215.567.544 1.242.546 1.664.459a2.34 2.34 0 0 0 .502-.167l.15-.076.049-.028.018-.011c.013-.008.013-.008-.524-.852l-.536-.844.019-.012c-.038.018-.064.027-.084.032-.037.008.053-.013.125.056.021.02-.151-.135-.198-.895-.046-.734.034-1.887.38-3.652l-1.963-.384zm2.257 5.701l.791.611.024-.031.08-.101.311-.377 1.093-1.213c.922-.954 2.005-1.894 2.904-2.27l-.771-1.846c-1.31.547-2.637 1.758-3.572 2.725l-1.184 1.314-.341.414-.093.117-.025.032c-.01.013-.01.013.781.624zm5.204-3.381c.989-.413 1.791-.42 2.697-.307.871.108 2.083.385 3.437.385v-2c-1.197 0-2.041-.226-3.19-.369-1.114-.139-2.297-.146-3.715.447l.771 1.846z"></path>
                              </svg>
                           </span>
                        </button>
                     </Link>
                  </div>
               </div>
            )}

            {/* 2. MIDDLE SECTION: LINKS GRID */}
            <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-20">

               {/* Column 1: Brand (Span 4) */}
               <div className="col-span-2 md:col-span-4">

                  {/* --- EXACT LOGO MATCH FROM HEADER --- */}
                  <div className="mb-6">
                     {/* Applied 'font-heading' here to match Header.jsx */}
                     <Link to="/" className="text-3xl font-heading tracking-wider inline-block">
                        <span className="text-white">E</span><span className="text-white/60">nclope</span>
                     </Link>
                  </div>
                  {/* ------------------------------------ */}

                  <p className="text-text-secondary font-light leading-relaxed mb-6 max-w-sm">
                     A digital foundry for the next generation of engineers.
                     We don't just write code; we architect the future.
                  </p>

                  {/* Status Indicator */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/10">
                     <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                     <span className="font-mono text-[10px] text-green-500 uppercase tracking-widest">
                        Systems Operational
                     </span>
                  </div>
               </div>

               {/* Column 2: SITEMAP */}
               <div className="md:col-span-2 md:col-start-7">
                  <h4 className="font-mono text-xs text-white/40 uppercase tracking-widest mb-6">Directory</h4>
                  <ul className="space-y-4">
                     {[
                        { name: 'Home', href: '/' },
                        { name: 'Showroom', href: '/showroom' },
                        { name: 'About Us', href: '/about' },
                        { name: 'Apply', href: '/apply' }
                     ].map((item) => (
                        <li key={item.name}>
                           <Link to={item.href} className="text-white/70 hover:text-accent transition-colors text-sm block">
                              {item.name}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Column 3: SOCIALS */}
               <div className="md:col-span-2">
                  <h4 className="font-mono text-xs text-white/40 uppercase tracking-widest mb-6">Connect</h4>
                  <ul className="space-y-4">
                     {[
                        { name: 'Github', icon: Github, href: 'https://github.com/enclope' },
                        { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/enclope' },
                        { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/enclope' },
                        { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/enclope' }
                     ].map((item) => (
                        <li key={item.name}>
                           <a href={item.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm">
                              <item.icon size={16} className="group-hover:text-accent transition-colors" />
                              {item.name}
                           </a>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Column 4: LEGAL */}
               <div className="md:col-span-2">
                  <h4 className="font-mono text-xs text-white/40 uppercase tracking-widest mb-6">Legal</h4>
                  <ul className="space-y-4">
                     <li><Link to="/privacy" className="text-white/70 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
                     <li><Link to="/terms" className="text-white/70 hover:text-white transition-colors text-sm">Terms of Service</Link></li>
                     <li><Link to="/code-of-conduct" className="text-white/70 hover:text-white transition-colors text-sm">Code of Conduct</Link></li>
                  </ul>
               </div>

            </div>

            {/* 3. BOTTOM SECTION: SYSTEM BAR */}
            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">

               <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                  &copy; {currentYear} Enclope Foundry. All Rights Reserved.
               </div>

               <div className="flex items-center gap-6">
                  <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                     Server: <span className="text-white/60">Ap-South-1</span>
                  </div>
                  <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                     Latency: <span className="text-green-500">12ms</span>
                  </div>
               </div>

            </div>

         </div>
      </footer>
   );
}