import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import AlertButton from '../partials/Confirmation/AlertButton.component'
import { Tr, Td } from 'react-super-responsive-table'
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

  return (
    <Tr>

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
        </span>
      </Td>
    </Tr>
  );
}

export default RequestRow;
