import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store";

const getCartTotalQuantitySelector = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    let totalQuantity = 0
    for (const item in items) {
      totalQuantity += items[item];
    }
    return totalQuantity;
  }
);

const getCartTotalPriceSelector = createSelector(
  (state: RootState) => state.cart.items,
  (state: RootState) => state.products.products,
  (items, products) => {
    let totalPrice = 0;
    for (const item in items) {
      const itemInfo = products.find((product) => product._id === item);
      if (items[item] > 0 && itemInfo) {
        totalPrice += itemInfo?.offerPrice * items[item];
      }
    }
    return Math.floor(totalPrice * 100) / 100;
  }
)

export { getCartTotalQuantitySelector, getCartTotalPriceSelector };