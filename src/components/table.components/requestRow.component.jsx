import React, {useState} from "react";
import EditIcon from "@material-ui/icons/Edit";
import AlertButton from '../partials/Confirmation/AlertButton.component'
import { Tr, Td } from 'react-super-responsive-table'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import "./table.css";


function RequestRow(props) {
  const { 
    recommendationId,
    firstName,
    lastName,
    date,
    email,
    phone,
    deliveryOptions,
    address,
    genre,
    description,
    recommendation,
    deleteRecommendation,
    openEdit,
    editRecommendation,
    street,
    city,
    province,
    postalCode,
    repliedStatus,
    editRepliedStatus,
    customGenres,
    
   } = props;


// function that changes the replied status for when the button is clicked
  const replyButton = () => {
    
    // this ensures that the orders made before this update won't cause errors if they don't have a replied status saved in the backend
    const payload = {repliedStatus: repliedStatus ? false : true};

    editRepliedStatus(payload, recommendationId);
  };

  const rowStyle = {backgroundColor: repliedStatus ? "#dee2e6" : ""};

  return (
    <Tr style={rowStyle} >

      <Td className="date icon-fix">{date}</Td>
      <Td className="customer">
        {firstName} {lastName}
        {(email || lastName) !== "" && <br />}
        <a className="clickable" href={"mailto:" + email}>{email}</a>
        {email !== "" && <br />}
        <a className="clickable" href={"tel:" + phone}>{phone}</a>

      </Td>

      <Td className="delivery"> {deliveryOptions}</Td>
      <Td className="address">{street}{city && street ?  "," : null} {city}{city && province ? "," : null} {province} {postalCode}</Td>
      <Td className="genre"> {Array.isArray(genre) ? genre.map((item, index) => <div>{item}</div>) : <p>{genre}</p>}</Td>
      <Td className="description"> {description} </Td>

      <Td className="edit">
        <span className="icons">

          <AlertButton 
          deleteRecommendation={deleteRecommendation}
          recommendationId={recommendationId}
          recommendation={recommendation}
          popUp="recommendation"
          />

          <button
            className="btn btn-outline-success table-icon edit-btn"

            onClick={() => {
              openEdit();
              editRecommendation(recommendation, recommendationId);
            }}
          >
            <EditIcon />
          </button>

            
          <button
          className="btn btn-outline-info table-icon"
          onClick={() => {
              replyButton();
            }}
          >
          {repliedStatus ?  <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
            
          </button>



        </span>
      </Td>
    </Tr>
  );
}

export default RequestRow;
