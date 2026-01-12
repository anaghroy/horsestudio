import { ChevronRight, Menu } from "lucide-react";
import logo from "../assets/images/LOGO.png";

const Section1 = () => {
  return (
    <section id="section-1">
      <nav>
        <div className="nav-elem">
          <img src={logo} alt="logo" />
        </div>
        <div className="nav-elem">
          <ChevronRight color="#FD4A41" size={18} />
          Our Showreel
        </div>
        <div className="nav-elem">
          <Menu color="#FCFCFC" />
        </div>
      </nav>
      <div className="middle">
        <div className="left">
          <h1>
            We
            <br />
            Make
            <br />
            Good
            <br />
            Shit
          </h1>
        </div>
        <div className="right"></div>
      </div>
      <div className="bottom">
        <div className="left"></div>
        <div className="right">
          <p>
            Horsestudio is a multidisciplinary
            <br /> creative studio at the intersection
            <br /> of art, design and technology.
          </p>
          <span>
            Our goal is to deliver amazing experiences that make
            <br /> people talk, and build strategic value for brands, tech,
            <br /> entertainment, arts & culture.
          </span>
          <div className="links">
            <a href="#">Facebook</a>
            <span>/</span>
            <a href="#">Instagram</a>
            <span>/</span>
            <a href="#">Dribbble</a>
            <span>/</span>
            <a href="#">Twitter</a>
            <span>/</span>
            <a href="#">Newsletter</a>
          </div>
        </div>
      </div>
      <div className="first-line"></div>
      <div className="second-line"></div>
    </section>
  );
};

export default Section1;
