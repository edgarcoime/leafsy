import React from "react";
import "./table.css";
import { Tr, Td } from 'react-super-responsive-table'
import AlertButton from '../partials/Confirmation/AlertButton.component'
import EditIcon from "@material-ui/icons/Edit";

function OrderRow(props) {
  
  const {
    order,
    date,
    firstName,
    lastName,
    email,
    phone,
    bookTitle,
    bookAuthor,
    delivery,
    address,
    description,
    deleteOrder,
    orderId,
    openEdit,
    editOrder,
    street,
    city,
    province,
    postalCode,
  } = props;

  return (
    <Tr>
      
      <Td className="date">{date}</Td>
      <Td
       className="customer">
        {firstName} {lastName}
        {(firstName || lastName) !== "" && <br />}
        <a className="clickable" href={"mailto:" + email}>{email}</a>
        {email !== "" && <br />}
        <a className="clickable" href={"tel:" + phone}>{phone}</a>
      </Td>
      <Td className="delivery">{delivery}</Td>
      <Td className="address">{street}{city && street ?  "," : null} {city}{city && province ? "," : null} {province} {postalCode}</Td>

      <Td className="title book">
        {bookTitle} {bookAuthor !== "" && "by"} {bookAuthor}{" "}
      </Td>
      <Td className="description">{description}</Td>

      <Td className="edit">
        <span className="icon-fix">
          <AlertButton 
            order={order}
            deleteOrder={deleteOrder}
            orderId={orderId}
            popUp="order"

          />

          <button
          className="btn btn-outline-success"
            onClick={() => {
              editOrder(order, orderId);
              openEdit();
            }}
          >
            <EditIcon />
          </button>
        </span>
      </Td>
    
    </Tr>
  );
}

export default OrderRow;
