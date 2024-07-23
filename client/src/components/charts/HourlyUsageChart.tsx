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

  // Custom interpolation function to create a color gradient
  const interpolateColor = (value: number, min: number, max: number) => {
    const ratio = (value - min) / (max - min);
    if (ratio < 0.25) {
      // Deep Blue to Blue
      return `rgb(0, 0, ${255 - Math.round(ratio * 1020)})`; // deep blue to blue
    } else if (ratio < 0.5) {
      // Blue to Yellow
      return `rgb(${Math.round((ratio - 0.25) * 1020)}, ${Math.round(
        (ratio - 0.25) * 1020,
      )}, 0)`; // blue to yellow
    } else if (ratio < 0.75) {
      // Yellow to Orange
      return `rgb(255, ${255 - Math.round((ratio - 0.5) * 510)}, 0)`; // yellow to orange
    } else {
      // Orange to Red
      return `rgb(255, ${127 - Math.round((ratio - 0.75) * 510)}, 0)`; // orange to red
    }
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
