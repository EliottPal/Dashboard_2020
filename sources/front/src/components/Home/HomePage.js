import React, { useState } from 'react';
import './HomePage.css';
import defaultImg from './../../assets/bg.jpg'

function HomePage(props) {
    var date = new Date();

    return (
        <div className="mainDiv">
            {/* Image configurable par l'user par la suite */}
            <div className="imgCover" style={{ background: `url(${defaultImg})`}}>
                <h1 className="mainTitle">{date.toDateString()}</h1>
            </div>
        </div>
    );
};

export default HomePage;