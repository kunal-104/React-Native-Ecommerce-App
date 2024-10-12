import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';  // Import the cart slice
import productReducer from './features/productSlice'; // Import product slice
const store = configureStore({
  reducer: {
    cart: cartReducer,  // Include cart slice in the Redux store
    products: productReducer,  // Add product reducer to the store
  },
});

export default store;
