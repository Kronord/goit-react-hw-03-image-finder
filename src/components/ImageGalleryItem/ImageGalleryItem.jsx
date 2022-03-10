import React from "react";
import s from "./ImageGalleryItem.module.css";
import propTypes from "prop-types";

const ImageGalleryItem = ({smallImg, tag}) => { 
    return (
      <li className={s.ImageGalleryItem}>
        <img src={smallImg} alt={tag} className={s.ImageGalleryItemImage} />
      </li>
    );
};

ImageGalleryItem.propTypes = {
  smallImg: propTypes.string.isRequired,
  tag: propTypes.string.isRequired,
};

export default ImageGalleryItem;