import { useState, useEffect } from "react";
import styles from "./imageForm.module.css";
import { db } from "../../FirBaseInit";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

export default function ImageForm(props) {
  const [input, setInput] = useState({
    title: "",
    url: "",
  });

  const {
    id,
    name,
    editImageId,
    isEditMode,
    setEditImageId,
    setIsEditMode,
    selectedTitle,
    selectedUrl,
  } = props;

  // Console logs for debugging
  console.log(id, name);
  console.log(isEditMode);
  console.log(editImageId);

  // useEffect to update input fields when switching between Add and Edit mode
  useEffect(() => {
    if (isEditMode) {
      setInput({
        title: selectedTitle,
        url: selectedUrl,
      });
    } else {
      setInput({
        title: "",
        url: "",
      });
    }
  }, [isEditMode, selectedTitle, selectedUrl]);

  // Function to handle updating a subcollection document
  async function handleUpdateSubcollection(event) {
    event.preventDefault();

    try {
      const documentRef = doc(db, "addAlbum", id);

      await updateDoc(doc(collection(documentRef, name), editImageId), {
        title: input.title,
        url: input.url,
      });

      setInput({
        title: "",
        url: "",
      });

      setEditImageId(null);
      setIsEditMode(false);

      console.log("Subcollection document updated successfully!");
    } catch (error) {
      console.error("Error updating subcollection document: ", error);
    }
  }

  // Function to handle adding a new subcollection document
  async function handleAddSubcollection(event) {
    event.preventDefault();
    setIsEditMode(false);
    console.log(isEditMode);
    try {
      const documentRef = doc(db, "addAlbum", id);

      await addDoc(collection(documentRef, name), {
        title: input.title,
        url: input.url,
      });

      setInput({
        title: "",
        url: "",
      });

      console.log("Subcollection document added successfully!");
    } catch (error) {
      console.error("Error adding subcollection document: ", error);
    }
  }

  // Function to handle clearing input fields and switching out of Edit mode
  function handleOnclear() {
    setIsEditMode(false);
    setInput({ title: "", url: "" });
  }

  return (
    <div className={styles.image_Form}>
      {/* Display mode information */}
      <span>
        {isEditMode
          ? `Update image ${selectedTitle}`
          : `Add image to ${name}`}
      </span>
      <form>
        {/* Input field for image title */}
        <input
          type="text"
          value={input.title}
          placeholder="Title"
          onChange={(e) => setInput({ ...input, title: e.target.value })}
          required
        />
        
        {/* Input field for image URL */}
        <input
          value={input.url}
          placeholder="Enter URL"
          onChange={(e) => setInput({ ...input, url: e.target.value })}
          required
        />

        {/* Buttons for Clear and Submit */}
        <div className={styles.imageButtons}>
          <button type="button" onClick={handleOnclear}>
            Clear
          </button>
          <button
            type="submit"
            onClick={isEditMode ? handleUpdateSubcollection : handleAddSubcollection}
          >
            {isEditMode ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
