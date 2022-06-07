import { configureStore } from "@reduxjs/toolkit"

import userSlice from "./Reducers/userSlice"
import toggleSlice from "./Reducers/appSlice"

export const store = configureStore({
  reducer: {
    user: userSlice,
    toggle: toggleSlice
  }
})

// export type RootState = ReturnType<typeof configureStore>
// export type

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch