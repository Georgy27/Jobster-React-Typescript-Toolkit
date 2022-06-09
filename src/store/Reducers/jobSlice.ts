import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../API/customFetch";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { RootState } from "../store"
import axios, { AxiosError } from "axios"
import { LoginError } from "../../Models/UserData";
import { showLoading, hideLoading, getAllJobs } from "./allJobsSlice";


interface HandleChangeValues {
  name: "jobType" | "status" | "position" | "company" | "jobLocation"
  value: string;
}
interface JobState {
  isLoading: boolean,
  position: string,
  company: string,
  jobLocation: string,
  jobTypeOptions: string[],
  jobType: string,
  statusOptions: string[],
  status: string,
  isEditing: boolean,
  editJobId: string
}
interface PostJobData {

  position: string, company: string, jobLocation: string, jobType: string, status: string,
}
const initialState: JobState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

export const createJob = createAsyncThunk("job/createJob", async (job: PostJobData, thunkAPI) => {
  const state = thunkAPI.getState() as RootState

  try {
    const response = await customFetch.post("/jobs", job,
      {
        headers: {
          authorization: `Bearer ${state.user.user?.token}`
        }
      }
    )
    const jobData = response.data as PostJobData
    console.log(jobData)
    thunkAPI.dispatch(clearValues())
    return jobData
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { response } = error as AxiosError<LoginError>;
      const errorMsg = response?.data.msg
      return thunkAPI.rejectWithValue(errorMsg)
    }
  }
}
)

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state, action: PayloadAction<HandleChangeValues>) => {
      const name = action.payload.name;
      const value = action.payload.value;
      state[name] = value
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || ""
      }
    }
  },
  extraReducers: {
    [createJob.pending.type]: (state) => {
      state.isLoading = true;
    },
    [createJob.fulfilled.type]: (state, action: PayloadAction<PostJobData>) => {
      state.isLoading = false;
      toast.success("Job Created")
    },
    [createJob.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      toast.error(action.payload)
    },
  }
})

export const { handleChange, clearValues } = jobSlice.actions
export default jobSlice.reducer