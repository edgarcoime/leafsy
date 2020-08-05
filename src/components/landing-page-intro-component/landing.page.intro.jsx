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
                <h1 className="card-title">Leafsy large text here</h1>
                <p className="intro">Lorem ipsum dolor sit amet, consectetur at ut labore et dolore magna aliqua. Ut enim ad minim veniam,ute irure dolor in reprehenderit in voluptat.</p>
                <Nav.Link className={"nav-link"} href="/register">
                    <button className="btn btn-success" >Get Started</button>
                </Nav.Link>
                
                
            </div>
        </div>
    )
};

export default LandingPageIntro;