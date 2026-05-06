import React, { useState, useEffect } from 'react';
import './ScrollToTop.css';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Scroll 300px dan oshganda tugmani ko'rsatish
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Sahifa tepasiga silliq chiqish
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <div className={`scroll-to-top ${isVisible ? 'show' : ''}`} onClick={scrollToTop}>
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
        </div>
    );
};

export default ScrollToTop;