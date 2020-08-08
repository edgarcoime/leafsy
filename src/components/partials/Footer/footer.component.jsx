import React from "react";
import './footer.css'
import copyright from './by-nc-nd.png'
// import PinkLogo from './LEAFSY_LOGO_03.png'

const FooterPage = () => {
  return (
    <div className="footer">
    <p> 
      {/* <img src={PinkLogo} alt="pink book" className="pinkIcon"/>  */}
      Leafsy © {new Date().getFullYear()} 
    <a href="http://creativecommons.org/licenses/by-nc-nd/2.0/ca/" className="licensing"><img src={copyright} className="copyrightIcon"/></a> 
 </p>

  </div>
  );
}

export default FooterPage;