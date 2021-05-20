import React, { useState } from 'react';

import styles from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.currentTarget.value);
  };

  const reset = () => {
    setQuery('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query);
    reset();
  };

  return (
    <header className={styles.Searchbar}>
      <form onSubmit={handleSubmit} className={styles.SearchForm}>
        <button type="submit" className={styles.SearchFormButton}>
          <span className={styles.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          value={query}
          onChange={handleChange}
          className={styles.SearchFormInput}
          type="text"
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;

// import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// import styles from './Searchbar.module.css';

// class Searchbar extends Component {
//   state = { query: '' };

//   handleChange = e => {
//     this.setState({ query: e.currentTarget.value });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.onSubmit(this.state.query);
//     this.reset();
//   };

//   reset = () => {
//     this.setState({ query: '' });
//   };

//   render() {
//     return (
//       <header className={styles.Searchbar}>
//         <form onSubmit={this.handleSubmit} className={styles.SearchForm}>
//           <button type="submit" className={styles.SearchFormButton}>
//             <span className={styles.SearchFormButtonLabel}>Search</span>
//           </button>

//           <input
//             value={this.state.query}
//             onChange={this.handleChange}
//             className={styles.SearchFormInput}
//             type="text"
//             // autocomplete="off"
//             // autofocus
//             placeholder="Search images and photos"
//           />
//         </form>
//       </header>
//     );
//   }
// }

// Searchbar.defaultProps = {
//   onSubmit: () => {},
// };

// Searchbar.propTypes = {
//   onSubmit: PropTypes.func,
// };

// export default Searchbar;
