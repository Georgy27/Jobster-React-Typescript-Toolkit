import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { PostJobData } from "../../Models/JobData";
import { createJobThunk, deleteJobThunk, editJobThunk } from "./jobThunk";




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

export const createJob = createAsyncThunk("job/createJob", createJobThunk)


export const deleteJob = createAsyncThunk("job/deleteJob", deleteJobThunk)



export const editJob = createAsyncThunk("job/editJob", editJobThunk)

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
    },
    setEditJob: (state, action: PayloadAction<{}>) => {

      return { ...state, isEditing: true, ...action.payload }
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
      console.log(action.payload)
      state.isLoading = false;
      toast.error(action.payload)
    },
    [deleteJob.fulfilled.type]: (state, action: PayloadAction<string>) => {

      toast.success(action.payload)
    },
    [deleteJob.rejected.type]: (state, action: PayloadAction<string>) => {
      toast.error(action.payload)
    },
    [editJob.pending.type]: (state) => {
      state.isLoading = true;
    },
    [editJob.fulfilled.type]: (state, action: PayloadAction<PostJobData>) => {
      state.isLoading = false;
      toast.success("Job Modified...")
    },
    [editJob.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      toast.error(action.payload)
    },
  }
})

export const { handleChange, clearValues, setEditJob } = jobSlice.actions
export default jobSlice.reducer