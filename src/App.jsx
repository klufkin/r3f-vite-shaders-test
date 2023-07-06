// import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import glslify from 'glslify';
import frag from './frag.glsl';

const fragmentShader = frag;
// const fragmentShader = glslify`
// varying vec2 vUv;

// vec3 colorA = vec3(0.912,0.191,0.652);
// vec3 colorB = vec3(1.000,0.777,0.152);

// void main() {
//   // "Normalizing" with an arbitrary value
//   // We'll see a cleaner technique later :)
//   vec2 normalizedPixel = gl_FragCoord.xy/600.0;
//   vec3 color = mix(colorA, colorB, normalizedPixel.x);

//   gl_FragColor = vec4(color,1.0);
// }
// `;

const vertexShader = glslify`
varying vec2 vUv;

void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
`;

const Fragment = () => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  return (
    <mesh ref={mesh} position={[0, 0, 0]} scale={1.0}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
      />
    </mesh>
  );
};

const position = [0.0, 0.0, 0.7];

const Scene = () => {
  return (
    <>
      <Canvas camera={{ position }}>
        <Fragment />
      </Canvas>
    </>
  );
};

export default Scene;