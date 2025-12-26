import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Link } from 'react-router-dom';

// --- Antimatter-Style Particle Sphere with Ray-to-Point Distance ---
// Key insight: Calculate distance from each particle to the MOUSE RAY (infinite line),
// not to a single point. This is why it works everywhere on the sphere.
function ParticleSphere() {
    const pointsRef = useRef();
    const { mouse, camera } = useThree();

    // Store velocities for smoother physics-based movement
    const velocities = useRef(null);

    // Raycaster for mouse ray
    const raycaster = useMemo(() => new THREE.Raycaster(), []);
    const sphereRadius = 1.6;

    // Reusable vectors to avoid garbage collection
    const tempVec = useMemo(() => new THREE.Vector3(), []);
    const particleWorldPos = useMemo(() => new THREE.Vector3(), []);
    const vectorToParticle = useMemo(() => new THREE.Vector3(), []);
    const closestPointOnRay = useMemo(() => new THREE.Vector3(), []);

    // Initialize particle data
    const { positions, originalPositions, colors, count } = useMemo(() => {
        const count = 2500;
        const positions = new Float32Array(count * 3);
        const originalPositions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            // Fibonacci sphere distribution for even coverage
            const phi = Math.acos(1 - 2 * (i + 0.5) / count);
            const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

            const radius = sphereRadius + (Math.random() - 0.5) * 0.08;

            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            originalPositions[i * 3] = x;
            originalPositions[i * 3 + 1] = y;
            originalPositions[i * 3 + 2] = z;

            // === DIRECTIONAL LIGHTING FROM TOP-LEFT ===
            // Light source direction (normalized) - coming from top-left corner
            const lightDirX = -0.6;  // from left
            const lightDirY = 0.7;   // from top
            const lightDirZ = 0.4;   // slightly from front

            // Normalize particle position to get surface normal
            const len = Math.sqrt(x * x + y * y + z * z);
            const nx = x / len;
            const ny = y / len;
            const nz = z / len;

            // Dot product: how much the particle faces the light (1 = facing, -1 = away)
            const dot = nx * lightDirX + ny * lightDirY + nz * lightDirZ;

            // Remap dot product to lighting factor (0 to 1)
            // Particles facing light = bright, particles away = dim
            const lightFactor = Math.max(0, dot) * 0.7 + 0.3; // 0.3 is ambient light

            // Add some randomness
            const t = Math.random() * 0.15;

            // Color: purple/blue gradient with lighting applied
            // Lit side: brighter purple-white, dark side: deeper blue
            colors[i * 3] = (0.4 + t) * lightFactor + 0.1;     // R - more red = more purple on lit side
            colors[i * 3 + 1] = (0.2 + t) * lightFactor;       // G
            colors[i * 3 + 2] = (0.7 + t) * lightFactor + 0.2; // B - always some blue
        }

        return { positions, originalPositions, colors, count };
    }, []);

    // Initialize velocities
    useEffect(() => {
        velocities.current = new Float32Array(count * 3).fill(0);
    }, [count]);

    // Animation loop with Antimatter-style RAY-TO-POINT distance repulsion
    useFrame((state) => {
        if (!pointsRef.current || !velocities.current) return;

        // Slow rotation of the whole group
        pointsRef.current.rotation.y += 0.001;
        pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.05;

        const positionsArray = pointsRef.current.geometry.attributes.position.array;
        const vels = velocities.current;

        // Get the world matrix for transforming particle positions
        pointsRef.current.updateMatrixWorld();
        const worldMatrix = pointsRef.current.matrixWorld;

        // Create a ray from camera through mouse position
        raycaster.setFromCamera(mouse, camera);
        const rayOrigin = raycaster.ray.origin;
        const rayDir = raycaster.ray.direction;

        // Interaction parameters - Antimatter style
        const interactionRadius = 0.2; // Tight cursor-sized repulsion
        const repulsionStrength = 4.5; // Strong force like Antimatter
        const returnSpeed = 0.06;
        const velocityDamping = 0.88;

        for (let i = 0; i < count; i++) {
            const idx = i * 3;

            // Current particle position (local space)
            const px = positionsArray[idx];
            const py = positionsArray[idx + 1];
            const pz = positionsArray[idx + 2];

            // Original position (target to return to)
            const ox = originalPositions[idx];
            const oy = originalPositions[idx + 1];
            const oz = originalPositions[idx + 2];

            // Transform particle to world space
            particleWorldPos.set(px, py, pz);
            particleWorldPos.applyMatrix4(worldMatrix);

            // === KEY ANTIMATTER TECHNIQUE ===
            // Calculate the closest point on the ray to this particle
            // This is the projection of the particle onto the infinite ray line

            // Vector from ray origin to particle
            vectorToParticle.subVectors(particleWorldPos, rayOrigin);

            // Project this vector onto the ray direction to find t (distance along ray)
            const t = vectorToParticle.dot(rayDir);

            // The closest point on the ray to the particle
            closestPointOnRay.copy(rayDir).multiplyScalar(t).add(rayOrigin);

            // Distance from particle to the closest point on the ray
            const distToRay = particleWorldPos.distanceTo(closestPointOnRay);

            // Apply repulsion if particle is close to the ray
            if (distToRay < interactionRadius && distToRay > 0.0001) {
                // Force falls off linearly with distance
                const forceFactor = 1 - (distToRay / interactionRadius);
                const forceStrength = repulsionStrength * forceFactor * 0.01; // Scale down for smooth movement

                // Direction: push particle away from the closest point on ray
                // We need to calculate this in LOCAL space for velocity updates
                tempVec.subVectors(particleWorldPos, closestPointOnRay);
                if (tempVec.length() > 0.0001) {
                    tempVec.normalize();

                    // Apply force in local space (approximate by using world direction)
                    // This works because the sphere rotation is minimal
                    vels[idx] += tempVec.x * forceStrength;
                    vels[idx + 1] += tempVec.y * forceStrength;
                    vels[idx + 2] += tempVec.z * forceStrength;
                }
            }

            // Spring force to return to original position
            vels[idx] += (ox - px) * returnSpeed;
            vels[idx + 1] += (oy - py) * returnSpeed;
            vels[idx + 2] += (oz - pz) * returnSpeed;

            // Apply velocity damping
            vels[idx] *= velocityDamping;
            vels[idx + 1] *= velocityDamping;
            vels[idx + 2] *= velocityDamping;

            // Update positions
            positionsArray[idx] += vels[idx];
            positionsArray[idx + 1] += vels[idx + 1];
            positionsArray[idx + 2] += vels[idx + 2];
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
            <span className="stat-label" dangerouslySetInnerHTML={{ __html: label }} />
        </div>
    )
}

export default function Hero() {
    return (
        <section className="hero-section">
            <div className="hero-light-ray"></div>
            <div className="hero-glow"></div>
            <div className="hero-watermark-tagline">WELCOME TO THE FOUNDRY</div>
            <div className="hero-watermark">ENCLOPE</div>

            <div className="hero-canvas-container">
                <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                    <ambientLight intensity={0.5} />
                    <ParticleSphere />
                    <AmbientParticles />
                </Canvas>
            </div>
            {/* Bottom left: Text + CTA */}
            <div className="hero-bottom-left">
                <p className="hero-description">
                    We shape the next generation of builders by creating exceptional digital solutions.
                </p>
                <Link to="/join" className="hero-cta">
                    Join Enclope
                    <svg className="cta-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                </Link>
            </div>

            {/* Center: Animated headline */}
            <div className="hero-content">
                <AnimatedText />
            </div>

            {/* Bottom right: Stats */}
            <div className="hero-stats">
                <StatCounter value="47" label="Active<br/>Contributors" delay={0} />
                <StatCounter value="15" label="Ideas in<br/>The Crucible" delay={200} />
                <StatCounter value="8" label="Projects in<br/>The Forge" delay={400} />
            </div>
        </section>
    );
}
