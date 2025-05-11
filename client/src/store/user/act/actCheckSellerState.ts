import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

const actCheckUserState = createAsyncThunk('user/getUserState', async () => {
  try {
    const { data } = await axios.get('/api/seller/check-auth');
    if (data.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(axiosErrorHandler(error).message === "Not Authorized" ? null : axiosErrorHandler(error).message);
    return false;
  }
});

export default actCheckUserState;