import Dog from "./components/Dog";
import { Canvas } from "@react-three/fiber";
import Section1 from "./components/Section1";
import Section2 from "./components/Section2";
import Section3 from "./components/Section3";
import BackgroundAudio from "./components/BackgroundAudio";
import tommorowland from "../src/assets/images/tommorowland.png";
import msi from "../src/assets/images/msi-chicago.png";
import navy from "../src/assets/images/navy-pier.png";
import phone from "../src/assets/images/phone.png";
import kikk from "../src/assets/images/kikk.png";
import kennedy from "../src/assets/images/kennedy.png";
import opera from "../src/assets/images/opera.png";
import Section4 from "./components/Section4";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <main>
        <div className="images">
          <img id="tomorrowland" src={tommorowland} alt="tommorowland" />
          <img id="navy-pier" src={navy} alt="navy" />
          <img id="msi-chicago" src={msi} alt="msi" />
          <img id="phone" src={phone} alt="phone" />
          <img id="kikk" src={kikk} alt="kikk" />
          <img id="kennedy" src={kennedy} alt="kennedy" />
          <img id="opera" src={opera} alt="opera" />
        </div>
        <BackgroundAudio />
        <Canvas
          id="canvas-elem"
          style={{
            height: "100vh",
            width: "100vw",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        >
          <Dog /> {/**Model */}
        </Canvas>
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Footer/>
      </main>
    </>
  );
};

export default App;
