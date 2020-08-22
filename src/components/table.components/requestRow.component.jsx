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
   } = props;


     // hook for the replied status of the row component
  const [repliedStatus, setRepliedStatus] = useState({
    status: false,
    rowStyle: {
      backgroundColor: "white"
    }
  });

// function that changes the replied status for when the button is clicked
  const replyButton = () => {

    // will change the status to the opposite true (replied) and change the background colour to grey
    if (!repliedStatus.status) {
      setRepliedStatus({
        status: true,
        rowStyle: {
          backgroundColor: "#dee2e6"
        }
      });

      // changes the status and styling back to the default (not replied and white background)
    } else {
      setRepliedStatus({
        status: false,
        rowStyle: {
          backgroundColor: "white"
        }
      })

    }
  }


  return (
    <Tr style={repliedStatus.rowStyle} >

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
      <Td className="genre icon-fix"> {genre} </Td>
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
            className="btn btn-outline-success"

            onClick={() => {
              openEdit();
              editRecommendation(recommendation, recommendationId);
            }}
          >
            <EditIcon />
          </button>

          <button
          className="btn btn-outline-info"
          onClick={() => {
              replyButton();
            }}
          >
          {repliedStatus.status ?  <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
            
          </button>



        </span>
      </Td>
    </Tr>
  );
}

export default RequestRow;
