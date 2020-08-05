import React from 'react'
import '../App.css'

function Footer() {
    const year = new Date().getFullYear();
    return (
      <footer className="footer">
        <p className="footerText">Copyright ⓒ {year}</p>
      </footer>
    );
  }
  
export default Footer;