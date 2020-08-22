import React, {useState} from "react";
import "./table.css";
import { Tr, Td } from 'react-super-responsive-table'
import AlertButton from '../partials/Confirmation/AlertButton.component'
import EditIcon from "@material-ui/icons/Edit";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

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
    <Tr style={repliedStatus.rowStyle}>
      
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

export default OrderRow;
