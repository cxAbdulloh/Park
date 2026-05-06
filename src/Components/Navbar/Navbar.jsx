import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets.js";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(
    "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1000"
  );

  const menuData = [
    {
      id: 1,
      title: "About the Park",
      img: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1000",
    },
    {
      id: 2,
      title: "Attractions",
      img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000",
    },
    {
      id: 3,
      title: "Events",
      img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000",
    },
    {
      id: 4,
      title: "Cafes & Restaurants",
      img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000",
    },
    {
      id: 5,
      title: "Map",
      img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000",
    },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <img src={assets.nav_logo} className="nav-image" alt="logo" />
          </div>

          <ul className="nav-menu desktop-only">
            <li>
              <a href="/" className="nav-item-link">
                New's <span style={{ fontSize: "15px" }}>⌄</span>
              </a>
            </li>
          </ul>

          <div className="nav-right-section">

            <div className="phone-box desktop-only">
              <div className="phone-display">
                <div className="phone-content-wrapper">
                  <span className="phone-number-bold">+998 71 233 40 16</span>
                  <span className="phone-sub-text">Aventura</span>
                </div>
                <span style={{ fontSize: "14px" }}>⌄</span>
              </div>

              <div className="phone-dropdown-menu">
                <div className="dropdown-list-item">
                  <b>+998 71 233 40 16</b>
                  <span>Telegram</span>
                </div>
                <div className="dropdown-list-item">
                  <b>+998 71 233 40 16</b>
                  <span>Phone</span>
                </div>
                <div className="dropdown-list-item">
                  <b>@centralpark.uz</b>
                  <span>Instagram</span>
                </div>
              </div>
            </div>

            <button className="book-call-btn">
              <span className="btn-text">Book A Call</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>

            <div className="hamburger-trigger" onClick={() => setIsOpen(true)}>
              <span className="menu-label"></span>
              <div className="burger-icon">
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className={`hamburger-overlay ${isOpen ? "open" : ""}`}>
        <div className="overlay-content">
          <div className="overlay-header">
            <img src={assets.nav_logo} className="nav-image" alt="logo" />
            <div className="close-icon" onClick={() => setIsOpen(false)}>
              ✕
            </div>
          </div>

          <div className="overlay-body">
            <div className="overlay-image-side">
              <img src={activeImg} alt="preview" className="fade-img" />
            </div>

            <div className="overlay-links-side">
              {menuData.map((item) => (
                <a
                  key={item.id}
                  href="#"
                  className="overlay-link"
                  onMouseEnter={() => setActiveImg(item.img)}
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
