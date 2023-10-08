import axios from 'axios';
import React, { useRef, useState } from "react";
import './index.css';
import { Form, FormControl } from "react-bootstrap";


const API_URL = 'https://api.unsplash.com/search/photos';
const IMAGES_PER_PAGE = 20;


const App = () => {

  
const searchInput= useRef(null);
const [images, setImages]= useState([]);
const [totalPages, setTotalPages]= useState(0);

const fetchImages = async () => {
  try {
    const { data } = await axios.get(
      `${API_URL}?query=${
        searchInput.current.value
      }&page=1&per_page=${IMAGES_PER_PAGE}&client_id=${
        import.meta.env.VITE_API_KEY
      }`
    );
    console.log('data', data);
    setImages(data.results);
    setTotalPages(data.total_pages);
  } catch (error) {
    console.log(error);
  }
};


const handleClick = (event) => {
  event.preventDefault();
  fetchImages();
}
const handleSelection = (selection) => {
  searchInput.current.value = selection;
  fetchImages();
}

  return (
  <div className="container">
    <h1 className="title">Image Searcher</h1>
    <div className="search-section" >
      <Form onSubmit={handleClick}>
        <Form.Control type="search" placeholder="Search images here" className="search-input" ref={searchInput}/>
      </Form>
    </div>
    <div className="filters">
      <div onClick={()=> handleSelection('Space')}>Space</div>
      <div onClick={()=> handleSelection('Pets')}>Pets</div>
      <div onClick={()=> handleSelection('Birds')}>Birds</div>
      <div onClick={()=> handleSelection('Nature')}>Nature</div>
      <div onClick={()=> handleSelection('Sea')}>Sea</div>
    </div>
    <div className='images'>
  {images.map((image) => (
      <img
        key={image.id}
        src={image.urls.small}
        alt={image.alt_description}
        className='image'
      />)
  )}
</div>
  </div>
);
};

export default App;

