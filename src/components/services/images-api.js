import axios from "axios";

export const getImages = (searchQuery = '', currentPage = 1) => {
  return axios.get(`https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=21344507-ba02271db38ebc8131bb42691&image_type=photo&orientation=horizontal&per_page=12`);
};
