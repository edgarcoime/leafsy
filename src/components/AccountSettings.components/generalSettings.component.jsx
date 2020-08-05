import React, { useState } from 'react'
import './account.css'

function GeneralSettings({updateProfile, currentUser}) {

    const [storeInfo, setStoreInfo] = useState({
        storeName: currentUser.storeName,
        storeAddress: currentUser.storeAddress,
        deliveryRadius: currentUser.deliveryRadius
    })


    function handleChange(event) {
        const { name, value } = event.target;
        setStoreInfo((prevSetting) => {
          return {
            ...prevSetting,
            [name]: value,
          };
        });
      }
    
    const submitSettings = (event) => {
        event.preventDefault();
        updateProfile(storeInfo)
    }

    const [copied, setCopied] = useState("");


    const copyButton = (event) => {
        event.preventDefault();
        navigator.clipboard.writeText("http://localhost:3000/form/" + currentUser.token.claims.user_id);
        setCopied("Copied!");
        setTimeout(() => {setCopied("")}, 5000);
    }

    return (
  
            <div class="col-md-9">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <h4>Edit Information</h4>
                                <hr/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <form>
                               
                                  <div class="form-group row">
                                    <label for="storeName" class="col-4 col-form-label">Store Name</label> 
                                    <div class="col-8">

                                      <input id="name"
                                       name="storeName" 
                                       value={storeInfo.storeName} 
                                       className="form-control here" 
                                       type="text" 
                                       onChange={handleChange}
                                       />

                                    </div>
                                  </div>
                                  <div class="form-group row">
                                    <label for="storeAddress" class="col-4 col-form-label">Store Address</label> 
                                    <div class="col-8">

                                      <input id="autocomplete"
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
                                    <label for="distance" class="col-4 col-form-label">Delivery Radius (km)</label> 
                                    <div class="col-8">
                                      <input 
                                      id="name" 
                                      name="deliveryRadius" 
                                      placeholder={storeInfo.deliveryRadius ? storeInfo.deliveryRadius : "Enter delivery radius" }
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
                                    
                                    </label>

                                    <div class="col-8">
                                      <input 
                                      className="form-control here disabledLink" 
                                      value={"http://localhost:3000/form/" + currentUser.token.claims.user_id} 
                                      id="formLink" 
                                      readonly="readonly" />
                                    
                                      
                                    </div>
                                  </div>

                                  <div class="form-group row">
                                    <div class="col-4"></div>
                                    <div class="col-8 btn-group">
                                          
                                      <button 
                                        className="btn btn-outline-secondary copyButton" 
                                        onClick={copyButton}>
                                            Copy Link
                                        </button>  

                                        <a 
                                        href={"http://localhost:3000/form/" + currentUser.token.claims.user_id}
                                        className="btn btn-outline-info view-form">
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

    
    )
}

export default GeneralSettings