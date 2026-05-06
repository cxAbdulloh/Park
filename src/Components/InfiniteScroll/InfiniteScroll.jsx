import React from "react";
import "./InfiniteScroll.css";

const InfiniteScroll = () => {
  const images = [
    "https://centralpark.uz/wp-content/uploads/2023/06/click-white.jpg",
    "https://centralpark.uz/wp-content/uploads/2023/06/corn-dog-png.png",
    "https://centralpark.uz/wp-content/uploads/2023/06/final_logo_shef.png",
    "https://centralpark.uz/wp-content/uploads/2023/06/photo_2019-04-04_12-30-54.jpg",
    "https://centralpark.uz/wp-content/uploads/2023/06/snimok-ekrana-2023-06-13-230125.png",
  ];

  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {images.map((logo, index) => (
          <div className="image-card" key={index}>
            <img src={logo} alt="logo" />
          </div>
        ))}

        {images.map((logo, index) => (
          <div className="image-card" key={`copy-${index}`}>
            <img src={logo} alt="logo" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteScroll;
