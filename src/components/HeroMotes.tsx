import { useEffect, useRef } from "react";

/*
 * Golden-hour dust motes drifting over the hero photograph — warm gold with the
 * occasional turquoise fleck, rising slowly with a gentle sway and soft twinkle.
 * Sparse and low-alpha by design so Dorit's photo stays the hero.
 *
 * `three` is dynamically imported inside the effect so it (a) never runs during
 * TanStack Start's server prerender and (b) ships as its own lazy chunk loaded
 * after the photo has already painted. The loop pauses when the hero is
 * offscreen or the tab is hidden, and bails entirely under reduced-motion.
 */

const BOX = { w: 44, h: 16, d: 18 };

const VERT = /* glsl */ `
  uniform float uTime;
  attribute float aRand;
  varying float vTw;
  varying float vRand;

  void main() {
    vec3 p = position;
    p.y = mod(p.y + uTime * (0.22 + aRand * 0.4), ${BOX.h.toFixed(1)}) - ${(BOX.h / 2).toFixed(1)};
    p.x += sin(uTime * 0.22 + aRand * 6.2832) * 0.7;
    vTw = 0.5 + 0.5 * sin(uTime * (0.7 + aRand * 1.5) + aRand * 40.0);
    vRand = aRand;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = (1.4 + aRand * 2.8) * (120.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG = /* glsl */ `
  precision mediump float;
  uniform vec3 uGold;
  uniform vec3 uTurquoise;
  varying float vTw;
  varying float vRand;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float soft = smoothstep(0.5, 0.18, d);
    vec3 col = vRand > 0.92 ? uTurquoise : uGold;
    gl_FragColor = vec4(col, soft * (0.12 + 0.3 * vTw));
  }
`;

export function HeroMotes() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup: (() => void) | undefined;
    let disposed = false;

    (async () => {
      const THREE = await import("three");
      if (disposed || !mountRef.current) return;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
      camera.position.set(0, 0, 20);

      const COUNT = 260;
      const positions = new Float32Array(COUNT * 3);
      const rands = new Float32Array(COUNT);
      for (let i = 0; i < COUNT; i++) {
        positions[i * 3] = (Math.random() - 0.5) * BOX.w;
        positions[i * 3 + 1] = (Math.random() - 0.5) * BOX.h;
        positions[i * 3 + 2] = (Math.random() - 0.5) * BOX.d;
        rands[i] = Math.random();
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("aRand", new THREE.BufferAttribute(rands, 1));

      const mat = new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms: {
          uTime: { value: 0 },
          uGold: { value: new THREE.Color("#FFE9A0") },
          uTurquoise: { value: new THREE.Color("#6EFAFB") },
        },
        transparent: true,
        depthWrite: false,
      });
      scene.add(new THREE.Points(geo, mat));

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = mount;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(mount);

      let raf = 0;
      let visible = true;
      const clock = new THREE.Clock();
      const tick = () => {
        mat.uniforms.uTime.value = clock.getElapsedTime();
        renderer.render(scene, camera);
        if (visible) raf = requestAnimationFrame(tick);
      };

      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting && !document.hidden;
        if (visible) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(tick);
        }
      });
      io.observe(mount);

      const onVis = () => {
        visible = !document.hidden;
        if (visible) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(tick);
        }
      };
      document.addEventListener("visibilitychange", onVis);

      tick();

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        document.removeEventListener("visibilitychange", onVis);
        geo.dispose();
        mat.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return <div className="hero__motes" ref={mountRef} aria-hidden="true" />;
}
