import React, { useState } from "react";
import CancelIcon from '@material-ui/icons/Cancel';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import "./genre.boxes.css";

function GenreBox({genre, index, onclick}) {

    const [clickedState, setClickedState] = useState(false);

    const clickHandler = (event) => {
        if (onclick) {
            onclick(event);
        } else {
            setClickedState(!clickedState)
        }

        
    }


    return <div onClick={clickHandler} className={clickedState ? "card genre-card-clicked genre-card" : "card genre-card genre-card-unclicked"}>
        <div id={index} >

        <h5 id={index}>{genre}</h5>

        </div>
    </div>
}

export default GenreBox;