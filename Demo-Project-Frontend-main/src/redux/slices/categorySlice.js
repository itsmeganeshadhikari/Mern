import { createSlice } from '@reduxjs/toolkit'

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
  },
  reducers: {
    addAllCategories: (state, action) => {
      state.categories = action.payload
    },
  },
})

export const { addAllCategories } = categorySlice.actions
export default categorySlice.reducer
