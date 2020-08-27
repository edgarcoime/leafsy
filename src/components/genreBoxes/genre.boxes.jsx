import React from "react";
import CancelIcon from '@material-ui/icons/Cancel';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

function GenreBox({genre, index, removeGenre}) {
    return <div className="card">
        <div id={index} onClick={removeGenre}>

        <h4 id={index}>{genre}</h4>

        </div>
    </div>
}

export default GenreBox;