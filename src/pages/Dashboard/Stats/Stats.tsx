import { useEffect } from "react";
import { ChartsContainer, StatsContainer, Loading } from "../../../components";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { showStats } from "../../../store/Reducers/allJobsSlice";

const Stats = () => {
  const { isLoading, monthlyApplications } = useAppSelector(
    (store) => store.allJobs
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(showStats());
  }, []);
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
