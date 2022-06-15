import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { JobsArray, GetAllJobs } from "../../Models/JobData";
import { MonthlyApp, GetAllStats, DefaultStats } from "../../Models/JobData";
import { getAllJobsThunk, showStatsThunk } from "./allJobsThunk";


interface HandleChangeValues {
  name: "searchStatus" | "search" | "searchType" | "sort"
  value: string;
}

interface AllJobsState extends FilterState {
  isLoading: boolean,
  jobs: JobsArray[],
  totalJobs: number,
  numOfPages: number,
  page: number,
  stats: DefaultStats
  monthlyApplications: {
    count: number,
    date: string
  }[],
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
  stats: {
    pending: 0, interview: 0, declined: 0
  },
  monthlyApplications: [],
  ...initialFiltersState,
};



export const getAllJobs = createAsyncThunk("allJobs/getJobs", getAllJobsThunk)

export const showStats = createAsyncThunk("allJobs/showStats", showStatsThunk)


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
      state.page = 1
      state[name] = value
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState }
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    clearAllJobsState: (state) => initialState
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
    },
    [showStats.pending.type]: (state) => {
      state.isLoading = true
    },
    [showStats.fulfilled.type]: (state, action: PayloadAction<GetAllStats>) => {
      state.isLoading = false
      state.stats = action.payload.defaultStats
      state.monthlyApplications = action.payload.monthlyApplications
    },
    [showStats.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      toast.error(action.payload)
    },
  }
})

export const { showLoading, hideLoading, handleChange, clearFilters, changePage, clearAllJobsState } = allJobsSlice.actions
export default allJobsSlice.reducer