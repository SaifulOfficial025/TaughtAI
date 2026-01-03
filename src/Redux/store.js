import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './Authentication'
import { blogsReducer } from './Blogs'
import chatbotReducer from './Chatbot'
import googleAuthReducer from './GoogleAuth'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs: blogsReducer,
    chatbot: chatbotReducer,
    googleAuth: googleAuthReducer,
  },
})

export default store
