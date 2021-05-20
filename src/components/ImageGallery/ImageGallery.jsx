import React from 'react';
import PropTypes from 'prop-types';

import styles from './ImageGallery.module.css';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, openModal }) => {
  return (
    <>
      <ul className={styles.ImageGallery}>
        {images.map(image => (
          <ImageGalleryItem key={image.id} image={image} onClick={openModal} />
        ))}
      </ul>
    </>
  );
};

ImageGallery.defaultProps = {
  images: [],
  openModal: () => {},
};

ImageGallery.propTypes = {
  images: PropTypes.array,
  openModal: PropTypes.func,
};

export default ImageGallery;
