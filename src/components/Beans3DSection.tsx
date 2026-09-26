import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BeanOrigin } from '../types';
import { Sparkles, Compass, MapPin, Gauge } from 'lucide-react';

const BEAN_ORIGINS: BeanOrigin[] = [
  {
    id: 'ethiopia',
    name: 'Yirgacheffe Heirloom',
    country: 'Ethiopia',
    region: 'Gedeo Zone',
    altitude: '2,100m – 2,250m',
    process: 'Washed / Sun-Dried on Raised African Beds',
    variety: 'Wild Heirloom Varieties',
    roastLevel: 'Light',
    description: 'Celebrated for its jasmine florals, sparkling bergamot acidity, and silken peach nectar body with tea-like refinement.',
    notes: ['Jasmine Floral', 'Bergamot Citrus', 'Ripe White Peach', 'Black Tea'],
    radar: { acidity: 94, sweetness: 88, body: 72, aroma: 98, aftertaste: 90 },
    accentColor: '#e0a96d',
  },
  {
    id: 'colombia',
    name: 'Huila Supremo',
    country: 'Colombia',
    region: 'San Agustín, Huila',
    altitude: '1,750m – 1,900m',
    process: 'Double Fermentation Honey',
    variety: 'Castillo & Caturra',
    roastLevel: 'Medium-Light',
    description: 'A harmonious balance of crisp Fuji red apple, velvety panela brown sugar, and toasted hazelnut with golden honey finish.',
    notes: ['Crisp Red Apple', 'Milk Chocolate', 'Warm Caramel', 'Toasted Hazelnut'],
    radar: { acidity: 82, sweetness: 95, body: 86, aroma: 89, aftertaste: 92 },
    accentColor: '#c5a059',
  },
  {
    id: 'brazil',
    name: 'Cerrado Mineiro Estate',
    country: 'Brazil',
    region: 'Minas Gerais',
    altitude: '1,150m – 1,300m',
    process: 'Full Natural Patio-Dried',
    variety: 'Yellow Bourbon',
    roastLevel: 'Medium-Dark',
    description: 'Creamy, full-bodied indulgence with heavy bittersweet dark cacao, roasted walnut, and lingering cane molasses sweetness.',
    notes: ['70% Dark Chocolate', 'Roasted Walnut', 'Brown Sugar Molasses', 'Creamy Praline'],
    radar: { acidity: 60, sweetness: 90, body: 96, aroma: 84, aftertaste: 94 },
    accentColor: '#a67c52',
  },
  {
    id: 'guatemala',
    name: 'Antigua Los Volcanes',
    country: 'Guatemala',
    region: 'Antigua Valley',
    altitude: '1,600m – 1,850m',
    process: 'Washed, Mineral Spring Water',
    variety: 'Bourbon & Typica',
    roastLevel: 'Medium-Dark',
    description: 'Volcanic mineral soils infuse complex baking spices, candied orange peel, and intense dark cocoa truffle character.',
    notes: ['Cocoa Truffle', 'Candied Orange', 'Ceylon Cinnamon', 'Nutmeg Spice'],
    radar: { acidity: 78, sweetness: 92, body: 88, aroma: 91, aftertaste: 93 },
    accentColor: '#b8860b',
  },
];

