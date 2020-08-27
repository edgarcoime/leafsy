import React, { useState } from "react";
import "./account.css";
import Popover from "../partials/Popover/popover.component";
import GenreBox from "../genreBoxes/genre.boxes";
import { Alert } from "@material-ui/lab";

function EditFormSettings({ updateProfile, currentUser }) {
  const [storeInfo, setStoreInfo] = useState({

    customGenres: currentUser.customGenres || [],
    
  });

    const  {customGenres} = storeInfo;

    const [newGenre, setNewGenre] = useState("")

    function handleChange(event) {

    const {value } = event.target;

    setNewGenre(value);
    }
 

  const [updateStatus, setUpdateStatus] = useState(false);

  const updateGenreArray = () => {

      if (newGenre) {

        setStoreInfo((prevSetting) => {
            return {
                ...prevSetting,
                customGenres: [...prevSetting.customGenres, newGenre],
                };
            });
      };
    
  };

  const submitSettings = (event) => {
    event.preventDefault();

    const parsedInfo = { ...storeInfo }
    console.log(parsedInfo)

    // updates the backend of the user
    updateProfile(parsedInfo);

    setUpdateStatus(true);
    setTimeout(() => {
      setUpdateStatus(false);
    }, 5000);

  };

  const removeGenre = (event) => {
    const {id} = event.target;

    let genreArray = storeInfo.customGenres;

    genreArray.splice(id, 1);

    setStoreInfo((prevSetting) => {
        return {
            ...prevSetting,
            customGenres: genreArray,
            };
        });
  };

  


  const clickhandler = (e) => {
    e.preventDefault()
  }

  return (
    <div class="col-md-9">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-md-12">
              <h4>Edit Information</h4>
              {updateStatus && <Alert severity="success">Profile updated successfully!</Alert>}
              <hr />
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <form onSubmit={clickhandler}>
                <div class="form-group row">
                <button
                      name="submit"
                      onClick={updateGenreArray}
                      className="btn btn-primary"
                    >
                      Add Genre
                    </button>     
                    <Popover title="Genre Input" content="Personalize your forms by adding the genres you want your customers to choose from. (e.g. Fantasy)" />
                  
                  <div class="col-8">
                    <input
                      id="name"
                      name="storeName"
                      value={newGenre}
                      placeholder="Enter A Genre..."
                      className="form-control here"
                      type="text"
                      onChange={handleChange}
                    />
                    
                  </div>
                  
                </div>
                {customGenres.map((genre, index) => <GenreBox genre={genre} key={index} index={index} removeGenre={removeGenre} />)}

                <button
                      name="submit"
                      onClick={submitSettings}
                      className="btn btn-primary"
                    >
                      Update
                    </button>     
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditFormSettings;
