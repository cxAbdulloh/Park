import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      imageRef.current,
      { scale: 1.2, clipPath: "inset(100% 0% 0% 0%)" },
      {
        scale: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );


    const items = contentRef.current.querySelectorAll(".info-item");
    gsap.from(items, {
      x: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top 80%",
      },
    });
  }, []);

  return (
    <section className="about-section" ref={sectionRef}>
      <div className="about-container">
        <div className="about-image-side">
          <div className="sticky-img-wrapper">
            <img ref={imageRef} src="rasm_manzili.jpg" alt="Central Park" />
          </div>
        </div>

        <div className="about-content-side" ref={contentRef}>
          <h2 className="about-title">MARKAZIY MADANIYAT VA DAM OLISH BOG'I</h2>
          <p className="about-description">
            Central Park 13 000 gektar maydonni egallagan bo'lib, ikki zonaga:
            faol va sokin zonalarga bo'linadi. Bu yerda 26 ta Yevropa
            standartidagi attraksionlar va 3500 kv.m li bolalar maydonchasi
            mavjud.
          </p>

          <div className="info-grid">
            <div className="info-item">
              <div className="info-icon">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div className="info-text">
                <h4>Yevropa attraksionlari</h4>
                <p>Eng xavfsiz va zamonaviy uskunalar</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div className="info-text">
                <h4>3000kv Bolalar maydoni</h4>
                <p>Kichkintoylar uchun maxsus hudud</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div className="info-text">
                <h4>Dam olish kunisiz</h4>
                <p>Har kuni 10:00 dan 23:00 gacha</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
