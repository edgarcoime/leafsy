import React, { useState } from 'react';
import GeneralSettings from '../../components/AccountSettings.components/generalSettings.component';
import SecuritySettings from '../../components/AccountSettings.components/securitySettings.component';
import EditFormSettings from "../../components/AccountSettings.components/editFormSettings";
import "./accountSettings.css";

// MUI imports
import CircularProgress from "@material-ui/core/CircularProgress";

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

  const [menu, setToggle] = useState({
    generalSettings:true,
    securitySettings: false,
    editFormsSettings: false
  }
    );

  const generalSettings = () => {
    setToggle({
      generalSettings:true,
      securitySettings: false,
      editFormsSettings: false
    });
  }

  const securitySettings = () => {
    setToggle({
      generalSettings: false,
      securitySettings: true,
      editFormsSettings: false
    });
  }

  const editFormSettings = () => {
    setToggle({
      generalSettings: false,
      securitySettings: false,
      editFormsSettings: true
    })
  }

  return isFullyLoaded() ? (
    <>
        <div className="container window account">
        <div className="row">
            <div className="col-md-3">
                 <div className="list-group ">
                  <button onClick={generalSettings} className={menu.generalSettings ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} >General</button>
                  <button onClick={securitySettings} className={menu.securitySettings ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}>Security</button>
                  <button onClick={editFormSettings} className={menu.editFormsSettings ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} >Edit Forms</button>
                </div> 
            </div>

            {menu.generalSettings 
            &&
            <GeneralSettings 
              updateProfile={updateProfile}
              currentUser={currentUser}
            /> 
            }

            {menu.securitySettings &&
            <SecuritySettings />
            
            }  

            {menu.editFormsSettings &&
              <EditFormSettings 
              updateProfile={updateProfile}
              currentUser={currentUser}
            /> 
            }
          

        </div>
        </div>
  
    </>
  ) : (
    <CircularProgress className="loading" />
  )
}
