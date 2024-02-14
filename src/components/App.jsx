import React, { Component } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import styles from './App.module.css';

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    isLoading: false,
    showModal: false,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
  }

  handleSearchSubmit = query => {
    this.setState({ searchQuery: query, page: 1, images: [] });
  };

  fetchImages = async () => {
    const { searchQuery, page } = this.state;

    if (this.state.isLoading) return;

    this.setState({ isLoading: true });

    const apiKey = '41266476-bb46a0bfc74cc3a1da8946be1';
    const url = `https://pixabay.com/api/?q=${encodeURIComponent(
      searchQuery
    )}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;

    try {
      const response = await axios.get(url);
      this.setState(prevState => ({
        images: [...prevState.images, ...response.data.hits],
      }));
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  toggleModal = (largeImageURL = '') => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL,
    }));
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  render() {
    const { images, isLoading, showModal, largeImageURL } = this.state;
    return (
      <div className={styles.appContainer}>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.toggleModal} />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && (
          <Button onClick={this.handleLoadMore} />
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
