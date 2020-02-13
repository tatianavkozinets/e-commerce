import React, { useState, useContext } from "react";
import { Product } from "./Product";
import { ProductContext } from "../context";
import Title from "./Title";
// import { storeProducts } from "../data";

const ProductList = () => {
  // const [product, setProducts] = useState([]);
  const prod = useContext(ProductContext);
  return (
    <React.Fragment>
      <div className="py-5">
        <div className="container">
          <Title name="our" title="products" />
          <div className="row">
            {prod.storeProducts.map(p => (
              <Product key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductList;
