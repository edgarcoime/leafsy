import React, { useState } from "react";
import "./account.css";
import Popover from "../partials/Popover/popover.component";
import GenreBox from "../genreBoxes/genre.boxes";
import { Alert } from "@material-ui/lab";

function EditFormSettings({ updateProfile, currentUser }) {

    // retrieves the current genre array from the data base and if it isn't present, set the default array 
    let currentGenreArray;
    if (currentUser.customGenres) {
        currentGenreArray = currentUser.customGenres.slice(0,);
    }
    
  const [storeInfo, setStoreInfo] = useState({
    originalGenres: currentGenreArray || [
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
                                                        ],
    customGenres: currentUser.customGenres || [
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
                                            ],
    
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
              {updateStatus && <Alert severity="success">Genres updated successfully!</Alert>}
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

                {/* This will display all the genres the user enters */}
                {customGenres.map((genre, index) => <GenreBox genre={genre} key={index} index={index} removeGenre={removeGenre} />)}

                <button
                      name="submit"
                      onClick={submitSettings}
                      className="btn btn-primary"
                    >
                      Update
                    </button>     

                    <button
                      name="submit"
                      onClick={refreshGenreArray}
                      className="btn btn-primary"
                    >
                        Restart
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
