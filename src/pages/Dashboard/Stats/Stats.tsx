import { useEffect } from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { showStats } from "../../../store/Reducers/allJobsSlice";

const Stats = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(showStats());
  }, []);
  return <div>Stats</div>;
};

export default Stats;
