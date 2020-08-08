import React from "react";
import "./landing.page.css";
import Fab from '@material-ui/core/Fab'
import NavigationIcon from '@material-ui/icons/Navigation';



import LandingPageIntro from "../../components/landing-page-intro-component/landing.page.intro";
import LandingFeatures from "../../components/landing.features.component/Landing.features.component";
import AboutUs from "../../components/about-us-component/about.us.component";

function LandingPage() {
    return (
        <div class="background">
<a href="#navbar">
        <Fab variant="extended" className="page-up-icon" >
            <NavigationIcon />
        </Fab>

</a>
        <LandingPageIntro />
        <LandingFeatures />
        <AboutUs />
        </div>
        
    )
}

export default LandingPage;
