import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Sparkles, Play, Pause, ChevronRight, Droplets } from 'lucide-react';

interface DrinkStage {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  liquidHeight: number;
  liquidColor: number;
  foamHeight: number;
  hasParticles: boolean;
  streamVisible: boolean;
}

const DRINK_STAGES: DrinkStage[] = [
  {
    step: 1,
    title: 'Selection & Weighing',
    subtitle: 'Single Origin Ethiopian Heirloom',
    description: '19.5 grams of high-elevation beans, ground to 220 microns on flat titanium burrs for surgical extraction clarity.',
    liquidHeight: 0.05,
    liquidColor: 0x221207,
    foamHeight: 0.0,
    hasParticles: false,
    streamVisible: false,
  },
  {
    step: 2,
    title: 'Double Ristretto Pull',
    subtitle: '9-Bar Pressure Extraction at 93°C',
    description: 'Rich dark espresso streams downward, extracting sweet hazelnut sugars and dense reddish-amber crema body.',
    liquidHeight: 0.55,
    liquidColor: 0x2a1608,
    foamHeight: 0.1,
    hasParticles: false,
    streamVisible: true,
  },
  {
    step: 3,
    title: 'Velvety Milk Cascade',
    subtitle: 'Steamed Microfoam & Bourbon Vanilla',
    description: 'Silk-textured whole oat milk infused with Madagascar vanilla bean swirls into the dark espresso, forming cloud swirls.',
    liquidHeight: 1.15,
    liquidColor: 0x6e4324,
    foamHeight: 0.25,
    hasParticles: false,
    streamVisible: false,
  },
  {
    step: 4,
    title: 'Cold Foam Crown',
    subtitle: 'Dense Whipped Cream Crema Layer',
    description: 'A 20mm head of chilled microfoam is layered across the surface, creating distinct thermal and tactile separation.',
    liquidHeight: 1.45,
    liquidColor: 0x5a3419,
    foamHeight: 0.45,
    hasParticles: false,
    streamVisible: false,
  },
  {
    step: 5,
    title: '70% Dark Cacao Dusting',
    subtitle: 'Artisanal Single-Estate Shavings',
    description: 'Hand-grated organic dark cocoa particles cascade over the velvety foam, releasing bittersweet roasted aromatics.',
    liquidHeight: 1.45,
    liquidColor: 0x5a3419,
    foamHeight: 0.45,
    hasParticles: true,
    streamVisible: false,
  },
  {
    step: 6,
    title: 'Final Presentation',
    subtitle: 'The Signature NOIR Experience',
    description: 'Served in bespoke faceted crystal glassware with an expressed orange peel twist. Sip without a straw to taste thermal contrast.',
    liquidHeight: 1.45,
    liquidColor: 0x522e15,
    foamHeight: 0.45,
    hasParticles: true,
    streamVisible: false,
  },
];

