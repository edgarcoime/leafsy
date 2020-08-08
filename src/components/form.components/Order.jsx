import React, { useState, useEffect } from "react";
import "../../App.css";
import "./form.component.css"
import { useFirestore } from "react-redux-firebase"

import calculateDistance from "./calculate_distance";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { Alert } from "@material-ui/lab"

import Inputmask from "inputmask";

function Order({userId, website, storeName}) {
  let provinces = ["AB", "BC", "MB", "NB", "NL", "NS", "ON", "PE", "QC", "SK", "NT", "NU", "YT"];

  let history = useHistory();
  const firestore = useFirestore();
  const arrayUnion = firestore.FieldValue.arrayUnion
  const [order, setOrder] = useState({
    bookTitle: "",
    description: "",
    bookAuthor: "",
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
  });

  const {
    bookTitle,
    bookAuthor,
    description,
    firstName,
    lastName,
    email,
    deliveryOptions,
    phoneNumber,
    address,
    street,
    city,
    province,
    postalCode,
    error,
  } = order;

  function handleChange(event) {
    const { name, value } = event.target;
    setOrder((prevOrder) => {
      return {
        ...prevOrder,
        [name]: value,
      };
    });
  }

  async function submitForm(event) {
    event.preventDefault();

    // Create Payload to send to API
    const payload = {
      assignedTo: userId,
      bookTitle,
      bookAuthor,
      description,
      firstName,
      lastName,
      email,
      phoneNumber,
      address: street + city + province + postalCode,
      deliveryOptions,
      street,
      city,
      province,
      postalCode,
      createdAt: firestore.FieldValue.serverTimestamp(),
      confirmationNumber: uuidv4()
    };

    if (email || phoneNumber) {

      const response = await firestore
        .collection("orders")
        .doc()
        .set(payload)
      console.log(payload, response);
  
      payload.website = website;
      payload.storeName = storeName;
  
      history.push("/order-confirmation", [payload])
    } else {
      setOrder((prevOrder) => {
        return {
          ...prevOrder,
          error: true,
        };
      });
    }



  }

  useEffect(() => {
   const phoneInput = document.getElementById("phone");


Inputmask({"mask": "(999) 999 - 9999"}).mask(phoneInput)

  })


  return (
    <div className="request-form-window">
      <h4 className="form-header">Order a Book</h4>


      {error ?
                <div>
            <Alert severity="error">You must include a method of contact before you can submit a request (i.e. Phone Number or Email)</Alert><br />
          </div> :
          null
          }

      <form className="request-form-one" onSubmit={submitForm}>
        <div id="form-one">
          <div className="form row">
            <div className="form group">
              <label htmlFor="bookTitle">Title</label>
              <input
                type="text"
                className="form-control"
                id="bookTitle"
                name="bookTitle"
                onChange={handleChange}
                value={bookTitle}
              />
            </div>
          </div>

          <div className="form row recommendation-form">
            <div className="form-group">
              <label htmlFor="description">
                Description{" "}
                <small className="labelHelper">
                  (Optional) If you can't quite remember the title, enter some
                  book clues for us here.
                </small>
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="5"
                placeholder="The protagonist was a small dentist mouse... The book cover was red..."
                name="description"
                onChange={handleChange}
                value={description}
              />
            </div>
          </div>

          <div className="form row">
            <div className="form-group">
              <label htmlFor="bookAuthor">
                Author <small className="labelHelper">(Optional)</small>
              </label>
              <input
                type="text"
                className="form-control"
                id="bookAuthor"
                name="bookAuthor"
                onChange={handleChange}
                value={bookAuthor}
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
                onChange={handleChange}
                value={firstName}
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
                onChange={handleChange}
                value={lastName}
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
      <div className="form-group ">

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
                  value="pick-up"
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
                  value="drop-off"
                  onClick={handleChange}
                  disabled="true"
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
                id="email"
                name="email"
                onChange={handleChange}
                value={email}
              />
            </div>
          </div>

          <div className="form row">
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>

              <input
                type="tel"
                className="form-control phone"
                id="phone"
                name="phoneNumber"
                onChange={handleChange}
                value={phoneNumber}
              />
            </div>
          </div>
        </div>
        <div className="form-row  book-request-button">



        
          <button type="submit" className="btn btn-success" id="submit-form">
            Submit
          </button>
        

        

        </div>
      </form>



    </div>
  );
}

export default Order;
