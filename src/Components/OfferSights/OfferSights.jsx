import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./OfferSights.css";
import { assets } from "../../assets/assets";

const sights = [
  { id: 1, icon: assets.photo_1, count: null, label: "26 European attractions" },
  { id: 2, icon: assets.photo_2, count: null, label: "Large seating area" },
  { id: 3, icon: assets.photo_3, count: null, label: "Lake with swans" },
  {
    id: 4,
    icon: assets.photo_4,
    count: null,
    label: "Children's big town",
  },
];

const OfferSights = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardRefs = useRef([]);
  const iconRefs = useRef([]);
  const countRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: "top 80%" };

   
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
          ease: "expo.out",
          scrollTrigger: trigger,
        }
      );

      gsap.fromTo(
        cardRefs.current,
        { y: 60, opacity: 0, rotateX: 25, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          duration: 0.75,
          ease: "back.out(1.6)",
          stagger: 0.13,
          delay: 0.3,
          scrollTrigger: { ...trigger, start: "top 75%" },
        }
      );

      
      if (countRef.current) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: 26,
          duration: 1.4,
          ease: "power2.out",
          delay: 0.6,
          scrollTrigger: { ...trigger, start: "top 75%" },
          onUpdate: () => {
            if (countRef.current)
              countRef.current.textContent = Math.round(obj.val);
          },
        });
      }


      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const icon = iconRefs.current[i];
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -8,
            scale: 1.04,
            duration: 0.35,
            ease: "power2.out",
          });
          gsap.to(icon, { y: -6, duration: 0.4, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, scale: 1, duration: 0.4, ease: "power2.out" });
          gsap.to(icon, { y: 0, duration: 0.4, ease: "power2.out" });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="sights-section" ref={sectionRef}>
      <div className="sights-inner">
        <h2 className="sights-title" ref={titleRef}>
        What can you see in <br />
        Central Park?
        </h2>

        <div className="sights-grid">
          {sights.map((s, i) => (
            <div
              key={s.id}
              className="sights-card"
              ref={(el) => (cardRefs.current[i] = el)}
            >
              <img
                className="sights-card-icon"
                src={s.icon}
                alt={s.label}
                ref={(el) => (iconRefs.current[i] = el)}
              />
              <p className="sights-card-label">
                {s.count !== null && (
                  <span className="sights-card-count" ref={countRef}>
                    0
                  </span>
                )}
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfferSights;
