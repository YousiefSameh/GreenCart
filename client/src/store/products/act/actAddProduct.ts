import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios, { isAxiosError } from "axios";

const actAddProduct = createAsyncThunk("products/addProduct", async (productData: FormData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("/api/products", productData);
    if (data.success) {
      return data.product;
    } else {
      return data.message;
    }
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
});

export default actAddProduct;