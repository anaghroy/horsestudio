import Dog from "./components/Dog";
import { Canvas } from "@react-three/fiber";
const App = () => {
  return (
    <>
      <Canvas>
        <Dog />
      </Canvas>
    </>
  );
};

export default App;
