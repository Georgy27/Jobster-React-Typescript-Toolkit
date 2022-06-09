import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../API/customFetch";
import { RootState } from "../store"
import { JobsArray } from "../../Models/JobData";

interface GetAllJobs {
  jobs: JobsArray[],
  totalJobs: number,
  numOfPages: number,

}

interface AllJobsState {
  isLoading: boolean,
  jobs: JobsArray[],
  totalJobs: number,
  numOfPages: number,
  page: number,
  stats: {},
  monthlyApplications: [],

}

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState: AllJobsState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllJobs = createAsyncThunk("allJobs/getJobs", async (_, thunkAPI) => {
  let url = `/jobs`
  const state = thunkAPI.getState() as RootState
  try {
    const response = await customFetch.get(url, {
      headers: {
        authorization: `Bearer ${state.user.user?.token}`
      }
    })
    const allJobsData = response.data as GetAllJobs
    console.log(allJobsData)
    return allJobsData

  } catch (error) {
    return thunkAPI.rejectWithValue("There was an error")
  }
})

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true
    },
    hideLoading: (state) => {
      state.isLoading = false
    },
  },
  extraReducers: {
    [getAllJobs.pending.type]: (state) => {
      state.isLoading = true
    },
    [getAllJobs.fulfilled.type]: (state, action: PayloadAction<GetAllJobs>) => {
      state.isLoading = false
      state.jobs = action.payload.jobs

    },
    [getAllJobs.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      toast.error(action.payload)
    }
  }
})

export const { showLoading, hideLoading } = allJobsSlice.actions
export default allJobsSlice.reducer