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

  // Function to get color based on value
  const getColor = (value: number) => {
    // Normalize value between 0 and 1
    const ratio = (value - minCount) / (maxCount - minCount);
    // Calculate hue for HSL
    const hue = ((1 - ratio) * 120).toString(10);
    return `hsl(${hue}, 100%, 50%)`;
  };

  // Prepare chart data
  const chartData = {
    labels: analysisResults.activeTimes.map((time) => `${time.hour}:00`),
    datasets: [
      {
        label: "YouTube Usage",
        data: analysisResults.activeTimes.map((time) => time.count),
        backgroundColor: analysisResults.activeTimes.map((time) =>
          getColor(time.count),
        ),
        borderColor: "white", // Add a white border to each bar
        borderWidth: 1, // Initial border width, will be dynamically adjusted
        barPercentage: 1.0,
        categoryPercentage: 1.0,
      },
    ],
  };

  // Chart options
  const options = {
    indexAxis: "y", // Make the bars horizontal
    responsive: true,
    maintainAspectRatio: false, // Ensures the chart resizes correctly
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
        display: false, // Hide the legend
      },
      title: {
        display: false, // Hide the title
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
    <div ref={ref} style={{ position: "relative", height: "500px" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default YouTubeUsageChart;
