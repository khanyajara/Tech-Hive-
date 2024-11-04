import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    Products: [],
    loading: false,
    error: null,
  };
  export const dbSlice = createSlice({
    name: "db",
    initialState,
    reducers: {
      setLoading(state) {
        state.loading = true;
        state.error = null;
      },
      setProducts(state, action) {
        state.Products = action.payload;
        state.loading = false;
      },
      setError(state, action) {
        state.error = action.payload;
        state.loading = false;
      }
    },
  });
  // Export actions
  export const { setLoading, setProducts, setError } = dbSlice.actions;
  export default dbSlice.reducer;