import { Canvas, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import {
  OrbitControls,
  useGLTF,
  useTexture,
  useAnimations,
} from "@react-three/drei";
import horse from "../model/horse.glb";
import dog from "../assets/images/dog_normals.jpg";
import bodycolor from "../assets/images/matcap/mat-2.png";
import * as THREE from "three";

const Dog = () => {
  // Load the GLB horse model using drei's GLTF loader
  const model = useGLTF(horse);

  // Access and configure the Three.js camera and renderer
  useThree(({ camera, scene, gl }) => {
    // Position the camera so the horse is visible on load
    camera.position.z = 1.9;
    camera.position.y = 1;
    camera.position.x = 0.9;
  });

  /*Animation*/
  const { actions } = useAnimations(model.animations, model.scene);
  useEffect(() => {
    actions["HorseALL_IdleEars"].play();
  }, [actions]);

  // Load normal map and matcap textures together
  // useTexture returns an array because we pass an array of URLs
  const [normalMap, sampleMatCap] = useTexture([dog, bodycolor]).map(
    (texture) => {
      // Required fixes for GLTF textures
      texture.flipY = false;
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    }
  );

  /**Selection of an "Horses" objects */
  const targetNames = ["Object_", "Horse_Horse_0", "Hair_Hair_0"];

  const horseMaterial = new THREE.MeshMatcapMaterial({
    normalMap: normalMap, // Normal map for surface detail
    matcap: sampleMatCap, // Matcap texture for lighting look
  });

  // Traverse through every object in the model scene
  model.scene.traverse((child) => {
    if (child.isMesh && targetNames.some((name) => child.name.includes(name))) {
      // Apply a Matcap material for stylized shading;
    }

    child.material = horseMaterial;
  });

  return (
    <>
      <primitive
        object={model.scene}
        position={[0, -0.6, 0.8]}
        rotation={[0, -Math.PI / 1, 0]}
      />
      <directionalLight position={[0, 5, 5]} color={0xffffff} intensity={10} />
      <OrbitControls />
      {/* <boxGeometry args={[1, 1, 1]} />  */}
      {/*Height, width, depth*/}
    </>
  );
};

export default Dog;
