import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './confirm.css'


export default function DeleteReco({ handleClose, recommendation, deleteRecommendation, recommendationId}) {


  const { 
    firstName,
    lastName,
    email,
    phoneNumber,
    deliveryOptions,
    address,
    genre,
    description
   } = recommendation;


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
              <td className="infoHeader">Delivery:</td>
              <td>{deliveryOptions}</td>
              </tr>

              <tr>
              <td className="infoHeader">Genre:</td>
              <td>{genre}</td>
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
          <button onClick={() => {deleteRecommendation(recommendationId); handleClose()}} className="btn btn-danger" color="primary" autoFocus>
            Remove
          </button>
        </DialogActions>
    </>
}