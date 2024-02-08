import AddAlbum from "./AddAlbumForm"; // Import the AddAlbumForm component
import { useEffect, useState } from "react";
import ReactGA from "react-ga";
import styles from "./AlbumList.module.css";
import { db } from "../../FirBaseInit";
import { collection, onSnapshot } from "firebase/firestore";
import Mixpanel from "mixpanel-browser";

import ImageList from "../imageContainer/imageList"; // Import the ImageList component
// const Mixpanel = require("mixpanel");

function AlbumsList() {
  const [isAddAlbum, setIsAddAlbum] = useState(true);
  const [albumsList, setAlbumList] = useState([]);
  const [isAlbumInside, setIsAlbumInside] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  // useEffect(() => {
  //   mixpanel.track("Page View", { pageName: "AlbumList" });
  // }, []);

  useEffect(() => {
    // Track an event when the component mounts
   
    ReactGA.pageview(window.location.pathname + window.location.search);
    Mixpanel.track("Page View", { page: "MyComponent" });

    const unsubscribe = onSnapshot(collection(db, "addAlbum"), (snapshot) => {
      const albumList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAlbumList(albumList);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Function to handle selecting an album
  const handleAlbumClick = (album) => {
    Mixpanel.track("Album Selected", { albumName: album.name });
    ReactGA.pageview(window.location.pathname + window.location.search);
    setSelectedAlbum(album);
    setIsAlbumInside(true);
  };

  // Function to handle the "Add Album" button click
  const handleAddAlbumClick = () => {
    Mixpanel.track("Add Album Click");
    setIsAddAlbum(false);
  };

  // Function to handle the "Cancel" button click
  const handleCancelClick = () => {
    setIsAddAlbum(true);
  };

  return (
    <>
      {isAlbumInside ? (
        <ImageList id={selectedAlbum.id} name={selectedAlbum.name} />
      ) : (
        <div className={styles.albumsList}>
          {isAddAlbum ? null : <AddAlbum />}
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
