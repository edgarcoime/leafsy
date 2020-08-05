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
    console.log(userId)
    const response = await firestore
      .collection("users")
      .doc(userId)
      .update(newProfile)
    console.log(newProfile)
    
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
        <div className="container window">
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
  
      {/* <p>Email: {currentUser.email}</p>
      <p>Store Name: {currentUser.storeName}</p>
      <p>Store Address: {currentUser.storeAddress}</p>
      <h2>Orders</h2>
      {
        currentUser.orders.map((order, idx) => (
          <p>Order #{idx +1}</p>
        ))
      }
      <h2>Recommendations</h2>
      {
        currentUser.recommendations.map((order, idx) => (
          <p>Recommendation #{idx +1}</p>
        ))
      }
      <Button onClick={updateProfile}>Update profile</Button> */}
    </>
  ) : (
    <CircularProgress />
  )
}
