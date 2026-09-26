import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera setup
    const scene = new THREE.Scene();
    // Subtle exponential fog matching the warm light background
    scene.fog = new THREE.FogExp2(0xfaf7f2, 0.025);

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.2, 5.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Lighting setup (Warm Sunlit Studio Lighting)
    // Warm Key Light
    const keyLight = new THREE.DirectionalLight(0xfff6ec, 2.6);
    keyLight.position.set(4, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // Warm Gold Rim Light from back-left
    const rimLight = new THREE.DirectionalLight(0xc5a059, 2.4);
    rimLight.position.set(-5, 3, -4);
    scene.add(rimLight);

    // Soft Cream Fill Light
    const fillLight = new THREE.DirectionalLight(0xe8ded0, 1.2);
    fillLight.position.set(0, -3, 3);
    scene.add(fillLight);

    // Warm Ambient Light
    const ambientLight = new THREE.AmbientLight(0xf5eedf, 1.6);
    scene.add(ambientLight);

    // 3. Procedural Latte Art / Crema Texture
    const createLatteArtTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.CanvasTexture(canvas);

      // Crema base gradient (rich dark hazelnut to warm golden crema)
      const grad = ctx.createRadialGradient(256, 256, 10, 256, 256, 256);
      grad.addColorStop(0, '#7a4e2d');
      grad.addColorStop(0.5, '#5c381e');
      grad.addColorStop(0.85, '#3b2211');
      grad.addColorStop(1, '#27160a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 512);

      // Micro-texture bubbles / flecks
      ctx.fillStyle = 'rgba(215, 175, 120, 0.18)';
      for (let i = 0; i < 600; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const r = Math.random() * 2.5 + 0.5;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Stylized Latte Art Rosetta Swirl
      ctx.save();
      ctx.translate(256, 256);
      ctx.strokeStyle = '#f4e8dc';
      ctx.fillStyle = 'rgba(244, 232, 220, 0.85)';
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';

      // Central heart-leaf pattern
      const leaves = 8;
      for (let i = 0; i < leaves; i++) {
        const yOffset = -70 + i * 22;
        const width = 60 - Math.abs(i - 4) * 8;
        
        ctx.beginPath();
        ctx.moveTo(0, yOffset);
        ctx.bezierCurveTo(-width, yOffset - 15, -width * 0.8, yOffset + 15, 0, yOffset + 20);
        ctx.bezierCurveTo(width * 0.8, yOffset + 15, width, yOffset - 15, 0, yOffset);
        ctx.fill();
      }

      // Center stream line
      ctx.beginPath();
      ctx.moveTo(0, -95);
      ctx.lineTo(0, 95);
      ctx.lineWidth = 6;
      ctx.stroke();

      // Top heart
      ctx.beginPath();
      ctx.arc(-14, -85, 12, 0, Math.PI * 2);
      ctx.arc(14, -85, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      return texture;
    };

    // 4. Build Realistic 3D Coffee Cup Group
    const cupGroup = new THREE.Group();
    scene.add(cupGroup);

    // Ceramic material (Matte Alabaster / Bone China Luxury Ceramic)
    const ceramicMaterial = new THREE.MeshStandardMaterial({
      color: 0xf8f5ef,
      roughness: 0.22,
      metalness: 0.05,
    });

    // Gold rim accent material
    const goldRimMaterial = new THREE.MeshStandardMaterial({
      color: 0xc89d3d,
      roughness: 0.2,
      metalness: 0.88,
    });

    // Coffee cup profile using LatheGeometry
    const cupPoints: THREE.Vector2[] = [];
    cupPoints.push(new THREE.Vector2(0, 0));
    cupPoints.push(new THREE.Vector2(0.72, 0.02));
    cupPoints.push(new THREE.Vector2(0.78, 0.08));
    cupPoints.push(new THREE.Vector2(0.85, 0.4));
    cupPoints.push(new THREE.Vector2(1.05, 0.9));
    cupPoints.push(new THREE.Vector2(1.22, 1.4));
    cupPoints.push(new THREE.Vector2(1.25, 1.45));
    // Inner wall
    cupPoints.push(new THREE.Vector2(1.18, 1.45));
    cupPoints.push(new THREE.Vector2(1.15, 1.4));
    cupPoints.push(new THREE.Vector2(0.98, 0.9));
    cupPoints.push(new THREE.Vector2(0.8, 0.4));
    cupPoints.push(new THREE.Vector2(0.7, 0.15));
    cupPoints.push(new THREE.Vector2(0, 0.15));

    const cupGeometry = new THREE.LatheGeometry(cupPoints, 48);
    const cupMesh = new THREE.Mesh(cupGeometry, ceramicMaterial);
    cupMesh.castShadow = true;
    cupMesh.receiveShadow = true;
    cupGroup.add(cupMesh);

    // Subtle Gold Rim Ring on the top edge
    const rimGeometry = new THREE.TorusGeometry(1.215, 0.025, 16, 64);
    rimGeometry.rotateX(Math.PI / 2);
    rimGeometry.translate(0, 1.45, 0);
    const rimMesh = new THREE.Mesh(rimGeometry, goldRimMaterial);
    cupGroup.add(rimMesh);

    // Cup Handle (Curved ergonomic ceramic handle)
    const handleCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(1.15, 1.25, 0),
      new THREE.Vector3(1.85, 1.15, 0),
      new THREE.Vector3(1.75, 0.35, 0),
      new THREE.Vector3(0.92, 0.42, 0)
    );
    const handleGeometry = new THREE.TubeGeometry(handleCurve, 32, 0.1, 16, false);
    const handleMesh = new THREE.Mesh(handleGeometry, ceramicMaterial);
    handleMesh.castShadow = true;
    cupGroup.add(handleMesh);

    // Matching Ceramic Saucer
    const saucerPoints: THREE.Vector2[] = [];
    saucerPoints.push(new THREE.Vector2(0, -0.05));
    saucerPoints.push(new THREE.Vector2(1.1, -0.05));
    saucerPoints.push(new THREE.Vector2(1.4, 0.02));
    saucerPoints.push(new THREE.Vector2(1.85, 0.18));
    saucerPoints.push(new THREE.Vector2(1.92, 0.22));
    saucerPoints.push(new THREE.Vector2(1.88, 0.18));
    saucerPoints.push(new THREE.Vector2(1.35, 0.0));
    saucerPoints.push(new THREE.Vector2(0.9, -0.01));
    saucerPoints.push(new THREE.Vector2(0, 0));

    const saucerGeometry = new THREE.LatheGeometry(saucerPoints, 48);
    const saucerMesh = new THREE.Mesh(saucerGeometry, ceramicMaterial);
    saucerMesh.position.y = -0.02;
    saucerMesh.castShadow = true;
    saucerMesh.receiveShadow = true;
    cupGroup.add(saucerMesh);

    // Liquid surface (Espresso + Latte Art)
    const liquidGeometry = new THREE.CircleGeometry(1.12, 36);
    liquidGeometry.rotateX(-Math.PI / 2);
    const latteTexture = createLatteArtTexture();
    const liquidMaterial = new THREE.MeshStandardMaterial({
      map: latteTexture,
      roughness: 0.45,
      metalness: 0.05,
    });
    const liquidMesh = new THREE.Mesh(liquidGeometry, liquidMaterial);
    liquidMesh.position.y = 1.34;
    cupGroup.add(liquidMesh);

    // 5. Rising Steam Particle System
    const steamParticleCount = 45;
    const steamGeo = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(steamParticleCount * 3);
    const steamSpeeds: { x: number; y: number; z: number; phase: number }[] = [];

    for (let i = 0; i < steamParticleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.45;
      steamPositions[i * 3] = Math.cos(angle) * radius;
      steamPositions[i * 3 + 1] = 1.4 + Math.random() * 1.5;
      steamPositions[i * 3 + 2] = Math.sin(angle) * radius;

      steamSpeeds.push({
        x: (Math.random() - 0.5) * 0.003,
        y: 0.008 + Math.random() * 0.009,
        z: (Math.random() - 0.5) * 0.003,
        phase: Math.random() * Math.PI * 2,
      });
    }

    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));

    // Create soft circular alpha texture for steam particles
    const createSteamAlphaTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const rad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        rad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
        rad.addColorStop(0.4, 'rgba(255, 255, 255, 0.2)');
        rad.addColorStop(0.8, 'rgba(255, 255, 255, 0.05)');
        rad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = rad;
        ctx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const steamMaterial = new THREE.PointsMaterial({
      size: 0.35,
      map: createSteamAlphaTexture(),
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
      blending: THREE.NormalBlending,
      color: 0xbaa490,
    });

    const steamPoints = new THREE.Points(steamGeo, steamMaterial);
    cupGroup.add(steamPoints);

    // 6. Floating 3D Coffee Beans
    const beanCount = 9;
    const beanMeshes: THREE.Mesh[] = [];

    // Create realistic bean geometry using deformed Sphere
    const createBeanGeometry = () => {
      const geo = new THREE.SphereGeometry(0.24, 24, 18);
      // Scale into bean ratio (kidney oval)
      geo.scale(1.2, 0.75, 0.95);
      const pos = geo.attributes.position;
      // Indent central cleft
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const z = pos.getZ(i);

        // Center line indentation on top surface (y > 0)
        if (Math.abs(z) < 0.06 && y > 0.02) {
          pos.setY(i, y * 0.45);
        }
      }
      geo.computeVertexNormals();
      return geo;
    };

    const beanGeometry = createBeanGeometry();
    const beanMaterial = new THREE.MeshStandardMaterial({
      color: 0x3d2314, // Dark roasted espresso bean
      roughness: 0.4,
      metalness: 0.15,
    });

    const beanOrbitData: {
      radius: number;
      speed: number;
      yBase: number;
      ySpeed: number;
      rotSpeedX: number;
      rotSpeedY: number;
      rotSpeedZ: number;
      angle: number;
    }[] = [];

    for (let i = 0; i < beanCount; i++) {
      const bean = new THREE.Mesh(beanGeometry, beanMaterial);
      const scale = 0.6 + Math.random() * 0.55;
      bean.scale.set(scale, scale, scale);
      bean.castShadow = true;

      const angle = (i / beanCount) * Math.PI * 2 + Math.random() * 0.4;
      const radius = 2.0 + Math.random() * 1.5;
      const yBase = -0.4 + Math.random() * 2.2;

      bean.position.set(
        Math.cos(angle) * radius,
        yBase,
        Math.sin(angle) * radius
      );

      scene.add(bean);
      beanMeshes.push(bean);

      beanOrbitData.push({
        radius,
        speed: 0.003 + Math.random() * 0.004,
        yBase,
        ySpeed: 0.001 + Math.random() * 0.002,
        rotSpeedX: 0.01 + Math.random() * 0.02,
        rotSpeedY: 0.008 + Math.random() * 0.015,
        rotSpeedZ: 0.005 + Math.random() * 0.01,
        angle,
      });
    }

    // 7. Ambient Dust Motes / Gold Flecks
    const dustCount = 60;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 8;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMaterial = new THREE.PointsMaterial({
      size: 0.04,
      color: 0xc5a059,
      transparent: true,
      opacity: 0.45,
    });
    const dustPoints = new THREE.Points(dustGeo, dustMaterial);
    scene.add(dustPoints);

    // Initial position & tilt of cup
    cupGroup.position.set(0.6, -0.65, 0);
    cupGroup.rotation.x = 0.22;
    cupGroup.rotation.y = -0.45;

    // 8. Mouse interaction & parallax tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouse.targetX = (e.clientX / innerWidth - 0.5) * 2;
      mouse.targetY = -(e.clientY / innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Responsive position adjustment for smaller screens
    const updateResponsivePosition = () => {
      if (!container) return;
      const width = container.clientWidth;
      if (width < 768) {
        cupGroup.position.set(0, -0.4, -0.8);
        camera.position.set(0, 1.4, 6.4);
      } else {
        cupGroup.position.set(0.6, -0.65, 0);
        camera.position.set(0, 1.2, 5.8);
      }
    };
    updateResponsivePosition();

    // 9. Animation loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Cup rotation & parallax reaction
      cupGroup.rotation.y += 0.0035; // gentle continuous spin
      cupGroup.rotation.x = 0.22 + mouse.y * 0.15;
      cupGroup.position.x = (container.clientWidth < 768 ? 0 : 0.6) + mouse.x * 0.2;
      cupGroup.position.y = (container.clientWidth < 768 ? -0.4 : -0.65) + Math.sin(time * 1.5) * 0.04 + mouse.y * 0.12;

      // Animate Steam Particles
      const positions = steamGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < steamParticleCount; i++) {
        const speed = steamSpeeds[i];
        positions[i * 3 + 1] += speed.y;
        positions[i * 3] += Math.sin(time * 2 + speed.phase) * 0.003;
        positions[i * 3 + 2] += Math.cos(time * 2 + speed.phase) * 0.003;

        // Reset particle if it rises past top
        if (positions[i * 3 + 1] > 3.0) {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 0.45;
          positions[i * 3] = Math.cos(angle) * radius;
          positions[i * 3 + 1] = 1.38;
          positions[i * 3 + 2] = Math.sin(angle) * radius;
        }
      }
      steamGeo.attributes.position.needsUpdate = true;

      // Orbit Floating Coffee Beans
      beanMeshes.forEach((bean, i) => {
        const data = beanOrbitData[i];
        data.angle += data.speed;

        bean.position.x = Math.cos(data.angle) * data.radius;
        bean.position.z = Math.sin(data.angle) * data.radius;
        bean.position.y = data.yBase + Math.sin(time * 1.2 + i) * 0.22;

        bean.rotation.x += data.rotSpeedX;
        bean.rotation.y += data.rotSpeedY;
        bean.rotation.z += data.rotSpeedZ;
      });

      // Slowly rotate dust motes
      dustPoints.rotation.y = time * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // 10. Resize handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      updateResponsivePosition();
    };

    window.addEventListener('resize', handleResize);

    // 11. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      cupGeometry.dispose();
      ceramicMaterial.dispose();
      goldRimMaterial.dispose();
      handleGeometry.dispose();
      saucerGeometry.dispose();
      liquidGeometry.dispose();
      latteTexture.dispose();
      steamGeo.dispose();
      steamMaterial.dispose();
      beanGeometry.dispose();
      beanMaterial.dispose();
      dustGeo.dispose();
      dustMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      aria-hidden="true"
    />
  );
};
