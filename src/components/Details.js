import React, { useContext } from "react";
import { ProductContext } from "../context";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";
import Title from "./Title";
// import styled from "styled-components";

const Details = () => {
  const prod = useContext(ProductContext);
  const { id, company, img, info, price, title, inCart } = prod.detailProduct;
  return (
    <div className="container mt-5">
      <Title name="" title={title} />
      <div className="row">
        <div className="col-10 mx-auto col-md-6 my-3">
          <img src={img} className="img-fluid" alt="product" />
        </div>
      </div>
      {/*product text*/}
      <div className="row">
        <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
          <h1>model: {title}</h1>
          <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
            made by : <span className="text-uppercase">{company}</span>
          </h4>
          <h4 className="text-blue">
            <strong>
              price : <span>$</span>
              {price}
            </strong>
          </h4>
          <p className="text-capitalize font-weight-bold mt-3 mb-0">
            some info about product:
          </p>
          <p className="text-muted lead">{info}</p>
          {/*buttons*/}
          <div>
            <Link to="/">
              <ButtonContainer>back to product</ButtonContainer>
            </Link>
            <ButtonContainer
              cart
              disabled={inCart ? true : false}
              onClick={() => {
                prod.addToCart(id);
                prod.openModal(id);
              }}
            >
              {inCart ? "in Cart" : "add to cart"}
            </ButtonContainer>
          </div>
        </div>
      </div>
      {/*end product info*/}
    </div>
  );
};

export default Details;
