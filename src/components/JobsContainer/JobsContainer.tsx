import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getAllJobs } from "../../store/Reducers/allJobsSlice";
import Job from "../Job/Job";
import Loading from "../Loading/Loading";
import Wrapper from "./JobsContainer.styles";

const JobsContainer = () => {
  const { jobs, isLoading } = useAppSelector((store) => store.allJobs);
  const dispatch = useAppDispatch();
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    if (isFirstRenderRef.current) {
      dispatch(getAllJobs());
    }

    isFirstRenderRef.current = false;
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>no jobs to display</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>jobs info</h5>
      <div className="jobs">
        {jobs.map((job) => {
          console.log(job);
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
