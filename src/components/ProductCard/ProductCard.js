import React, { useState } from 'react';
import { navigate } from 'gatsby';
import * as styles from './ProductCard.module.css';

import Icon from '../Icons/Icon';
import CurrencyFormatter from '../CurrencyFormatter';

const ProductCard = (props) => {
  const [isWishlist, setIsWishlist] = useState(false);
  const {
    id,
    image,
    imageAlt,
    name,
    price,
    gallery,
    originalPrice,
    meta,
    showQuickView,
    height = 580,
  } = props;

  const handleRouteToProduct = () => {
    navigate(`/product/sample?id=${id}`);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    showQuickView();
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    setIsWishlist(!isWishlist);
  };

  return (
    <div className={styles.root}>
      <div
        className={styles.imageContainer}
        onClick={() => handleRouteToProduct()}
        role={'presentation'}
      >
        <img
          style={{ height: `${height}px` }}
          src={gallery[0]}
          alt={imageAlt}
        ></img>
        <div
          className={styles.bagContainer}
          role={'presentation'}
          onClick={(e) => handleQuickView(e)}
        >
          <Icon symbol={'bagPlus'} />
        </div>
        <div
          className={styles.heartContainer}
          role={'presentation'}
          onClick={(e) => handleFavorite(e)}
        >
          <Icon symbol={'heart'} />
          <div
            className={`${styles.heartFillContainer} ${
              isWishlist === true ? styles.show : styles.hide
            }`}
          >
            <Icon symbol={'heartFill'}></Icon>
          </div>
        </div>
      </div>
      <div className={styles.detailsContainer}>
        <span className={styles.productName}>{name}</span>
        <div className={styles.prices}>
          <span
            className={`${originalPrice !== undefined ? styles.salePrice : ''}`}
          >
            ${price}
          </span>
          {originalPrice && (
            <span className={styles.originalPrice}>${originalPrice}</span>
          )}
        </div>
        <span className={styles.meta}>{meta}</span>
      </div>
    </div>
  );
};

export default ProductCard;
