import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
} from "../../features/user/userSlice";

import sc from "./Cart.module.css";
import { sumBy } from "../../utils/common";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector(({ user }) => user);

  const changeQuantity = (item, quantity) => {
    dispatch(addItemToCart({ ...item, quantity }));
  };

  const removeItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  return (
    <section className={sc.cart}>
      <h2 className={sc.title}>Your cart</h2>

      {!cart.length ? (
        <div className={sc.empty}>Here is empty</div>
      ) : (
        <>
          <div className={sc.list}>
            {cart.map((item) => {
              const { title, category, images, price, id, quantity } = item;

              return (
                <div className={sc.item} key={id}>
                  <div
                    className={sc.image}
                    style={{ backgroundImage: `url(${images[0]})` }}
                  />
                  <div className={sc.info}>
                    <h3 className={sc.name}>{title}</h3>
                    <div className={sc.category}>{category.name}</div>
                  </div>

                  <div className={sc.price}>{price}$</div>

                  <div className={sc.quantity}>
                    <div
                      className={sc.minus}
                      onClick={() =>
                        changeQuantity(item, Math.max(1, quantity - 1))
                      }
                    >
                      <svg className="icon">
                        <use
                          xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#minus`}
                        />
                      </svg>
                    </div>

                    <span>{quantity}</span>

                    <div
                      className={sc.plus}
                      onClick={() =>
                        changeQuantity(item, Math.max(1, quantity + 1))
                      }
                    >
                      <svg className="icon">
                        <use
                          xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#plus`}
                        />
                      </svg>
                    </div>
                  </div>

                  <div className={sc.total}>{price * quantity}$</div>

                  <div
                    className={sc.close}
                    onClick={() => removeItem(item.id)}
                  >
                    <svg className="icon">
                      <use
                        xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={sc.actions}>
            <div className={sc.total}>
              TOTAL PRICE:{" "}
              <span>
                {sumBy(cart.map(({ quantity, price }) => quantity * price))}$
              </span>
            </div>

            <button className={sc.proceed}>Proceed to checkout</button>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
