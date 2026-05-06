import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import InfiniteScroll from './components/InfiniteScroll/InfiniteScroll';
import Footer from "./Components/Footer/Footer.jsx";
import Offer from './Components/Offer/Offer.jsx';
import OfferSights from './Components/OfferSights/OfferSights.jsx';
import GridGallery from './Components/GridGallery/GridGallery.jsx';
import Map from './Components/Map/Map.jsx';

function App() {
    return (
        <div className="App">
            <Navbar />
            <Hero />
            <Offer/>
            <OfferSights/>
            <GridGallery/>
            <InfiniteScroll />
            <Map/>
            <Footer/>
     
        </div>
    );
}

export default App;