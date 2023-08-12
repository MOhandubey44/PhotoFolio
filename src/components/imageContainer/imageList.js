import { db } from "../../FirBaseInit";
import { useEffect, useState } from "react";
import styles from "./imageList.module.css";
import ImageForm from "./imageForm";
import AlbumsList from "../AlbumsList/AlbumsList";
import { collection, deleteDoc, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import Carousel from "./carousel";

export default function ImageList(props) {
  const [isAddAlbum, setIsAddAlbum] = useState(true);
  const [isBack, setIsBack] = useState(false);
  const { id, name } = props;
  const [imageList, setImageList] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [selectedImageurl, setSelectedImageUrl] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [editImageId, setEditImageId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Handle back button click
  const handleBackButton = () => {
    setIsBack(true);
  };

  // Fetch and update the imageList when the component mounts or id/name changes
  useEffect(() => {
    const subcollectionRef = collection(db, "addAlbum", id, name);
    const q = query(subcollectionRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const imageList = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setImageList(imageList);
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, [id, name]);

  // Function to remove an image
  async function removeImage(imageId) {
    const subcollectionRef = collection(db, "addAlbum", id, name);
    const imageDocRef = doc(subcollectionRef, imageId);
    await deleteDoc(imageDocRef);
  }

  // Function to edit an image
  async function editImage(imageId) {
    const subcollectionRef = collection(db, "addAlbum", id, name);
    const imageDocRef = doc(subcollectionRef, imageId);

    const docSnapshot = await getDoc(imageDocRef);

    if (docSnapshot.exists()) {
      const imageData = docSnapshot.data();
      setSelectedImageUrl(imageData.url);
      setSelectedTitle(imageData.title);
      setEditImageId(imageId);
      console.log(editImageId);
    }
    setIsEditMode(true);
    setIsAddAlbum(false);
  }

  // Function to handle image click
  function handleImageClick(index) {
    setSelectedImageIndex(index);
  }

  // Function to handle cancel button click
  function handleCancel() {
    setIsAddAlbum(!isAddAlbum);
    setIsEditMode(false);
  }

  return (
    <>
      {isBack ? (
        <AlbumsList /> // Render AlbumsList component if isBack is true
      ) : (
        <div className={styles.App_content}>
          <div className={styles.imageList_Top}>
            {/* Back button */}
            <span onClick={handleBackButton}>
              <img
                src="https://stalwart-wisp-382f3c.netlify.app/assets/back.png"
                alt="back"
              />
            </span>
            {/* Title indicating the album name and image count */}
            <h3>
              {imageList.length > 0
                ? `Images in ${name}`
                : "No images found in the album."}
            </h3>
            {/* Button to add album or cancel */}
            <button
              className={isAddAlbum ? styles.addButton : styles.cancelButton}
              onClick={handleCancel}
            >
              {isAddAlbum ? "add album" : "cancel"}
            </button>
          </div>

          {/* Render ImageForm component in Edit mode or when not adding a new album */}
          {(isEditMode || !isAddAlbum) && (
            <ImageForm
              id={id}
              name={name}
              isEditMode={isEditMode}
              editImageId={editImageId}
              setEditImageId={setEditImageId}
              setIsEditMode={setIsEditMode}
              selectedTitle={selectedTitle}
              selectedUrl={selectedImageurl}
            />
          )}

          {/* Render Carousel component when an image is selected */}
          {selectedImageIndex !== null && (
            <Carousel
              name={name}
              selectedImageIndex={selectedImageIndex}
              setSelectedImageIndex={setSelectedImageIndex}
              imageList={imageList}
              onClose={() => setSelectedImageIndex(null)}
            />
          )}

          <div className={styles.imagelist_Container}>
            {/* Map and render each image */}
            {imageList.map((image, index) => (
              <div
                key={image.id}
                className={styles.imageList_Content}
                onClick={() => handleImageClick(index, image.title)}
              >
                {/* Edit image button */}
                <div
                  className={styles.imageList_update}
                  onClick={(e) => {
                    e.stopPropagation();
                    editImage(image.id);
                  }}
                >
                  <img
                    src="https://stalwart-wisp-382f3c.netlify.app/assets/edit.png"
                    alt="edit logo"
                  />
                </div>
                {/* Delete image button */}
                <div
                  className={styles.imageList_delete}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(image.id);
                  }}
                >
                  <img
                    src="https://stalwart-wisp-382f3c.netlify.app/assets/trash-bin.png"
                    alt="delete logo"
                  />
                </div>

                {/* Display image */}
                <img
                  src={image.url}
                  alt="NoImage"
                  onError={(e) => {
                    e.target.onError = null;
                    e.target.src =
                      "//stalwart-wisp-382f3c.netlify.app/assets/warning.png";
                  }}
                />
                <span>
                  {/* Display image title */}
                  <h3>{image.title}</h3>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
