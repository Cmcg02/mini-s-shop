import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: "guest",
  email: "",
  password: "",
  role: "client"
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signout: (state) => {
      state.name = "guest"
      state.email = ""
      state.password = ""
      state.role = "client"
    },
    signin: (state, action) => {
      state.name = action.payload.name
      state.email = action.payload.email
      state.password = action.payload.password
      state.role = action.payload.role
    },
  },
})

export const { signin, signout } = userSlice.actions

export default userSlice.reducer