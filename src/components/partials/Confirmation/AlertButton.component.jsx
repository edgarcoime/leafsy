import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteOrder from './DeleteOrder.component'
import DeleteReco from './DeleteReco.component'


export default function AlertDialog(props) {
  const { 
      order, 
      deleteOrder, 
      orderId, 
      popUp,
      recommendation,
      deleteRecommendation,
      recommendationId,
    } = props
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
      <button className="requestBtns btn btn-outline-secondary" onClick={handleClickOpen}>
        <DeleteIcon/>
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

         {
             popUp === "order" &&    
             <DeleteOrder 
             handleClose={handleClose}
             deleteOrder={deleteOrder}
             orderId={orderId}
             order={order}
             />
         }

         
{
             popUp === "recommendation" &&    
             <DeleteReco 
             handleClose={handleClose}
             deleteRecommendation={deleteRecommendation}
             recommendationId={recommendationId}
             recommendation={recommendation}
             />
         }
        
      </Dialog>
    </>
  );
}
