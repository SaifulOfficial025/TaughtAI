import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "./config";

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return (
    localStorage.getItem("access_token") || localStorage.getItem("accessToken")
  );
};

// Async thunk for getting all chats for a specific model
export const getAllChats = createAsyncThunk(
  "chatbot/getAllChats",
  async ({ model_name }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${BASE_URL}/chatbot/get_all_chat/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ model_name }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { model_name, chats: data.Data || [] };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for getting chat history
export const getChatHistory = createAsyncThunk(
  "chatbot/getChatHistory",
  async ({ chat_id, user_message = "Hi" }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${BASE_URL}/chatbot/get_chat_history/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          chat_id: String(chat_id),
          user_message,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for creating a new chat
export const createChat = createAsyncThunk(
  "chatbot/createChat",
  async ({ model_name, first_message, role = "User" }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${BASE_URL}/chatbot/create_chat/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          model_name,
          first_message,
          role,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const chatbotSlice = createSlice({
  name: "chatbot",
  initialState: {
    // Chat lists by model_name
    chatLists: {},
    chatListsLoading: {},
    chatListsError: {},

    // Individual chat history
    chatHistory: {},
    chatHistoryLoading: {},
    chatHistoryError: {},

    // Create chat state
    createChatLoading: false,
    createChatError: null,
    lastCreatedChat: null,
  },
  reducers: {
    clearChatHistory: (state, action) => {
      const chatId = action.payload;
      if (chatId) {
        delete state.chatHistory[chatId];
        delete state.chatHistoryLoading[chatId];
        delete state.chatHistoryError[chatId];
      }
    },
    clearCreateChatState: (state) => {
      state.createChatLoading = false;
      state.createChatError = null;
      state.lastCreatedChat = null;
    },
  },
  extraReducers: (builder) => {
    // getAllChats cases
    builder
      .addCase(getAllChats.pending, (state, action) => {
        const { model_name } = action.meta.arg;
        state.chatListsLoading[model_name] = true;
        state.chatListsError[model_name] = null;
      })
      .addCase(getAllChats.fulfilled, (state, action) => {
        const { model_name, chats } = action.payload;
        state.chatListsLoading[model_name] = false;
        state.chatLists[model_name] = chats;
        state.chatListsError[model_name] = null;
      })
      .addCase(getAllChats.rejected, (state, action) => {
        const { model_name } = action.meta.arg;
        state.chatListsLoading[model_name] = false;
        state.chatListsError[model_name] = action.payload;
      });

    // getChatHistory cases
    builder
      .addCase(getChatHistory.pending, (state, action) => {
        const { chat_id } = action.meta.arg;
        state.chatHistoryLoading[chat_id] = true;
        state.chatHistoryError[chat_id] = null;
      })
      .addCase(getChatHistory.fulfilled, (state, action) => {
        const chatData = action.payload;
        const chatId = chatData.chat_id;
        state.chatHistoryLoading[chatId] = false;
        state.chatHistory[chatId] = chatData;
        state.chatHistoryError[chatId] = null;
      })
      .addCase(getChatHistory.rejected, (state, action) => {
        const { chat_id } = action.meta.arg;
        state.chatHistoryLoading[chat_id] = false;
        state.chatHistoryError[chat_id] = action.payload;
      });

    // createChat cases
    builder
      .addCase(createChat.pending, (state) => {
        state.createChatLoading = true;
        state.createChatError = null;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.createChatLoading = false;
        state.lastCreatedChat = action.payload;
        state.createChatError = null;

        // Optionally update the relevant chat list if we have it
        const { model_name } = action.meta.arg;
        if (state.chatLists[model_name]) {
          // Add the new chat to the beginning of the list
          const newChat = {
            id: action.payload.chat_id,
            title: action.payload.title,
            timestamp_parent: action.payload.timestamp,
            user: action.payload.user_id,
          };
          state.chatLists[model_name].unshift(newChat);
        }
      })
      .addCase(createChat.rejected, (state, action) => {
        state.createChatLoading = false;
        state.createChatError = action.payload;
      });
  },
});

export const { clearChatHistory, clearCreateChatState } = chatbotSlice.actions;

// Selectors
export const selectChatList = (state, model_name) =>
  state.chatbot.chatLists[model_name] || [];
export const selectChatListLoading = (state, model_name) =>
  state.chatbot.chatListsLoading[model_name] || false;
export const selectChatListError = (state, model_name) =>
  state.chatbot.chatListsError[model_name] || null;

export const selectChatHistory = (state, chat_id) =>
  state.chatbot.chatHistory[chat_id] || null;
export const selectChatHistoryLoading = (state, chat_id) =>
  state.chatbot.chatHistoryLoading[chat_id] || false;
export const selectChatHistoryError = (state, chat_id) =>
  state.chatbot.chatHistoryError[chat_id] || null;

export const selectCreateChatLoading = (state) =>
  state.chatbot.createChatLoading;
export const selectCreateChatError = (state) => state.chatbot.createChatError;
export const selectLastCreatedChat = (state) => state.chatbot.lastCreatedChat;

export default chatbotSlice.reducer;
