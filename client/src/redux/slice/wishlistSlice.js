
import { createSlice } from "@reduxjs/toolkit";

import {
  loginSuccess,
  logout,
} from "./authSlice";


// ==================================================
// GET USER ID
// ==================================================

const getUserId = (user) => {
  return user?._id || user?.id || null;
};


// ==================================================
// GET CURRENT USER
// ==================================================

const getCurrentUser = () => {
  try {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    return user || null;

  } catch (error) {

    return null;

  }
};


// ==================================================
// GET USER WISHLIST
// ==================================================

const getUserWishlist = (userId) => {

  if (!userId) {
    return [];
  }

  try {

    const savedWishlist =
      localStorage.getItem(
        `wishlist_${userId}`
      );

    return savedWishlist
      ? JSON.parse(savedWishlist)
      : [];

  } catch (error) {

    console.error(
      "Get User Wishlist Error:",
      error
    );

    return [];

  }
};


// ==================================================
// SAVE USER WISHLIST
// ==================================================

const saveUserWishlist = (
  userId,
  items
) => {

  if (!userId) {
    return;
  }

  localStorage.setItem(
    `wishlist_${userId}`,
    JSON.stringify(items)
  );

};


// ==================================================
// CURRENT USER
// ==================================================

const currentUser =
  getCurrentUser();

const currentUserId =
  getUserId(currentUser);


// ==================================================
// INITIAL STATE
// ==================================================

const initialState = {

  userId: currentUserId,

  items: getUserWishlist(
    currentUserId
  ),

};


// ==================================================
// WISHLIST SLICE
// ==================================================

const wishlistSlice = createSlice({

  name: "wishlist",

  initialState,

  reducers: {


    // ==================================================
    // SET USER WISHLIST
    // ==================================================

    setUserWishlist: (
      state,
      action
    ) => {

      const userId =
        action.payload;

      state.userId =
        userId;

      state.items =
        getUserWishlist(
          userId
        );

    },


    // ==================================================
    // CLEAR ACTIVE USER
    // ==================================================

    clearActiveWishlist: (
      state
    ) => {

      state.userId = null;

      state.items = [];

    },


    // ==================================================
    // ADD TO WISHLIST
    // ==================================================

    addToWishlist: (
      state,
      action
    ) => {

      const product =
        action.payload;


      // User login hona zaroori hai

      if (!state.userId) {
        return;
      }


      // Check product already exists

      const alreadyExists =
        state.items.some(
          (item) =>
            item.id ===
            product._id
        );


      if (!alreadyExists) {

        state.items.push({

          id: product._id,

          name: product.name,

          price:
            Number(product.price),

          image:
            product.image,

          category:
            product.category,

          rating:
            product.rating,

        });

      }


      // Save current user's wishlist

      saveUserWishlist(
        state.userId,
        state.items
      );

    },


    // ==================================================
    // REMOVE FROM WISHLIST
    // ==================================================

    removeFromWishlist: (
      state,
      action
    ) => {

      if (!state.userId) {
        return;
      }


      state.items =
        state.items.filter(
          (item) =>
            item.id !==
            action.payload
        );


      saveUserWishlist(
        state.userId,
        state.items
      );

    },


    // ==================================================
    // CLEAR WISHLIST
    // ==================================================

    clearWishlist: (
      state
    ) => {

      if (!state.userId) {
        return;
      }


      state.items = [];


      saveUserWishlist(
        state.userId,
        state.items
      );

    },

  },


  // ==================================================
  // AUTH ACTIONS
  // ==================================================

  extraReducers: (
    builder
  ) => {


    // ==================================================
    // LOGIN
    // ==================================================

    builder.addCase(
      loginSuccess,
      (
        state,
        action
      ) => {

        const user =
          action.payload?.user;


        const userId =
          getUserId(user);


        state.userId =
          userId;


        state.items =
          getUserWishlist(
            userId
          );

      }
    );


    // ==================================================
    // LOGOUT
    // ==================================================

    builder.addCase(
      logout,
      (state) => {

        state.userId = null;

        state.items = [];

      }
    );

  },

});


// ==================================================
// ACTIONS
// ==================================================

export const {

  setUserWishlist,

  clearActiveWishlist,

  addToWishlist,

  removeFromWishlist,

  clearWishlist,

} = wishlistSlice.actions;


// ==================================================
// REDUCER
// ==================================================

export default wishlistSlice.reducer;
