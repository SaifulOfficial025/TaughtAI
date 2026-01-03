import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "./config";

const GOOGLE_CLIENT_ID =
  "645447499974-0o8mcte7sdv4k6i1m6a0rrm4tcbord4j.apps.googleusercontent.com";

// Async thunk for Google authentication with ID token
export const googleAuth = createAsyncThunk(
  "googleAuth/authenticate",
  async (idToken, { rejectWithValue }) => {
    try {
      // Decode the ID token to extract email
      const base64Url = idToken.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      const tokenData = JSON.parse(jsonPayload);
      const email = tokenData.email;

      const res = await fetch(`${BASE_URL}/authenticationAPP/google/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          auth_provider: "google",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(
          data || { message: "Google authentication failed" }
        );
      }

      // Store tokens and user data in localStorage
      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
      }
      if (data.refresh_token) {
        localStorage.setItem("refresh_token", data.refresh_token);
      }
      if (data.profile_data) {
        localStorage.setItem("profile_data", JSON.stringify(data.profile_data));
      }
      if (data.email) {
        localStorage.setItem("user_email", data.email);
      }
      if (data.is_new_user !== undefined) {
        localStorage.setItem("is_new_user", String(data.is_new_user));
      }

      return data;
    } catch (err) {
      return rejectWithValue({ message: err.message || "Network error" });
    }
  }
);

const googleAuthSlice = createSlice({
  name: "googleAuth",
  initialState: {
    loading: false,
    error: null,
    successMessage: null,
    user: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.profile_data || action.payload.user;
        state.successMessage =
          action.payload.message || "Google authentication successful";
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.payload?.detail ||
          action.error?.message ||
          "Google authentication failed";
      });
  },
});

export const { clearError, clearSuccess } = googleAuthSlice.actions;
export default googleAuthSlice.reducer;

// Helper function to trigger Google Sign-In in a popup window
export const initiateGoogleAuthPopup = (callback) => {
  const redirectUri = `${window.location.origin}/auth/google/callback`;

  const authUrl =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${GOOGLE_CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `response_type=id_token&` +
    `scope=openid email profile&` +
    `nonce=${Math.random().toString(36).substring(2)}&` +
    `prompt=select_account`;

  // Open popup window
  const width = 500;
  const height = 600;
  const left = window.innerWidth / 2 - width / 2 + window.screenX;
  const top = window.innerHeight / 2 - height / 2 + window.screenY;

  const popup = window.open(
    authUrl,
    "Google Sign In",
    `width=${width},height=${height},left=${left},top=${top},toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes`
  );

  // Listen for message from popup
  const handleMessage = (event) => {
    if (event.origin !== window.location.origin) return;

    if (event.data.type === "GOOGLE_AUTH_SUCCESS" && event.data.idToken) {
      window.removeEventListener("message", handleMessage);
      callback(event.data.idToken);
    } else if (event.data.type === "GOOGLE_AUTH_ERROR") {
      window.removeEventListener("message", handleMessage);
      alert("Google authentication failed. Please try again.");
    }
  };

  window.addEventListener("message", handleMessage);

  // Cleanup if popup is closed manually
  const checkPopup = setInterval(() => {
    if (!popup || popup.closed) {
      clearInterval(checkPopup);
      window.removeEventListener("message", handleMessage);
    }
  }, 1000);
};

// Export client ID for use in components
export { GOOGLE_CLIENT_ID };
