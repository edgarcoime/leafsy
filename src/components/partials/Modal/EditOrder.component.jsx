import React, { useState } from "react";
import googleIcon from "../../form.components/googleDesktop.png";

function EditOrder(props) {
  let provinces = ["AB", "BC", "MB", "NB", "NL", "NS", "ON", "PE", "QC", "SK", "NT", "NU", "YT"];

  const initialOrder = props.currentEdit;

  const [order, setOrder] = useState({
    bookTitle: initialOrder.bookTitle,
    description: initialOrder.description,
    bookAuthor: initialOrder.bookAuthor,
    firstName: initialOrder.firstName,
    lastName: initialOrder.lastName,
    address: initialOrder.address,
    deliveryOptions: initialOrder.deliveryOptions,
    email: initialOrder.email,
    phoneNumber: initialOrder.phoneNumber,
    id: initialOrder.id,
    street: initialOrder.street,
    city: initialOrder.city,
    province: initialOrder.province,
    postalCode: initialOrder.postalCode,
  });

  const {
    bookTitle,
    bookAuthor,
    description,
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    street,
    city,
    province,
    postalCode,
    deliveryOptions,
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

  console.log(order)

  async function submitForm(event) {
    event.preventDefault();

    // Create Payload to send to API
    const payload = {
      bookTitle,
      bookAuthor,
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
      anonymous: false,
    };

    // Conditional Logic "Are You sure you want to edit?"
    props.submitEditOrder(payload, order.id)


    props.closeModal();
  }

  return (
    <div>
      <h4 className="form-header">Order a Book</h4>

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
                Description <small className="labelHelper">(Optional)</small>
              </label>
              <textarea
                className="form-control modal-description"
                id="description"
                rows="5"
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
              <label className="modal-last-name labelInput" htmlFor="last-name">
                Last Name
              </label>
              <input
                type="text"
                className="modal-last-name form-control"
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
                  // disabled={true}
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
        {/* <input type="text" style="display: none" id="captcha" name="captcha"/>
          <div id="captchaContainer"></div>
          <br/>
          <div class="g-recaptcha" data-sitekey="6LfP9fUUAAAAAH1NzauKJs3JsmCfurNySKl_2Z2e"></div>
      
          <div class="form-row  book-request-button">
            <button type="submit" class="btn btn-success" id="submit-form">Submit</button>
          </div> 
    
          <input type="text" style={{display: "none"}} id="captcha" name="captcha2"/>
        
          <div id="captchaContainer2"></div>
          <br/> */}

        <div className="form-row  book-request-button">
          <button type="submit" className="btn btn-success" id="submit-form">
            Edit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditOrder;
