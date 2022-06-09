import { configureStore } from "@reduxjs/toolkit"

import userSlice from "./Reducers/userSlice"
import toggleSlice from "./Reducers/appSlice"
import jobSlice from "./Reducers/jobSlice"
import allJobsSlice from "./Reducers/allJobsSlice"

export const store = configureStore({
  reducer: {
    user: userSlice,
    toggle: toggleSlice,
    job: jobSlice,
    allJobs: allJobsSlice
  }
})

// export type RootState = ReturnType<typeof configureStore>
// export type

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch