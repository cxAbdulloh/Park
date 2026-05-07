import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./FaqSection.css";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  {
    num: "40+",
    label: "Attractions",
    bg: "#e8f3fb",
    num_c: "#2a86c8",
    sub_c: "#5aaee0",
  },
  {
    num: "1934",
    label: "Founded",
    bg: "#fdf0e8",
    num_c: "#c87c2a",
    sub_c: "#e0a85a",
  },
  {
    num: "90+",
    label: "Years of joy",
    bg: "#edf8ee",
    num_c: "#2aaa44",
    sub_c: "#5abf6e",
  },
  {
    num: "50K",
    label: "Visitors/day",
    bg: "#f3e8fb",
    num_c: "#8a2ac8",
    sub_c: "#b45ae0",
  },
  {
    num: "24+",
    label: "Food spots",
    bg: "#fdf5e8",
    num_c: "#c8a02a",
    sub_c: "#e0c45a",
  },
  {
    num: "3ha",
    label: "Park area",
    bg: "#e8fbf8",
    num_c: "#2ab0a0",
    sub_c: "#5ad0c2",
  },
];

const FAQS = [
  {
    q: "Is the park entrance free?",
    a: "Yes — entry to the park is completely free of charge. Fees only apply to rides and additional services inside.",
  },
  {
    q: "How much do the attractions cost?",
    a: "Prices range from approximately 15,000 to 40,000 UZS (extreme rides may cost more). Payments are made via the park's dedicated card.",
  },
  {
    q: "What is available for children?",
    a: "There are numerous rides, outdoor playgrounds, sandboxes, and live performances featuring fairy-tale characters. Sweet stalls and ice cream kiosks are also spread throughout the grounds.",
  },
  {
    q: "Are there places to eat?",
    a: "Yes — the park has a variety of cafés and fast-food outlets. You can find coffee, ice cream, burgers, and traditional Uzbek dishes.",
  },
  {
    q: "Is there parking available?",
    a: "A paid car park is located near the main entrance. On weekends and public holidays it fills up quickly, so public transport is recommended.",
  },
  {
    q: "What makes this park special?",
    a: "Centuries-old plane trees keep the park cool even on the hottest summer days. The European-style landscape design makes it a perfect spot for photos. Quiet alleys away from the rides are ideal for reading or a leisurely stroll.",
  },
];


const FaqItem = ({ item, index, isOpen, onToggle }) => (
  <div
    className={`faq-item${isOpen ? " faq-item-open" : ""}`}
    onClick={onToggle}
    data-faq-item
  >
    <div className="faq-item-head">
      <span className="faq-item-num">0{index + 1}</span>
      <span className="faq-item-q">{item.q}</span>
      <span className="faq-item-icon" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M3 6l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
    <div className="faq-item-body">
      <p className="faq-item-a">{item.a}</p>
    </div>
  </div>
);

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const statsRef = useRef(null);
  const dividerRef = useRef(null);
  const listRef = useRef(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const ease = "power3.out";

      gsap.from(eyebrowRef.current, {
        scrollTrigger: { trigger: eyebrowRef.current, start: "top 88%" },
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease,
      });

      const lines = titleRef.current.querySelectorAll(".faq-title__line");
      gsap.from(lines, {
        scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
        y: "105%",
        opacity: 0,
        duration: 0.9,
        stagger: 0.13,
        ease: "power4.out",
      });

      gsap.from(subtitleRef.current, {
        scrollTrigger: { trigger: subtitleRef.current, start: "top 88%" },
        y: 16,
        opacity: 0,
        duration: 0.7,
        delay: 0.1,
        ease,
      });

      const cards = statsRef.current.querySelectorAll(".faq-stat-card");
      gsap.from(cards, {
        scrollTrigger: { trigger: statsRef.current, start: "top 86%" },
        y: 40,
        opacity: 0,
        scale: 0.88,
        duration: 0.6,
        stagger: 0.08,
        ease: "back.out(1.6)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="faq-section" ref={sectionRef}>
      <div className="faq-inner">
        <div className="faq-header">
          <p className="faq-eyebrow" ref={eyebrowRef}>
            Central Park · Tashkent
          </p>

          <h2 className="faq-title" ref={titleRef}>
            <span className="faq-title-wrap">
              <span className="faq-title-line">Frequently asked</span>
            </span>
            <span className="faq-title-wrap">
              <em className="faq-title-line">questions</em>
            </span>
          </h2>

          <p className="faq-subtitle" ref={subtitleRef}>
            Tashkent's most beloved leisure destination since 1934.
          </p>
        </div>

        <div className="faq-stats" ref={statsRef}>
          {STATS.map((s) => (
            <div
              key={s.label}
              className="faq-stat-card"
              style={{ background: s.bg }}
            >
              <span className="faq-stat-card-num" style={{ color: s.num_c }}>
                {s.num}
              </span>
              <span className="faq-stat-card-label" style={{ color: s.sub_c }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <div className="faq-divider" ref={dividerRef} />

        <div className="faq-list" ref={listRef}>
          {FAQS.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
