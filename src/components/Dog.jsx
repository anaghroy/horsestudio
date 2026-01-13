import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
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
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import tex1 from "../assets/images/matcap/mat-1.png";
import tex2 from "../assets/images/matcap/mat-2.png";
import tex3 from "../assets/images/matcap/mat-3.png";
import tex4 from "../assets/images/matcap/mat-4.png";
import tex5 from "../assets/images/matcap/mat-5.png";
import tex6 from "../assets/images/matcap/mat-6.png";
import tex7 from "../assets/images/matcap/mat-7.png";
import tex8 from "../assets/images/matcap/mat-8.png";
import tex9 from "../assets/images/matcap/mat-9.png";
import tex10 from "../assets/images/matcap/mat-10.png";
import tex11 from "../assets/images/matcap/mat-11.png";
import tex12 from "../assets/images/matcap/mat-12.png";
import tex13 from "../assets/images/matcap/mat-13.png";
import tex14 from "../assets/images/matcap/mat-14.png";
import tex15 from "../assets/images/matcap/mat-16.png";
import tex16 from "../assets/images/matcap/mat-16.png";
import tex17 from "../assets/images/matcap/mat-17.png";
import tex18 from "../assets/images/matcap/mat-18.png";
import tex19 from "../assets/images/matcap/mat-19.png";
import tex20 from "../assets/images/matcap/mat-20.png";

const Dog = () => {
  /*GSAP Animations*/
  gsap.registerPlugin(useGSAP());
  gsap.registerPlugin(ScrollTrigger);

  // Load the GLB horse model using drei's GLTF loader
  const model = useGLTF(horse);

  // Access and configure the Three.js camera and renderer
  useThree(({ camera, scene, gl }) => {
    // Position the camera so the horse is visible on load
    camera.position.z = 2.3;
    camera.position.y = 0.5;
    camera.position.x = 0.1;
  });

  /*Animation*/
  const { actions } = useAnimations(model.animations, model.scene);
  useEffect(() => {
    actions["HorseALL_IdleEars"].play();
  }, [actions]);

  // Load normal map and matcap textures together
  // useTexture returns an array because we pass an array of URLs
  const [normalMap] = useTexture([dog]).map((texture) => {
    // Required fixes for GLTF textures
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  });

  /**Selection of an "Horses" objects */
  const targetNames = ["Object_"];

  const [
    mat1,
    mat2,
    mat3,
    mat4,
    mat5,
    mat6,
    mat7,
    mat8,
    mat9,
    mat10,
    mat11,
    mat12,
    mat13,
    mat14,
    mat15,
    mat16,
    mat17,
    mat18,
    mat19,
    mat20,
  ] = useTexture([
    tex1,
    tex2,
    tex3,
    tex4,
    tex5,
    tex6,
    tex7,
    tex8,
    tex9,
    tex10,
    tex11,
    tex12,
    tex13,
    tex14,
    tex15,
    tex16,
    tex17,
    tex18,
    tex19,
    tex20,
  ]).map((texture) => {
    // Required fixes for GLTF textures
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  });

  /*Referance Material*/

  const material = useRef({
    uMatcap1: { value: mat1 },
    uMatcap2: { value: mat2 },
    uProgress: { value: 1.0 },
  });

  const horseMaterial = new THREE.MeshMatcapMaterial({
    normalMap: normalMap, // Normal map for surface detail
    matcap: mat2, // Matcap texture for lighting look
  });

  /*Shader function*/
  function onBeforeCompile(shader) {
    shader.uniforms.uMatcapTexture1 = material.current.uMatcap1;
    shader.uniforms.uMatcapTexture2 = material.current.uMatcap2;
    shader.uniforms.uProgress = material.current.uProgress;

    // Store reference to shader uniforms for GSAP animation

    shader.fragmentShader = shader.fragmentShader.replace(
      "void main() {",
      `
        uniform sampler2D uMatcapTexture1;
        uniform sampler2D uMatcapTexture2;
        uniform float uProgress;

        void main() {
        `
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      "vec4 matcapColor = texture2D( matcap, uv );",
      `
          vec4 matcapColor1 = texture2D( uMatcapTexture1, uv );
          vec4 matcapColor2 = texture2D( uMatcapTexture2, uv );
          float transitionFactor  = 0.2;
          
          float progress = smoothstep(uProgress - transitionFactor,uProgress, (vViewPosition.x+vViewPosition.y)*0.5 + 0.5);

          vec4 matcapColor = mix(matcapColor2, matcapColor1, progress );
        `
    );
  }
  horseMaterial.onBeforeCompile = onBeforeCompile;

  // Traverse through every object in the model scene
  model.scene.traverse((child) => {
    if (child.isMesh && targetNames.some((name) => child.name.includes(name))) {
      // Apply a Matcap material for stylized shading;
    }

    child.material = horseMaterial;
  });

  /*Ref hook*/
  const horseModel = useRef(model);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-1",
        endTrigger: "#section-3",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    tl.to(horseModel.current.scene.position, {
      z: "-=0.5",
      y: "+=0.1",
    })
      .to(horseModel.current.scene.rotation, {
        y: `-=${Math.PI / 15}`,
      })
      .to(
        horseModel.current.scene.rotation,
        {
          y: `-=${Math.PI}`,
        },
        "third"
      )
      .to(
        horseModel.current.scene.position,
        {
          x: "-=0.1",
          z: "+=0.2",
          y: "-=0.05",
        },
        "third"
      );
  }, []);

  useEffect(() => {
    document
      .querySelector(`.title[img-title="tomorrowland"]`)
      .addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mat19;
        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 0.3,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });
    document
      .querySelector(`.title[img-title="navy-pier"]`)
      .addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mat8;
        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 0.3,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });
    document
      .querySelector(`.title[img-title="msi-chicago"]`)
      .addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mat9;
        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 0.3,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });
    document
      .querySelector(`.title[img-title="phone"]`)
      .addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mat12;
        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 0.3,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });
    document
      .querySelector(`.title[img-title="kikk"]`)
      .addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mat10;
        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 0.3,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });
    document
      .querySelector(`.title[img-title="kennedy"]`)
      .addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mat8;
        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 0.3,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });
    document
      .querySelector(`.title[img-title="opera"]`)
      .addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mat13;
        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 0.3,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });
    document.querySelector(`.titles`).addEventListener("mouseleave", () => {
      material.current.uMatcap1.value = mat2;
      gsap.to(material.current.uProgress, {
        value: 0.0,
        duration: 0.3,
        onComplete: () => {
          material.current.uMatcap2.value = material.current.uMatcap1.value;
          material.current.uProgress.value = 1.0;
        },
      });
    });
  }, []);
  return (
    <>
      <primitive
        object={model.scene}
        position={[0, -0.5, 0.8]}
        rotation={[0, -Math.PI / 1, 0]}
      />
      <directionalLight position={[0, 5, 5]} color={0xffffff} intensity={10} />
      {/* <OrbitControls position={[0, -0.6, 0.8]}/> */}
      {/* <boxGeometry args={[1, 1, 1]} />  */}
      {/*Height, width, depth*/}
    </>
  );
};

export default Dog;
