import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StatsContainer, ChartsContainer, Loading } from "../../components";
import { showStats } from "../../feature/allJobs/allJobsSlice";

const Stats = () => {
  const { isLoading, monthlyApplications } = useSelector(
    (state) => state.allJobs
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showStats());
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
