import React from 'react';
import PropTypes from 'prop-types';

import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, onClick }) => {
  const { webformatURL, tags, largeImageURL } = image;
  return (
    <>
      <li className={styles.ImageGalleryItem}>
        <img
          src={webformatURL}
          alt={tags}
          className={styles.ImageGalleryItemImage}
          onClick={() => onClick(largeImageURL)}
        />
      </li>
    </>
  );
};

ImageGalleryItem.defaultProps = {
  image: {},
  onClick: () => {},
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object,
  onClick: PropTypes.func,
};

export default ImageGalleryItem;
