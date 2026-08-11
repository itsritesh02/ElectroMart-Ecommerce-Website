import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  items: JSON.parse(
    localStorage.getItem("wishlistItems")
  ) || [],
};
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Add product to wishlist
    addToWishlist: (state, action) => {
      const product = action.payload;

      const alreadyExists = state.items.find((item) => item.id === product.id);

      // Agar product already wishlist me nahi hai
      if (!alreadyExists) {
        state.items.push(product);
      }

      // localStorage me save
      localStorage.setItem("wishlistItems", JSON.stringify(state.items));
    },

    // Remove product from wishlist
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      localStorage.setItem("wishlistItems", JSON.stringify(state.items));
    },

    // Clear wishlist
    clearWishlist: (state) => {
      state.items = [];

      localStorage.removeItem("wishlistItems");
    },


  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist
}=wishlistSlice.actions;

export default wishlistSlice.reducer;