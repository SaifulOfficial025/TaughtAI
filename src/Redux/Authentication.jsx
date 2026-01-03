import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// import centralized base url from config
import { BASE_URL } from "./config";
import { googleAuth } from "./GoogleAuth";

// Async thunk for signup
export const signup = createAsyncThunk(
  "auth/signup",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/authenticationAPP/signup/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data || { message: "Signup failed" });
      }

      return data; // expected { message: 'successful' }
    } catch (err) {
      return rejectWithValue({ message: err.message || "Network error" });
    }
  }
);

// Async thunk for OTP verification
export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/authenticationAPP/verify_otp/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data || { message: "OTP verification failed" });
      }

      return data; // expected { message: "OTP verified successfully and tokens issued." }
    } catch (err) {
      return rejectWithValue({ message: err.message || "Network error" });
    }
  }
);

// Async thunk for resending OTP
export const resendOTP = createAsyncThunk(
  "auth/resendOTP",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/authenticationAPP/resend_otp/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data || { message: "Failed to resend OTP" });
      }

      return data; // expected { message: "Please verify OTP sent to your email." }
    } catch (err) {
      return rejectWithValue({ message: err.message || "Network error" });
    }
  }
);

// Async thunk for forgot password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BASE_URL}/authenticationAPP/forgot_password/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data || { message: "Failed to send OTP" });
      }

      return data; // expected { message: "OTP sent to your email." }
    } catch (err) {
      return rejectWithValue({ message: err.message || "Network error" });
    }
  }
);

// Async thunk for reset password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/authenticationAPP/reset_password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data || { message: "Password reset failed" });
      }

      return data; // expected { message: "Password reset successful" }
    } catch (err) {
      return rejectWithValue({ message: err.message || "Network error" });
    }
  }
);

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/authenticationAPP/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data || { message: "Login failed" });
      }

      // Store tokens and user data in localStorage
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("access_token", data.access_token);
      // also store camelCase keys for backward compatibility
      //   localStorage.setItem("accessToken", data.access_token);
      //   localStorage.setItem("refreshToken", data.refresh_token);
      localStorage.setItem("profile_data", JSON.stringify(data.profile_data));

      return data; // full response with tokens and profile_data
    } catch (err) {
      return rejectWithValue({ message: err.message || "Network error" });
    }
  }
);

// Async thunk for updating profile (multipart/form-data)
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token =
        state?.auth?.accessToken ||
        localStorage.getItem("access_token") ||
        localStorage.getItem("accessToken");

      const formData = new FormData();
      if (payload.full_name !== undefined)
        formData.append("full_name", payload.full_name);
      if (payload.first_name !== undefined)
        formData.append("first_name", payload.first_name);
      if (payload.last_name !== undefined)
        formData.append("last_name", payload.last_name);
      if (payload.phone_number !== undefined)
        formData.append("phone_number", payload.phone_number);
      if (payload.image) formData.append("image", payload.image);

      const headers = token
        ? { Authorization: `Bearer ${token}`, Accept: "application/json" }
        : { Accept: "application/json" };

      // Debug: log token and headers so we can verify Authorization is present
      // Check browser console when reproducing the request
      console.debug("updateProfile: token:", token);
      console.debug("updateProfile: headers:", headers);

      const res = await fetch(`${BASE_URL}/authenticationAPP/update_profile/`, {
        method: "PUT",
        headers,
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data || { message: "Profile update failed" });
      }

      // API returns: { message, email, first_name, last_name, full_name, phone_number, image }
      const updatedProfile = {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        full_name: data.full_name,
        phone_number: data.phone_number,
        image: data.image,
      };

      localStorage.setItem("profile_data", JSON.stringify(updatedProfile));

      return {
        message: data.message || "Profile updated",
        profile: updatedProfile,
      };
    } catch (err) {
      return rejectWithValue({ message: err.message || "Network error" });
    }
  }
);

