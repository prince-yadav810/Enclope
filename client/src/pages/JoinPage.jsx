import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Terminal, Building2, CheckCircle2,
  Github, Globe, Linkedin, IndianRupee, Layers, Clock,
  Phone, Smartphone, Monitor, Cpu, MapPin, Loader2
} from 'lucide-react';

import { supabase } from '../lib/supabase';
import { useToast } from '../components/ui/Toast';
import { submitStudentApplication, submitClientBrief } from '../lib/api';

export default function JoinUs() {
  const [selectedRole, setSelectedRole] = useState(null); // 'student' | 'client' | null

  return (
    // FIX: Changed from 'fixed' to 'absolute' to ensure natural scrolling
    // Added 'min-h-screen' and 'bg-black' to cover everything
    <div className="absolute inset-0 z-[100] w-full min-h-screen bg-black text-white flex flex-col">

      {/* Background Texture - Fixed Position so it stays while scrolling */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Top Navigation */}
      <div className="absolute top-8 left-8 z-50">
        {selectedRole ? (
          // ABORT MODE: Acts as a reset button (stays on page, resets state)
          <button
            onClick={() => setSelectedRole(null)}
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group bg-transparent border-none cursor-pointer"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-xs uppercase tracking-widest">
              Abort Sequence
            </span>
          </button>
        ) : (
          // HOME MODE: Acts as a standard link
          <Link
            to="/"
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-xs uppercase tracking-widest">
              Return Home
            </span>
          </Link>
        )}
      </div>

      {/* MAIN CONTENT AREA */}
      {/* 'flex-grow' pushes the footer down naturally */}
      <div className="flex-grow flex flex-col items-center justify-center relative z-10 px-4 w-full py-32">

        <AnimatePresence mode="wait">

          {/* STATE 1: SELECTION SCREEN */}
          {!selectedRole && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-6xl"
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-3">
                  Select Your Objective.
                </h1>
                <p className="text-white/50 text-lg font-light">
                  Choose the path that describes you best.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* OPTION A: THE TALENT */}
                <motion.div
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedRole('student')}
                  className="group relative cursor-pointer h-[420px] rounded-2xl border border-white/10 bg-[#080808] overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(34,197,94,0.3)] hover:border-green-500/50 flex flex-col"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-green-500/20 transition-all duration-500" />
                  <div className="p-10 flex-1 flex flex-col relative z-10">
                    <div className="w-12 h-12 rounded-lg bg-green-900/20 border border-green-500/20 flex items-center justify-center text-green-500 mb-6 group-hover:scale-110 transition-transform">
                      <Terminal size={24} />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">Join the Forge</h3>
                    <p className="text-white/50 text-base leading-relaxed mb-8">
                      I am a student, developer, or designer looking to build real-world software and accelerate my career.
                    </p>
                    <div className="mt-auto w-full py-4 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center gap-3 font-bold text-sm tracking-wide text-white/60 transition-all duration-300 group-hover:bg-green-500 group-hover:text-black group-hover:border-green-500">
                      <span>Start Application</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </motion.div>

                {/* OPTION B: THE CLIENT */}
                <motion.div
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedRole('client')}
                  className="group relative cursor-pointer h-[420px] rounded-2xl border border-white/10 bg-[#050510] overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.4)] hover:border-blue-500/50 flex flex-col"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-blue-600/20 transition-all duration-500" />
                  <div className="p-10 flex-1 flex flex-col relative z-10">
                    <div className="w-12 h-12 rounded-lg bg-blue-900/20 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                      <Building2 size={24} />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">Hire the Foundry</h3>
                    <p className="text-white/50 text-base leading-relaxed mb-8">
                      I represent a company or startup looking to architect, build, and deploy a complex software solution.
                    </p>
                    <div className="mt-auto w-full py-4 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center gap-3 font-bold text-sm tracking-wide text-white/60 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600">
                      <span>Create Project Brief</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </motion.div>

              </div>
              {/* --- NEW SECTION: THE "WHY US" (RELATABLE & HUMAN) --- */}
              <div className="w-full max-w-6xl mt-20 border-t border-white/10 pt-16 mb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 relative">

                  {/* CENTER DIVIDER (Visible on Desktop) */}
                  <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

                  {/* LEFT: THE BUILDER'S PATH (Student) */}
                  <div>
                    <h4 className="text-3xl font-bold text-white mb-6">
                      For the <span className="text-green-500">Builders</span>.
                    </h4>
                    <p className="text-white/60 text-lg leading-relaxed mb-10">
                      You’ve watched the tutorials. You’ve built the to-do apps. But you know there is a gap between "coding" and "engineering." We are that gap.
                    </p>

                    <div className="space-y-8">
                      <div>
                        <h5 className="text-white font-medium text-lg mb-1 flex items-center gap-3">
                          <span className="text-green-500">01.</span> Stop Building in a Vacuum
                        </h5>
                        <p className="text-white/40 text-sm pl-9">
                          Don't write code that sits on your laptop. Join a team, use Jira, push to CI/CD pipelines, and ship to real users.
                        </p>
                      </div>
                      <div>
                        <h5 className="text-white font-medium text-lg mb-1 flex items-center gap-3">
                          <span className="text-green-500">02.</span> Get Your Hands Dirty
                        </h5>
                        <p className="text-white/40 text-sm pl-9">
                          Theory is safe. Production is chaotic. We throw you into the deep end (with a senior engineer watching your back).
                        </p>
                      </div>
                      <div>
                        <h5 className="text-white font-medium text-lg mb-1 flex items-center gap-3">
                          <span className="text-green-500">03.</span> The "Experience" Paradox
                        </h5>
                        <p className="text-white/40 text-sm pl-9">
                          Jobs ask for experience, but no one gives it to you. We break that loop. Build here, and your resume proves itself.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: THE FOUNDER'S PATH (Client) */}
                  <div>
                    <h4 className="text-3xl font-bold text-white mb-6">
                      For the <span className="text-blue-500">Visionaries</span>.
                    </h4>
                    <p className="text-white/60 text-lg leading-relaxed mb-10">
                      You have the vision, but hiring is a distraction. Freelancers ghost you, and agencies overcharge you. We function as your technical arm.
                    </p>

                    <div className="space-y-8">
                      <div>
                        <h5 className="text-white font-medium text-lg mb-1 flex items-center gap-3">
                          <span className="text-blue-500">01.</span> We Are Your CTO
                        </h5>
                        <p className="text-white/40 text-sm pl-9">
                          Don't micromanage developers. Hand us the roadmap, and we architect, manage, and deliver the solution.
                        </p>
                      </div>
                      <div>
                        <h5 className="text-white font-medium text-lg mb-1 flex items-center gap-3">
                          <span className="text-blue-500">02.</span> No "Spaghetti Code"
                        </h5>
                        <p className="text-white/40 text-sm pl-9">
                          Cheap code is expensive later. We build on scalable, modern foundations so you don't have to rewrite it in a year.
                        </p>
                      </div>
                      <div>
                        <h5 className="text-white font-medium text-lg mb-1 flex items-center gap-3">
                          <span className="text-blue-500">03.</span> Radical Transparency
                        </h5>
                        <p className="text-white/40 text-sm pl-9">
                          You see what we see. Weekly updates, live staging environments, and clear timelines. No guessing games.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          )}

          {/* STATE 2: STUDENT FORM */}
          {selectedRole === 'student' && (
            <StudentApplication onBack={() => setSelectedRole(null)} />
          )}

          {/* STATE 3: CLIENT FORM */}
          {selectedRole === 'client' && (
            <ClientApplication onBack={() => setSelectedRole(null)} />
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}

// --- SUB-COMPONENT: STUDENT FORM WIZARD ---
function StudentApplication({ onBack }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const toast = useToast();

  const [formData, setFormData] = useState({
    // Step 1: Identity
    name: '',
    email: '',
    university: '',
    // Step 2: Journey (Optional)
    linkedin: '',
    github: '',
    skills: '',
    // Step 3: Vision
    interests: '',
    source: '',
    reason: '',
    impact: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // Handle form submission
  const handleSubmit = async () => {
    if (!formData.name || !formData.email) {
      toast.error('Missing Fields', 'Please fill in your name and email.');
      return;
    }

    setIsSubmitting(true);
    const result = await submitStudentApplication(formData);
    setIsSubmitting(false);

    if (result.success) {
      setIsSubmitted(true);
      toast.success('Application Transmitted!', 'We will review your profile and get back to you soon.');
    } else {
      toast.error('Transmission Failed', result.error || 'Please try again later.');
    }
  };

  // Styling constants
  const inputClass = "w-full bg-transparent border-b border-white/20 py-4 text-lg text-white placeholder-white/20 focus:outline-none focus:border-green-500 transition-colors font-light";
  const labelClass = "block text-xs font-mono uppercase tracking-widest text-green-500 mb-1 mt-6";
  const optionalLabel = <span className="text-white/30 text-[10px] ml-2 normal-case tracking-normal">(Optional)</span>;

  // Success state
  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl text-center py-20"
      >
        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-green-500/20 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">Application Received!</h2>
        <p className="text-white/60 text-lg mb-8 max-w-md mx-auto">
          Your profile has been transmitted to our systems. We'll review it and reach out within 48 hours.
        </p>
        <Link to="/" className="inline-flex items-center gap-2 text-green-500 hover:text-green-400 font-mono text-sm">
          <ArrowLeft size={16} /> Return to Home
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl"
    >
      {/* Progress Bar */}
      <div className="flex items-center gap-2 mb-12">
        <span className="font-mono text-xs text-green-500">Protocol 0{step}/03</span>
        <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(step / 3) * 100}%` }}
            className="h-full bg-green-500"
          />
        </div>
      </div>

      <div className="bg-[#080808] border border-white/10 p-8 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col">
        {/* Decorative Green Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-[50px] rounded-full pointer-events-none" />

        <AnimatePresence mode="wait">

          {/* STEP 1: IDENTITY (Mandatory Details) */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
              <h3 className="text-3xl font-bold text-white mb-2">Identify Yourself.</h3>
              <p className="text-white/50 mb-4">Initialize your profile coordinates.</p>

              <div className="space-y-2">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass} autoFocus />
                </div>
                <div>
                  <label className={labelClass}>University / Organization</label>
                  <input type="text" name="university" value={formData.university} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} />
                </div>
              </div>

              <div className="mt-auto pt-12 flex justify-end">
                <button onClick={nextStep} className="bg-green-600 text-black px-8 py-3 rounded-lg font-bold hover:bg-green-500 transition-colors flex items-center gap-2">
                  Proceed <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: THE JOURNEY (Professional History - Optional) */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
              <h3 className="text-3xl font-bold text-white mb-2">The Journey So Far.</h3>
              <p className="text-white/50 mb-4">Show us your digital footprint.</p>

              <div className="space-y-2">
                {/* LinkedIn */}
                <div>
                  <label className={labelClass}><Linkedin size={12} className="inline mr-2" /> LinkedIn Profile {optionalLabel}</label>
                  <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="linkedin.com/in/..." className={inputClass} autoFocus />
                </div>

                {/* GitHub */}
                <div>
                  <label className={labelClass}><Github size={12} className="inline mr-2" /> GitHub / Portfolio {optionalLabel}</label>
                  <input type="url" name="github" value={formData.github} onChange={handleChange} placeholder="github.com/..." className={inputClass} />
                </div>

                {/* Skills / Projects */}
                <div>
                  <label className={labelClass}>Key Skills & Projects {optionalLabel}</label>
                  <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="e.g. React, Built a Chat App, Python..." className={inputClass} />
                </div>
              </div>

              <div className="mt-auto pt-12 flex justify-between items-center">
                <button onClick={prevStep} className="text-white/40 hover:text-white text-sm font-mono">Back</button>
                <button onClick={nextStep} className="bg-green-600 text-black px-8 py-3 rounded-lg font-bold hover:bg-green-500 transition-colors flex items-center gap-2">
                  Proceed <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: THE VISION (Mindful Questions) */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
              <h3 className="text-3xl font-bold text-white mb-2">The Vision.</h3>
              <p className="text-white/50 mb-4">Why are you here, and where are we going?</p>

              <div className="space-y-4">

                {/* 1. Origin Signal */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>How did our signal reach you?</label>
                    <input type="text" name="source" value={formData.source} onChange={handleChange} placeholder="LinkedIn, Friend, Campus..." className={inputClass} autoFocus />
                  </div>
                  <div>
                    <label className={labelClass}>Core Interests</label>
                    <input type="text" name="interests" value={formData.interests} onChange={handleChange} placeholder="AI, Web3, Systems..." className={inputClass} />
                  </div>
                </div>

                {/* 2. The Why */}
                <div>
                  <label className={labelClass}>Why Enclope? Why Now?</label>
                  <input type="text" name="reason" value={formData.reason} onChange={handleChange} placeholder="I want to move beyond tutorials..." className={inputClass} />
                </div>

                {/* 3. The Impact (The Big Question) */}
                <div>
                  <label className={labelClass}>The Delta: How will this change your trajectory?</label>
                  <textarea
                    name="impact"
                    value={formData.impact}
                    onChange={handleChange}
                    placeholder="By joining the Forge, I plan to contribute... and evolve into..."
                    className={`${inputClass} h-24 resize-none leading-relaxed`}
                  />
                </div>
              </div>

              <div className="mt-auto pt-8 flex justify-between items-center">
                <button onClick={prevStep} className="text-white/40 hover:text-white text-sm font-mono">Back</button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-green-500 transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <><Loader2 size={16} className="animate-spin" /> Transmitting...</>
                  ) : (
                    <><CheckCircle2 size={16} /> Transmit Application</>
                  )}
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------------------------
// SUB-COMPONENT: CLIENT FORM WIZARD
// ----------------------------------------------------------------------
function ClientApplication({ onBack }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: '', company: '', email: '', phone: '',
    projectType: '', description: '', budget: '', timeline: '', techStack: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const setSelection = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // Handle form submission
  const handleSubmit = async () => {
    if (!formData.name || !formData.email) {
      toast.error('Missing Fields', 'Please fill in your name and email.');
      return;
    }

    setIsSubmitting(true);
    const result = await submitClientBrief(formData);
    setIsSubmitting(false);

    if (result.success) {
      setIsSubmitted(true);
      toast.success('Brief Submitted!', 'Our team will review your project and reach out soon.');
    } else {
      toast.error('Submission Failed', result.error || 'Please try again later.');
    }
  };

  const inputClass = "w-full bg-transparent border-b border-white/10 py-4 text-lg text-white placeholder-white/20 focus:outline-none focus:border-blue-500 transition-colors font-light";
  const labelClass = "block text-xs font-mono uppercase tracking-widest text-blue-400 mb-1 mt-6";
  const optionalLabel = <span className="text-white/30 text-[10px] ml-2 normal-case tracking-normal">(Optional)</span>;

  // Success state
  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl text-center py-20"
      >
        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-blue-500/20 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-blue-500" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">Brief Received!</h2>
        <p className="text-white/60 text-lg mb-8 max-w-md mx-auto">
          Your project brief has been submitted. Our team will review it and schedule a discovery call.
        </p>
        <Link to="/" className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 font-mono text-sm">
          <ArrowLeft size={16} /> Return to Home
        </Link>
      </motion.div>
    );
  }

  // UX: Validate Step 1
  const isStep1Valid = formData.name && formData.email;

  // Selection Card Component
  const SelectionCard = ({ icon: Icon, label, value, selected, onClick }) => (
    <div
      onClick={() => onClick(value)}
      className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 flex items-center gap-3 ${selected === value
        ? 'bg-blue-600/20 border-blue-500 text-white'
        : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:border-white/30'
        }`}
    >
      <Icon size={20} className={selected === value ? 'text-blue-400' : 'text-white/40'} />
      <span className="font-medium text-sm">{label}</span>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full max-w-2xl">
      <div className="flex items-center gap-2 mb-8">
        <span className="font-mono text-xs text-blue-400">Briefing 0{step}/03</span>
        <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${(step / 3) * 100}%` }} className="h-full bg-blue-500" />
        </div>
      </div>

      <div className="bg-[#050510] border border-white/10 p-8 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden min-h-[520px] flex flex-col">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[60px] rounded-full pointer-events-none" />

        <AnimatePresence mode="wait">

          {/* STEP 1: CONTACT */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col">
              <div className="mb-6"><h3 className="text-2xl font-bold text-white mb-1">Point of Contact</h3><p className="text-white/50 text-sm">Who are we collaborating with?</p></div>
              <div className="space-y-1">
                <div><label className={labelClass}>Your Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Rahul Verma" className={inputClass} autoFocus /></div>
                <div><label className={labelClass}><Building2 size={12} className="inline mr-2" /> Company / Organization {optionalLabel}</label><input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="e.g. Tech Solutions Pvt Ltd" className={inputClass} /></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label className={labelClass}>Business Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="rahul@techsolutions.in" className={inputClass} /></div>
                  <div><label className={labelClass}><Phone size={12} className="inline mr-2" /> Phone Number {optionalLabel}</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" className={inputClass} /></div>
                </div>
              </div>
              <div className="mt-auto pt-8 flex justify-end">
                <button
                  onClick={nextStep}
                  disabled={!isStep1Valid}
                  className={`px-8 py-3 rounded-lg font-bold transition-all flex items-center gap-2 text-sm ${isStep1Valid ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-white/10 text-white/30 cursor-not-allowed'}`}
                >
                  Next Step <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: SCOPE */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col">
              <div className="mb-6"><h3 className="text-2xl font-bold text-white mb-1">The Blueprint</h3><p className="text-white/50 text-sm">What are we building?</p></div>
              <div className="space-y-6">
                <div>
                  <label className={labelClass}>Project Type</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    <SelectionCard icon={Globe} label="Web App / SaaS" value="web" selected={formData.projectType} onClick={(v) => setSelection('projectType', v)} />
                    <SelectionCard icon={Smartphone} label="Mobile App" value="mobile" selected={formData.projectType} onClick={(v) => setSelection('projectType', v)} />
                    <SelectionCard icon={Monitor} label="Corporate Website" value="website" selected={formData.projectType} onClick={(v) => setSelection('projectType', v)} />
                    <SelectionCard icon={Cpu} label="Custom / AI Tool" value="custom" selected={formData.projectType} onClick={(v) => setSelection('projectType', v)} />
                  </div>
                </div>
                <div><label className={labelClass}>Brief Description</label><textarea name="description" value={formData.description} onChange={handleChange} placeholder="Briefly describe the core problem..." className={`${inputClass} h-24 resize-none leading-relaxed text-sm`} /></div>
              </div>
              <div className="mt-auto pt-8 flex justify-between items-center">
                <button onClick={prevStep} className="text-white/40 hover:text-white text-sm font-mono">Back</button>
                <button onClick={nextStep} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-500 transition-colors flex items-center gap-2 text-sm">Next Step <ArrowRight size={16} /></button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: PARAMETERS */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col">
              <div className="mb-6"><h3 className="text-2xl font-bold text-white mb-1">The Parameters</h3><p className="text-white/50 text-sm">Budget & Timeline constraints.</p></div>
              <div className="space-y-8">
                <div>
                  <label className={labelClass}><IndianRupee size={12} className="inline mr-2" /> Budget Range (INR)</label>
                  <div className="flex flex-wrap gap-3 mt-3">
                    {['< ₹50k (MVP)', '₹50k - ₹2 Lakh', '₹2 Lakh - ₹5 Lakh', '₹5 Lakh+ (Enterprise)'].map((opt) => (
                      <button key={opt} onClick={() => setSelection('budget', opt)} className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${formData.budget === opt ? 'bg-blue-600 border-blue-500 text-white' : 'bg-white/5 border-white/10 text-white/50 hover:border-white/30'}`}>{opt}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelClass}><Clock size={12} className="inline mr-2" /> Timeline</label>
                  <div className="flex flex-wrap gap-3 mt-3">
                    {['Urgent (ASAP)', '1-2 Months', 'Flexible / 3+ Months'].map((opt) => (
                      <button key={opt} onClick={() => setSelection('timeline', opt)} className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${formData.timeline === opt ? 'bg-blue-600 border-blue-500 text-white' : 'bg-white/5 border-white/10 text-white/50 hover:border-white/30'}`}>{opt}</button>
                    ))}
                  </div>
                </div>
                <div><label className={labelClass}>Tech Stack Preferences {optionalLabel}</label><input type="text" name="techStack" value={formData.techStack} onChange={handleChange} placeholder="e.g. React, Python, AWS (Leave blank if unsure)" className={inputClass} /></div>
              </div>
              <div className="mt-auto pt-8 flex justify-between items-center">
                <button onClick={prevStep} className="text-white/40 hover:text-white text-sm font-mono">Back</button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-blue-500 transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <><Loader2 size={16} className="animate-spin" /> Submitting...</>
                  ) : (
                    <><CheckCircle2 size={16} /> Submit Brief</>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
