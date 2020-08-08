import React, { useState } from 'react'
import GeneralSettings from '../../components/AccountSettings.components/generalSettings.component'
import SecuritySettings from '../../components/AccountSettings.components/securitySettings.component'
import "./accountSettings.css"

// MUI imports
import CircularProgress from "@material-ui/core/CircularProgress"

// firebase Redux
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";

export default function ProfilePage() {
  const firestore = useFirestore(); // Update user profile

  const currentUser = useSelector(state => (state.firebase.profile))


  // Checks to see if profile exists
  const isFullyLoaded = () => {
    if (!currentUser.isEmpty && currentUser.isLoaded) {
      return true
    } else {
      return false
    }
  }


  // Update User profile
  const updateProfile = async (newProfile) => {
    const userId = currentUser.token.claims.user_id
    let parsedProfile = { ...newProfile };
    // if (newProfile.deliveryRadius !== Number) {
    //   parsedProfile = { ...newProfile, deliveryRadius: 100 };
    // } else {
    //   parsedProfile = { ...newProfile };
    // };
    const response = await firestore
      .collection("users")
      .doc(userId)
      .update(parsedProfile);
    console.log(parsedProfile);
    
  }

  const [menu, setToggle] = useState(true);

  const generalSettings = () => {
    setToggle(true);
  }

  const securitySettings = () => {
    setToggle(false);
  }


  return isFullyLoaded() ? (
    <>
        <div className="container window account">
        <div className="row">
            <div className="col-md-3">
                 <div className="list-group ">
                  <button onClick={generalSettings} className={menu ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} >General</button>
                  <button onClick={securitySettings} className={!menu ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}>Security</button>
                </div> 
            </div>

            {menu 
            ?   
            <GeneralSettings 
            updateProfile={updateProfile}
            currentUser={currentUser}
            /> 
            :
            <SecuritySettings 
            
            />}  
          

        </div>
        </div>
  
    </>
  ) : (
    <CircularProgress className="loading" />
  )
}
