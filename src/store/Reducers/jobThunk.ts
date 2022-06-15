import customFetch, { checkForUnauthorizedResponse } from "../../API/customFetch"
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
    return checkForUnauthorizedResponse(error, thunkAPI)
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
    thunkAPI.dispatch(hideLoading())
    return checkForUnauthorizedResponse(error, thunkAPI)
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
    thunkAPI.dispatch(hideLoading())
    return checkForUnauthorizedResponse(error, thunkAPI)
  }
}