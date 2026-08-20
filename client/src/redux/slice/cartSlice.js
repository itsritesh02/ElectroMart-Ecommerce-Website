import { createSlice } from "@reduxjs/toolkit";

// =====================================================
// GET USER CART KEY
// =====================================================

const getCartKey = (userId) => {
  return `cart_${userId}`;
};

// =====================================================
// GET CART FROM LOCAL STORAGE
// =====================================================

const getUserCart = (userId) => {
  if (!userId) {
    return [];
  }

  try {
    return JSON.parse(localStorage.getItem(getCartKey(userId))) || [];
  } catch (error) {
    console.error("Cart Load Error:", error);
    return [];
  }
};

// =====================================================
// INITIAL STATE
// =====================================================

const initialState = {
  items: [],

  // Current logged-in user's ID
  userId: null,
};

// =====================================================
// CART SLICE
// =====================================================

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    // =================================================
    // LOAD CURRENT USER CART
    // =================================================

    loadCart: (state, action) => {
      const userId = action.payload;

      state.userId = userId;

      state.items = getUserCart(userId);
    },

    // =================================================
    // ADD TO CART
    // =================================================

    addToCart: (state, action) => {
      const product = action.payload;

      // User login nahi hai
      if (!state.userId) {
        console.warn("User is not logged in.");
        return;
      }

      // ===============================================
      // FIND EXISTING PRODUCT
      // ===============================================

      const existingItem = state.items.find(
        (item) => item.id === product.id || item.id === product._id,
      );

      // ===============================================
      // PRODUCT ALREADY EXISTS
      // ===============================================

      if (existingItem) {
        existingItem.quantity += product.quantity || 1;
      }

      // ===============================================
      // NEW PRODUCT
      // ===============================================
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

      // ===============================================
      // SAVE CURRENT USER CART
      // ===============================================

      localStorage.setItem(
        getCartKey(state.userId),
        JSON.stringify(state.items),
      );
    },

    // =================================================
    // INCREASE QUANTITY
    // =================================================

    increaseQuantity: (state, action) => {
      if (!state.userId) {
        return;
      }

      const item = state.items.find((item) => item.id === action.payload);

      if (!item) {
        return;
      }

      item.quantity += 1;

      // Save
      localStorage.setItem(
        getCartKey(state.userId),
        JSON.stringify(state.items),
      );
    },

    // =================================================
    // DECREASE QUANTITY
    // =================================================

    decreaseQuantity: (state, action) => {
      if (!state.userId) {
        return;
      }

      const item = state.items.find((item) => item.id === action.payload);

      if (!item) {
        return;
      }

      // Minimum quantity = 1

      if (item.quantity > 1) {
        item.quantity -= 1;
      }

      // Save
      localStorage.setItem(
        getCartKey(state.userId),
        JSON.stringify(state.items),
      );
    },

    // =================================================
    // REMOVE FROM CART
    // =================================================

    removeFromCart: (state, action) => {
      if (!state.userId) {
        return;
      }

      state.items = state.items.filter((item) => item.id !== action.payload);

      // Save
      localStorage.setItem(
        getCartKey(state.userId),
        JSON.stringify(state.items),
      );
    },

    // =================================================
    // CLEAR CURRENT USER CART
    // =================================================

    clearCart: (state) => {
      if (!state.userId) {
        return;
      }

      state.items = [];

      // Remove ONLY current user's cart
      localStorage.removeItem(getCartKey(state.userId));
    },

    // =================================================
    // RESET REDUX CART
    // =================================================
    // IMPORTANT:
    // Logout ke time localStorage wala cart delete
    // nahi karna hai.
    //
    // Sirf Redux state empty karni hai.
    // =================================================

    resetCart: (state) => {
      state.items = [];

      state.userId = null;
    },
  },
});

// =====================================================
// EXPORT ACTIONS
// =====================================================

export const {
  loadCart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  resetCart,
} = cartSlice.actions;

// =====================================================
// EXPORT REDUCER
// =====================================================

export default cartSlice.reducer;
