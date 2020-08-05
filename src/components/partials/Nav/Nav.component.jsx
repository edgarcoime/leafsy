import React from "react";
import Navbar from "react-bootstrap/Navbar";
import logo from "./bookstore.png";
import "../../../App.css";
import Navlinks from "./Navlinks";
import "./Navlinks.css";

function leafsyNav(props) {
  return (
    <Navbar className="navbar navbar-light" expand="md">
      <Navbar.Brand className="navbar-brand" href="#home">
        {/* <img src={logo} className={"leafsyLogo"}/> */}Leafsy
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Navlinks />
      </Navbar.Collapse>
    </Navbar>
  );
}

export default leafsyNav;
