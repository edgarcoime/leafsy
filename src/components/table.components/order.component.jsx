import React, { useState, useEffect } from "react";
import OrderRow from "./orderRow.component";
import Modal from "../partials/Modal/Modal.component";
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';import "./table.css";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

// redux-firebase
import { useFirestoreConnect, useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux"

const toDayMonthYear = (firebaseDate) => {
  if (!firebaseDate) {
    console.log("Firebase date is null")
    return 
  }
  const jsDate = firebaseDate.toDate();
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };

  return new Intl.DateTimeFormat("en", options).format(jsDate);
};

function Order() {
  const firestore = useFirestore();
  const currentUser = useSelector(state => state.firebase.auth);
  const currentUserProfile = useSelector(state => state.firebase.profile);
  const currentUserId = currentUser.uid;

  // Rendered Assets
  const storeName = currentUserProfile.isEmpty ? null : currentUserProfile.storeName;

  // Connect Firestore collection into redux
  useFirestoreConnect({
    collection: "orders",
    storeAs: "ordersDocs",
    where: ["assignedTo", "==", currentUserId],
  });

  // Map orders collection to State
  const ordersObject = useSelector(state => ({
    docs: state.firestore.data.ordersDocs,
    requesting: state.firestore.status.requesting.ordersDocs,
    requested: state.firestore.status.requested.ordersDocs,
    timestamps: state.firestore.status.timestamps.ordersDocs
  }))



  const addOrder = async (newOrder) => {
    try {
      const response = firestore
        .collection("orders")
        .doc()
        .set(newOrder)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  };

  const deleteOrder = async (orderId) => {
    const response = await firestore
      .collection("orders")
      .doc(orderId)
      .delete()
  };

  const [currentEdit, setCurrentEdit] = useState({
    bookTitle: "",
    description: "",
    bookAuthor: "",
    firstName: "",
    lastName: "",
    address: "",
    deliveryOptions: "",
    email: "",
    phoneNumber: "",
    id: "",
    street: "",
    city: "",
    province: "",
    postalCode: "",
  });

  const editOrder = async (order, orderId) => {
    setCurrentEdit({
      id: orderId,
      bookTitle: order.bookTitle,
      description: order.description,
      bookAuthor: order.bookAuthor,
      firstName: order.firstName,
      lastName: order.lastName,
      address: order.address,
      deliveryOptions: order.deliveryOptions,
      email: order.email,
      phoneNumber: order.phoneNumber,
      street: order.street,
      city: order.city,
      province: order.province,
      postalCode: order.postalCode,
    });
  };
  
  const submitEditOrder = async (order, orderId) => {
    try {
      const response = await firestore
        .collection("orders")
        .doc(orderId)
        .update(order)
    } catch (error) {
      console.log(error)
    }
  }

  const [modalShow, setModalShow] = useState(false);
  const closeModal = () => setModalShow(false);
  const openModal = () => setModalShow(true);

  const [editShow, setEditShow] = useState(false);
  const closeEdit = () => setEditShow(false);
  const openEdit = () => setEditShow(true);


  const [ordersArray, setOrdersArray] = useState([]);
  useEffect(() => {
    // Parse through object and create an array
    let newArr = [];
    if (!!ordersObject.docs) {
      newArr = Object.entries(ordersObject.docs).map(([key, order], index) => {
        return !!order && ({
        ...order,
        docId: key
        })
      });
    }
    setOrdersArray(newArr)

  }, [ordersObject.docs])


  const [sortConfig, setSortConfig] = useState(
    {
      direction: "",
      key: ""
    }
  )



  ordersArray.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const sortColumn = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="window">
      <h2 className="bookstore-header">{storeName} Orders</h2>
      <div className="tableButtons">
        <Modal
          modalHeader={"Add an Order"}
          modalBody={"addOrderForm"}
          addOrder={addOrder}
          openModal={openModal}
          closeModal={closeModal}
          modalShow={modalShow}
          currentEdit={currentEdit}
        />

        <Modal
          modalHeader={"Edit Order"}
          modalBody={"editOrderForm"}
          openModal={openEdit}
          closeModal={closeEdit}
          modalShow={editShow}
          currentEdit={currentEdit}
          editOrder={editOrder}
          submitEditOrder={submitEditOrder}
        />
                {/* <button
          className="btn btn-outline-danger deleteButton"
          >
          <DeleteIcon className="deleteIcon"/>
        </button> */}

        <button
          onClick={openModal}
          className="btn btn-outline-success addOrder"
        >
          Add an Order
        </button>


      </div>

      <div className="table-responsive table-hover col-md-11 view-all-requests-table">
        <Table className="table sortable" id="book-orders">
          <Thead>
            <Tr>
              <Th
                onClick={() => sortColumn("createdAt")}
                className="date w-25 data-card-subtitle"
                scope="col"
              >
                Date
                {(sortConfig.direction === 'ascending' && sortConfig.key === 'createdAt') && <ExpandLessIcon />}
                {(sortConfig.direction === 'descending' && sortConfig.key === 'createdAt') && <ExpandMoreIcon />}

              </Th>
              <Th
                onClick={() => sortColumn("firstName")}
                className="customer w-35 data-card-subtitle"
                scope="col"
              >
                Customer
                {(sortConfig.direction === 'ascending' && sortConfig.key === 'firstName') && <ExpandLessIcon />}
                {(sortConfig.direction === 'descending' && sortConfig.key === 'firstName') && <ExpandMoreIcon />}

              </Th>
              <Th 
                onClick={() => sortColumn("deliveryOptions")}
                className="delivery-column data-card-subtitle" scope="col">
                Delivery
                {(sortConfig.direction === 'ascending' && sortConfig.key === 'deliveryOptions') && <ExpandLessIcon />}
                {(sortConfig.direction === 'descending' && sortConfig.key === 'deliveryOptions') && <ExpandMoreIcon />}

              </Th>
              <Th className="address w-25 data-card-subtitle" scope="col">
                Address
              </Th>
              <Th
                onClick={() => sortColumn("bookTitle")}
                className="bookTitle data-card-subtitle"
                scope="col"
              >
                Book
                {(sortConfig.direction === 'ascending' && sortConfig.key === 'bookTitle') && <ExpandLessIcon />}
                {(sortConfig.direction === 'descending' && sortConfig.key === 'bookTitle') && <ExpandMoreIcon />}

              </Th>

              <Th className="description w-50 data-card-subtitle" scope="col">
                Description
              </Th>
              <Th className="edit data-card-action-links" scope="col"></Th>


            </Tr>
          </Thead>

          <Tbody>
          {ordersArray.map((order, index) => {
            if (!!order.docId) return (
                <OrderRow
                  date={!order.createdAt ? null : toDayMonthYear(order.createdAt)}
                  firstName={order.firstName}
                  lastName={order.lastName}
                  email={order.email}
                  phone={order.phoneNumber}
                  bookTitle={order.bookTitle} 
                  bookAuthor={order.bookAuthor}
                  delivery={order.deliveryOptions}
                  address={order.address}
                  description={order.description}
                  orderId={order.docId}
                  order={order}
                  deleteOrder={deleteOrder}
                  key={index}
                  openEdit={openEdit}
                  editOrder={editOrder}
                  street={order.street}
                  city={order.city}
                  province={order.province}
                  postalCode={order.postalCode}
                />
            )
          })
          }
          </Tbody>
        </Table>
      </div>
    </div>
  );
}

export default Order;
