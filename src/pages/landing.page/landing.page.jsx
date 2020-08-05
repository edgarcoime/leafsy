import React from "react";
import "./landing.page.css";


import LandingPageIntro from "../../components/landing-page-intro-component/landing.page.intro";
import LandingFeatures from "../../components/landing.features.component/Landing.features.component";
import AboutUs from "../../components/about-us-component/about.us.component";

function LandingPage() {
    return (
        <div class="background">

        <LandingPageIntro />
        <LandingFeatures />
        <AboutUs />
        </div>
    )
}

export default LandingPage;
