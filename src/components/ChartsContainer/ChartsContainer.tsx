import Wrapper from "../ChartsContainer/ChartsContainer.styles";
import React, { useState } from "react";
import BarChart from "../BarChart/BarChart";
import AreaChartComponent from "../AreaChart/AreaChart";
import { useAppSelector } from "../../hooks/redux";

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyApplications } = useAppSelector((store) => store.allJobs);

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? (
        <BarChart monthlyApplications={monthlyApplications} />
      ) : (
        <AreaChartComponent monthlyApplications={monthlyApplications} />
      )}
    </Wrapper>
  );
};

export default ChartsContainer;
