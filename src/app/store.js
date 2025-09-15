import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/product/productSlice";
import { productAPI } from "../services/productsApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [productAPI.reducerPath]: productAPI.reducer,
    productR: productSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productAPI.middleware),
});

setupListeners(store.dispatch)

