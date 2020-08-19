import React from "react";
import Nav from "react-bootstrap/Nav";
import { isLoaded, isEmpty } from "react-redux-firebase"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import "../../../App.css";
import "./Navlinks.css";

// redux-firebase
import { useFirebase } from "react-redux-firebase"

function Navlinks() {
  const history = useHistory();
  const firebase = useFirebase();

  const authObject = useSelector(state => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }))
  const logoutUser = async () => {
    await firebase.auth().signOut();
    history.push("/");
    console.log("User is logged out");
  }

  const approvedUser = () => {
    if (isLoaded(authObject.auth) && !isEmpty(authObject.auth)) {
      let approved = false
      return true
    } else {
      return false
    }
  }

  return (
    <Nav className="ml-auto nav">
      <Nav.Link className={"nav-link"} href="/">
        Home
      </Nav.Link>
      {/* <Nav.Link className={"nav-link"} href="#link">
        Contact Us
      </Nav.Link>
      <Nav.Link className={"nav-link"} href="#aboutUs">
        About Us
      </Nav.Link> */}

      {approvedUser() ? (
        <Nav>
          <Nav.Link className={"nav-link"} href="/book-orders">
            Book Orders
          </Nav.Link>
          <Nav.Link className={"nav-link"} href="/recommendations">
            Recommendations
          </Nav.Link>
          <Nav.Link className={"nav-link"} href="/account">
            My Account
          </Nav.Link>
          <Nav.Link className={"nav-link"} onClick={() => logoutUser() }>Log-out</Nav.Link>
        </Nav>
      ) : (
        <Nav>
          <Nav.Link className={"nav-link"} href="/register">
            Sign-up
          </Nav.Link>
          <Nav.Link className={"nav-link signout"} href="/login">
            Log-in
          </Nav.Link>
        </Nav>
      )}
    </Nav>
  );
}

export default Navlinks;
