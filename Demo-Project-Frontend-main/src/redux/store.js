import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './slices/categorySlice'
import userReducer from './slices/userSlice'
import courseReducer from './slices/courseSlice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    course: courseReducer,
  },
})
