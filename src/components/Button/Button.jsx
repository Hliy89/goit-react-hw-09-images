import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.module.css';

const Button = ({ fetchGallery }) => {
  return (
    <button type="button" className={styles.Button} onClick={fetchGallery}>
      Load more...
    </button>
  );
};

Button.defaultProps = {
  fetchGallery: () => {},
};

Button.propTypes = {
  fetchGallery: PropTypes.func,
};

export default Button;
