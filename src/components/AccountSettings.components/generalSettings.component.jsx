import React, { useState } from "react";
import "./account.css";
import Popover from "../partials/Popover/popover.component";
import { Alert } from "@material-ui/lab";

function GeneralSettings({ updateProfile, currentUser }) {
  const [storeInfo, setStoreInfo] = useState({
    storeName: currentUser.storeName,
    storeWebsite: currentUser.storeWebsite,
    storeAddress: currentUser.storeAddress,
    deliveryRadius: currentUser.deliveryRadius,
    
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setStoreInfo((prevSetting) => {
      return {
        ...prevSetting,
        [name]: value,
      };
    });
  }

  const [updateStatus, setUpdateStatus] = useState(false);

  const submitSettings = (event) => {
    event.preventDefault();
    
    const parsedInfo = { ...storeInfo }
    console.log(parsedInfo)

    // sets a default delivery radius of 100 if user leaves it blank/em0pty/null
    if (!storeInfo.deliveryRadius) {
      parsedInfo.deliveryRadius = 100;
    } else {
      parsedInfo.deliveryRadius = parseInt(storeInfo.deliveryRadius);
    };

    // updates the backend of the user
    updateProfile(parsedInfo);

    setUpdateStatus(true);
    setTimeout(() => {
      setUpdateStatus(false);
    }, 5000);

  };

  const [copied, setCopied] = useState("");

  const copyButton = (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(
      "https://www.leafsy.ca/form/" + currentUser.token.claims.user_id
    );

    setCopied("Copied!");
    setTimeout(() => {
      setCopied("");
    }, 5000);
  };

  const clickhandler = (e) => {
    e.preventDefault()
  }

  return (
    <div class="col-md-9">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-md-12">
              <h4>Edit Information</h4>
              {updateStatus && <Alert severity="success">Profile updated successfully!</Alert>}
              <hr />
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <form onSubmit={clickhandler}>
                <div class="form-group row">
                  <label for="storeName" class="col-4 col-form-label">
                    Business Name          
                    <Popover title="Business Name" content="Personalize your forms by entering your business name here. This will appear on all pages your customers interact with to let them know this is your store." />
                  </label>
                  <div class="col-8">
                    <input
                      id="name"
                      name="storeName"
                      value={storeInfo.storeName}
                      className="form-control here"
                      type="text"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label for="storeWebsite" class="col-4 col-form-label">
                    Business URL  
                    <Popover title="Business Url" content="Copy and paste a URL link here. This link allows your customers to navigate back to whatever url you wish at anytime they are on our site. (e.g. https://www.example.com)" />
                  </label>
                  <div class="col-8">
                    <input
                      id="name"
                      name="storeWebsite"
                      value={storeInfo.storeWebsite}
                      className="form-control here"
                      type="text"
                      onChange={handleChange}
                    />
                  </div>
                </div>               

                <div class="form-group row">
                  <label for="storeAddress" class="col-4 col-form-label">
                    Business Address  
                    <Popover title="Business Address" content="Enter an address so your customers can see where you are located. This address is also used by our distance calculator to check to see if the customer's address is within a certain radius to your business. (e.g. 1234 example st., Vancouver, BC, A1A 1A1)" />
                  </label>
                  <div class="col-8">
                    <input
                      id="autocomplete"
                      name="storeAddress"
                      value={storeInfo.storeAddress}
                      class="form-control here"
                      type="text"
                      onChange={handleChange}
                    />

                    {/* <img src="/images/google.png" id="google" /> */}
                  </div>
                </div>

                <div class="form-group row">
                  <label for="distance" class="col-4 col-form-label">
                    Delivery Radius (km)  
                    <Popover  title="Delivery Radius" content="Enter a positive number to represent how many kilometers away you are willing to deliver to. If you don't want to have a delivery option enter 0 as your delivery radius. If you don't want to have a limit on delivery enter 10000. Our system will calculate the distance between your business address and the customer's address to only allow the customers that are within the radius to choose the delivery option." />
                  </label>
                  <div class="col-8">
                    <input
                      id="name"
                      name="deliveryRadius"
                      placeholder={
                        storeInfo.deliveryRadius
                          ? storeInfo.deliveryRadius
                          : "Enter delivery radius"
                      }
                      className="form-control here"
                      type="text"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-4 col-form-label">
                    Form URL
                    <i id="copied">{copied}</i>
                    <Popover title="Form URL" content="Press on the 'Copy Link' button to copy the URL for your account's order form or view it by pressing the 'View Form' button. You can place the URL on your own website for your customers to access." />
                 
                  </label>

                  <div class="col-8">
                    <input
                      className="form-control here disabledLink"
                      value={
                        "https://www.leafsy.ca/form/" +
                        currentUser.token.claims.user_id
                      }
                      id="formLink"
                      readonly="readonly"
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <div class="col-4"></div>
                  <div class="col-8 btn-group">
                    <button
                      className="btn btn-outline-secondary copyButton"
                      onClick={copyButton}
                    >
                      Copy Link
                    </button>

                    <a
                      href={
                        "/form/" +
                        currentUser.token.claims.user_id
                      }
                      className="btn btn-outline-info view-form"
                    >
                      View Form
                    </a>
                  </div>
                </div>

                <div class="form-group row">
                  <div class="offset-4 col-8">
                    <button
                      name="submit"
                      onClick={submitSettings}
                      className="btn btn-primary"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralSettings;
