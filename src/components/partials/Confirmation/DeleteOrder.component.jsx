import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './confirm.css'


export default function DeleteOrder({ handleClose, order, deleteOrder, orderId }) {
  
  const {
    bookTitle,
    bookAuthor,
    description,
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
  } = order;


    return <>
    <DialogTitle id="alert-dialog-title">{"Delete this Order?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

            <table>
              <tbody>
              <tr>
              <td className="infoHeader">Customer:</td> 
              <td>{firstName} {lastName}</td>
              </tr>

              <tr>
              <td className="infoHeader">E-mail:</td>
              <td>{email}</td>
              </tr>

              <tr>
              <td className="infoHeader">Phone:</td>
              <td>{phoneNumber}</td>
              </tr>

              <tr>
              <td className="infoHeader">Address:</td>
              <td>{address}</td>
              </tr>

              <tr>
              <td className="infoHeader">Title:</td>
              <td>{bookTitle}</td>
              </tr>

              <tr>
              <td className="infoHeader">Author:</td>
              <td>{bookAuthor}</td>
              </tr>

              <tr>
              <td className="infoHeader">Description:</td>
              <td>{description}</td>
              </tr>
              </tbody>
            </table>

            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className="btn btn-light" onClick={handleClose} color="primary">
            Back
          </button>
          <button className="btn btn-danger" onClick={() => {deleteOrder(orderId); handleClose()}} color="primary" autoFocus>
            Remove
          </button>
        </DialogActions>
    </>
}