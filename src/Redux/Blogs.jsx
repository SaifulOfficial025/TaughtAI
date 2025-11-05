import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "./config";

// Fetch a single page (page number provided) - useful for paginated UI
export const fetchBlogsPage = createAsyncThunk(
  "blogs/fetchPage",
  async (page = 1, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token =
        state?.auth?.accessToken ||
        localStorage.getItem("access_token") ||
        localStorage.getItem("accessToken");
      const headers = token
        ? { Authorization: `Bearer ${token}`, Accept: "application/json" }
        : { Accept: "application/json" };

      const res = await fetch(`${BASE_URL}/blog/blogs/?page=${page}`, {
        headers,
      });
      const data = await res.json();
      if (!res.ok)
        return rejectWithValue(data || { message: "Failed to fetch blogs" });
      // Expected shape: { count, next, previous, results }
      return { page, ...data };
    } catch (err) {
      return rejectWithValue({ message: err.message || "Network error" });
    }
  }
);

// Fetch ALL pages and collect results (follows next links). This is useful when
// the UI wants the complete list instead of paginated requests.
export const fetchAllBlogs = createAsyncThunk(
  "blogs/fetchAll",
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

      let page = 1;
      let all = [];
      let count = 0;
      while (true) {
        const res = await fetch(`${BASE_URL}/blog/blogs/?page=${page}`, {
          headers,
        });
        const data = await res.json();
        if (!res.ok)
          return rejectWithValue(data || { message: "Failed to fetch blogs" });
        all = all.concat(data.results || []);
        count = data.count || all.length;
        if (!data.next) break;
        page += 1;
      }
      return { count, results: all };
    } catch (err) {
      return rejectWithValue({ message: err.message || "Network error" });
    }
  }
);

// Fetch details for a single blog
export const fetchBlogDetails = createAsyncThunk(
  "blogs/fetchDetails",
  async (blog_id, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token =
        state?.auth?.accessToken ||
        localStorage.getItem("access_token") ||
        localStorage.getItem("accessToken");
      // Some servers expect the blog_id in the request body (Postman used a
      // raw JSON body). Use POST with a JSON body so payload is reliably
      // received. Include Content-Type and Accept headers, and Authorization
      // when available.
      const headers = token
        ? {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          }
        : { "Content-Type": "application/json", Accept: "application/json" };

      const res = await fetch(`${BASE_URL}/blog/get_blog_details/`, {
        method: "POST",
        headers,
        body: JSON.stringify({ blog_id }),
      });
      const data = await res.json();
      if (!res.ok)
        return rejectWithValue(
          data || { message: "Failed to fetch blog details" }
        );
      return data;
    } catch (err) {
      return rejectWithValue({ message: err.message || "Network error" });
    }
  }
);

// React/unreact to a blog
export const reactBlog = createAsyncThunk(
  "blogs/react",
  async ({ blog_id, react_status }, { getState, rejectWithValue }) => {
    try {
      // try to obtain token from redux auth slice or localStorage
      const state = getState();
      const token =
        state?.auth?.accessToken ||
        localStorage.getItem("access_token") ||
        localStorage.getItem("accessToken");

      const headers = token
        ? {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        : { "Content-Type": "application/json" };

      const res = await fetch(`${BASE_URL}/blog/react_yes_no/`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ blog_id, react_status }),
      });
      const data = await res.json();
      if (!res.ok)
        return rejectWithValue(data || { message: "Failed to react" });
      // return useful info for reducer
      return { blog_id, react_status, data };
    } catch (err) {
      return rejectWithValue({ message: err.message || "Network error" });
    }
  }
);

// Add a comment or reply to a blog
export const addCommentOrReply = createAsyncThunk(
  "blogs/addCommentOrReply",
  async (
    { blog_id, comment_text, parent_id = null },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState();
      const token =
        state?.auth?.accessToken ||
        localStorage.getItem("access_token") ||
        localStorage.getItem("accessToken");

      const headers = token
        ? {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          }
        : { "Content-Type": "application/json", Accept: "application/json" };

      const body = { blog_id, comment_text };
      if (parent_id) body.parent_id = parent_id;

      const res = await fetch(`${BASE_URL}/blog/add_comment_or_reply/`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok)
        return rejectWithValue(data || { message: "Failed to add comment" });
      // return the created comment or the updated comment tree
      return data;
    } catch (err) {
      return rejectWithValue({ message: err.message || "Network error" });
    }
  }
);

