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
    }
  }
})

export const { openModal } = userSlice.actions
export default userSlice.reducer
