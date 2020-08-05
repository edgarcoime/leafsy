import React from "react";
import "./landing.features.card.css";

function FeaturesCard(props) {
    return (
        
        <div className="row row-feature feature-container justify-content-md-center">

            
            <img className="feature-img" src={props.imgSRC} alt="form picture" />
            
            
            

            <div className="card-text">
                <h3>{props.cardTitle}</h3>
                <hr className="card-line"/>
                <p>{props.cardContent}</p>
            </div>

        </div>
    )
};

export default FeaturesCard;