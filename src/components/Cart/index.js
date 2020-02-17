import React, { useContext } from "react";
import Title from "../Title";
import CartColumns from "./CartColumns";
import EmptyCart from "./EmptyCart";
import { ProductContext } from "../../context";
import CartList from "./CartList";
import CartTotals from "./CartTotals";
import { Link } from "react-router-dom";

const Cart = props => {
  const prod = useContext(ProductContext);
  const { cart, clearCart } = prod;
  return (
    <section>
      {cart.length > 0 ? (
        <React.Fragment>
          <div>
            <Title name="your" title="cart" />
              <div className="container">
            <div className='row'>
              <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
              <Link to="/">
                <button
                  className="btn btn-outline-danger text-uppercase mb-3 px-3"
                  type="button"
                  onClick={() => clearCart()}
                >
                  clear cart
                </button>
              </Link>
            </div>
              </div>
                </div>
          </div>
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
