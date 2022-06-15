export interface JobsArray {
  _id: string,
  company: string,
  position: string,
  status: string,
  jobType: string,
  jobLocation: string,
  createdAt: string,

}
export interface PostJobData {

  position: string, company: string, jobLocation: string, jobType: string, status: string,
}

export interface GetAllJobs {
  jobs: JobsArray[],
  totalJobs: number,
  numOfPages: number,

}

export interface MonthlyApp {
  count: number,
  date: string
}


export interface GetAllStats {
  defaultStats: DefaultStats,
  monthlyApplications: MonthlyApp[],
}
export interface DefaultStats {
  pending: number,
  interview: number,
  declined: number
}