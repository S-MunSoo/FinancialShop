import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  isNotFirst: false,
  modalVisible: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    openModal(state, action) {
      state.modalVisible = action.payload
    },
    setUser(state, action) {
      Object.keys(action.payload).forEach(key => {
        state[key] = action.payload[key]
      })
    },
    logOut(state) {
      Object.keys(state).forEach(key => {
        state[key] = null
      })
    }
  }
})

export const { openModal, setUser, logOut } = userSlice.actions
export default userSlice.reducer
