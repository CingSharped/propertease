import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const BarChart = ({ chartData }) => {
  return (
    <div>
      <Bar height='100%' data={chartData} />
    </div>
  );
};

export default BarChart;
