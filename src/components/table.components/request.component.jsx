import React, { useState, useEffect } from "react";
import RequestRow from "./requestRow.component";
import Modal from "../partials/Modal/Modal.component";
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table'
import "./table.css";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';import "./table.css";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'


// Redux-firebase
import { useFirestoreConnect, useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux"

const toDayMonthYear = (firebaseDate) => {
  if (!firebaseDate) {
    console.log("Firebase date is null")
    return; 
  }
  const jsDate = firebaseDate.toDate();
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };

  return new Intl.DateTimeFormat("en", options).format(jsDate);
}

function Request() {
  const firestore = useFirestore();
  const currentUser = useSelector(state => state.firebase.auth);
  const currentUserProfile = useSelector(state => state.firebase.profile);
  const currentUserId = currentUser.uid;

  // Rendered Assets
  const storeName = currentUserProfile.isEmpty ? null : currentUserProfile.storeName;

  // Connecr Firestore collection into Redux
  useFirestoreConnect({
    collection: "recommendations",
    storeAs: "recoDocs",
    where: ["assignedTo", "==", currentUserId],
  });

  // Map Recommendations collection to State
  const recommendations = useSelector(state => ({
    docs: state.firestore.data.recoDocs,
    requesting: state.firestore.status.requesting.recoDocs,
    requested: state.firestore.status.requested.recoDocs,
    timestamps: state.firestore.status.timestamps.recoDocs
  }));
  // console.log(recommendations)

  const sortColumn = (key) => {
    console.log("Sorting Column", key)
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const addRequest = async (newRequest) => {
    try {
      const response = firestore
        .collection("recommendations")
        .doc()
        .set(newRequest)
      console.log(newRequest, response)
    } catch (error) {
      console.log(error)
    }
  };

  const deleteRequest = async (requestId) => {
    console.log(requestId)
    const response = await firestore
      .collection("recommendations")
      .doc(requestId)
      .delete()
  };

  const [currentEdit, setCurrentEdit] = useState({
    genre: "",
    description: "",
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

  const editRecommendation = (recommendation, recoId) => {
    setCurrentEdit({
      genre: recommendation.genre,
      description: recommendation.description,
      firstName: recommendation.firstName,
      lastName: recommendation.lastName,
      address: recommendation.address,
      deliveryOptions: recommendation.deliveryOptions,
      email: recommendation.email,
      phoneNumber: recommendation.phoneNumber,
      id: recoId,
      street: recommendation.street,
      city: recommendation.city,
      province: recommendation.province,
      postalCode: recommendation.postalCode,
    });
  };

  const submitEditReco = async (recommendation, recoId) => {
    try {
      const response = await firestore
        .collection("recommendations")
        .doc(recoId)
        .update(recommendation)
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

  const [recosArray, setRecosArray] = useState([]);
  useEffect(() => {
    // Parse through object and create an array
    let newArr = [];
    if (!!recommendations.docs) {
      newArr = Object.entries(recommendations.docs).map(([key, reco], index) => {
        return !!reco && ({
        ...reco,
        docId: key
        })
      });
    }
    setRecosArray(newArr)

  }, [recommendations.docs])

  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "",
  });


  recosArray.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });


  return (
    <div className="window">
      <h2 className="bookstore-header">{storeName} Recommendations</h2>

      <Modal
        id={"addRequest"}
        buttonText={"Add a Recommendation"}
        modalHeader={"Add a Recommendation"}
        modalBody={"addRequestForm"}
        addRequest={addRequest}
        openModal={openModal}
        closeModal={closeModal}
        modalShow={modalShow}
      />

      <Modal
        modalHeader={"Edit Recommendation"}
        modalBody={"editRecommendation"}
        openModal={openEdit}
        closeModal={closeEdit}
        modalShow={editShow}
        currentEdit={currentEdit}
        editRecommendation={editRecommendation}
        submitEditReco={submitEditReco}
      />

      <button
        onClick={openModal}
        className="btn btn-outline-secondary addRequest"
        id="addRequest"
      >
        Add a Recommendation
      </button>

      <div className="table-responsive table-hover col-md-11 view-all-requests-table">
        <Table className="table sortable" id="recommendation-requests">
          <Thead>
            <Tr>

              <Th
                onClick={() => sortColumn("createdAt")}
                className="date w-15 data-card-subtitle"
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
              className="delivery data-card-subtitle" 
              scope="col">
                Delivery
                {(sortConfig.direction === 'ascending' && sortConfig.key === 'deliveryOptions') && <ExpandLessIcon />}
                {(sortConfig.direction === 'descending' && sortConfig.key === 'deliveryOptions') && <ExpandMoreIcon />}
              </Th>

              <Th className="address w-25 data-card-subtitle" scope="col">
                Address
              </Th>

              <Th
                onClick={() => sortColumn("genre")}
                className="genre data-card-subtitle"
                scope="col"
              >
                Genre
                {(sortConfig.direction === 'ascending' && sortConfig.key === 'genre') && <ExpandLessIcon />}
                {(sortConfig.direction === 'descending' && sortConfig.key === 'genre') && <ExpandMoreIcon />}

              </Th>
              <Th className="description w-50 data-card-subtitle" scope="col">
                Description
              </Th>

              <Th className="edit data-card-action-links" scope="col">
                Controls
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {recosArray.map((recommendation, index) => {

              if (!!recommendation.docId) return (
                <RequestRow
                  key={index}
                  status={"new"}
                  date={!recommendation.createdAt ? null : toDayMonthYear(recommendation.createdAt)}
                  firstName={recommendation.firstName}
                  lastName={recommendation.lastName}
                  description={recommendation.description}
                  email={recommendation.email}
                  phone={recommendation.phoneNumber}
                  genre={recommendation.genre}
                  address={recommendation.address}
                  deliveryOptions={recommendation.deliveryOptions}
                  recommendationId={recommendation.docId}
                  recommendation={recommendation}
                  deleteRecommendation={deleteRequest}
                  openEdit={openEdit}
                  editRecommendation={editRecommendation}
                  street={recommendation.street}
                  city={recommendation.city}
                  province={recommendation.province}
                  postalCode={recommendation.postalCode}
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

export default Request;
