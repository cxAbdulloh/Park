import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./GridGallery.css";

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  {
    id: 1,
    title: "Playgroun",
    img: "https://images.unsplash.com/photo-1575783970733-1aaedde1db74?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    col: "column-md-4",
  },
  {
    id: 2,
    title: "Bumber Cars",
    img: "https://www.pexels.com/download/video/29765973/",
    col: "column-md-4",
    isVideo: true,
  },
  {
    id: 3,
    title: "Coffee",
    img: "https://centralpark.uz/wp-content/uploads/2023/06/200373095_1178289942632663_1382384699518626120_n.jpg",
    col: "column-md-4",
  },
  {
    id: 4,
    title: "Phone",
    img: "https://www.pexels.com/download/video/35876721/",
    col: "column-md-6",
    isVideo: true
  },
  {
    id: 5,
    title: "Keyboard",
    img: "https://api.zamperla.com/resource/11167",
    col: "column-md-6",
  },
  {
    id: 6,
    title: "Wrist Watch",
    img: "https://www.pexels.com/download/video/13279753/",
    col: "column-xs-12",
    isVideo: true
  },
];

const GridGallery = () => {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "expo.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
            },
            delay: (index % 3) * 0.1,
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e, index) => {
    const hoverText =
      itemsRef.current[index].querySelector(".img-content-hover");
    if (hoverText) {
      const bounds = itemsRef.current[index].getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;

      gsap.to(hoverText, {
        x: x,
        y: y,
        duration: 0.6,
        ease: "power3.out",
      });
    }
  };

  return (
    <div className="portfolio-wrapper" ref={containerRef}>
      <section className="gallery">
        <div className="container">
          <h1 className="gallery-text">Park Attractions</h1>
          <div className="grid">
            {galleryItems.map((item, index) => (
              <div
                key={item.id}
                className={`column-xs-12 ${item.col}`}
                ref={(el) => (itemsRef.current[index] = el)}
                onMouseMove={(e) => handleMouseMove(e, index)}
              >
                <figure className="img-container">
                  {item.isVideo ? (
                    <video
                      src={item.img}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="gallery-video"
                    />
                  ) : (
                    <img src={item.img} alt={item.title} loading="lazy" />
                  )}

                  <figcaption className="img-content">
                    <h2 className="title">{item.title}</h2>
                    <h3 className="category">{item.category}</h3>
                  </figcaption>

                  <span className="img-content-hover">
                    <h2 className="title">{item.title}</h2>
                    <h3 className="category">{item.category}</h3>
                  </span>
                </figure>
              </div>
            ))}
          </div>
          <button className="gallery-btn">
            More
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
        </div>
      </section>
    </div>
  );
};

export default GridGallery;
