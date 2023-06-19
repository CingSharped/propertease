import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const BarChart = ({ chartData }) => {
  return (
    <div>
      <Bar height='60px' data={chartData} />
    </div>
  );
};

export default BarChart;
