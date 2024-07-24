import React, { useEffect } from "react";
import { Chart } from "react-chartjs-2";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";
import { Chart as ChartJS, registerables } from "chart.js";
import { type DayTimeCount } from "../../types";

ChartJS.register(...registerables, MatrixController, MatrixElement);

const WeekUsageHeatmap = ({
  activeDayTimes,
}: {
  activeDayTimes: DayTimeCount[];
}) => {
  if (!activeDayTimes || activeDayTimes.length === 0) {
    return <div>No data available</div>;
  }

  const getGitHubColor = (value) => {
    if (value <= 5) return "rgba(235, 237, 240, 1)"; // Lightest
    if (value <= 10) return "rgba(155, 233, 168, 1)"; // Light green
    if (value <= 15) return "rgba(64, 196, 99, 1)"; // Medium green
    if (value <= 20) return "rgba(0, 135, 58, 1)"; // Dark green
    return "rgba(0, 90, 50, 1)"; // Darkest
  };

  const data = activeDayTimes.map((item) => ({
    x: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ].indexOf(item.day),
    y: 0,
    v: item.count,
  }));

  const config = {
    type: "matrix",
    data: {
      datasets: [
        {
          label: "YouTube Usage Heatmap",
          data: data,
          backgroundColor: (context) => {
            const value = context.dataset.data[context.dataIndex].v;
            return getGitHubColor(value);
          },
          borderColor: "rgba(0,0,0,0.5)",
          borderWidth: 1,
          width: ({ chart }) => {
            const chartArea = chart.chartArea || { width: 0, height: 0 };
            const totalWidth = chartArea.width;
            const fixedGap = 6; // Adjusted fixed gap between squares
            const squareSize = (totalWidth - fixedGap * 6) / 7;
            return Math.max(squareSize, 40); // Ensure a minimum size of 40px
          },
          height: ({ chart }) => {
            const chartArea = chart.chartArea || { width: 0, height: 0 };
            const totalWidth = chartArea.width;
            const fixedGap = 6; // Adjusted fixed gap between squares
            const squareSize = (totalWidth - fixedGap * 6) / 7;
            return Math.max(squareSize, 40); // Ensure a minimum size of 40px
          },
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: "linear",
          position: "bottom",
          min: -0.5,
          max: 6.5,
          ticks: {
            stepSize: 1,
            callback: (value) =>
              [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ][value],
            color: "white",
          },
          title: {
            display: true,
            text: "Day of Week",
            color: "white",
          },
        },
        y: {
          display: false,
        },
      },
      layout: {
        padding: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            title: (tooltipItems) => {
              const day = tooltipItems[0].raw.x;
              return `${
                [
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ][day]
              }`;
            },
            label: (tooltipItem) => {
              return `Videos Watched: ${tooltipItem.raw.v}`;
            },
          },
        },
      },
    },
  };

  return (
    <div style={{ height: "300px", width: "100%" }}>
      <Chart {...config} />
    </div>
  );
};

export default WeekUsageHeatmap;
