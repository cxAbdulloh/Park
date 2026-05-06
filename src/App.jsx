import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import InfiniteScroll from './components/InfiniteScroll/InfiniteScroll';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Footer from "./Components/Footer/Footer.jsx";
import Offer from './Components/Offer/Offer.jsx';
import OfferSights from './Components/OfferSights/OfferSights.jsx';
import GridGallery from './Components/GridGallery/GridGallery.jsx';

function App() {
    return (
        <div className="App">
            <Navbar />
            <Hero />
            <Offer/>
            <OfferSights/>
            <GridGallery/>
            <InfiniteScroll />
            <Footer/>
            {/*<ScrollToTop />*/}
        </div>
    );
}

export default App;