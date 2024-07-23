import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { useInView } from "react-intersection-observer";
import { AnalysisResults } from "../../types";

interface YouTubeUsageChartProps {
  analysisResults: AnalysisResults;
}

const YouTubeUsageChart = ({ analysisResults }: YouTubeUsageChartProps) => {
  const { ref } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (!analysisResults) {
    return null;
  }

  const counts = analysisResults.activeTimes.map((time) => time.count);
  const minCount = Math.min(...counts);
  const maxCount = Math.max(...counts);

  // Function to interpolate between two colors
  const interpolateColor = (value: number, min: number, max: number) => {
    const ratio = (value - min) / (max - min);
    const r = Math.round(255 * ratio);
    const g = 0;
    const b = Math.round(255 * (1 - ratio));
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Prepare chart data
  const chartData = {
    labels: analysisResults.activeTimes.map((time) => `${time.hour}:00`),
    datasets: [
      {
        label: "YouTube Usage",
        data: analysisResults.activeTimes.map((time) => time.count),
        backgroundColor: analysisResults.activeTimes.map((time) =>
          interpolateColor(time.count, minCount, maxCount),
        ),
        borderColor: "white", // Add a white border to each bar
        borderWidth: 1,
        barPercentage: 1.0,
        categoryPercentage: 1.0,
      },
    ],
  };

  // Chart options
  const options = {
    indexAxis: "y", // Make the bars horizontal
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: "white", // Makes x-axis labels white
        },
      },
      y: {
        ticks: {
          color: "white", // Makes y-axis labels white
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "white", // Makes legend text white
        },
      },
      title: {
        display: true,
        text: "YouTube Usage by Hour",
        color: "white", // Makes title text white
      },
    },
    elements: {
      bar: {
        barPercentage: 1.0, // No spacing between bars
        categoryPercentage: 1.0, // No spacing between bars
      },
    },
  };

  return (
    <div ref={ref}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default YouTubeUsageChart;
