import React from "react";
import { Link } from "react-router-dom";

import sc from "./Categories.module.css";

const Categories = ({ title, products = [], amount }) => {
  const list = products.filter((_, i) => i < amount);

  return (
    <section className={sc.section}>
      <h2 className={sc.title}>{title}</h2>

      <div className={sc.list}>
        {list.map(({ id, name }) => (
          <Link to={`/categories/${id}`} key={id} className={sc.item}>
            <h3 className={sc.categories}>{name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
