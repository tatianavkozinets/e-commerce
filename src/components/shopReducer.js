import {
  setStoreProducts,
  setDetailProduct,
  setCart,
  setModalOpen,
  setModalProduct,
  setCartSubTotal,
  setCartTax,
  setCartTotal
} from "./type";

const shopReducer = (state, action) => {
  switch (action.type) {
    case setStoreProducts:
      return {
        ...state,
        storeProducts: action.storeProducts
      };
    case setDetailProduct:
      return {
        ...state,
        detailProduct: action.detailProduct
      };
    case setCart:
      return {
        ...state,
        cart: action.cart
      };
    case setModalOpen:
      return {
        ...state,
        modalOpen: action.modalOpen
      };
    case setModalProduct:
      return {
        ...state,
        modalProduct: action.modalProduct
      };
    case setCartSubTotal:
      return {
        ...state,
        cartSubTotal: action.cartSubTotal
      };
    case setCartTax:
      return {
        ...state,
        cartTax: action.cartTax
      };
    case setCartTotal:
      return {
        ...state,
        cartTotal: action.cartTotal
      };
    default:
      return state;
  }
};
export default shopReducer;
