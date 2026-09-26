import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Footer: React.FC = () => {
  const beanCanvasRef = useRef<HTMLDivElement>(null);

  // Tiny rotating 3D coffee bean in the footer
  useEffect(() => {
    const container = beanCanvasRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 20);
    camera.position.set(0, 0, 2.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(48, 48);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xfff7ea, 3.2);
    light.position.set(2, 2, 2);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xf5eedf, 2));

    const geo = new THREE.SphereGeometry(0.55, 16, 12);
    geo.scale(1.3, 0.8, 1.0);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xb3883b,
      roughness: 0.35,
      metalness: 0.35,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      mesh.rotation.y += 0.02;
      mesh.rotation.x += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geo.dispose();
      mat.dispose();
    };
  }, []);

  const links = [
    { label: 'Instagram', href: '#' },
    { label: 'X (Twitter)', href: '#' },
    { label: 'Journal', href: '#' },
    { label: 'Contact', href: '#location' },
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
  ];

  return (
    <footer className="relative bg-[#f5f0e6] text-[#231b15] py-20 border-t border-[#ded3c2]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-[#ded3c2]">
          {/* Brand lockup */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div ref={beanCanvasRef} className="w-12 h-12 flex items-center justify-center cursor-pointer" title="NOIR & BEAN 3D emblem" />
              <span className="font-serif-luxury text-2xl font-bold tracking-[0.2em] text-[#1c1713]">
                NOIR & BEAN
              </span>
            </div>
            <p className="text-sm text-[#5c5044] italic font-serif">
              "Slow coffee. Good conversations."
            </p>
          </div>

          {/* Clean text navigation links per Section 1A */}
          <div className="flex flex-wrap items-center gap-6 text-xs tracking-wider uppercase text-[#736556]">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#9e7938] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8c7e70]">
          <p>© {new Date().getFullYear()} NOIR & BEAN Coffee Roasters. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>Specialty Grade 94.5 SCA</span>
            <span aria-hidden="true">·</span>
            <span>Pune, Maharashtra</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
