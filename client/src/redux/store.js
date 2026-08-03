import { configureStore } from "@reduxjs/toolkit";
import authRducer from './slice/authSlice.js'
export const store = configureStore({
  reducer:{
    auth : authRducer
  }
})
