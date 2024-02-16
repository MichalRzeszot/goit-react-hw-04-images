import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import styles from './App.module.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const apiKey = '41266476-bb46a0bfc74cc3a1da8946be1';

  useEffect(() => {
    if (!searchQuery) return;

    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?q=${encodeURIComponent(
            searchQuery
          )}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
        );
        setImages(prev => [...prev, ...response.data.hits]);
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [searchQuery, page]);

  const handleSearchSubmit = query => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = (imageUrl = '') => {
    setShowModal(!showModal);
    setLargeImageURL(imageUrl);
  };

  return (
    <div className={styles.appContainer}>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onImageClick={toggleModal} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && (
        <Button onClick={handleLoadMore}>Load more</Button>
      )}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
    </div>
  );
};

export default App;
