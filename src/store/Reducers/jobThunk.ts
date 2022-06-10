import customFetch from "../../API/customFetch"
import axios, { AxiosError } from "axios"
import { LoginError } from "../../Models/UserData";
import { RootState } from "../store"
import { getAllJobs, hideLoading, showLoading } from "./allJobsSlice";
import { clearValues } from "./jobSlice";
import { PostJobData } from "../../Models/JobData";


interface EditJobData {
  jobId: string,
  job: {}
}

export const createJobThunk = async (job: PostJobData, thunkAPI: any) => {
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

export const deleteJobThunk = async (jobId: string, thunkAPI: any) => {
  thunkAPI.dispatch(showLoading())
  const state = thunkAPI.getState() as RootState

  try {
    const response = await customFetch.delete(`/jobs/${jobId}`, {
      headers: {
        authorization: `Bearer ${state.user.user?.token}`
      }
    })
    const dataMsg = response.data.msg as string
    thunkAPI.dispatch(getAllJobs())
    return dataMsg

  } catch (error) {
    if (axios.isAxiosError(error)) {
      thunkAPI.dispatch(hideLoading())
      const { response } = error as AxiosError<LoginError>;
      const errorMsg = response?.data.msg
      return thunkAPI.rejectWithValue(errorMsg)
    }
  }

}

export const editJobThunk = async ({ jobId, job }: EditJobData, thunkAPI: any) => {
  const state = thunkAPI.getState() as RootState

  try {
    const response = await customFetch.patch(`/jobs/${jobId}`, job, {
      headers: {
        authorization: `Bearer ${state.user.user?.token}`
      }
    })
    const editJobData = response.data as PostJobData
    thunkAPI.dispatch(clearValues())
    return editJobData
  } catch (error) {
    if (axios.isAxiosError(error)) {
      thunkAPI.dispatch(hideLoading())
      const { response } = error as AxiosError<LoginError>;
      const errorMsg = response?.data.msg
      return thunkAPI.rejectWithValue(errorMsg)
    }
  }
}