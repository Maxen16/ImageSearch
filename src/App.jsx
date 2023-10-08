import axios from 'axios';
import  { useRef, useState, useEffect, useCallback } from "react";
import './index.css';
import { Form, Button } from "react-bootstrap";


const API_URL = 'https://api.unsplash.com/search/photos';
const IMAGES_PER_PAGE = 20;


const App = () => {

const [loading, setLoading] = useState(false);
const searchInput= useRef(null);
const [images, setImages]= useState([]);
const [totalPages, setTotalPages]= useState(0);
const [page, setPage] = useState(1);
const [errorMsg, setErrorMsg] = useState();

const fetchImages = useCallback(async () => {
  try {
    if (searchInput.current.value) {
      setErrorMsg('');
      setLoading(true);
    const { data } = await axios.get(
      `${API_URL}?query=${
        searchInput.current.value
      }&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${
        import.meta.env.VITE_API_KEY
      }`
    );
    console.log('data', data);
    setImages(data.results);
    setTotalPages(data.total_pages);
    setLoading(false);
    }
  } catch (error) {
    setErrorMsg('Error fetching images. Try again later.');
    console.log(error);
    setLoading(false);
  }
},[page]);

useEffect(() => {
  fetchImages();
}, [fetchImages]);


const resetSearch = () => {
  setPage(1);
  fetchImages();
};

const handleClick = (event) => {
  event.preventDefault();
  resetSearch();
}
const handleSelection = (selection) => {
  searchInput.current.value = selection;
  resetSearch();
}

  return (
  <div className="container">
    <h1 className="title">Image Searcher</h1>
    {errorMsg && <p className='error-msg'>{errorMsg}</p>}
    <div className="search-section" >
      <Form className='form-container' onSubmit={handleClick}>
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
    {loading ? (
      <div className='loader'>
        <div className='circle'></div>
        <div className='circle'></div>
        <div className='circle'></div>
        <div className='circle'></div>
        <div className='circle'></div>
      </div>):(
    <>
      <div className='images'>
        {images.map((image) => (
        <img
          key={image.id}
          src={image.urls.small}
          alt={image.alt_description}
          className='image'
        />
        ))}
      </div>
      <div className='buttons'>
        {page > 1 && (<Button onClick={() => setPage(page - 1)}>Previous</Button>)}
        {page < totalPages && (<Button onClick={() => setPage(page + 1)}>Next</Button>)}
      </div>
    </>
    )}
  </div>
);
};

export default App;

