import React from "react";

function GenreBox({genre, index}) {
    return <div className="card">
        <div>
        <h4 id={index}>{genre}{index}</h4>

        </div>
    </div>
}

export default GenreBox;