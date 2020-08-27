import React, { useState, useEffect } from "react";
import googleIcon from "./googleDesktop.png";
import { useFirestore } from "react-redux-firebase";
import calculateDistance from "./calculate_distance";
import { Alert } from "@material-ui/lab"

import "./form.component.css";

import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Inputmask from "inputmask";

function Recommendation({ userId, website, storeName, customGenres }) {

  
  let history = useHistory();
  let provinces = ["AB", "BC", "MB", "NB", "NL", "NS", "ON", "PE", "QC", "SK", "NT", "NU", "YT"];

  const firestore = useFirestore();
  const [recommendation, setRecommendation] = useState({
    genre: "",
    description: "",
    firstName: "",
    lastName: "",
    address: "",
    deliveryOptions: "pick-up",
    email: "",
    phoneNumber: "",
    street: "",
    city: "",
    province: "",
    postalCode: "",
    error: false,
    repliedStatus: false,

  });

  const {
    genre,
    description,
    firstName,
    lastName,
    address,
    deliveryOptions,
    email,
    phoneNumber,
    street,
    city,
    province,
    postalCode,
    error,
    repliedStatus,
  } = recommendation;

  async function submitForm(event) {
    event.preventDefault();

    // Create Payload to send to API
    const payload = {
      assignedTo: userId,
      genre,
      description,
      firstName,
      lastName,
      email,
      phoneNumber,
      address:  street + ", " + city + ", " + province + " " + postalCode,
      deliveryOptions,
      street,
      city,
      province,
      postalCode,
      createdAt: firestore.FieldValue.serverTimestamp(),
      confirmationNumber: uuidv4(),
      anonymous: true,
      repliedStatus,
    };
    
    if (email || phoneNumber) {

      const response = await firestore
        .collection("recommendations")
        .doc()
        .set(payload)
      console.log(payload, response);
  
      payload.website = website;
      payload.storeName = storeName;
  
      history.push("/order-confirmation", [payload])
    } else {
      setRecommendation((previous) => {
        return {
          ...previous,
          error: true,
        };
      });
    }


  }

  let genreValues;

  // error handling. checks to see if user has a valid customGenres array in the backend
  if (customGenres) {

      genreValues = [...customGenres];

  } else {
      // set default array if user does not have a default array in the backeend
      genreValues = [
        "Sci-fi",
        "Thriller",
        "Horror",
        "Fantasy",
        "Canadian Literature",
        "Philosophy",
        "Poetry",
        "History",
        "Non-fiction",
        "Fiction",
      ];
  };


  // changes the state as the user types into the inputs
  function handleChange(event) {
    const { name, value } = event.target;
    setRecommendation((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  }

  // randomly generates a genre for the user when user clicks the button
  function surpriseGenre() {
    setRecommendation((previous) => {
      return {
        ...previous,
        genre: genreValues[Math.floor(Math.random() * genreValues.length)],
      };
    });
  }

  // creates a phone-number mask on the phone number input for better UX
  useEffect(() => {
    const phoneInput = document.getElementById("phone");
 
    Inputmask({"mask": "(999) 999 - 9999"}).mask(phoneInput)
 
   })
 

  return (
    <div className="request-form-window">  

      <h4 className="form-header">Request a Book</h4>
      {error ?
                <div>
            <Alert severity="error">You must include a method of contact before you can submit a request (i.e. Phone Number or Email)</Alert><br />
          </div> :
          null
          }

      <form onSubmit={submitForm} className="request-form-two book-title-no">
        <div id="form-two">
          <div className="form row  mt-3">
            <div className="form group">
              <label htmlFor="genre-picker">
                What genre of book would you like to read?
              </label>
              <div className="input-group mb-3">
                <select
                  className="custom-select"
                  id="genre-picker"
                  name="genre"
                  value={genre}
                  onChange={handleChange}
                >
                  <option value="" disabled defaultValue hidden>
                    Select a genre...
                  </option>
                  {genreValues.map((genre, index) => {
                    return (
                      <option value={genre} key={index}>
                        {genre}
                      </option>
                    );
                  })}
                </select>

                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={surpriseGenre}
                    id="surprise"
                    type="button"
                  >
                    Surprise Me
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="form row recommendation-form-two">
            <div className="form-group">
              <label htmlFor="recommendation-two">
                Description
                <small className="labelHelper">
                  If you can't quite remember the title, enter some book clues
                  for us here.
                </small>
              </label>

              <textarea
                className="form-control"
                id="recommendation-two"
                rows="5"
                placeholder="I would like a short book full of poetry..."
                name="description"
                value={description}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form row">
            <div className="form-group">
              <label htmlFor="first-name">First Name</label>

              <input
                type="text"
                className="form-control"
                id="first-name"
                name="firstName"
                value={firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group lastName">
              <label className="labelInput" htmlFor="last-name">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="last-name"
                name="lastName"
                value={lastName}
                onChange={handleChange}
              />
            </div>
          </div>

{/* the street address input component */}
          <div className="form row">
            <div className="form-group">
              <label htmlFor="street">
                Street Address
                <small className="labelHelper">
                  Enter your street address to see if you qualify for drop-off
                  delivery.
                </small>
              </label>

              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="street"
                  name="street"
                  onChange={handleChange}
                  value={street}
                />

                <div className="input-group-prepend">
                  <input
                    type="button"
                    value="Verify"
                    id="calculateDistance"
                    className="btn btn-secondary btn-sm rounded-0"
                    onClick={calculateDistance}
                  />
                </div>
              </div>

            </div>
          </div>

{/* the component that contains both the city and the province inputs */}
    <div className="form row">

{/* the city input component */}
      <div className="form-group city-input">

        <label htmlFor="city">City</label>
        <input
          type="text"
          className="form-control"
          id="city"
          name="city"
          value={city}
          onChange={handleChange}
        />
        
      </div>

{/* the province picker input component */}
      <div className="form-group">

        <label htmlFor="province-picker">
          Province
        </label>

        <div className="input-group">
          <select
            className="custom-select"
            id="province-picker"
            name="province"
            value={province}
            onChange={handleChange}
          >
            <option value="" disabled defaultValue hidden>
            Province
            </option>
            {provinces.map((province, index) => {
              return (
                <option value={province} key={index}>
                  {province}
                </option>
              );
            })}

              <option value="" >
                  Other
              </option>

          </select>
        
        </div>
      </div>

    </div>

{/* the postal code input component */}
    <div className="form row ">
      <div className="form-group ">
        <label htmlFor="postalCode">Postal Code</label>

        <input
          type="text"
          className="form-control"
          id="postalCode"
          name="postalCode"
          value={postalCode}
          onChange={handleChange}
        />
      </div>
    </div>
          

          <div className="delivery">
            <div className="form row">
              <label htmlFor="pick-up-book delivery-book">
                Delivery Options
              </label>
            </div>
            <div className="form row">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="deliveryOptions"
                  id="pick-up"
                  value={deliveryOptions}
                  onClick={handleChange}
                  defaultChecked
                />

                <label className="form-check-label" htmlFor="pick-up-book">
                  Pick-up
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="deliveryOptions"
                  id="drop-off"
                  disabled={true}
                  value="drop-off"
                  onClick={handleChange}
                />

                <label className="form-check-label" htmlFor="delivery-book">
                  Delivery
                </label>
              </div>
            </div>
          </div>

          <div className="form row">
            <div className="form-group">
              <label htmlFor="email">E-mail</label>

              <input
                type="email"
                className="form-control"
                id="email2"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form row">
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                className="form-control phone"
                pattern="[0-9()]{5} [0-9]{3} - [0-9]{4}"
                id="phone"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row book-request-button">
            <button type="submit" className="btn btn-success" id="submit-form">
              Submit
            </button>
          </div>
        </div>
      </form>

    </div>
  );
}

export default Recommendation;
