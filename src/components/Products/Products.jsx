import React from "react";
import { Link } from "react-router-dom";

import sc from "./Products.module.css";

const Products = ({ title, style = {}, products = [], amount }) => {
  const list = products.filter((_, i) => i < amount);

  return (
    <section className={sc.products} style={style}>
      {title && <h2>{title}</h2>}

      <div className={sc.list}>
        {list.map(({ id, images, title, category: { name: cat }, price }) => (
          <Link to={`/products/${id}`} key={id} className={sc.product}>
            <div
              className={sc.image}
              style={{ backgroundImage: `url(${images[0]})` }}
            />

            <div className={sc.wrapper}>
              <h3 className={sc.title}>{title}</h3>
              <div className={sc.cat}>{cat}</div>
              <div className={sc.info}>
                <div className={sc.prices}>
                  <div className={sc.price}>{price}$</div>
                  <div className={sc.oldPrice}>{Math.floor(price * 1.35)}$</div>
                </div>

                <div className={sc.purchases}>
                  {Math.floor(Math.random() * 20 + 1)} purchased
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Products;
