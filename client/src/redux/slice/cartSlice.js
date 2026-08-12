import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    // ==========================
    // ADD TO CART
    // ==========================

    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;

      const existingProduct = state.items.find(
        (item) => item.id === product.id || item._id === product._id,
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.items.push({
          ...product,

          quantity: quantity,

          // Cart ke liye consistent ID
          id: product.id || product._id,
        });
      }
    },

    // ==========================
    // REMOVE FROM CART
    // ==========================

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    // ==========================
    // INCREASE QUANTITY
    // ==========================

    increaseQuantity: (state, action) => {
      const product = state.items.find((item) => item.id === action.payload);

      if (product) {
        product.quantity += 1;
      }
    },

    // ==========================
    // DECREASE QUANTITY
    // ==========================

    decreaseQuantity: (state, action) => {
      const product = state.items.find((item) => item.id === action.payload);

      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },

    // ==========================
    // CLEAR CART
    // ==========================

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
