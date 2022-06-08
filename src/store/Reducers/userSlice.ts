import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"
import { toast } from "react-toastify"
import customFetch from "../../API/customFetch"
import { UserData, RegisterState, LoginState } from "../../Models/UserData";
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from "../../utils/localStorage";

import { loginUserThunk, registerUserThunk, updateUserThunk } from "./userThunk";

interface UserState {
  isLoading: boolean,
  user: UserData | null
}

const initialState: UserState = {
  isLoading: false,
  user: getUserFromLocalStorage()
}



export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user: RegisterState, thunkAPI) => {
    return registerUserThunk("/auth/register", user, thunkAPI)
  }
)

export const loginUser = createAsyncThunk("user/loginUser", async (user: LoginState, thunkAPI) => {

  return loginUserThunk("/auth/login", user, thunkAPI)
})

export const updateUser = createAsyncThunk("user/updateUser", async (user: UserData, thunkAPI) => {
  return updateUserThunk("/auth/updateUser", user, thunkAPI)
})

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null
      removeUserFromLocalStorage()
    }
  },
  extraReducers: {
    [registerUser.pending.type]: (state) => {
      console.log("Loading")
      state.isLoading = true
    },
    [registerUser.fulfilled.type]: (state, action: PayloadAction<UserData>) => {
      state.isLoading = false
      state.user = action.payload
      addUserToLocalStorage(action.payload)
      toast.success(`Hello there ${action.payload.name}`)
    },
    [registerUser.rejected.type]: (state, action: PayloadAction<string>) => {
      console.log(123)
      console.log(action.payload)
      state.isLoading = false
      toast.error(action.payload)
    },
    [loginUser.pending.type]: (state) => {
      state.isLoading = true
    },
    [loginUser.fulfilled.type]: (state, action: PayloadAction<UserData>) => {

      state.isLoading = false

      state.user = action.payload
      addUserToLocalStorage(action.payload)
      toast.success(`Welcome back ${action.payload.name}`)
    },
    [loginUser.rejected.type]: (state, action: PayloadAction<string>) => {

      state.isLoading = false
      toast.error(action.payload)
    },
    [updateUser.pending.type]: (state) => {
      state.isLoading = true
    },
    [updateUser.fulfilled.type]: (state, action: PayloadAction<UserData>) => {

      state.isLoading = false

      state.user = action.payload
      addUserToLocalStorage(action.payload)
      toast.success('User Updated!')
    },
    [updateUser.rejected.type]: (state, action: PayloadAction<string>) => {

      state.isLoading = false
      toast.error(action.payload)
    }
  }
});

const { reducer, actions } = userSlice
export const { logoutUser } = actions
export default reducer





