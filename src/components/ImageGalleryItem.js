import React from 'react';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, onImageClick }) => (
  <li className={styles.galleryItem} onClick={onImageClick}>
    <img src={webformatURL} alt="" />
  </li>
);

export default ImageGalleryItem;
