import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../API/customFetch";
import { RootState } from "../store"
import { JobsArray } from "../../Models/JobData";
import { months } from "moment";


interface HandleChangeValues {
  name: "searchStatus" | "search" | "searchType" | "sort"
  value: string;
}
interface GetAllJobs {
  jobs: JobsArray[],
  totalJobs: number,
  numOfPages: number,

}
interface AllJobsState extends FilterState {
  isLoading: boolean,
  jobs: JobsArray[],
  totalJobs: number,
  numOfPages: number,
  page: number,
  stats: {},
  monthlyApplications: [],


}
interface FilterState {
  search: string,
  searchStatus: string,
  searchType: string,
  sort: string,
  sortOptions: string[]
}
const initialFiltersState: FilterState = {
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
  const state = thunkAPI.getState() as RootState
  const { page, search, searchStatus, searchType, sort } = state.allJobs

  let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`

  if (search) {
    url = url + `&search=${search}`
  }

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

export const showStats = createAsyncThunk("allJobs/showStats", async (_, thunkAPI) => {
  try {
    const response = await customFetch.get('/jobs/stats')
    const stats = response.data as any
    console.log(stats)
    return stats


  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
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
    handleChange: (state, action: PayloadAction<HandleChangeValues>) => {
      const name = action.payload.name;
      const value = action.payload.value;
      state[name] = value
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState }
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    }
  },
  extraReducers: {
    [getAllJobs.pending.type]: (state) => {
      state.isLoading = true
    },
    [getAllJobs.fulfilled.type]: (state, action: PayloadAction<GetAllJobs>) => {
      state.isLoading = false
      state.jobs = action.payload.jobs
      state.numOfPages = action.payload.numOfPages
      state.totalJobs = action.payload.totalJobs

    },
    [getAllJobs.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      toast.error(action.payload)
    }
  }
})

export const { showLoading, hideLoading, handleChange, clearFilters, changePage } = allJobsSlice.actions
export default allJobsSlice.reducer