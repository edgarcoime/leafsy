import React from "react";
import Navbar from "react-bootstrap/Navbar";
import NavLogo from "./leafsy-nav.png";
import MobileLogo from "./LEAFSY_LOGO_05.png"
import "../../../App.css";
import Navlinks from "./Navlinks";
import "./Navlinks.css";

function leafsyNav(props) {
  return (
    <Navbar className="navbar navbar-light" id="navbar" expand="md">
      <Navbar.Brand className="navbar-brand" href="/">
      <img alt="circular logo leafsy text" src={MobileLogo} className={"mobileLogo"}/>
        <img alt="circular logo reading Leafsy with a book face down " src={NavLogo} className={"leafsyLogo"}/>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Navlinks />
      </Navbar.Collapse>
    </Navbar>
  );
}

export default leafsyNav;
