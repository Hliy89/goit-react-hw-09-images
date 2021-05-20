import React, { useState, useRef, useEffect } from 'react';

import styles from './App.module.css';

import { getImages } from './components/services/images-api';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';

// API KEY  21344507-ba02271db38ebc8131bb42691
// https://pixabay.com/api/?key=21344507-ba02271db38ebc8131bb42691&q=yellow+flowers&image_type=photo
// https://pixabay.com/api/?q=что_искать&page=номер_страницы&key=твой_ключ&image_type=photo&orientation=horizontal&per_page=12

const App = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState('');

  const listRef = useRef(null);

  useEffect(() => {
    if (images.length && currentPage > 2) {
       window.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [images, currentPage]);

  const fetchGallery = (firstQuery = '') => {
    setIsLoading(true);
    const imagesRequest = getImages(firstQuery.length ? firstQuery : searchQuery, currentPage);
 
    imagesRequest
      .then(response => {
        setImages((prevImages) => ([
          ...prevImages,
          ...response.data.hits
        ]));
        
        setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
      }).catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  };
  
  const onChangeQuery = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setImages([]);

    fetchGallery(query);
  };
  
  const toggleModal = (modalImg = "") => {
    setIsModalOpen((isModalOpen) => !isModalOpen);
    setModalImg(modalImg);
  };

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={onChangeQuery} />

        <div ref={listRef}>
          <ImageGallery images={images} openModal={toggleModal} />
        </div>
        
        {isLoading && <h2 style={{color: "red", textAlign: "center"}}>Loading...</h2>}

        {images.length > 0 && <Button fetchGallery={fetchGallery} />}
        
        {isModalOpen && <Modal onClose={toggleModal}>
          <img src={modalImg} alt="" />
        </Modal>}
        
      </div> );
};

export default App;

// class App extends Component {
//   state = {
//     images: [],
//     currentPage: 1,
//     searchQuery: '',
//     isLoading: false,
//     error: null,
//     isModalOpen: false,
//     modalImg: ""
//   };

//   listRef = createRef();

//   getSnapshotBeforeUpdate(prevProps, prevState) {
//     if (prevState.images.length < this.state.images.length) {
//       const { current } = this.listRef;
//       console.log("snapshot: " + current.scrollHeight);
//       return current.scrollHeight
//     }
//     return null
//   }
  
//   componentDidUpdate(prevProps, prevState, snapshot) {
//     if (prevState.searchQuery !== this.state.searchQuery) {
//       this.fetchGallery();
//     };
//     if (snapshot !== null) {
//       console.log("snapshot: " + snapshot);
//       window.scrollTo({
//         top: snapshot,
//         behavior: 'smooth',
//       })
//     }
//   };
  
  
//   onChangeQuery = (query) => {
//     this.setState({
//       searchQuery: query,
//       currentPage: 1,
//       images: [],
//       error: null,
//     });
//   };
  
  // fetchGallery = () => {
  //   const { currentPage, searchQuery } = this.state;

  //   this.setState({ isLoading: true });
  //   const imagesRequest = getImages(searchQuery, currentPage);
 
  //   imagesRequest
  //     .then(response => {
  //       this.setState(prevState => ({
  //         images: [...prevState.images, ...response.data.hits],
  //         currentPage: prevState.currentPage + 1,
  //       }));
  //     }).catch(error => this.setState({error}))
  //     .finally(() => this.setState({ isLoading: false }));
  // };

//   toggleModal = (modalImg = "") => {
//     this.setState(({ isModalOpen }) => ({
//       isModalOpen: !isModalOpen,
//       modalImg
//     }))
//   };

//   render() {
//     const { images, isLoading, isModalOpen, modalImg } = this.state;
    
    // return (
    //   <div className={styles.App}>
    //     <Searchbar onSubmit={this.onChangeQuery} />

    //     <div ref={this.listRef}>
    //       <ImageGallery images={images} openModal={this.toggleModal} />
    //     </div>
        
    //     {isLoading && <h2 style={{color: "red", textAlign: "center"}}>Loading...</h2>}

    //     {images.length > 0 && <Button fetchGallery={this.fetchGallery} />}
        
    //     {isModalOpen && <Modal onClose={this.toggleModal}>
    //       <img src={modalImg} alt="" />
    //     </Modal>}
        
    //   </div> );
//   };
// };
 
// export default App;


