import { createSlice } from "@reduxjs/toolkit"


interface AppState {
  isSidebarOpen: boolean,
}

const initialState: AppState = {
  isSidebarOpen: false,

}

const appSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    resetState: (state) => initialState,
    toggleSidebar: (state) => {


      state.isSidebarOpen = !state.isSidebarOpen
    }

  }
})


export const { toggleSidebar, resetState } = appSlice.actions
export default appSlice.reducer
