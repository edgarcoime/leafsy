 import React from "react";
import "./landing.page.intro.css";
import Nav from 'react-bootstrap/Nav';

import backgroundImage from "./landingPageImages/ricardo-gomez-angel-D3h3jhBWBOs-unsplash.jpg";

const landingStyles = {
    backgroundImage: `url(${backgroundImage})`, 
    backgroundSize: `cover`,
    zIndex: `-1`
};


function LandingPageIntro () {
    return (
        <div style={landingStyles} classsName="card text-center intro-card">
            <div className="card-body-intro">
                <h1 className="card-title">Leafsy</h1>
                
                <p className="intro">Leafsy focuses on helping local bookstores keep organized by providing a standardized system for your order requests and inquiries.</p>
                <a href="/register">
                    <button className="btn btn-success" >Get Started</button>
                </a>
                
                
            </div>
        </div>
    )
};

export default LandingPageIntro;