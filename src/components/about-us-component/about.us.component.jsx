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
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce cursus augue ac semper laoreet. Mauris ex urna, hendrerit eget nunc eu, volutpat rutrum ex. Fusce commodo lorem mi, vel gravida orci scelerisque nec. Vestibulum sagittis ultricies magna, eget malesuada felis. Donec tincidunt libero lectus, ac volutpat ante lacinia et. Cras euismod orci risus, in pretium augue sagittis eu. Vivamus tempor blandit congue. Maecenas sapien dui, dignissim nec ex sit amet, facilisis fringilla sapien. Pellentesque velit orci, luctus sit amet aliquam eu, finibus ut lacus. Suspendisse sit amet massa at nisi porta fermentum. Sed commodo est sed nulla cursus ultrices. Phasellus tempor condimentum libero varius vehicula. Nam pellentesque, tellus eget dapibus cursus, quam nunc mollis mi, nec condimentum lectus quam sed ex. Etiam eros tortor, tincidunt et finibus at, blandit sed urna.</p>

                <br />

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce cursus augue ac semper laoreet. Mauris ex urna, hendrerit eget nunc eu, volutpat rutrum ex. Fusce commodo lorem mi, vel gravida orci scelerisque nec. Vestibulum sagittis ultricies magna, eget malesuada felis. Donec tincidunt libero lectus, ac volutpat ante lacinia et. Cras euismod orci risus, in pretium augue sagittis eu. Vivamus tempor blandit congue. Maecenas sapien dui, dignissim nec ex sit amet, facilisis fringilla sapien. Pellentesque velit orci, luctus sit amet aliquam eu, finibus ut lacus. Suspendisse sit amet massa at nisi porta fermentum. Sed commodo est sed nulla cursus ultrices. Phasellus tempor condimentum libero varius vehicula. Nam pellentesque, tellus eget dapibus cursus, quam nunc mollis mi, nec condimentum lectus quam sed ex. Etiam eros tortor, tincidunt et finibus at, blandit sed urna.</p>






            </div>
        </div>
    )
};

export default AboutUsComponent;