import React from 'react';
import styles from './carousel.module.css'
export default function Carousel({selectedImageIndex, onClose, imageList, setSelectedImageIndex}){
    
    const handlePrev = ()=>{
        setSelectedImageIndex((prevIndex)=>(prevIndex===0? imageList.length-1: prevIndex-1));
    }
    
    const handleNext=()=>{
        setSelectedImageIndex((prevIndex)=>(prevIndex===imageList.length-1? 0: prevIndex+1));
    }

    const selectedImage = imageList[selectedImageIndex];
    return(
        <div className={styles.Carousel_conatainer}>
            <button onClick={onClose}>X</button>
            <button onClick={handlePrev}> {'<'}</button>
            <img src={selectedImage.url} alt={selectedImage.title}></img>
            <button onClick={handleNext}> {'>'} </button>
        </div>
    )
}