export const SignatureDrink3D: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const mountRef = useRef<HTMLDivElement>(null);
  const liquidMeshRef = useRef<THREE.Mesh | null>(null);
  const foamMeshRef = useRef<THREE.Mesh | null>(null);
  const particleSystemRef = useRef<THREE.Points | null>(null);
  const streamMeshRef = useRef<THREE.Mesh | null>(null);

  // Initialize Three.js 3D Glass scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf5f0e6, 0.03);

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.8, 4.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Studio Lighting for Glass Realism
    const ambientLight = new THREE.AmbientLight(0xfcf7ed, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff7ea, 2.8);
    keyLight.position.set(4, 5, 3);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xc5a059, 2.4);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);

    const backGlow = new THREE.PointLight(0xe8d0a8, 1.6, 12);
    backGlow.position.set(0, 0.5, -2);
    scene.add(backGlow);

    // Glass Tumbler Group
    const glassGroup = new THREE.Group();
    scene.add(glassGroup);

    // Transparent Glass Material
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.92,
      opacity: 1,
      transparent: true,
      roughness: 0.08,
      ior: 1.52, // Glass index of refraction
      thickness: 0.35,
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0xffffff),
    });

    // Glass profile using LatheGeometry (tall elegant rocks / tumbler glass)
    const glassPoints: THREE.Vector2[] = [];
    glassPoints.push(new THREE.Vector2(0, -0.05));
    glassPoints.push(new THREE.Vector2(0.72, -0.05));
    glassPoints.push(new THREE.Vector2(0.78, 0.05));
    glassPoints.push(new THREE.Vector2(0.85, 0.7));
    glassPoints.push(new THREE.Vector2(0.95, 1.6));
    glassPoints.push(new THREE.Vector2(0.98, 1.95));
    // Rim and inner wall
    glassPoints.push(new THREE.Vector2(0.92, 1.95));
    glassPoints.push(new THREE.Vector2(0.88, 1.6));
    glassPoints.push(new THREE.Vector2(0.78, 0.7));
    glassPoints.push(new THREE.Vector2(0.7, 0.15));
    glassPoints.push(new THREE.Vector2(0, 0.15));

    const glassGeo = new THREE.LatheGeometry(glassPoints, 48);
    const glassMesh = new THREE.Mesh(glassGeo, glassMaterial);
    glassGroup.add(glassMesh);

    // Liquid Cylinder Mesh (grows dynamically)
    const liquidGeo = new THREE.CylinderGeometry(0.82, 0.68, 1.45, 36);
    const liquidMat = new THREE.MeshStandardMaterial({
      color: 0x221207,
      roughness: 0.25,
      metalness: 0.05,
    });
    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
    liquidMesh.position.y = 0.75;
    liquidMesh.scale.set(0.98, 0.05, 0.98);
    glassGroup.add(liquidMesh);
    liquidMeshRef.current = liquidMesh;

    // Cream Foam Layer Mesh
    const foamGeo = new THREE.CylinderGeometry(0.84, 0.82, 0.35, 36);
    const foamMat = new THREE.MeshStandardMaterial({
      color: 0xf5eedf, // Velvety cream color
      roughness: 0.6,
      metalness: 0.0,
    });
    const foamMesh = new THREE.Mesh(foamGeo, foamMat);
    foamMesh.position.y = 1.65;
    foamMesh.scale.set(0.98, 0.001, 0.98);
    glassGroup.add(foamMesh);
    foamMeshRef.current = foamMesh;

    // Espresso Stream Cylinder (appears when pouring)
    const streamGeo = new THREE.CylinderGeometry(0.04, 0.05, 2.5, 16);
    const streamMat = new THREE.MeshStandardMaterial({
      color: 0x3d1d0c,
      roughness: 0.2,
      metalness: 0.1,
      transparent: true,
      opacity: 0.85,
    });
    const streamMesh = new THREE.Mesh(streamGeo, streamMat);
    streamMesh.position.set(0, 2.2, 0);
    streamMesh.visible = false;
    glassGroup.add(streamMesh);
    streamMeshRef.current = streamMesh;

    // Cocoa Shaving Particles (fall onto the top surface)
    const particleCount = 80;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.75;
      particlePos[i * 3] = Math.cos(angle) * radius;
      particlePos[i * 3 + 1] = 1.78 + Math.random() * 0.05;
      particlePos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.06,
      color: 0x22120a, // Dark chocolate shaving
      transparent: true,
      opacity: 0,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    glassGroup.add(particleSystem);
    particleSystemRef.current = particleSystem;

    // Gentle floating tilt
    glassGroup.position.set(0, -0.7, 0);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Gentle rotation
      glassGroup.rotation.y = Math.sin(time * 0.5) * 0.18;

      // Stream shimmer
      if (streamMesh.visible) {
        streamMesh.scale.x = 0.9 + Math.sin(time * 20) * 0.15;
        streamMesh.scale.z = 0.9 + Math.cos(time * 20) * 0.15;
      }

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      glassGeo.dispose();
      glassMaterial.dispose();
      liquidGeo.dispose();
      liquidMat.dispose();
      foamGeo.dispose();
      foamMat.dispose();
      streamGeo.dispose();
      streamMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  // Update 3D drink stage animation on currentStep change
  useEffect(() => {
    const stage = DRINK_STAGES[currentStep - 1];
    if (!stage) return;

    if (liquidMeshRef.current) {
      const targetScaleY = stage.liquidHeight;
      const mat = liquidMeshRef.current.material as THREE.MeshStandardMaterial;
      mat.color.setHex(stage.liquidColor);

      // Smooth step height calculation
      liquidMeshRef.current.scale.y = Math.max(0.02, targetScaleY);
      liquidMeshRef.current.position.y = 0.15 + (targetScaleY * 1.45) / 2;
    }

    if (foamMeshRef.current) {
      const mat = foamMeshRef.current.material as THREE.MeshStandardMaterial;
      if (stage.foamHeight > 0) {
        foamMeshRef.current.scale.set(0.96, stage.foamHeight, 0.96);
        foamMeshRef.current.position.y = 0.15 + stage.liquidHeight * 1.45;
        foamMeshRef.current.visible = true;
      } else {
        foamMeshRef.current.visible = false;
      }
    }

    if (streamMeshRef.current) {
      streamMeshRef.current.visible = stage.streamVisible;
    }

    if (particleSystemRef.current) {
      const pMat = particleSystemRef.current.material as THREE.PointsMaterial;
      pMat.opacity = stage.hasParticles ? 0.95 : 0;
    }
  }, [currentStep]);

  // Autoplay sequencer toggle
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev >= 6 ? 1 : prev + 1));
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeStage = DRINK_STAGES[currentStep - 1];

  return (
    <section id="signature" className="relative py-28 md:py-36 bg-[#f5f0e6] text-[#231b15] overflow-hidden border-t border-[#e8dfd1]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[#ded3c2]">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#9e7938] mb-3 font-semibold">
              <span>Chapter 03</span>
              <span aria-hidden="true">·</span>
              <span>Signature Alchemy</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1c1713]">
              THE NOIR.
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase bg-[#ffffff] border border-[#d8cdbe] hover:border-[#9e7938] text-[#1c1713] rounded-md transition-colors shadow-sm"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause Sequence' : 'Auto Play Assembly'}</span>
            </button>
          </div>
        </div>

        {/* 3D Glass Showcase & Step Scrubber */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: 3D Animated Glass Canvas */}
          <div className="lg:col-span-6 relative aspect-square sm:aspect-[4/3] lg:aspect-square bg-radial from-[#faf5eb] to-[#ede4d4] rounded-xl border border-[#ded3c2] overflow-hidden shadow-xl">
            <div ref={mountRef} className="w-full h-full" />

            {/* Overlaid stage number */}
            <div className="absolute top-4 left-5 flex items-center gap-2 text-xs font-mono text-[#9e7938]">
              <span className="font-bold text-base">0{currentStep}</span>
              <span className="text-[#8c7e70]">/ 06</span>
            </div>

            {/* Price & Signature Tag */}
            <div className="absolute top-4 right-5 text-right">
              <span className="text-sm font-bold text-[#1c1713] font-mono tabular-nums">₹280</span>
              <span className="block text-[10px] uppercase tracking-wider text-[#736556] font-medium">House Flagship</span>
            </div>

            {/* Current Step Banner Overlay */}
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-white/90 backdrop-blur-md border border-[#ded3c2] shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#9e7938] font-bold">Stage {currentStep}: {activeStage.title}</p>
                <p className="text-[11px] text-[#5c5044] truncate">{activeStage.subtitle}</p>
              </div>
              <span className="text-xs font-mono font-semibold text-[#1c1713]">
                {Math.round((currentStep / 6) * 100)}%
              </span>
            </div>
          </div>

          {/* Right: Step-by-Step Interactive Details & Editorial Photo */}
          <div className="lg:col-span-6 space-y-6">
            {/* Step Selector Buttons */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 p-1 bg-[#ede5d8] border border-[#ded3c2] rounded-lg">
              {DRINK_STAGES.map((s) => (
                <button
                  key={s.step}
                  onClick={() => {
                    setCurrentStep(s.step);
                    setIsPlaying(false);
                  }}
                  className={`py-2 text-xs font-mono tabular-nums rounded transition-colors text-center font-semibold ${
                    currentStep === s.step
                      ? 'bg-[#1c1713] text-[#faf7f2] shadow-sm'
                      : 'text-[#736556] hover:text-[#1c1713] hover:bg-[#ffffff]/60'
                  }`}
                >
                  0{s.step}
                </button>
              ))}
            </div>

            {/* Active Stage Editorial Deep-Dive */}
            <div className="p-8 rounded-xl bg-[#ffffff] border border-[#e8dfd1] shadow-md space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#9e7938] font-semibold">
                <span>Phase 0{activeStage.step}</span>
                <span aria-hidden="true">·</span>
                <span>{activeStage.subtitle}</span>
              </div>

              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1c1713]">
                {activeStage.title}
              </h3>

              <p className="text-sm sm:text-base text-[#5c5044] leading-relaxed font-light">
                {activeStage.description}
              </p>

              {/* Tasting notes highlights */}
              <div className="pt-4 border-t border-[#e8dfd1] flex flex-wrap items-center gap-4 text-xs text-[#524438]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9e7938]" />
                  <span>Bittersweet 70% Cocoa</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9e7938]" />
                  <span>Madagascar Vanilla Bean</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9e7938]" />
                  <span>Expressed Orange Oils</span>
                </div>
              </div>
            </div>

            {/* Editorial Beverage Photography Card */}
            <div className="relative aspect-[16/8] rounded-xl overflow-hidden border border-[#ded3c2] shadow-lg group">
              <img
                src="/src/assets/images/signature_noir_beverage_1790354110201.jpg"
                alt="Finished THE NOIR signature drink in crystal glass"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120f0d]/90 via-[#120f0d]/20 to-transparent flex items-end p-5">
                <div className="flex items-center justify-between w-full text-white">
                  <div>
                    <p className="font-serif-luxury text-base text-white">The Served Presentation</p>
                    <p className="text-[11px] text-[#ded3c2] tracking-wider uppercase">Faceted crystal glassware · Flamed citrus peel</p>
                  </div>
                  <button
                    onClick={() => setCurrentStep(6)}
                    className="text-xs font-semibold uppercase tracking-wider text-[#e8c785] hover:underline flex items-center gap-1"
                  >
                    <span>Final Reveal</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
