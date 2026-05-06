import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import InfiniteScroll from './components/InfiniteScroll/InfiniteScroll';

import Footer from "./components/Footer/Footer.jsx";
import Offer from './components/Offer/Offer.jsx';
import OfferSights from './components/OfferSights/OfferSights.jsx';
import GridGallery from './components/GridGallery/GridGallery.jsx';
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