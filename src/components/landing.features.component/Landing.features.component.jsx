import React from "react";

import "./landing.feature.component.css";

import orderImage from "./landing.feature.images/reading.png";
import bookStoreImage from "./landing.feature.images/owner.png";

import smoke from "./landing.feature.images/bamboo.png";

import FeaturesCard from "../landing-features-card/landing.features.card";


let featureStyle = {
    backgroundImage: `url(${smoke})`,
    bacgroundSize: "cover",
    backgroundRepeat: "no-repeat"
    
}

function FeaturesSection() {
    return (
        <div style={featureStyle} className="feature-section">
            <div className="container-fluid">
               {/* creates two colums  */}
                <div className="grid-container">

                    <div className="first-column"></div>
                   
                    {/* the second column */}
                    <div className="features-column">
                        
                        <div className="row row-feature ">
                        
                            <div className="col title-landing">
                                <h1 >Features</h1>
                            </div>
                    

                        </div>



                        <FeaturesCard
                            cardTitle="Organized Tables"
                            cardContent="Lorem ipsum dolor siu. Nulla tristique felis metus, non porttitor sapien sagittis sit amet. In lectus purus, porta a blandit ac, commodo eu augue. Ut vitae pu"
                            imgSRC={bookStoreImage}
                        />

`                       <FeaturesCard
                            cardTitle="Profesional Forms"
                            cardContent="Lorem ipsum dolor siu. Nulla tristique felis metus, non porttitor sapien sagittis sit amet. In lectus purus, porta a blandit ac, commodo eu augue. Ut vitae pu"
                            imgSRC={orderImage}
                        />  


                        
                    </div>

                </div>

            </div>

        </div>
    )
};

export default FeaturesSection;