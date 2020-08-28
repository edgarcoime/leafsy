import React, { useState } from "react";
import "./account.css";
import Popover from "../partials/Popover/popover.component";
import GenreBox from "../genreBoxes/genre.boxes";
import { Alert } from "@material-ui/lab";

function EditFormSettings({ updateProfile, currentUser }) {

    const defaultGenres = [
                            "Sci-fi",
                            "Thriller",
                            "Horror",
                            "Fantasy",
                            "Canadian Literature",
                            "Philosophy",
                            "Poetry",
                            "History",
                            "Non-fiction",
                            "Fiction",
                        ];

    // retrieves the current genre array from the data base and if it isn't present, set the default array 
    let currentGenreArray;
    if (currentUser.customGenres) {
        currentGenreArray = currentUser.customGenres.slice(0,);
    }
    
  const [storeInfo, setStoreInfo] = useState({
    originalGenres: currentGenreArray || defaultGenres,
    customGenres: currentUser.customGenres || defaultGenres,
    
  });

  // retreves the custom genre array for maping out all the genres on the screen
    const  {customGenres} = storeInfo;

    // this handles the state of the genre input box
    const [newGenre, setNewGenre] = useState("");

    // handles the change in state of the genre input box as the user types
    function handleChange(event) {

        const {value } = event.target;

        setNewGenre(value);
    }
 
    // handles whether to show the updated icon for user to see once an update request is submitted
  const [updateStatus, setUpdateStatus] = useState(false);

  // adds a genre to the custome genre arraystate in store info
  const updateGenreArray = () => {
    
    // prevents addition of empty strings (newGenre is the state of the genre input box)
      if (newGenre) {

        setStoreInfo((prevSetting) => {
            return {
                ...prevSetting,
                customGenres: [...prevSetting.customGenres, newGenre],
                };
            });

        // empties the genre input box
        setNewGenre("");

      } else {
          // if the input box is empty and user presses "enter" the backend will update
          updateDatabase();
      };
    
  };

  // resets the state of the current custom genres array back to the database version
  const refreshGenreArray = () => {
    
    // sets the current state of the custom genres array back to a copy of the orginal genres array 
    setStoreInfo((prevSetting) => {
        return {
            ...prevSetting,
            customGenres: storeInfo.originalGenres.slice(0,),
            };
        });

    // empties the genre input box
    setNewGenre("");
};
  

// updates the database backend
  const submitSettings = (event) => {
    event.preventDefault();

    updateDatabase();
    
  };

  const updateDatabase = () => {
      // sets the state of the originalgenres array to the current edited custom genres array
    setStoreInfo((prevSetting) => {
        return {
            ...prevSetting,
            originalGenres: prevSetting.customGenres.slice(0,),
            };
        });

    // empties the genre input box
    setNewGenre("");

    // this ensures that only the customGenres array is saved
    const parsedInfo = { customGenres: storeInfo.customGenres }
    console.log(parsedInfo)

    // updates the backend of the user
    updateProfile(parsedInfo);

    // this handles the state of the updated notification for the user to see
    // the notification will appear for 5 seconds
    setUpdateStatus(true);
    setTimeout(() => {
      setUpdateStatus(false);
    }, 5000);

  }

  // removes a genre when you click on it from the custom genre state
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

        {/* displays success message when user sucessfully updates the backend */}
          <div class="row">
            <div class="col-md-12">
              <h4>Edit Information</h4>
              {updateStatus && <Alert severity="success">Genres updated successfully!</Alert>}
              <hr />
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">

              <form onSubmit={clickhandler}>

                  <div className="genre-display-title">
                    <p>Add a custom genre! When you're done editing the genre items, press update to finish.</p>
                  </div>


                <div class="form-group row">
                  {/* adds new items to the custom genre state */}
                  <button
                      name="submit"
                      onClick={updateGenreArray}
                      className="btn btn-primary"
                    >
                      Add Genre
                    </button>     
                    <Popover title="Genre Input" content="Personalize your forms by adding the genres you want your customers to choose from. (e.g. Fantasy). To remove a genre, just press on the box! When you feel like you're done, just press update!" />
                  
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



                <div className="genre-display-container">
                  <div className="genre-display-title">
                    <b>Custom Genres:</b>
                  </div>

                  {/* This will display all the genres the user enters */}
                  {customGenres.map((genre, index) => <GenreBox genre={genre} key={index} index={index} onclick={removeGenre} />)}
                </div>


                <div>

                  {/* this button updates the backend with the current genres displayed to the user */}
                    <button
                        name="submit"
                        onClick={submitSettings}
                        className="btn btn-primary genre-btn-control"
                      >
                        Update
                      </button>     

                      {/* this button erases all the changes the user made to the genre items and restores it with the original items */}
                      <button
                        name="submit"
                        onClick={refreshGenreArray}
                        className="btn btn-primary genre-btn-control"
                      >
                          Restart
                      </button>     

                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditFormSettings;
