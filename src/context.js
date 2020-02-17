import React, { useState, useEffect } from "react";
import { storeProducts as a, detailProduct as b } from "./data";

const ProductContext = React.createContext();

const ProductProvider = props => {
  const [storeProducts, setStoreProducts] = useState([]);
  const [detailProduct, setDetailProduct] = useState(b);
  const [cart, setCart] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(detailProduct);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const [cartTax, setCartTax] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    setProduct();
  }, []);

  useEffect(() => {
    console.log("useEffect");

    const addTotals = () => {
      let subTotal = 0;
      cart.map(i => (subTotal += i.total));
      const tempTax = subTotal * 0.1;
      const tax = parseFloat(tempTax.toFixed(2));
      const total = subTotal + tax;
      setCartSubTotal(subTotal);
      setCartTax(tax);
      setCartTotal(total);
    };

    addTotals();
    // });
  }, [cart]);

  const setProduct = () => {
    let tempProduct = [];
    a.forEach(i => {
      const singleItem = { ...i };
      tempProduct = [...tempProduct, singleItem];
    });
    setStoreProducts(tempProduct);
  };

  // const qsetProducts = () => {
  //   let tempProsuct = [];
  //   storeProducts.forEach(i => {
  //     const signleItem = { ...i };
  //     tempProsuct = [...tempProsuct, signleItem];
  //   });
  // };

  const getItem = id => {
    const product = storeProducts.find(item => item.id === id);
    return product;
  };

  const handleDetail = id => {
    const product = getItem(id);
    setDetailProduct(product);
  };

  const addToCart = id => {
    let tempProducts = [...storeProducts];
    const index = tempProducts.indexOf(getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;

    setStoreProducts(tempProducts);
    setCart([...cart, product]);
  };

  const openModal = id => {
    const product = getItem(id);
    setModalProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const increment = id => {
    let tempCart = [...cart];
    const selectedProduct = tempCart.find(i => i.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count += 1;
    product.total = product.price * product.count;
    setCart([...tempCart]);
  };

  const decrement = id => {
    let tempCart = [...cart];
    const selectedProduct = tempCart.find(i => i.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    if (product.count !== 1) {
      product.count -= 1;
      product.total = product.price * product.count;
      setCart([...tempCart]);
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

    setStoreProducts(tempProducts);
    setCart(tempCart);
  };

  const clearCart = () => {
    setCart([]);
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
