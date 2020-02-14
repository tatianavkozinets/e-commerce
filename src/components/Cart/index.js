import React, { useContext } from "react";
import Title from "../Title";
import CartColumns from "./CartColumns";
import EmptyCart from "./EmptyCart";
import { ProductContext } from "../../context";
import CartList from "./CartList";
import CartTotals from "./CartTotals";

const Cart = props => {
  const prod = useContext(ProductContext);
  const { cart } = prod;
  return (
    <section>
      {cart.length > 0 ? (
        <React.Fragment>
          <Title name="your" title="cart" />
          <CartColumns />
          <CartList value={prod} />
          <CartTotals value={prod} history={props.history} />
        </React.Fragment>
      ) : (
        <EmptyCart />
      )}
    </section>
  );
};

export default Cart;
