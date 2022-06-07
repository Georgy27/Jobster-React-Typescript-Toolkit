import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"
import { toast } from "react-toastify"
import customFetch from "../../API/customFetch"
import { UserData } from "../../Models/UserData";
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from "../../utils/localStorage";


interface RegisterState {
  name: string,
  email: string;
  password: string;
}

interface LoginState {
  // name?: string,
  email: string;
  password: string;
}
interface LoginError {
  msg: string;
}

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
    try {
      const response = await customFetch.post("/auth/register", user);
      return response.data.user
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error as AxiosError<LoginError>;
        const errorMsg = response?.data.msg
        console.log(errorMsg)
        return thunkAPI.rejectWithValue(errorMsg)
        // toast.error(error.message)
        // console.log(error.response?.data?.msg)
      }
    }
  })

export const loginUser = createAsyncThunk("user/loginUser", async (user: LoginState, thunkAPI) => {

  try {
    console.log(123)
    const response = await customFetch.post("/auth/login", user);
    // console.log(response.data)

    return response.data.user as UserData
  } catch (error) {

    if (axios.isAxiosError(error)) {
      const { response } = error as AxiosError<LoginError>;
      console.log(response?.data.msg)
      return thunkAPI.rejectWithValue(response?.data.msg)

    }
  }
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
    }
  }
});

const { reducer, actions } = userSlice
export const { logoutUser } = actions
export default reducer





////////////////////////////

// (builder) => {
//   builder.addCase(registerUser.fulfilled, (state, { payload }) => {
//          console.log("Registered user")
//     console.log(payload)
//     state.isLoading = false
//     state.user = payload.user
//     toast.success(`Hello there ${payload.user?.email}`)
//   })
// }