import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "./config";

// Thunk to submit the Get In Touch form
export const submitGetInTouch = createAsyncThunk(
  "getintouch/submit",
  async (payload, { rejectWithValue }) => {
    try {
      // map fields to API expected shape
      const body = {
        first_name: payload.first_name,
        last_name: payload.last_name,
        phone_number: payload.phone_number,
        email: payload.email,
        message: payload.message,
      };

      const res = await fetch(`${BASE_URL}/authenticationAPP/get_in_touch/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data || { message: "Submit failed" });
      }

      return data; // expected { message: "..." }
    } catch (err) {
      return rejectWithValue({ message: err.message || "Network error" });
    }
  }
);

// Minimal slice (optional) — not yet wired into store, exported for future use
const getInTouchSlice = createSlice({
  name: "getintouch",
  initialState: { loading: false, error: null, successMessage: null },
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearSuccess(state) {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitGetInTouch.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(submitGetInTouch.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload?.message || "Submitted";
        state.error = null;
      })
      .addCase(submitGetInTouch.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || action.error?.message || "Failed";
      });
  },
});

export const { clearError, clearSuccess } = getInTouchSlice.actions;

export default getInTouchSlice.reducer;