export const Beans3DSection: React.FC = () => {
  const [selectedBean, setSelectedBean] = useState<BeanOrigin>(BEAN_ORIGINS[0]);
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const beanMeshRef = useRef<THREE.Mesh | null>(null);
  const lightRef = useRef<THREE.PointLight | null>(null);

  // Initialize Three.js interactive 3D Bean Viewer
  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 3.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Studio Lights
    const ambientLight = new THREE.AmbientLight(0xfcf7ed, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff7ea, 2.5);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xc5a059, 2.0);
    rimLight.position.set(-3, -2, -2);
    scene.add(rimLight);

    const accentPointLight = new THREE.PointLight(0xe0a96d, 2.0, 10);
    accentPointLight.position.set(0, 2, 2);
    scene.add(accentPointLight);
    lightRef.current = accentPointLight;

    // Create Detailed 3D Bean Geometry with natural cleft
    const geo = new THREE.SphereGeometry(0.9, 48, 36);
    geo.scale(1.4, 0.9, 1.15); // bean proportion
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);

      // Create natural cleft along top face
      if (Math.abs(z) < 0.18 && y > 0.05) {
        const depth = (1 - Math.abs(z) / 0.18) * 0.45;
        pos.setY(i, y - depth);
      }
      // Slightly taper ends
      if (Math.abs(x) > 0.9) {
        pos.setZ(i, z * 0.85);
        pos.setY(i, y * 0.85);
      }
    }
    geo.computeVertexNormals();

    // Bean Material with procedural roast sheen
    const beanMat = new THREE.MeshStandardMaterial({
      color: 0x4a2a18,
      roughness: 0.35,
      metalness: 0.1,
    });

    const beanMesh = new THREE.Mesh(geo, beanMat);
    beanMesh.rotation.x = 0.4;
    beanMesh.rotation.y = -0.5;
    scene.add(beanMesh);
    beanMeshRef.current = beanMesh;

    // Drag-to-rotate interaction variables
    let mousePrevious = { x: 0, y: 0 };
    let isMouseDown = false;
    let autoRotateSpeed = 0.006;

    const onMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      setIsDragging(true);
      mousePrevious = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isMouseDown || !beanMeshRef.current) return;
      const deltaX = e.clientX - mousePrevious.x;
      const deltaY = e.clientY - mousePrevious.y;

      beanMeshRef.current.rotation.y += deltaX * 0.01;
      beanMeshRef.current.rotation.x += deltaY * 0.01;

      mousePrevious = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isMouseDown = false;
      setIsDragging(false);
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support for mobile
    let touchPrevious = { x: 0, y: 0 };
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchPrevious = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && beanMeshRef.current) {
        const deltaX = e.touches[0].clientX - touchPrevious.x;
        const deltaY = e.touches[0].clientY - touchPrevious.y;
        beanMeshRef.current.rotation.y += deltaX * 0.01;
        beanMeshRef.current.rotation.x += deltaY * 0.01;
        touchPrevious = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    domElement.addEventListener('touchmove', onTouchMove, { passive: true });

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isMouseDown && beanMeshRef.current) {
        beanMeshRef.current.rotation.y += autoRotateSpeed;
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
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('touchstart', onTouchStart);
      domElement.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geo.dispose();
      beanMat.dispose();
    };
  }, []);

  // Update 3D bean color and accent lighting when selection changes
  useEffect(() => {
    if (!beanMeshRef.current) return;
    const mat = beanMeshRef.current.material as THREE.MeshStandardMaterial;

    // Adjust bean color by roast level
    if (selectedBean.roastLevel === 'Light') {
      mat.color.setHex(0x6b4423); // Cinnamon golden brown
      mat.roughness = 0.45;
    } else if (selectedBean.roastLevel === 'Medium-Light') {
      mat.color.setHex(0x543219); // Caramel milk chocolate
      mat.roughness = 0.38;
    } else if (selectedBean.roastLevel === 'Medium-Dark') {
      mat.color.setHex(0x381e0e); // Deep espresso roast
      mat.roughness = 0.32;
    } else {
      mat.color.setHex(0x27150a); // French dark roast
      mat.roughness = 0.28;
    }

    if (lightRef.current) {
      lightRef.current.color.set(selectedBean.accentColor);
    }
  }, [selectedBean]);

  return (
    <section id="beans" className="relative py-28 md:py-36 bg-[#faf7f2] text-[#231b15] overflow-hidden border-t border-[#e8dfd1]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[#ded3c2]">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#9e7938] mb-3 font-semibold">
              <span>Chapter 02</span>
              <span aria-hidden="true">·</span>
              <span>Terroir & Origins</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1c1713]">
              MEET THE BEANS.
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-[#5c5044] font-light leading-relaxed">
            Single-origin coffees sourced directly from generational farms. Rotate, explore flavor profiles, and inspect roast dynamics.
          </p>
        </div>

        {/* 3D Bean Stage & Interactive Card Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Origin Cards Selector */}
          <div className="lg:col-span-5 space-y-3">
            {BEAN_ORIGINS.map((bean) => {
              const isSelected = selectedBean.id === bean.id;
              return (
                <button
                  key={bean.id}
                  onClick={() => setSelectedBean(bean)}
                  className={`w-full text-left p-5 rounded-lg border transition-all duration-300 relative group overflow-hidden ${
                    isSelected
                      ? 'bg-[#ffffff] border-[#9e7938] shadow-md translate-x-1'
                      : 'bg-[#f8f5ee] border-[#e8dfd1] hover:border-[#b3883b]/60 hover:bg-[#ffffff]'
                  }`}
                >
                  {/* Subtle accent line on selected */}
                  {isSelected && (
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#9e7938]"
                      style={{ backgroundColor: bean.accentColor }}
                    />
                  )}

                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold tracking-wider uppercase text-[#9e7938]">
                      {bean.country}
                    </span>
                    <span className="text-[11px] font-mono tabular-nums text-[#736556]">
                      {bean.roastLevel} Roast
                    </span>
                  </div>

                  <h3 className="font-serif-luxury text-lg md:text-xl font-bold text-[#1c1713] mb-1">
                    {bean.name}
                  </h3>

                  {/* Clean unboxed metadata */}
                  <div className="flex items-center gap-2 text-xs text-[#6b5d50] mb-3">
                    <span>{bean.region}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{bean.altitude}</span>
                  </div>

                  {/* Flavor notes */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#524438]">
                    {bean.notes.map((note, nIdx) => (
                      <span key={nIdx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9e7938]" />
                        <span>{note}</span>
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: 3D Bean Interactive Canvas & Sensory Specs */}
          <div className="lg:col-span-7 bg-[#ffffff] border border-[#e8dfd1] rounded-xl p-6 sm:p-8 relative shadow-md">
            {/* 3D Bean Canvas container */}
            <div className="relative w-full h-72 sm:h-96 rounded-lg overflow-hidden bg-radial from-[#faf5eb] to-[#ede3d4] border border-[#ded3c2]">
              <div ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

              {/* Drag instruction overlay */}
              <div className="absolute bottom-3 left-4 text-[11px] tracking-wider uppercase text-[#736556] flex items-center gap-1.5 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-[#9e7938]" />
                <span>Drag to inspect 3D bean cleft & roast sheen</span>
              </div>

              {/* Variety label badge in corner */}
              <div className="absolute top-3 right-4 text-xs font-mono text-[#9e7938] font-semibold">
                {selectedBean.variety}
              </div>
            </div>

            {/* Cupping Flavor Profile & Terroir Details */}
            <div className="mt-8 space-y-6">
              <div>
                <h4 className="font-serif-luxury text-xl font-bold text-[#1c1713] mb-2">
                  {selectedBean.name}
                </h4>
                <p className="text-sm text-[#5c5044] leading-relaxed font-light">
                  {selectedBean.description}
                </p>
              </div>

              {/* Terroir specs in clean tabular layout */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-[#e8dfd1] text-xs">
                <div>
                  <span className="text-[#8c7e70] block uppercase text-[10px] tracking-wider mb-1">Process</span>
                  <span className="text-[#1c1713] font-medium">{selectedBean.process}</span>
                </div>
                <div>
                  <span className="text-[#8c7e70] block uppercase text-[10px] tracking-wider mb-1">Elevation</span>
                  <span className="text-[#1c1713] font-medium font-mono tabular-nums">{selectedBean.altitude}</span>
                </div>
                <div>
                  <span className="text-[#8c7e70] block uppercase text-[10px] tracking-wider mb-1">Roast Profile</span>
                  <span className="text-[#1c1713] font-medium">{selectedBean.roastLevel}</span>
                </div>
                <div>
                  <span className="text-[#8c7e70] block uppercase text-[10px] tracking-wider mb-1">Direct Partner</span>
                  <span className="text-[#9e7938] font-semibold">Single Estate</span>
                </div>
              </div>

              {/* Cupping Attribute Bars */}
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-wider text-[#6b5d50] font-semibold">
                  SCA Cupping Attributes (Score / 100)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs font-mono tabular-nums">
                  {Object.entries(selectedBean.radar).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between gap-3">
                      <span className="capitalize text-[#6b5d50] w-20">{key}</span>
                      <div className="flex-1 h-1.5 bg-[#ede5d8] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#9e7938] to-[#c5a059] transition-all duration-500"
                          style={{ width: `${val}%` }}
                        />
                      </div>
                      <span className="text-[#1c1713] font-semibold text-[11px] w-6 text-right">
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
