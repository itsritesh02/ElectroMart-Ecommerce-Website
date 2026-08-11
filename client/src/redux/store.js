import { configureStore } from "@reduxjs/toolkit";
import authRducer from './slice/authSlice.js'
import cartReducer from "./slice/cartSlice";
export const store = configureStore({
  reducer: {
    auth: authRducer,

    cart: cartReducer,
  },
});



/*
import { configureStore } from "@reduxjs/toolkit";
// English: Import configureStore from Redux Toolkit.
// Hindi: Redux Toolkit se configureStore import kiya.

import authReducer from "./slice/authSlice.js";
// English: Import the auth reducer from authSlice.
// Hindi: authSlice se authReducer import kiya.
// Note: Variable name should be authReducer (not authRducer).

export const store = configureStore({
  // English: Create the Redux Store.
  // Hindi: Redux Store banaya.

  reducer: {
    // English: Register all reducers here.
    // Hindi: Yaha saare reducers add kiye jaate hain.

    auth: authReducer,
    // English: Register authReducer with the key "auth".
    // Now the Redux state will look like:
    // {
    //   auth: {
    //     user,
    //     token,
    //     isAuthenticated
    //   }
    // }
    //
    // Hindi: authReducer ko "auth" naam se register kiya.
    // Ab Redux State kuch is tarah hogi:
    // {
    //   auth: {
    //     user,
    //     token,
    //     isAuthenticated
    //   }
    // }
  },
}); */