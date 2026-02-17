import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import { Text3D, Center } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

// --- 3D Core Component ---
function Core() {
  const meshRef = useRef();
  // Animate the core's rotation
  useFrame((state) => {
    const { clock, mouse } = state;
    meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() / 2) * 0.2;
    meshRef.current.position.x = mouse.x * 0.5;
    meshRef.current.position.y = mouse.y * 0.5;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2.3, 5]} />
      <meshStandardMaterial
        color="#eaeaeaff"
        metalness={0.9}
        roughness={0.2}
        wireframe={true}
        wireframeLinewidth={15}
      />
    </mesh>
  );
}

// --- Dynamic Text Component ---
const Slogans = ["Raw Potential, Forged.", "Ideas Into Impact.", "Where Builders Thrive."];

function AnimatedText() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % Slogans.length);
    }, 4000); // Change text every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.h1
        key={Slogans[index]}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="hero-title font-heading tracking-wider text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-center"
      >
        {Slogans[index]}
      </motion.h1>
    </AnimatePresence>
  );
}


// --- Main Hero Component ---
export default function Hero() {
  return (
    <section className="relative h-screen w-full">
      {/* 3D Canvas */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[3, 5, 2]} intensity={1.5} />
          <pointLight position={[-5, -5, 5]} intensity={2} color="#EAEAEA" />
          <Core />
        </Canvas>
      </div>

      {/* UI Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4">
        <AnimatedText />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="max-w-2xl mx-auto text-base md:text-lg mt-6 text-center text-text-secondary"
        >
          Enclope is where ambitious student talent meets real-world projects.
        </motion.p>
      </div>


    </section>
  );
}