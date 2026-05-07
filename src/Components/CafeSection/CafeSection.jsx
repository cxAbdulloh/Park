import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./CafeSection.css";

const CAFES = [
  {
    id: 1,
    name: "Mari Wellness",
    summary:
      "A premium wellness destination located in Tashkent City Boulevard. Experience a perfect blend of healthy gastronomy and aesthetic pleasure.",
    phone: "+998 71 200 00 00",
    img: "https://lh3.googleusercontent.com/p/AF1QipPMOL6gRwMmqxy_c0ENrwd3PeGQzPRXzQOC0PA5=s1360-w1360-h1020-rw",
  },
  {
    id: 2,
    name: "Shef Burger",
    summary:
      "The highest panoramic restaurant in the city. Enjoy breathtaking views of Tashkent while indulging in high-end international cuisine.",
    phone: "+998 90 123 45 67",
    img: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEMDoFTY0NgJ1Cq11UPHL3gMDdozr8MVG-oQKOQw36wNur32_HNckmLbMOmea0jsczYI-gJZHqoMzPzCtFAq6rjOSyIeON6Ebx9sPOOObkXuDS2rqVg8iegyR2HSlOm8sg6NXx_AdV6Wu-R=s1360-w1360-h1020-rw"
  },
  {
    id: 3,
    name: "Corn Dog",
    summary:
      "Fresh pomegranate elixirs and modern national interior. A cozy haven designed for family gatherings and peaceful afternoons.",
    phone: "+998 95 111 22 33",
    img: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFQjRpPCnU-szVdOSqLmkjpi2RHAs7XPvxOl6QxJPi3TriikOZ-HcTKVed7rhNzMPwmUNbOeUEfqkRA6XAqaZ4dIYsnjyT7jrwvEZmhrEUGUW0tSBlypaQbeUCHPBYU5_QSJNSZTgjIm_E=s1360-w1360-h1020-rw"
  },
  {
    id: 4,
    name: "Avenue 77",
    summary:
      "Modern European bistro with a focus on artisanal coffee and fresh pastries. Perfect for business meetings and casual brunches.",
    phone: "+998 99 444 55 66",
    color: "#f5f5f7",
  },
  {
    id: 5,
    name: "La Mer",
    summary:
      "Exquisite seafood fine-dining. Bringing the Mediterranean atmosphere to the heart of Central Asia with imported fresh ingredients.",
    phone: "+998 71 300 11 22",
    color: "#e0f2f1",
  },
  {
    id: 6,
    name: "The Library",
    summary:
      "A unique conceptual cafe where literature meets gourmet tea. A quiet sanctuary for thinkers, writers, and book lovers.",
    phone: "+998 93 888 77 66",
    color: "#efebe9",
  },
];

const CafeSection = () => {
  const [selected, setSelected] = useState(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (selected) {
      const ctx = gsap.context(() => {
        // Content reveal animation
        gsap.fromTo(
          ".cafe-content-inner",
          { x: -60, opacity: 0, filter: "blur(15px)" },
          {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "expo.out",
          }
        );

        // Image frame animation
        gsap.fromTo(
          ".cafe-image-side",
          { scale: 0.95, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            delay: 0.1,
            ease: "power4.out",
          }
        );
      }, contentRef);

      return () => ctx.revert();
    }
  }, [selected]);

  return (
    <section className="cafe-section">
      <div className="cafe-container">
        {/* LEFT SIDEBAR */}
        <aside className="cafe-sidebar">
          <div className="sidebar-header">
            <span className="sidebar-eyebrow">Selection</span>
            <h3 className="sidebar-title">Explore Cafes</h3>
          </div>
          <div className="cafe-list">
            {CAFES.map((cafe) => (
              <button
                key={cafe.id}
                className={`cafe-tab ${selected?.id === cafe.id ? "active" : ""}`}
                onClick={() => setSelected(cafe)}
              >
                <span className="cafe-tab-num">0{cafe.id}</span>
                <span className="cafe-tab-name">{cafe.name}</span>
                <div className="active-dot" />
              </button>
            ))}
          </div>
        </aside>

        {/* RIGHT CONTENT AREA */}
        <main className="cafe-content" ref={contentRef}>
          {selected ? (
            <div className="cafe-content-inner">
              <div className="cafe-info-side">
                <span className="cafe-category">Premium Spot</span>
                <h2 className="cafe-display-title">{selected.name}</h2>
                <p className="cafe-description">{selected.summary}</p>

                <div className="cafe-action-box">
                  <div className="contact-info">
                    <span className="label">Contact Number</span>
                    <a href={`tel:${selected.phone}`} className="phone-link">
                      {selected.phone}
                    </a>
                  </div>
                  <button className="reserve-btn">Book a table</button>
                </div>
              </div>

              <div className="cafe-image-side">
                <div className="cafe-image-frame">
                  {/* Agar rasm bo'lsa rasmni chiqaradi, bo'lmasa rangli blok chiqaradi */}
                  {selected.img ? (
                    <img
                      src={selected.img}
                      alt={selected.name}
                      className="cafe-real-image"
                    />
                  ) : (
                    <div
                      className="image-placeholder"
                      style={{ backgroundColor: selected.color }}
                    >
                      <div className="glass-overlay">
                        <span>No Image Available</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon"></div>
              <p>Please select a cafe from the list</p>
            </div>
          )}
        </main>
      </div>
    </section>
  );
};

export default CafeSection;
