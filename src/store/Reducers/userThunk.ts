import customFetch from "../../API/customFetch"
import { logoutUser } from "./userSlice"
import axios, { AxiosError } from "axios"
import { UserData, RegisterState, LoginState, LoginError } from "../../Models/UserData";
import { RootState } from "../store"

export const registerUserThunk = async (url: string, user: UserData | RegisterState, thunkAPI: any) => {

  try {
    const response = await customFetch.post(url, user);
    const userData = response.data.user as UserData
    return userData
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { response } = error as AxiosError<LoginError>;
      const errorMsg = response?.data.msg
      return thunkAPI.rejectWithValue(errorMsg)

    }
  }
}

export const loginUserThunk = async (url: string, user: UserData | LoginState, thunkAPI: any) => {

  try {
    const response = await customFetch.post(url, user);
    // console.log(response.data)
    const userData = response.data.user as UserData
    console.log(userData)
    return userData
  } catch (error) {

    if (axios.isAxiosError(error)) {
      const { response } = error as AxiosError<LoginError>;
      console.log(response?.data.msg)
      return thunkAPI.rejectWithValue(response?.data.msg)

    }
  }

}

export const updateUserThunk = async (url: string, user: UserData, thunkAPI: any) => {
  try {
    const state = thunkAPI.getState() as RootState

    const response = await customFetch.patch("/auth/updateUser", user, {
      headers: {
        authorization: `Bearer ${state.user.user?.token}`

      }
    });
    const userData = response.data.user as UserData
    return userData
  } catch (error) {

    if (axios.isAxiosError(error)) {
      const { response } = error as AxiosError<LoginError>;
      console.log(response?.data.msg)
      return thunkAPI.rejectWithValue(response?.data.msg)

    }
  }
}