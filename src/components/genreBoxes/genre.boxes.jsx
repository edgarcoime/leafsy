import React, { useState } from "react";
import CancelIcon from '@material-ui/icons/Cancel';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import "./genre.boxes.css";

function GenreBox({genre, index, onclick, clickedGenre}) {

    const [clickedState, setClickedState] = useState(clickedGenre ? clickedGenre.includes(genre) : false);
 

    const clickHandler = (event) => {
        // if there is a function prop, then run the function 
        if (onclick) {

            onclick(event);

        } else {

            // if there is not a functino prop, then change the state of the component as well as the class
            setClickedState(!clickedState)
        }
    }

    // changing the state of the genre-card-clicked allows the recommendation form to retrieve all the genres the user chooses
    return <div onClick={clickHandler} className={clickedState ? "card genre-card-clicked genre-card" : "card genre-card genre-card-unclicked"}>
        <div id={index} >

        <h5 id={index}>{genre}</h5>

        </div>
    </div>
}

export default GenreBox;