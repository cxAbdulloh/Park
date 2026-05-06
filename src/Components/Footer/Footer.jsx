import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const ROLLER_COASTER_VIDEO =
  "https://videos.pexels.com/video-files/5098089/5098089-hd_1920_1080_30fps.mp4";

const Footer = () => {
  return (
    <footer className="apple-footer">
      <div className="footer-video-wrap" aria-hidden="true">
        <video
          className="footer-video"
          src={ROLLER_COASTER_VIDEO}
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      <div className="footer-container">
        <div className="footer-main-grid">
          <div className="footer-col branding-col">
            <div className="footer-logo">
              <img src={assets.nav_logo} alt="" />
              <span>Central Park</span>
            </div>
            <p className="branding-text">
              Magical relaxation, endless joy — all in one place. Create
              unforgettable moments with your family.
            </p>
          </div>

          <div className="footer-col">
            <h3>Services</h3>
            <ul>
              <li>
                <a href="#">About the Park</a>
              </li>
              <li>
                <a href="#">Attractions</a>
              </li>
              <li>
                <a href="#">Events</a>
              </li>
              <li>
                <a href="#">Cafe & Restaurants</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Contact</h3>
            <ul>
              <li>
                <a href="#">Instagram</a>
              </li>
              <li>
                <a href="#">Telegram</a>
              </li>
              <li>
                <a href="#">YouTube</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>For Questions?</h3>
            <ul className="contact-list">
              <li>+998 71 233 40 16</li>
              <li>@centralpark.uz</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <hr className="footer-divider" />
          <div className="footer-legal">
            <p>© 2026 Central Park. All rights reserved</p>
            <div className="legal-links">
              <span>Uzbekistan</span>
              <span className="dot-separator">•</span>
              <a href="#">Terms of Use</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
