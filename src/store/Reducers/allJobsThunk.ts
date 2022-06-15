import customFetch, { checkForUnauthorizedResponse } from "../../API/customFetch"
import { RootState } from "../store"
import { GetAllJobs } from "../../Models/JobData";
import { MonthlyApp, GetAllStats, DefaultStats } from "../../Models/JobData";

export const getAllJobsThunk = async (_: void, thunkAPI: any) => {
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
    return allJobsData

  } catch (error) {
    // const newError = "There was an error"
    return checkForUnauthorizedResponse(error, thunkAPI)
  }
}

export const showStatsThunk = async (_: void, thunkAPI: any) => {
  const state = thunkAPI.getState() as RootState
  try {
    const response = await customFetch.get('/jobs/stats', {
      headers: {
        authorization: `Bearer ${state.user.user?.token}`
      }
    })
    const stats = response.data as GetAllStats
    console.log(stats)
    return stats
  } catch (error: any) {
    // const newError = error.response.data.msg
    return checkForUnauthorizedResponse(error, thunkAPI)
  }
}