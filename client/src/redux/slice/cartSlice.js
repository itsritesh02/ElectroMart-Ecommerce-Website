import { createSlice } from "@reduxjs/toolkit";

// ==========================
// GET CART FROM LOCAL STORAGE
// ==========================

const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
};

// ==========================
// CART SLICE
// ==========================

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    // ==========================
    // ADD TO CART
    // ==========================

    addToCart: (state, action) => {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === product.id || item.id === product._id,
      );

      // ==========================
      // ALREADY EXISTS
      // ==========================

      if (existingItem) {
        existingItem.quantity += product.quantity || 1;
      }

      // ==========================
      // NEW PRODUCT
      // ==========================
      else {
        state.items.push({
          id: product.id || product._id,

          name: product.name,

          price: Number(product.price),

          image: product.image,

          category: product.category,

          quantity: product.quantity || 1,
        });
      }

      // ==========================
      // SAVE TO LOCAL STORAGE
      // ==========================

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    // ==========================
    // INCREASE QUANTITY
    // ==========================

    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);

      if (!item) {
        return;
      }

      item.quantity += 1;

      // ==========================
      // SAVE
      // ==========================

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    // ==========================
    // DECREASE QUANTITY
    // ==========================

    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);

      if (!item) {
        return;
      }

      // ==========================
      // MINIMUM QUANTITY = 1
      // ==========================

      if (item.quantity > 1) {
        item.quantity -= 1;
      }

      // ==========================
      // SAVE
      // ==========================

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    // ==========================
    // REMOVE FROM CART
    // ==========================

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      // ==========================
      // SAVE
      // ==========================

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    // ==========================
    // CLEAR CART
    // ==========================

    clearCart: (state) => {
      state.items = [];

      // ==========================
      // REMOVE LOCAL STORAGE
      // ==========================

      localStorage.removeItem("cartItems");
    },
  },
});

// ==========================
// EXPORT ACTIONS
// ==========================

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

// ==========================
// EXPORT REDUCER
// ==========================

export default cartSlice.reducer;
