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
{/*                 <p>We are computer science students that believe in the importance of local bookstores. We want to help local bookstores maximize their potential by providing an easy and convenient online platform to connect bookstore owners with their customers. 
                Our plan is to provide the edge online bookstores have had over traditional bookstores in the past. Local bookstores will now be easily accessible online. The main focus is to help local bookstores grow together during these times.</p>
                
                
                <br /> */}

                <p>We are a team of developers who believes in the importance of supporting local businesses.</p>

                <br />

                <p>We surmised an application to help local bookstores organize and delegate their orders through the use of online forms and tables. This seeks to help businesses without a strong online presence or inventory to transition more conveniently to an informal Enterprise Resource Planning System (ERP).</p>

                <br />

                <p>Our team hopes to provide our partnered bookstores with a platform that gives their customers a more user friendly interaction and gives the stores themselves a more organized and streamlined way to siphon their customer orders.</p>
                





            </div>
        </div>
    )
};

export default AboutUsComponent;