// Edit an existing comment
export const editComment = createAsyncThunk(
  "blogs/editComment",
  async ({ comment_id, comment_text }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token =
        state?.auth?.accessToken ||
        localStorage.getItem("access_token") ||
        localStorage.getItem("accessToken");

      const headers = token
        ? {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          }
        : { "Content-Type": "application/json", Accept: "application/json" };

      const res = await fetch(`${BASE_URL}/blog/edit_comment/`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ comment_id, comment_text }),
      });
      const data = await res.json();
      if (!res.ok)
        return rejectWithValue(data || { message: "Failed to edit comment" });
      return { comment_id, comment_text, data };
    } catch (err) {
      return rejectWithValue({ message: err.message || "Network error" });
    }
  }
);

// Delete a comment
export const deleteComment = createAsyncThunk(
  "blogs/deleteComment",
  async ({ comment_id }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token =
        state?.auth?.accessToken ||
        localStorage.getItem("access_token") ||
        localStorage.getItem("accessToken");

      const headers = token
        ? {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          }
        : { "Content-Type": "application/json", Accept: "application/json" };

      const res = await fetch(`${BASE_URL}/blog/delete_comment/`, {
        method: "DELETE",
        headers,
        body: JSON.stringify({ comment_id }),
      });
      const data = await res.json();
      if (!res.ok)
        return rejectWithValue(data || { message: "Failed to delete comment" });
      return { comment_id, data };
    } catch (err) {
      return rejectWithValue({ message: err.message || "Network error" });
    }
  }
);

export const updateCommentLike = createAsyncThunk(
  "blogs/updateCommentLike",
  async ({ comment_id, flag }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token =
        state?.auth?.accessToken ||
        localStorage.getItem("access_token") ||
        localStorage.getItem("accessToken");

      const headers = token
        ? {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          }
        : { "Content-Type": "application/json", Accept: "application/json" };

      const res = await fetch(`${BASE_URL}/blog/update_comment_like/`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ comment_id, flag }),
      });
      const data = await res.json();
      if (!res.ok)
        return rejectWithValue(
          data || { message: "Failed to update comment like" }
        );
      return { comment_id, flag, data };
    } catch (err) {
      return rejectWithValue({ message: err.message || "Network error" });
    }
  }
);

