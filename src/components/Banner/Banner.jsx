import React from 'react';
import '../../styles/Banner.css';

const Banner = () => (
    <div className="banner">
        <img
            src="/assets/banner/last-bot-banner.png"
            alt="Last Bot Banner"
            style={{ width: '100%', height: 'auto', borderRadius: '8px', borderColor: '#333', borderWidth: '4px', borderStyle: 'solid', boxShadow: '0 0 20px rgba(0,0,0,0.3)'}}
        />
    </div>
);

export default Banner;