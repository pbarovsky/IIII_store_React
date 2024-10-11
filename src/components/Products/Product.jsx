import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { ROUTES } from "../../utils/routes";

import sc from "./Product.module.css";

import { addItemToCart } from "../../features/user/userSlice";

const SIZES = [1, 1.5, 2];

const Product = (item) => {
  const { title, price, images, description } = item;

  const dispatch = useDispatch();

  const [currentImage, setCurrentImage] = useState();
  const [currentSize, setCurrentSize] = useState();

  useEffect(() => {
    if (!images.length) return;

    setCurrentImage(images[1]);
  }, [images]);

  const addToCart = () => {
    dispatch(addItemToCart(item));
  };

  return (
    <section className={sc.product}>
      <div className={sc.images}>
        <div
          className={sc.current}
          style={{ backgroundImage: `url(${currentImage})` }}
        />
        <div className={sc["images-list"]}>
          {images.map((image, i) => (
            <div
              key={i}
              className={sc.image}
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => setCurrentImage(image)}
            />
          ))}
        </div>
      </div>
      <div className={sc.info}>
        <h1 className={sc.title}>{title}</h1>
        <div className={sc.price}>{price}$</div>
        <div className={sc.color}>
          <span>Color:</span>
        </div>
        <div className={sc.sizes}>
          <span>Sizes:</span>

          <div className={sc.list}>
            {SIZES.map((size) => (
              <div
                onClick={() => setCurrentSize(size)}
                className={`${sc.size} ${
                  currentSize === size ? sc.active : ""
                }`}
                key={size}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <p className={sc.description}>{description}</p>

        <div className={sc.actions}>
          <button
            onClick={addToCart}
            className={sc.add}
            disabled={!currentSize}
          >
            Add to cart
          </button>
          <button className={sc.favourite}>
          <svg className={sc["icon-fav"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
            </svg>
          </button>
        </div>

        <div className={sc.bottom}>
          <div className={sc.purchase}>19 people purchased</div>

          <Link to={ROUTES.HOME}>Return to store</Link>
        </div>
      </div>
    </section>
  );
};

export default Product;
