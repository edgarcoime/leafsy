import React from "react"

import "./registration.confirmation.css"
import image from "./images/screen-post-2x2zO3L1sBE-unsplash.jpg";
import Card from "../../components/registration-confirmation-card/registration-confirmation-card";

import image1 from "./images/logo-green-transparent.png";
import image2 from "./images/logo-darkgreen-book.png";
import image3 from "./images/logo-pink-transparent.png";




function Registrationconfirmation() {
    return (
        <div className="regist-bg">
            <div className="regist-heading">
                <h1 className="regist-title">Thank you for registering!</h1>
            
                
                         
            
            </div>

            <div className="regist-row-container">
                <div className="regist-card-container">
                
                    
                    <Card 
                    title="My Account"
                    context="Get started by updating your account information!"
                    img={image1}
                    link="/account"
                    class="regist-card-box"
                    button="Account"
                    buttonLink="/account"
                    imgClass="img-one"
                    />
                    
                    <Card 
                    title="Recommendations Table"
                    context="Familiarize yourself with the features on the recommendation table."
                    img={image2}
                    link="/account"
                    class="regist-card-box"
                    button="Recommendations"
                    buttonLink="/recommendations"
                    imgClass="img-two"

                    />
                    
                    <Card 
                    title="Book Orders Table"
                    context="If your customer is looking for something specific, it'll appear here."
                    img={image3}
                    link="/account"
                    class="regist-card-box"
                    button="Book Orders"
                    buttonLink="/book-orders"
                    imgClass="img-three"
                    />
                
                </div>
            </div>

        </div>
    )
};

export default Registrationconfirmation