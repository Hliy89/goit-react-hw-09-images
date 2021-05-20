import React, { useEffect, useCallback } from 'react';

import styles from './Modal.module.css';

const Modal = ({ onClose, children }) => {
  const handleKeyDown = useCallback(
    e => {
      if (e.code === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className={styles.Overlay} onClick={handleBackDropClick}>
      <div className={styles.Modal}>{children}</div>
    </div>
  );
};

export default Modal;

// import React, { Component } from 'react';
// import { createPortal } from 'react-dom';
// import PropTypes from 'prop-types';

// import styles from './Modal.module.css';

// // const modalRoot = document.querySelector('#modal-root');

// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBackDropClick = e => {
//     if (e.currentTarget === e.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return (
//       <div className={styles.Overlay} onClick={this.handleBackDropClick}>
//         <div className={styles.Modal}>{this.props.children}</div>
//       </div>
//     );
//   }
// }

// Modal.defaultProps = {
//   onClose: () => {},
// };

// Modal.propTypes = {
//   onClose: PropTypes.func,
// };

// export default Modal;