// Async thunk to fetch current profile data from server
export const getProfileData = createAsyncThunk(
  "auth/getProfileData",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token =
        state?.auth?.accessToken ||
        localStorage.getItem("access_token") ||
        localStorage.getItem("accessToken");

      const headers = token
        ? { Authorization: `Bearer ${token}`, Accept: "application/json" }
        : { Accept: "application/json" };

      // Debug: log token and headers so we can verify Authorization is present
      // Check browser console when reproducing the request
      console.debug("getProfileData: token:", token);
      console.debug("getProfileData: headers:", headers);

      const res = await fetch(
        `${BASE_URL}/authenticationAPP/get_profile_data/`,
        {
          method: "GET",
          headers,
        }
      );

      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data || { message: "Failed to fetch profile" });
      }

      // API returns: { email, full_name, first_name, last_name, phone_number, image }
      const profileData = {
        email: data.email,
        full_name: data.full_name,
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
        image: data.image,
      };

      // persist profile_data
      localStorage.setItem("profile_data", JSON.stringify(profileData));

      return profileData;
    } catch (err) {
      return rejectWithValue({ message: err.message || "Network error" });
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem("profile_data")) || null,
  accessToken: localStorage.getItem("access_token") || null,
  refreshToken: localStorage.getItem("refresh_token") || null,
  loading: false,
  error: null,
  successMessage: null,
  currentEmail: null, // for OTP flow
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearSuccess(state) {
      state.successMessage = null;
    },
    setCurrentEmail(state, action) {
      state.currentEmail = action.payload;
    },
    logout(state) {
      // Clear localStorage
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("access_token");
      localStorage.removeItem("profile_data");
      localStorage.removeItem("user_email");
      localStorage.removeItem("is_new_user");

      // Clear state
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.currentEmail = null;
      state.error = null;
      state.successMessage = null;
    },
    setUserFromGoogle(state, action) {
      // Used to sync user state from Google auth
      state.user = action.payload.profile_data || null;
      state.accessToken = action.payload.access_token || null;
      state.refreshToken = action.payload.refresh_token || null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup cases
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload?.message || "Signup successful";
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || action.error?.message || "Signup failed";
      })
      // Verify OTP cases
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage =
          action.payload?.message || "OTP verified successfully";
        state.error = null;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "OTP verification failed";
      })
      // Resend OTP cases
      .addCase(resendOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(resendOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage =
          action.payload?.message || "OTP resent successfully";
        state.error = null;
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "Failed to resend OTP";
      })
      // Login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload?.message || "Login successful";
        state.error = null;
        state.user = action.payload?.profile_data || null;
        state.accessToken = action.payload?.access_token || null;
        state.refreshToken = action.payload?.refresh_token || null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || action.error?.message || "Login failed";
      });
    // Update profile cases
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload?.message || "Profile updated";
        state.error = null;
        state.user = action.payload?.profile || state.user;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "Profile update failed";
      });
    // Get profile data cases
    builder
      .addCase(getProfileData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfileData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload || state.user;
        state.error = null;
      })
      .addCase(getProfileData.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "Failed to fetch profile";
      });
    // Forgot password cases
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage =
          action.payload?.message || "OTP sent to your email";
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "Failed to send OTP";
      });
    // Reset password cases
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage =
          action.payload?.message || "Password reset successful";
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "Password reset failed";
      });
    // Google auth cases
    builder
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage =
          action.payload?.message || "Google authentication successful";
        state.error = null;
        state.user = action.payload?.profile_data || null;
        state.accessToken = action.payload?.access_token || null;
        state.refreshToken = action.payload?.refresh_token || null;
      })
      .addCase(googleAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "Google authentication failed";
      });
  },
});

export const {
  clearError,
  clearSuccess,
  setCurrentEmail,
  logout,
  setUserFromGoogle,
} = authSlice.actions;

// export the reducer so it can be combined into a root store
export const authReducer = authSlice.reducer;
