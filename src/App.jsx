import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import InfiniteScroll from "./Components/InfiniteScroll/InfiniteScroll";
import Footer from "./Components/Footer/Footer.jsx";
import Offer from "./Components/Offer/Offer.jsx";
import OfferSights from "./Components/OfferSights/OfferSights.jsx";
import GridGallery from "./Components/GridGallery/GridGallery.jsx";
import Map from "./Components/Map/Map.jsx";

const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Offer />
      <OfferSights />
      <GridGallery />
      <InfiniteScroll />
      <Map />
      <Footer />
    </>
  );
}

export default App;
