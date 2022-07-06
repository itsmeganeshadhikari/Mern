import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loggedInUser: JSON.parse(localStorage.getItem('loggedInUser')) || {},
    isRegistrationSuccess: false,
  },
  reducers: {
    addLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload
      localStorage.setItem('loggedInUser', JSON.stringify(state.loggedInUser))
    },
    updateRegistrationStatus: (state, action) => {
      state.isRegistrationSuccess = action.payload
      console.log(state.isRegistrationSuccess)
    },
    logout: (state, action) => {
      state.loggedInUser = []
      localStorage.removeItem('accesstoken')
      localStorage.removeItem('refreshtoken')
      localStorage.removeItem('loggedInUser')
    },
  },
})

export const { addLoggedInUser, updateRegistrationStatus, logout } =
  userSlice.actions
export default userSlice.reducer
