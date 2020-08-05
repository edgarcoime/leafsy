import React from "react";

import "./registration.confirmation.card.css";

function RegistrationCard(props) {
    return (
        <div className={props.class}>
            <div className="box-container ">
                <div className="image-container">
                    <img src={props.img} className={"regist-card-image " + props.imgClass} />
                </div>

                <div className="box-text">
                    <h3>{props.title}</h3>
                    <p>{props.context}</p>
                </div>

                <div className="box-button">
                    <a href={props.buttonLink}>
                        <button className="btn btn-success regist-button">{props.button}</button>
                    </a>
                </div>
            </div>
        </div>
    )
};

export default RegistrationCard;