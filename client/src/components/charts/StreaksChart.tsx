import React from "react";
import { Bar } from "react-chartjs-2";
import { Typography } from "@mui/material";
import { type Streak } from "../../types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const StreaksChart = ({ streaks }: { streaks: Streak[] }) => {
  // Ensure streaks is an array
  const validStreaks = Array.isArray(streaks) ? streaks : [];

  // Group data by month and calculate the average
  const months: { [key: string]: { total: number; count: number } } = {};

  validStreaks.forEach((streak) => {
    const date = new Date(streak.start);
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

    if (!months[month]) {
      months[month] = { total: 0, count: 0 };
    }

    months[month].total += streak.length;
    months[month].count += 1;
  });

  const labels = Object.keys(months);
  const data = labels.map((month) => months[month].total / months[month].count);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Streaks",
        data,
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // This case happens on initial chart load
            return null;
          }

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top,
          );
          gradient.addColorStop(0, "orange");
          gradient.addColorStop(1, "red");

          return gradient;
        },
        borderColor: "orange",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const, // Set the index axis to 'y' for horizontal bar chart
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: "black",
          font: {
            weight: "bold" as const,
          },
        },
        title: {
          display: true,
          text: "Count",
          color: "black",
          font: {
            size: 16,
            weight: "bold" as const,
          },
        },
        border: {
          color: "white", // Set the color of the x-axis line
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "black",
          font: {
            weight: "bold" as const,
          },
        },
        title: {
          display: true,
          text: "Month",
          color: "black",
          font: {
            size: 16,
            weight: "bold" as const,
          },
        },
        border: {
          color: "white", // Set the color of the y-axis line
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Streaks Per Month",
      },
      datalabels: {
        display: true,
        anchor: "end",
        align: "end",
        color: "white",
        font: {
          weight: "bold",
        },
        formatter: (value: number) => value.toFixed(0),
      },
    },
  };

  return (
    <div style={{ height: "400px" }}>
      <Typography variant="h6" gutterBottom>
        Streaks
      </Typography>
      <Bar data={chartData} options={options} plugins={[ChartDataLabels]} />
    </div>
  );
};

export default StreaksChart;
