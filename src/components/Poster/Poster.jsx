import React from "react";

import sc from "./Poster.module.css";

import BG from "../../images/computer.png";

const Poster = () => (
  <section className={sc.home}>
    <div className={sc.title}>BIG SALE 50%</div>
    <div className={sc.product}>
      <div className={sc.text}>
        <div className={sc.subtitle}>the bestseller of 2024</div>
        <h1 className={sc.head}>GOOGLE PIXEL 9 PRO XL</h1>
        <button className={sc.button}>Shop Now</button>
      </div>
      <div className={sc.image}>
        <img src={BG} alt="" />
      </div>
    </div>
  </section>
);

export default Poster;
