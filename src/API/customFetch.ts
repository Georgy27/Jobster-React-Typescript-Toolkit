import axios, { AxiosError } from "axios"
import { LoginError } from "../Models/UserData";
import { clearStore } from "../store/Reducers/userSlice";
const customFetch = axios.create({
  baseURL: "https://jobify-prod.herokuapp.com/api/v1/toolkit",
})

export const checkForUnauthorizedResponse = (error: any, thunkAPI: any) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore("Logging out"))
    return thunkAPI.rejectWithValue("Unauthorized! Logging out...")
  }
  console.log(error)
  return thunkAPI.rejectWithValue(error.response.data.msg)

}



export default customFetch