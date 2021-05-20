import React, { Component, createRef } from 'react';

import styles from './App.module.css';

import { getImages } from './components/services/images-api';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';

// API KEY  21344507-ba02271db38ebc8131bb42691
// https://pixabay.com/api/?key=21344507-ba02271db38ebc8131bb42691&q=yellow+flowers&image_type=photo
// https://pixabay.com/api/?q=что_искать&page=номер_страницы&key=твой_ключ&image_type=photo&orientation=horizontal&per_page=12

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
    isModalOpen: false,
    modalImg: ""
  };

  listRef = createRef();

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState.images.length < this.state.images.length) {
      const { current } = this.listRef;
      return current.scrollHeight
    }
    return null
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchGallery();
    };
    if (snapshot !== null) {
      window.scrollTo({
        top: snapshot,
        behavior: 'smooth',
      })
    }
  };
  
  
  onChangeQuery = (query) => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
      error: null,
    });
  };
  
  fetchGallery = () => {
    const { currentPage, searchQuery } = this.state;

    this.setState({ isLoading: true });
    const imagesRequest = getImages(searchQuery, currentPage);
 
    imagesRequest
      .then(response => {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
          currentPage: prevState.currentPage + 1,
        }));
      }).catch(error => this.setState({error}))
      .finally(() => this.setState({ isLoading: false }));
  };

  toggleModal = (modalImg = "") => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
      modalImg
    }))
  };

  render() {
    const { images, isLoading, isModalOpen, modalImg } = this.state;
    
    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.onChangeQuery} />

        <div ref={this.listRef}>
          <ImageGallery images={images} openModal={this.toggleModal} />
        </div>
        
        {isLoading && <h2 style={{color: "red", textAlign: "center"}}>Loading...</h2>}

        {images.length > 0 && <Button fetchGallery={this.fetchGallery} />}
        
        {isModalOpen && <Modal onClose={this.toggleModal}>
          <img src={modalImg} alt="" />
        </Modal>}
        
      </div> );
  };
};
 
export default App;


