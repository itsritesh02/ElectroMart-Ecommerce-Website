import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("wishlistItems")) || [],
};

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {
    // ==========================
    // ADD TO WISHLIST
    // ==========================

    addToWishlist: (state, action) => {
      const product = action.payload;

      const alreadyExists = state.items.some((item) => item.id === product._id);

      if (!alreadyExists) {
        state.items.push({
          id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          rating: product.rating,
        });
      }

      localStorage.setItem("wishlistItems", JSON.stringify(state.items));
    },

    // ==========================
    // REMOVE FROM WISHLIST
    // ==========================

    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      localStorage.setItem("wishlistItems", JSON.stringify(state.items));
    },

    // ==========================
    // CLEAR WISHLIST
    // ==========================

    clearWishlist: (state) => {
      state.items = [];

      localStorage.removeItem("wishlistItems");
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
