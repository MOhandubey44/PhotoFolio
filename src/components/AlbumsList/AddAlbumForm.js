import React, { useState } from 'react';
import styles from "./AddAlbumForm.module.css";
import { db } from '../../FirBaseInit';
import { collection, addDoc } from 'firebase/firestore';

function AddAlbum() {
    // State to manage the input value
    const [inputValue, setInputValue] = useState({ name: '' });

    // Function to handle form submission
    async function handleInput(event) {
        event.preventDefault();
        if (inputValue.name.trim() === '') {
            alert("Please enter a valid album name");
            return;
        }
        
        // Add the album to the Firestore collection
        const docRef = await addDoc(collection(db, "addAlbum"), {
            name: inputValue.name
        });
    }

    return (
        <>
            {/* Album creation form */}
            <div className={styles.albumForm}>
                <span>Create an album</span>
                <form>
                    {/* Input field for album name */}
                    <input
                        placeholder="Album Name"
                        type='text'
                        value={inputValue.name}
                        onChange={(e) => setInputValue({ name: e.target.value })}
                        required
                    />

                    {/* Clear button to reset input */}
                    <button
                        type='button'
                        onClick={() => setInputValue({ name: '' })}>
                        Clear
                    </button>

                    {/* Button to create the album */}
                    <button
                        onClick={handleInput}
                        className={styles.create}>
                        Create
                    </button>
                </form>
            </div>
        </>
    );
}

export default AddAlbum;
