import React, { useState } from "react";
import "../../App.css";
import "./LeafsyForm.page.css";
import { useParams } from "react-router-dom"
import Order from "../../components/form.components/Order";
import Recommendation from "../../components/form.components/Recommendation";

// Firebase Redux connection
import { useFirestoreConnect } from "react-redux-firebase"; // Dependency to save data from DB
import { useSelector } from "react-redux" // Dependency to save from GLOBAL state into function

function LeafsyForm() {
  const { userId } = useParams()
  // Retrieve data from database
  useFirestoreConnect(() => [
    { collection: "users", doc: userId}
  ]);

  // Retrieve data from Redux
  const user = useSelector(
    ({ firestore: { data }}) => data.users && data.users[userId]
  )
  const storeTitle = user ? user.storeName : null
  const storeAddress = user ? user.storeAddress : "555 seymour st., vancouver"
  const deliveryRadius = user ? user.deliveryRadius : null
  const website = user ? user.storeWebsite : null

 
  const [hasOrder, setOrder] = useState(true);

  function bookOrder() {
    setOrder(true);
  }

  function bookRequest() {
    setOrder(false);
  }
  return (
    <div className="window">
      <h1 className="form-header">{storeTitle}'s Request Form!</h1>
  <p className="form-header " id="storeAddress"><strong>Bookstore Address: </strong><span id="bookstoreAddress">{storeAddress}</span></p>
        <p className="deliveryRadius" id="deliveryRadius">{deliveryRadius}</p>
      <div className="card bg-light col-sm-6 col-md-4 which-form">
        <div className="card-body">
          <div className="row">
            <label className="yes-book no-book surprise">
              Hello! Is there a particular book you're looking for?
            </label>
          </div>
          <div className="row">
            <button
              type="submit"
              onClick={bookOrder}
              className={
                hasOrder
                  ? "btn btn-outline-info yes-toggle active"
                  : "btn btn-outline-info yes-toggle"
              }
              id="addOrder"
            >
              Yes
            </button>

            <button
              type="submit"
              onClick={bookRequest}
              className={
                !hasOrder
                  ? "btn btn-outline-info no-toggle active"
                  : "btn btn-outline-info no-toggle"
              }
              id="addRequest"
            >
              No
            </button>
          </div>
        </div>
      </div>
      {hasOrder ? <Order userId={userId} website={website} storeName={storeTitle} /> : <Recommendation userId={userId} website={website} storeName={storeTitle} />}
    </div>
  );
}

export default LeafsyForm;
