import { useEffect, useState } from "react";
import "./Hero.css";

const Hero = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // const handleScroll = () => {
    //   setIsScrolled(window.scrollY > 60);
    // };

    const handleScroll = () => {
      const threshold = window.innerHeight * 0.1;
      setIsScrolled(window.scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`hero-container ${isScrolled ? "scrolled" : ""}`}>
      <div className="hero-wrapper">
        <div className="wave-container">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
              fill="white"
            />
          </svg>
        </div>
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
