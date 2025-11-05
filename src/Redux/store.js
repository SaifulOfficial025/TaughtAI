import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './Authentication'
import { blogsReducer } from './Blogs'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs: blogsReducer,
  },
})

export default store
