import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Offer.css";
import { assets } from "../../assets/assets";

import icon1 from "../../assets/icon_1.png";
import icon2 from "../../assets/icon_2.png";
import icon3 from "../../assets/icon_3.png";
import icon4 from "../../assets/icon_4.png";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { id: 1, icon: assets.icon1, label: "New European attractions" },
  { id: 2, icon: assets.icon2, label: "Large playground" },
  { id: 3, icon: assets.icon3, label: "The most fun events" },
  {
    id: 4,
    icon: assets.icon4,
    label: "We work seven days a week from 10:00 to 23:00",
  },
];

export default function Offer({ videoSrc }) {
  const sectionRef = useRef(null);
  const videoWrapRef = useRef(null);
  const titleRef = useRef(null);
  const descRefs = useRef([]);
  const featureRefs = useRef([]);
  const dividerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: "top 80%" };

      gsap.fromTo(
        videoWrapRef.current,
        { x: -80, opacity: 0, scale: 0.95 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: trigger,
        }
      );

      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: trigger,
        }
      );

      gsap.fromTo(
        descRefs.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power2.out",
          stagger: 0.15,
          delay: 0.35,
          scrollTrigger: { ...trigger, start: "top 75%" },
        }
      );

      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.7,
          ease: "power2.inOut",
          delay: 0.5,
          scrollTrigger: { ...trigger, start: "top 70%" },
        }
      );

      gsap.fromTo(
        featureRefs.current,
        { y: 35, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.65,
          ease: "back.out(1.4)",
          stagger: 0.12,
          delay: 0.55,
          scrollTrigger: { ...trigger, start: "top 65%" },
        }
      );

      featureRefs.current.forEach((card) => {
        if (!card) return;
        card.addEventListener("mouseenter", () =>
          gsap.to(card, {
            y: -4,
            scale: 1.03,
            duration: 0.3,
            ease: "power2.out",
          })
        );
        card.addEventListener("mouseleave", () =>
          gsap.to(card, { y: 0, scale: 1, duration: 0.35, ease: "power2.out" })
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="offer-section" ref={sectionRef}>
      <div className="offer-inner">
        <div className="offer-media" ref={videoWrapRef}>
          <video
            className="offer-video"
            src="https://www.pexels.com/ru-ru/download/video/27349945/"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="offer-media-overlay" />
        </div>

        <div className="offer-content">
          <h2 className="offer-title" ref={titleRef}>
            Central Park of <br /> Culture and Leisure
          </h2>

          <p className="offer-desc" ref={(el) => (descRefs.current[0] = el)}>
            Central Park, covering 13 hectares, is divided into two zones:
            active and quiet areas.
          </p>
          <p className="offer-desc" ref={(el) => (descRefs.current[1] = el)}>
            The active zone features 26 rides and a 3,500 square meter
            children's area. Three classic roller coasters are also available.
          </p>
          <p className="offer-desc" ref={(el) => (descRefs.current[2] = el)}>
            The tranquil area features walking paths, benches for relaxing, and
            a children's hedge maze.
          </p>

          <div className="offer-divider" ref={dividerRef} />

          <div className="offer-features">
            {features.map((f, i) => (
              <div
                key={f.id}
                className="offer-feature"
                ref={(el) => (featureRefs.current[i] = el)}
              >
                <img
                  className="offer-feature-icon"
                  src={f.icon}
                  alt={f.label}
                />
                <span className="offer-feature-label">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