const initialState = {
  items: [], // aggregated blog list
  count: 0,
  loading: false,
  error: null,
  detail: null,
  detailLoading: false,
  page: 1,
  totalPages: 1,
  next: null,
  previous: null,
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    clearBlogs(state) {
      state.items = [];
      state.count = 0;
      state.page = 1;
      state.next = null;
      state.previous = null;
      state.totalPages = 1;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogsPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogsPage.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.page = action.payload.page || 1;
        state.count = action.payload.count || 0;
        state.next = action.payload.next || null;
        state.previous = action.payload.previous || null;
        state.items = action.payload.results || [];
        // compute totalPages safely
        try {
          state.totalPages = Math.max(
            1,
            Math.ceil(
              state.count /
                (action.payload.results?.length || state.items.length || 1)
            )
          );
        } catch (e) {
          state.totalPages = 1;
        }
      })
      .addCase(fetchBlogsPage.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "Failed to fetch blogs";
      })
      .addCase(fetchAllBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload.results || [];
        state.count = action.payload.count || state.items.length;
        state.page = 1;
        state.next = null;
        state.previous = null;
        state.totalPages = 1;
      })
      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "Failed to fetch blogs";
      });

    // fetch blog details
    builder
      .addCase(fetchBlogDetails.pending, (state) => {
        state.detailLoading = true;
        state.error = null;
        state.detail = null;
      })
      .addCase(fetchBlogDetails.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.detail = action.payload || null;
      })
      .addCase(fetchBlogDetails.rejected, (state, action) => {
        state.detailLoading = false;
        state.detail = null;
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "Failed to fetch blog details";
      });

    // react/unreact handlers
    builder
      .addCase(reactBlog.pending, (state) => {
        state.error = null;
      })
      .addCase(reactBlog.fulfilled, (state, action) => {
        const { blog_id, react_status, data } = action.payload || {};
        if (!blog_id) return;
        const idx = state.items.findIndex((i) => i.id === blog_id);
        if (idx === -1) return;
        const serverCount =
          data && (data.love_react ?? data.updated_count ?? data.count ?? null);
        if (serverCount !== null && serverCount !== undefined) {
          state.items[idx] = { ...state.items[idx], love_react: serverCount };
        } else {
          const current = state.items[idx].love_react || 0;
          state.items[idx] = {
            ...state.items[idx],
            love_react: react_status ? current + 1 : Math.max(0, current - 1),
          };
        }
        // also update the per-user flag so UI can show filled/outline heart
        try {
          state.items[idx].user_love_react = react_status ? 1 : 0;
        } catch (e) {
          // ignore
        }
        // if we have a loaded detail for the same blog, update its flag too
        if (state.detail && state.detail.id === blog_id) {
          try {
            state.detail.user_love_react = react_status ? 1 : 0;
          } catch (e) {}
        }
      })
      .addCase(reactBlog.rejected, (state, action) => {
        state.error =
          action.payload?.message || action.error?.message || "React failed";
      });

    // add comment / reply handlers
    builder
      .addCase(addCommentOrReply.pending, (state) => {
        state.error = null;
      })
      .addCase(addCommentOrReply.fulfilled, (state, action) => {
        const payload = action.payload || {};
        if (!state.detail) return;

        // If server returned full detail or comments array, prefer that
        if (Array.isArray(payload.comments)) {
          state.detail.comments = payload.comments;
          state.detail.comment_count =
            payload.comment_count ||
            state.detail.comments.length ||
            state.detail.comment_count;
        } else {
          // server may return the created comment object directly
          const newComment = payload.comment || payload.data || payload;
          if (newComment) {
            const parentId = newComment.parent_id || newComment.parent || null;
            if (parentId) {
              // find parent recursively and append reply
              function addReply(list) {
                for (let i = 0; i < list.length; i++) {
                  if (list[i].id === parentId) {
                    list[i].replies = list[i].replies || [];
                    list[i].replies.push(newComment);
                    return true;
                  }
                  if (list[i].replies && list[i].replies.length) {
                    const found = addReply(list[i].replies);
                    if (found) return true;
                  }
                }
                return false;
              }
              addReply(state.detail.comments || []);
            } else {
              // top-level comment: prepend
              state.detail.comments = state.detail.comments || [];
              state.detail.comments.unshift(newComment);
            }
            state.detail.comment_count = (state.detail.comment_count || 0) + 1;
            // also update aggregated item if present
            const idx = state.items.findIndex((i) => i.id === state.detail.id);
            if (idx !== -1) {
              state.items[idx] = {
                ...state.items[idx],
                comment_count: (state.items[idx].comment_count || 0) + 1,
              };
            }
          }
        }
      })
      .addCase(addCommentOrReply.rejected, (state, action) => {
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "Failed to add comment";
      });

    // edit comment handlers
    builder
      .addCase(editComment.pending, (state) => {
        state.error = null;
      })
      .addCase(editComment.fulfilled, (state, action) => {
        const { comment_id, comment_text } = action.payload || {};
        if (!state.detail || !comment_id) return;

        // recursively find and update the comment
        function updateComment(list) {
          for (let i = 0; i < list.length; i++) {
            if (list[i].id === comment_id) {
              list[i].comment_text = comment_text;
              list[i].text = comment_text; // support both field names
              return true;
            }
            if (list[i].replies && list[i].replies.length) {
              const found = updateComment(list[i].replies);
              if (found) return true;
            }
          }
          return false;
        }
        updateComment(state.detail.comments || []);
      })
      .addCase(editComment.rejected, (state, action) => {
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "Failed to edit comment";
      });

    // delete comment handlers
    builder
      .addCase(deleteComment.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const { comment_id } = action.payload || {};
        if (!state.detail || !comment_id) return;

        // recursively find and remove the comment
        function removeComment(list) {
          const newList = [];
          for (let i = 0; i < list.length; i++) {
            if (list[i].id === comment_id) {
              // skip this comment (delete it)
              state.detail.comment_count = Math.max(
                0,
                (state.detail.comment_count || 0) - 1
              );
              continue;
            }
            const comment = { ...list[i] };
            if (comment.replies && comment.replies.length) {
              comment.replies = removeComment(comment.replies);
            }
            newList.push(comment);
          }
          return newList;
        }
        state.detail.comments = removeComment(state.detail.comments || []);

        // also update aggregated item if present
        const idx = state.items.findIndex((i) => i.id === state.detail.id);
        if (idx !== -1) {
          state.items[idx] = {
            ...state.items[idx],
            comment_count: Math.max(
              0,
              (state.items[idx].comment_count || 0) - 1
            ),
          };
        }
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "Failed to delete comment";
      })
      .addCase(updateCommentLike.pending, (state) => {
        state.error = null;
      })
      .addCase(updateCommentLike.fulfilled, (state, action) => {
        const { comment_id, flag } = action.payload || {};
        if (!state.detail || comment_id === undefined) return;

        // recursively find and update the comment's like_flag
        function updateComment(list) {
          return list.map((comment) => {
            if (comment.id === comment_id) {
              return { ...comment, like_flag: flag };
            }
            if (comment.replies && comment.replies.length) {
              return { ...comment, replies: updateComment(comment.replies) };
            }
            return comment;
          });
        }
        state.detail.comments = updateComment(state.detail.comments || []);
      })
      .addCase(updateCommentLike.rejected, (state, action) => {
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "Failed to update comment like";
      });
  },
});

export const { clearBlogs } = blogsSlice.actions;

// export reducer to be combined into root store
export const blogsReducer = blogsSlice.reducer;
