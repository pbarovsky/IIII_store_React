import React from "react";

import sc from "./Banner.module.css";

import bannerImg from "../../images/banner.png";

const Banner = () => (
  <section className={sc.banner}>
    <div className={sc.left}>
      <p className={sc.content}>
        THE BIGGEST
        <span>SALES</span>
      </p>
      <button className={sc.more}>See more</button>
    </div>

    <div
      className={sc.right}
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      <p className={sc.discount}>
        save up to <span>50%</span> off
      </p>
    </div>
  </section>
);

export default Banner;
