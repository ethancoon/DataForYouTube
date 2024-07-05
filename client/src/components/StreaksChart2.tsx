import React from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

const StreaksChart2 = () => {
  const data = {
    labels: [
      "2023-07-01",
      "2023-07-02",
      "2023-07-03",
      "2023-07-04",
      "2023-07-05",
    ],
    datasets: [
      {
        label: "Videos Watched - Part 1",
        data: [1, 2, 3, null, null],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Videos Watched - Part 2",
        data: [null, null, 3, 4, 5],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default StreaksChart2;
