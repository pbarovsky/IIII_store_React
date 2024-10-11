import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import sc from "./Sidebar.module.css";

const Sidebar = () => {
  const { list } = useSelector(({ categories }) => categories);

  const limitedList = list.slice(0, 7);

  return (
    <section className={sc.sidebar}>
      <div className={sc.title}>CATEGORIES</div>
      <nav>
        <ul className={sc.menu}>
          {limitedList.map(({ id, name }) => (
            <li key={id}>
              <NavLink
                className={({ isActive }) =>
                  `${sc.link} ${isActive ? sc.active : ""}`
                }
                to={`/categories/${id}`}
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={sc.footer}>
        <a href="/help" target="_blank" className={sc.link}>
          Help
        </a>
        <a
          href="/terms"
          target="_blank"
          className={sc.link}
          style={{ textDecoration: "underline" }}
        >
          Terms & Conditions
        </a>
      </div>
    </section>
  );
};

export default Sidebar;