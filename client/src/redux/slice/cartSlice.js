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
      const product = action.payload;

      const existingProduct = state.items.find(
        (item) => item.id === product._id,
      );

      if (existingProduct) {
        existingProduct.quantity += product.quantity || 1;
      } else {
        state.items.push({
          id: product._id,

          name: product.name,

          price: Number(product.price),

          image: product.image,

          category: product.category,

          quantity: product.quantity || 1,
        });
      }
    },

    // ==========================
    // INCREASE QUANTITY
    // ==========================

    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);

      if (item) {
        item.quantity += 1;
      }
    },

    // ==========================
    // DECREASE QUANTITY
    // ==========================

    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);

      if (!item) {
        return;
      }

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },

    // ==========================
    // REMOVE FROM CART
    // ==========================

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    // ==========================
    // CLEAR CART
    // ==========================

    clearCart: (state) => {
      state.items = [];
    },
  },
});

// ==========================
// ACTIONS
// ==========================

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

// ==========================
// REDUCER
// ==========================

export default cartSlice.reducer;
