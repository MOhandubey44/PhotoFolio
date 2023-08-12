import AddAlbum from "./AddAlbumForm"; // Import the AddAlbumForm component
import { useEffect, useState } from "react";
import styles from "./AlbumList.module.css";
import { db } from "../../FirBaseInit";
import { collection, onSnapshot } from "firebase/firestore";

import ImageList from "../imageContainer/imageList"; // Import the ImageList component

function AlbumsList() {
  const [isAddAlbum, setIsAddAlbum] = useState(true); // State to control adding an album
  const [albumsList, setAlbumList] = useState([]); // State to store the list of albums
  const [isAlbumInside, setIsAlbumInside] = useState(false); // State to indicate if an album is selected
  const [selectedAlbum, setSelectedAlbum] = useState(null); // State to store the selected album's data

  useEffect(() => {
    // Use Firestore's onSnapshot to listen for changes in the 'addAlbum' collection
    const unsubscribe = onSnapshot(collection(db, "addAlbum"), (snapshot) => {
      // Create an array of albums with IDs and data from the snapshot
      const albumList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Update the albumsList state with the fetched album data
      setAlbumList(albumList);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Function to handle selecting an album
  const handleAlbumClick = (album) => {
    setSelectedAlbum(album); // Set the selected album
    setIsAlbumInside(true); // Set isAlbumInside to true to display the images inside the album
  };

  // Function to handle the "Add Album" button click
  const handleAddAlbumClick = () => {
    setIsAddAlbum(false); // Set isAddAlbum to false to display the AddAlbumForm component
  };

  // Function to handle the "Cancel" button click
  const handleCancelClick = () => {
    setIsAddAlbum(true); // Set isAddAlbum to true to go back to the albums list view
  };

  return (
    <>
      {isAlbumInside ? ( // Display ImageList if an album is selected, else display the albums list
        <ImageList id={selectedAlbum.id} name={selectedAlbum.name} />
      ) : (
        <div className={styles.albumsList}>
          {isAddAlbum ? null : <AddAlbum />} {/* Display AddAlbumForm if isAddAlbum is false */}
          <div className={styles.albumList_top}>
            <h3>Your Albums</h3>
            <button
              className={isAddAlbum ? styles.addAlbum : styles.cancel}
              onClick={isAddAlbum ? handleAddAlbumClick : handleCancelClick}
            >
              {isAddAlbum ? "add album" : "cancel"}
            </button>
          </div>

          {/* Display the list of albums */}
          <div className={styles.albumList_Container}>
            {albumsList.map((album) => (
              <div
                key={album.id}
                onClick={() => handleAlbumClick(album)}
                className={styles.listCard}
              >
                <img
                  alt="logo"
                  src="https://stalwart-wisp-382f3c.netlify.app/assets/photos.png"
                />
                <span>{album.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default AlbumsList;
