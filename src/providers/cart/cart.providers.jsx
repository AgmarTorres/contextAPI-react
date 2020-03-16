import React, { createContext, useState, useEffect } from "react";

import { addItemToCart, removeItemFromCart, getCartItemsCount, filterItemFromCart } from "./cart.utils";

export const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {},
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  clearItemFromCart: () => {},
  cartItemsCount: 0
});

export const CartProvider = ({ children }) => {
  const [hidden, setHidden] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const addItem = item => setCartItems(addItemToCart(cartItems, item)); //similar ao reducer
  const removeItem = item => setCartItems(removeItemFromCart(cartItems, item)); //similar ao reducer
  const toggleHidden = () => {console.log('teste'); setHidden(!hidden);}
  const clearItemFromCart = item => setCartItems( filterItemFromCart ( cartItems, item))

  useEffect(() => {
    setCartItemsCount( getCartItemsCount(cartItems))
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        hidden,
        toggleHidden,
        cartItems,
        addItem,
        removeItem,
        cartItemsCount,
        clearItemFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
