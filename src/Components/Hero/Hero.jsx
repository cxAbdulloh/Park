import { useEffect, useState } from "react";
import "./Hero.css";

const Hero = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`hero-container ${isScrolled ? "scrolled" : ""}`}>
      <div className="hero-wrapper">
        <div className="left-panel">
          <div className="left-top-content">
            <div className="badge">SINCE 1934</div>
            <p className="hero-description">
              Experience the magic of Tashkent's most iconic leisure
              destination. Where memories are made and fun never ends.
            </p>
          </div>

          <div className="left-bottom-content">
            <div className="stat-box">
              <span className="stat-num">40+</span>
              <span className="stat-desc">Unique Attractions</span>
            </div>
            <div className="circle-text-wrapper">
              <div className="explore-circle">
                <span className="arrow-down">↓</span>
              </div>
            </div>
          </div>
        </div>

        <div className="right-panel">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="hero-video"
            src="https://www.pexels.com/ru-ru/download/video/14367734/"
          />
        </div>

        <h1 className="main-title">
          <span>Central Park</span>
          <span className="italic-text">Family & </span>
          <span className="italic-text-bottom">Entertainment</span>
        </h1>
      </div>
    </div>
  );
};

export default Hero;
