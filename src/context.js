import React, { useEffect, useReducer } from "react";
import { storeProducts as a, detailProduct as b } from "./data";
import shopReducer from "./components/shopReducer.js";
import {
  setStoreProducts,
  setDetailProduct,
  setCart,
  setModalOpen,
  setModalProduct,
  setCartSubTotal,
  setCartTax,
  setCartTotal
} from "./components/type";

const ProductContext = React.createContext();

const ProductProvider = props => {
  const ititialState = {
    storeProducts: [],
    detailProduct: b,
    cart: [],
    modalOpen: false,
    modalProduct: b,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
  };

  const [state, dispatch] = useReducer(shopReducer, ititialState);

  const {
    storeProducts,
    detailProduct,
    cart,
    modalOpen,
    modalProduct,
    cartSubTotal,
    cartTax,
    cartTotal
  } = state;

  useEffect(() => {
    setProduct();
  }, []);

  useEffect(() => {
    const addTotals = () => {
      let subTotal = 0;
      cart.map(i => (subTotal += i.total));
      const tempTax = subTotal * 0.1;
      const tax = parseFloat(tempTax.toFixed(2));
      const total = subTotal + tax;
      dispatch({ type: setCartSubTotal, cartSubTotal: subTotal });
      dispatch({ type: setCartTax, cartTax: tax });
      dispatch({ type: setCartTotal, cartTotal: total });
    };

    addTotals();
  }, [cart]);

  const setProduct = () => {
    let tempProduct = [];
    a.forEach(i => {
      const singleItem = { ...i };
      tempProduct = [...tempProduct, singleItem];
    });
    dispatch({ type: setStoreProducts, storeProducts: tempProduct });
  };

  const getItem = id => {
    const product = storeProducts.find(item => item.id === id);
    return product;
  };

  const handleDetail = id => {
    const product = getItem(id);
    dispatch({ type: setDetailProduct, detailProduct: product });
  };

  const addToCart = id => {
    let tempProducts = [...storeProducts];
    const index = tempProducts.indexOf(getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    dispatch({ type: setStoreProducts, storeProducts: tempProducts });
    dispatch({ type: setCart, cart: [...cart, product] });
  };

  const openModal = id => {
    const product = getItem(id);
    dispatch({ type: setModalProduct, modalProduct: product });
    dispatch({ type: setModalOpen, modalOpen: true });
  };

  const closeModal = () => {
    dispatch({ type: setModalOpen, modalOpen: false });
  };

  const increment = id => {
    let tempCart = [...cart];
    const selectedProduct = tempCart.find(i => i.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count += 1;
    product.total = product.price * product.count;
    dispatch({ type: setCart, cart: [...tempCart] });
  };

  const decrement = id => {
    let tempCart = [...cart];
    const selectedProduct = tempCart.find(i => i.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    if (product.count !== 1) {
      product.count -= 1;
      product.total = product.price * product.count;
      dispatch({ type: setCart, cart: [...tempCart] });
    }
  };

  const removeItem = id => {
    let tempProducts = [...storeProducts];
    const index = tempProducts.indexOf(getItem(id));
    const product = tempProducts[index];
    product.inCart = false;
    product.count = 0;
    product.total = 0;

    let tempCart = [...cart];
    tempCart = tempCart.filter(item => item.id !== id);

    dispatch({ type: setStoreProducts, storeProducts: tempProducts });
    dispatch({ type: setCart, cart: tempCart });
  };

  const clearCart = () => {
    dispatch({ type: setCart, cart: [] });
    setProduct();
  };

  return (
    <ProductContext.Provider
      value={{
        storeProducts,
        detailProduct,
        cart,
        modalOpen,
        modalProduct,
        cartSubTotal,
        cartTax,
        cartTotal,
        handleDetail,
        addToCart,
        openModal,
        closeModal,
        increment,
        decrement,
        removeItem,
        clearCart
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
