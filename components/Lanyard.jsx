"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useTexture, Environment, Lightformer } from "@react-three/drei";
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from "@react-three/rapier";
import { MeshLine, MeshLineMaterial } from "meshline";
import * as THREE from "three";


const cardPath = "/card.glb";
const lanyardPath = "/lanyard.png";
extend({ MeshLine, MeshLineMaterial });

const fragmentShader = `
precision highp float;
uniform float iTime;
uniform vec2 iResolution;
uniform vec3 gridColor;
uniform float rippleIntensity;
uniform float gridSize;
uniform float gridThickness;
uniform float fadeDistance;
uniform float vignetteStrength;
uniform float glowIntensity;
uniform float opacity;
uniform bool mouseInteraction;
uniform vec2 mousePosition;
uniform float mouseInfluence;
uniform float mouseInteractionRadius;
varying vec2 vUv;
float pi = 3.141592;
void main() { vec2 uv = vUv * 2.0 - 1.0; uv.x *= iResolution.x / iResolution.y; float dist = length(uv); float func = sin(pi * (iTime - dist)); vec2 rippleUv = uv + uv * func * rippleIntensity; if (mouseInteraction && mouseInfluence > 0.0) { vec2 mouseUv = (mousePosition * 2.0 - 1.0); mouseUv.x *= iResolution.x / iResolution.y; float mouseDist = length(uv - mouseUv); float influence = mouseInfluence * exp(-mouseDist * mouseDist / (mouseInteractionRadius * mouseInteractionRadius)); float mouseWave = sin(pi * (iTime * 2.0 - mouseDist * 3.0)) * influence; rippleUv += normalize(uv - mouseUv) * mouseWave * rippleIntensity * 0.3; } vec2 a = sin(gridSize * 0.5 * pi * rippleUv - pi / 2.0); vec2 b = abs(a); vec2 smoothB = smoothstep(0.0, 0.5, b); vec3 color = vec3(0.0); color += exp(-gridThickness * smoothB.x * (0.8 + 0.5 * sin(pi * iTime))); color += exp(-gridThickness * smoothB.y); color += 0.5 * exp(-(gridThickness / 4.0) * sin(smoothB.x)); color += 0.5 * exp(-(gridThickness / 3.0) * smoothB.y); if (glowIntensity > 0.0) { color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.x); color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.y); } float ddd = exp(-2.0 * clamp(pow(dist, fadeDistance), 0.0, 1.0)); vec2 vignetteCoords = vUv - 0.5; float vignetteDistance = length(vignetteCoords); float vignette = 1.0 - pow(vignetteDistance * 2.0, vignetteStrength); vignette = clamp(vignette, 0.0, 1.0); vec3 t = gridColor; float finalFade = ddd * vignette; float alpha = length(color) * finalFade * opacity; gl_FragColor = vec4(color * t * finalFade * opacity, alpha); }`;
const vertexShader = ` varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;

function GridBackground() {
  const materialRef = useRef();
  const mousePosition = useRef({ x: 0.5, y: 0.5 });
  const mouseInfluence = useRef(0);
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.iTime.value = state.clock.getElapsedTime();
      
      const targetInfluence = state.pointer.x === 0 && state.pointer.y === 0 ? 0 : 1;
      mouseInfluence.current += (targetInfluence - mouseInfluence.current) * 0.05;

      mousePosition.current.x += (state.pointer.x * 0.5 + 0.5 - mousePosition.current.x) * 0.1;
      mousePosition.current.y += (state.pointer.y * 0.5 + 0.5 - mousePosition.current.y) * 0.1;

      materialRef.current.uniforms.mouseInfluence.value = mouseInfluence.current;
      materialRef.current.uniforms.mousePosition.value = [mousePosition.current.x, mousePosition.current.y];
    }
  });

  return (
    <mesh position={[0, 0, -20]}>
      <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
      <shaderMaterial
        ref={materialRef}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        transparent={true}
        uniforms={{
          iTime: { value: 0 },
          iResolution: { value: [size.width * (window.devicePixelRatio || 1), size.height * (window.devicePixelRatio || 1)] },
          gridColor: { value: new THREE.Color("#00ffff") },
          rippleIntensity: { value: 0.08 },
          gridSize: { value: 20.0 },
          gridThickness: { value: 15.0 },
          fadeDistance: { value: 1.5 },
          vignetteStrength: { value: 2.0 },
          glowIntensity: { value: 0.1 },
          opacity: { value: 0.4 },
          mouseInteraction: { value: true },
          mousePosition: { value: [0.5, 0.5] },
          mouseInfluence: { value: 0 },
          mouseInteractionRadius: { value: 1.0 },
        }}
      />
    </mesh>
  );
}


export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
}) {
  return (
    <div className="relative z-0 w-full h-screen flex justify-center items-center transform scale-100 origin-center">
      <Canvas
        camera={{ position: position, fov: fov }}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) =>
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
        }
      >
        <GridBackground />
        <ambientLight intensity={Math.PI} />
        <Suspense fallback={null}>
          <Physics gravity={gravity} timeStep={1 / 60}>
            <Band />
          </Physics>
        </Suspense>
        <Environment preset="city" blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 0 }) {
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    card = useRef();
  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();
  const segmentProps = {
    type: "dynamic",
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };
  const { nodes, materials } = useGLTF(cardPath);
  const texture = useTexture(lanyardPath);
  const [curve] = useState(
    () => new THREE.CatmullRomCurve3([ new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3() ])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);
  const [isSmall, setIsSmall] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 1024
  );

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.5, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => void (document.body.style.cursor = "auto");
    }
  }, [hovered, dragged]);

  useEffect(() => {
    const handleResize = () => setIsSmall(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp( ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)) );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      
      band.current.setPoints(curve.getPoints(32));

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = "chordal";
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[-6, 4, 5]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? "kinematicPosition" : "dynamic"}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => ( e.target.releasePointerCapture(e.pointerId), drag(false) )}
            onPointerDown={(e) => ( e.target.setPointerCapture(e.pointerId), drag( new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())) ) )}>
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial map={materials.base.map} map-anisotropy={16} clearcoat={1} clearcoatRoughness={0.15} roughness={0.9} metalness={0.8} />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      
      <mesh>
          <meshLine ref={band} attach="geometry" />
          <meshLineMaterial
            color="#00ffff"
            depthTest={false}
            resolution={isSmall ? [1000, 2000] : [1000, 1000]}
            useMap
            map={texture}
            repeat={[-4, 1]}
            lineWidth={0.5}
          />
      </mesh>
    </>
  );
}