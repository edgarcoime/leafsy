import React from "react";
import "./about.us.component.css";
import background from "./images/nordwood-themes-KcsKWw77Ovw-unsplash.jpg";

let aboutStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
    
}


function AboutUsComponent() {
    return (
        <div style={aboutStyle} className="about-background">
            <div className="aboutus-container" id="aboutUs">

                <h2 className="title-landing about-title">About</h2>
                <hr />
                <p>We are computer science students that believe in the importance of local bookstores. We want to help local bookstores maximize their potential by providing an easy and convenient online platform to connect bookstore owners with their customers. 
                Our plan is to provide the edge online bookstores have had over traditional bookstores in the past. Local bookstores will now be easily accessible online. The main focus is to help local bookstores grow together during these times.</p>

                <br />

                <p></p>





            </div>
        </div>
    )
};

export default AboutUsComponent;