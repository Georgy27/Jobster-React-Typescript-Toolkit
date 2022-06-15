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

export interface MonthlyApp {
  count: number,
  date: string
}