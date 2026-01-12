import Dog from "./components/Dog";
import { Canvas } from "@react-three/fiber";
import Section1 from "./components/Section1";
import Section2 from "./components/Section2";
import Section3 from "./components/Section3";

const App = () => {
  return (
    <>
      <main>
        <Canvas
          style={{
            height: "100vh",
            width: "100vw",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex:1,
            backgroundImage:"url(../src/assets/images/background-l.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <Dog /> {/**Model */}
        </Canvas>
        <Section1 />
        <Section2 />
        <Section3 />
      </main>
    </>
  );
};

export default App;
