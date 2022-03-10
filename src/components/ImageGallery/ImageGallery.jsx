import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';
import propTypes from 'prop-types';


const GalleryItem = ({ data }) => {
  return (
    <ul className={s.ImageGallery}>
      {data.map(({id, webformatURL, tags}) => {
        return  <ImageGalleryItem key={id} smallImg={webformatURL} tag={tags} />;
      })}
    </ul>
  );
};

GalleryItem.propTypes = {
  data: propTypes.arrayOf(propTypes.object).isRequired,
};

export default GalleryItem;
