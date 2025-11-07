import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './Authentication'
import { blogsReducer } from './Blogs'
import chatbotReducer from './Chatbot'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs: blogsReducer,
    chatbot: chatbotReducer,
  },
})

export default store
