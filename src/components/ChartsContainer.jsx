import { useState } from "react";
import AreaChart from "./AreaChart";
import BarChart from "./BarChart";
import Wrapper from "../assets/wrappers/ChartsContainer";
import { useSelector } from "react-redux";

const ChartsContainer = () => {
  const { monthlyApplications } = useSelector((state) => state.allJobs);
  const [barChart, setBarChart] = useState(true);
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? (
        <BarChart data={monthlyApplications} />
      ) : (
        <AreaChart data={monthlyApplications} />
      )}
    </Wrapper>
  );
};

export default ChartsContainer;
