import React, { useState } from "react";
import googleIcon from "../../form.components/googleDesktop.png";
import './modal.css'

function EditRecommendation(props) {
  let provinces = ["AB", "BC", "MB", "NB", "NL", "NS", "ON", "PE", "QC", "SK", "NT", "NU", "YT"];

  const initialRecommendation = props.currentEdit;

  const [recommendation, setRecommendation] = useState({
    genre: initialRecommendation.genre,
    description: initialRecommendation.description,
    firstName: initialRecommendation.firstName,
    lastName: initialRecommendation.lastName,
    address: initialRecommendation.address,
    deliveryOptions: initialRecommendation.deliveryOptions,
    email: initialRecommendation.email,
    phoneNumber: initialRecommendation.phoneNumber,
    id: initialRecommendation.id,
    street: initialRecommendation.street,
    city: initialRecommendation.city,
    province: initialRecommendation.province,
    postalCode: initialRecommendation.postalCode,
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
    id,
    street,
    city,
    province,
    postalCode,
  } = recommendation;

  async function submitForm(event) {
    event.preventDefault();

    // Create Payload to send to API
    const payload = {
      genre,
      description,
      firstName,
      lastName,
      email,
      phoneNumber,
      address: street + city + province + postalCode,
      street,
      city,
      province,
      postalCode,
      deliveryOptions,
    };

    props.submitEditReco(payload, id);
    props.closeModal();
  }

  let genreValues = [
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

  function handleChange(event) {
    const { name, value } = event.target;
    setRecommendation((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  }

 

  return (
    <div>

      <form onSubmit={submitForm} className="request-form-two book-title-no">
        <div id="form-two">
          <div className="form row  mt-3">
            <div className="form group">
              <label htmlFor="genre-picker">
                Genre
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


              </div>
            </div>
          </div>

          <div className="form row recommendation-form-two">
            <div className="form-group">
              <label htmlFor="recommendation-two">
                Description
              </label>

              <textarea
                className="form-control modal-description"
                id="recommendation-two"
                rows="5"
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
            <div className="form-group modal-last-name">
              <label className="modal-last-name" htmlFor="last-name">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
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

               
              </div>

            </div>
          </div>

{/* the component that contains both the city and the province inputs */}
    <div className="form row modal-city">

{/* the city input component */}
      <div className="form-group city-input ">

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
      <div className="form-group modal-province">

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
                  checked={deliveryOptions === "pick-up" ? true : false}
                  
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
                  checked={deliveryOptions === "pick-up" ? false : true}
                />

                <label className="form-check-label" htmlFor="delivery-book">
                  Drop-off
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
                id="phone"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row book-request-button">
            <button type="submit" className="btn btn-success" id="submit-form">
              Edit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditRecommendation;
