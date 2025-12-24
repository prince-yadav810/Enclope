import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Link } from 'react-router-dom';

// --- Improved Particle Sphere with Smooth Physics ---
function ParticleSphere() {
    const pointsRef = useRef();
    const { mouse, viewport } = useThree();

    // Initialize particle data
    const { positions, originalPositions, colors, count } = useMemo(() => {
        const count = 2000; // Slightly fewer particles for cleaner look
        const positions = new Float32Array(count * 3);
        const originalPositions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            // Fibonacci sphere distribution
            const phi = Math.acos(1 - 2 * (i + 0.5) / count);
            const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

            // Smaller radius as requested (1.6 instead of 2.2)
            const radius = 1.6 + (Math.random() - 0.5) * 0.1;

            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            originalPositions[i * 3] = x;
            originalPositions[i * 3 + 1] = y;
            originalPositions[i * 3 + 2] = z;

            // Blue/Purple Colors
            const t = Math.random();
            colors[i * 3] = 0.3 + t * 0.1;     // R
            colors[i * 3 + 1] = 0.3 + t * 0.1; // G
            colors[i * 3 + 2] = 0.9 + t * 0.1; // B
        }

        return { positions, originalPositions, colors, count };
    }, []);

    // Smooth animation loop
    useFrame((state) => {
        if (!pointsRef.current) return;

        // Slow rotation of the whole group
        pointsRef.current.rotation.y += 0.002;
        pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;

        const positionsArray = pointsRef.current.geometry.attributes.position.array;

        // Convert normalized mouse coordinates (-1 to 1) to world units roughly
        // Viewport width at z=0 is approx viewport.width
        // We need to account for the camera Z position (6) vs particle Z approx (0)
        const mouseX = (mouse.x * viewport.width) / 2;
        const mouseY = (mouse.y * viewport.height) / 2;

        for (let i = 0; i < count; i++) {
            const idx = i * 3;

            // Get current world position of the point (simplified, ignoring rotation for interaction check to keep it stable)
            // Ideally we transform original pos by rotation, but for a "cloud" effect, 
            // checking against original or current world pos is key.

            // Let's use the actual current positions for interaction
            // We need to rotate the mouse position into the local space OR rotate the point to world?
            // Simpler approach for stable interaction: Calculate interaction based on Screen Space projection
            // But here we'll stick to 3D distance for performance.

            // Current particle position (local space)
            const px = positionsArray[idx];
            const py = positionsArray[idx + 1];
            const pz = positionsArray[idx + 2];

            // Original position (local space target)
            const ox = originalPositions[idx];
            const oy = originalPositions[idx + 1];
            const oz = originalPositions[idx + 2];

            // Calculate world position approximation for mouse check
            // (Since we rotate the whole group, we need to account for that, 
            // OR we can just check distance in 2D 'glass' plane for specific effect)

            // Let's do a Local Space mouse check by rotating mouse inversely? 
            // Actually, simple distance check often feels best if sphere doesn't rotate too fast.

            // Vector from mouse to particle
            const dx = px - mouseX; // Approximation
            const dy = py - mouseY;
            const distSq = dx * dx + dy * dy;
            const dist = Math.sqrt(distSq);

            // Interaction Radius
            const radius = 1.2;

            if (dist < radius) {
                // Repulsion Force
                const force = (1 - dist / radius) * 0.15; // Smooth force
                const angle = Math.atan2(dy, dx);

                // Push particle away
                positionsArray[idx] += Math.cos(angle) * force;
                positionsArray[idx + 1] += Math.sin(angle) * force;
            }

            // Return to original position (Lerp for smooth damping)
            // This eliminates the "springy jitter" and gives a fluid viscosity
            positionsArray[idx] += (ox - px) * 0.05; // 0.05 = eased return speed
            positionsArray[idx + 1] += (oy - py) * 0.05;
            positionsArray[idx + 2] += (oz - pz) * 0.05;
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}

// --- Ambient Background Particles ---
function AmbientParticles() {
    const pointsRef = useRef();
    const positions = useMemo(() => {
        const count = 300;
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 15;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
        }
        return pos;
    }, []);

    useFrame(() => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += 0.0005;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={300} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.015} color="#4F46E5" transparent opacity={0.3} sizeAttenuation blending={THREE.AdditiveBlending} />
        </points>
    )
}


// --- Text & UI Components ---
const Slogans = [
    "Raw Potential, Forged.",
    "Ideas Into Impact.",
    "Where Builders Thrive."
];

function AnimatedText() {
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => setIndex(prev => (prev + 1) % Slogans.length), 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ height: '100px', position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <AnimatePresence mode="wait">
                <motion.h1
                    key={Slogans[index]}
                    initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="hero-headline"
                    style={{ position: 'absolute' }}
                >
                    {Slogans[index]}
                </motion.h1>
            </AnimatePresence>
        </div>
    );
}

function StatCounter({ value, label, delay }) {
    const [count, setCount] = useState(0);
    // Simple count up effect
    useEffect(() => {
        setTimeout(() => setCount(value), delay + 1000);
    }, [value, delay]);

    return (
        <div className="stat-item">
            <span className="stat-value">{count}</span>
            <span className="stat-label">{label}</span>
        </div>
    )
}

export default function Hero() {
    return (
        <section className="hero-section">
            <div className="hero-glow"></div>
            <div className="hero-watermark">ENCLOPE</div>

            <div className="hero-canvas-container">
                <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                    <ambientLight intensity={0.5} />
                    <ParticleSphere />
                    <AmbientParticles />
                </Canvas>
            </div>

            <div className="hero-content">
                <p className="hero-tagline">Welcome to the Foundry</p>
                <AnimatedText />
                <p className="hero-description">
                    We shape the next generation of builders by creating exceptional digital solutions.
                </p>
                <Link to="/join" className="hero-cta">
                    Join Enclope
                    <svg className="cta-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                </Link>
            </div>

            <div className="hero-stats">
                <StatCounter value="47" label="Active Contributors" delay={0} />
                <StatCounter value="15" label="Ideas in The Crucible" delay={200} />
                <StatCounter value="8" label="Projects in The Forge" delay={400} />
            </div>
        </section>
    );
}
