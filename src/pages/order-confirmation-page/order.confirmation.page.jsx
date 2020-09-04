import React, { useEffect } from "react";
import "./order.confirmation.css"


import fancyUnderline from "./images/ClipartKey_2548768.png";


function OrderConfirmation(props) {

    const date = new Date()
    

    const  {
        assignedTo,
        genre,
        bookTitle,
        bookAuthor,
        description,
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        deliveryOptions,
        confirmationNumber,
        street,
        city,
        province,
        postalCode,
        createdAt,
        website,
        storeName
        
        
      } = props.location.state[0];

   
     


    return (
        <div className="confirmation-bg">
            <div className="confirmation-container">

                <div className="confirmation-heading">
                    <h1 className="confirmation-heading-title">Thank you for your order</h1>
                    <img src={fancyUnderline} alt="underline" className="fancy-underline" />
                </div>

                <div className="confirmation-subheading">
                    <h3 className="confirmation-sh-title confirmation-subheading-title">{email ? <span>You've been sent an email confirmation!</span> : <span> Order Confirmation</span>}</h3>
                    <p className="confirmation-order-number" >CONFIRMATION ID: #{confirmationNumber}</p>

                </div>

                
                <div className="order-summary-heading">
                    <h4 className="confirmation-sh-title confirmation-summary-title">Order Summary</h4>
                    <p>{date.toLocaleDateString('en-US', {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>


                <hr className="confirmation-line" />

                    <div className="order-summary-box">

                    {storeName ?
                        <div className="d-flex justify-content-between">
                            <b className="order-detail-heading confirmation-detail-text" >Store</b> <p className="confirmation-detail-text">{storeName}</p>
                        </div>  :
                        null
                    }
                        
                        <div className="d-flex justify-content-between">
                            <b className="order-detail-heading confirmation-detail-text" >Name</b> <p className="confirmation-detail-text">{firstName + " " + lastName}</p>
                        </div>    


                        {email ?
                                
                            <div className="d-flex justify-content-between">
                                <b className="order-detail-heading confirmation-detail-text" >Email</b> <p className="confirmation-detail-text">{email}</p>
                            </div>
                        : null
                        }
                            

                        {phoneNumber ?
                            <div className="d-flex justify-content-between">
                                <b className="order-detail-heading confirmation-detail-text" >Phone</b> <p className="confirmation-detail-text">{phoneNumber}</p>
                            </div>    
                        : null
                        }


                        <div className="d-flex justify-content-between">
                            <b className="order-detail-heading confirmation-detail-text" >Delivery</b> <p className="confirmation-detail-text">{deliveryOptions}</p>
                        </div>  


                        {address ? 
                            <div className="d-flex justify-content-between">
                                <b className="order-detail-heading confirmation-detail-text" >Address</b> <p className="confirmation-detail-text">{street}{city && street ?  "," : null} {city}{city && province ? "," : null} {province} {postalCode}</p>
                            </div>  

                        : null
                        }
                
                </div>

                <div className="order-summary-box">

                    {bookTitle ?

                        <div className="d-flex justify-content-between">
                            <b className="order-detail-heading confirmation-detail-text" >Title</b> <p className="confirmation-detail-text">{bookTitle}</p>
                        </div>  

                    : null
                    }
                    
                    {bookAuthor ?

                        <div className="d-flex justify-content-between">
                            <b className="order-detail-heading confirmation-detail-text" >Author</b> <p className="confirmation-detail-text">{bookAuthor}</p>
                        </div>  

                    : null
                    }

                    {genre ?

                        <div className="d-flex justify-content-between">
                            <b className="order-detail-heading confirmation-detail-text" >Genre</b> <p className="confirmation-detail-text">{genre.join((", "))}</p>
                        </div>  

                    : null
                    }
                    

                    { description ? 

                        <div className="description-detail">
                            <b className="confirmation-detail-text">Description:</b>
                            <p  className="confirmation-detail-text">{description}</p>
                        </div>  
                        
                    : null
                    }


                </div>


 

                <img src={fancyUnderline} alt="underline" className="fancy-underline" />

            </div>
        
            <div className="confirmation-buttons-box">
                
                <a href={"/form/" + assignedTo}>
                    <button className="btn btn-outline-info conf-button">Make another Request</button>
                </a>

                <button className="btn btn-outline-info conf-button" onClick={window.print}>print</button>

                {website &&
                    <a href={website}>
                        <button className="btn btn-outline-info conf-button">Back to {storeName ? storeName : "Site"}</button>
                    </a>
                    }
                
            </div>
        </div>
    )
}

export default OrderConfirmation;