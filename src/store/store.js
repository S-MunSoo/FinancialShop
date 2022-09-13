import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import userReducer from '../store/slices/userSlice'

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  user: userReducer
})

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([apiSlice.middleware])
})
setupListeners(store.dispatch)

export default store
