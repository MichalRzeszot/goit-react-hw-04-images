import React from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => (
  <ul className={styles.gallery}>
    {images.map((image, index) => (
      <ImageGalleryItem
        key={`${image.id}-${index}`}
        webformatURL={image.webformatURL}
        onImageClick={() => onImageClick(image.largeImageURL)}
      />
    ))}
  </ul>
);

export default ImageGallery;
