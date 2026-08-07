import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;


/*

import { createSlice } from "@reduxjs/toolkit";
// English: Import createSlice from Redux Toolkit.
// Hindi: Redux Toolkit se createSlice import kiya.

const initialState = {
  // English: Define the initial state of the auth slice.
  // Hindi: Auth slice ki initial state define ki.

  user: JSON.parse(localStorage.getItem("user")) || null,
  // English: Get the user from localStorage and convert it from JSON string to object.
  // If no user exists, set it to null.
  // Hindi: localStorage se user data liya aur JSON.parse() se String ko Object me convert kiya.
  // Agar user nahi mila to null hoga.

  token: localStorage.getItem("token") || null,
  // English: Get the token from localStorage.
  // If no token exists, set it to null.
  // Hindi: localStorage se token liya.
  // Agar token nahi mila to null hoga.

  isAuthenticated: !!localStorage.getItem("token"),
  // English: Check whether the token exists.
  // If token exists → true, otherwise false.
  // Hindi: Check kiya ki token hai ya nahi.
  // Token hai to true, nahi hai to false.
};

const authSlice = createSlice({
  // English: Create a Redux slice.
  // Hindi: Redux Slice banaya.

  name: "auth",
  // English: Name of the slice.
  // Hindi: Slice ka naam.

  initialState,
  // English: Use the initial state.
  // Hindi: Upar define ki hui initial state use ki.

  reducers: {
    // English: Reducers are functions that update the Redux state.
    // Hindi: Reducers state ko update karne wale functions hote hain.

    loginSuccess: (state, action) => {
      // English: Runs after successful login.
      // Hindi: Login successful hone ke baad ye reducer chalega.

      state.user = action.payload.user;
      // English: Save user information in Redux state.
      // Hindi: User ki information Redux State me save ki.

      state.token = action.payload.token;
      // English: Save authentication token in Redux state.
      // Hindi: Token ko Redux State me save kiya.

      state.isAuthenticated = true;
      // English: User is now authenticated.
      // Hindi: User ab login ho chuka hai.

      localStorage.setItem("token", action.payload.token);
      // English: Save token in localStorage.
      // Hindi: Token ko localStorage me save kiya.

      localStorage.setItem("user", JSON.stringify(action.payload.user));
      // English: Convert user object into JSON string and save it.
      // Hindi: User object ko JSON String me convert karke localStorage me save kiya.
    },

    logout: (state) => {
      // English: Runs when the user logs out.
      // Hindi: Logout hone par ye reducer chalega.

      state.user = null;
      // English: Remove user from Redux state.
      // Hindi: Redux State se user hata diya.

      state.token = null;
      // English: Remove token from Redux state.
      // Hindi: Redux State se token hata diya.

      state.isAuthenticated = false;
      // English: Mark the user as not authenticated.
      // Hindi: User ko logout mark kar diya.

      localStorage.removeItem("token");
      // English: Remove token from localStorage.
      // Hindi: localStorage se token delete kar diya.

      localStorage.removeItem("user");
      // English: Remove user data from localStorage.
      // Hindi: localStorage se user data delete kar diya.
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
// English: Export action creators.
// Hindi: Actions ko export kiya taaki dispatch(loginSuccess()) aur dispatch(logout()) use kar saken.

export default authSlice.reducer;
// English: Export the reducer to use in configureStore().
// Hindi: Reducer ko export kiya taaki store.js me configureStore() ke andar use kar saken.
*/

