import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import sc from "./Header.module.css";

import { ROUTES } from "../../utils/routes";

import LOGO from "../../images/logo.svg";
import AVATAR from "../../images/avatar.png";

import { toggleForm } from "../../features/user/userSlice";
import { useGetProductsQuery } from "../../features/api/apiSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const { currentUser, cart } = useSelector(({ user }) => user);

  const [values, setValues] = useState({ name: "Guest", avatar: AVATAR });

  const { data, isLoading } = useGetProductsQuery({ title: searchValue });

  useEffect(() => {
    if (!currentUser) return;

    setValues(currentUser);
  }, [currentUser]);

  const handleClick = () => {
    if (!currentUser) dispatch(toggleForm(true));
    else navigate(ROUTES.PROFILE);
  };

  const handleSearch = ({ target: { value } }) => {
    setSearchValue(value);
  };

  return (
    <div className={sc.header}>
      <div className={sc.logo}>
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt="Store" />
        </Link>
      </div>

      <div className={sc.info}>
        <div className={sc.user} onClick={handleClick}>
          <div
            className={sc.avatar}
            style={{ backgroundImage: `url(${values.avatar})` }}
          />
          <div className={sc.username}>{values.name}</div>
        </div>

        <form className={sc.form}>
          <div className={sc.icon}>
            <svg className="icon">
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
            </svg>
          </div>
          <div className={sc.input}>
            <input
              type="search"
              name="search"
              placeholder="Search..."
              autoComplete="off"
              onChange={handleSearch}
              value={searchValue}
            />
          </div>

          {searchValue && (
            <div className={sc.box}>
              {isLoading
                ? "Loading"
                : !data.length
                ? "No results"
                : data.map(({ title, images, id }) => {
                    return (
                      <Link
                        key={id}
                        onClick={() => setSearchValue("")}
                        className={sc.item}
                        to={`/products/${id}`}
                      >
                        <div
                          className={sc.image}
                          style={{ backgroundImage: `url(${images[0]})` }}
                        />
                        <div className={sc.title}>{title}</div>
                      </Link>
                    );
                  })}
            </div>
          )}
        </form>

        <div className={sc.account}>
          <Link to={ROUTES.HOME} className={sc.favourites}>
            <svg className={sc["icon-fav"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
            </svg>
          </Link>

          <Link to={ROUTES.CART} className={sc.cart}>
            <svg className={sc["icon-cart"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
            </svg>
            {!!cart.length && (
              <span className={sc.count}>{cart.length}</span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
