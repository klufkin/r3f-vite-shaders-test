// import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import glslify from 'glslify';
import frag from './frag.glsl';

const fragmentShader = frag;

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

const CustomShader = {
  vertexShader,
  fragmentShader,
};

const Fragment = () => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  return (
    <mesh ref={mesh} position={[0, 0, 0]} scale={1.0}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial args={[CustomShader]} />
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
