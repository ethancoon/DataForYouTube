import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { AnalysisResults } from "../../types";
import { Typography } from "@mui/material";

interface YouTubeUsageChartProps {
  analysisResults: AnalysisResults;
}

const YouTubeUsageChart = ({ analysisResults }: YouTubeUsageChartProps) => {
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
        borderColor: "#121212", // same color as page background
        borderWidth: 2.5,
        barPercentage: 1.0,
        categoryPercentage: 1.0,
      },
    ],
  };

  // Chart options
  const options = {
    indexAxis: "x" as const,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: "white",
          font: {
            weight: "bold" as const,
          },
        },
        title: {
          display: true,
          text: "Hour",
          color: "white",
          font: {
            size: 20,
            weight: "bold" as const,
          },
        },
        grid: {
          display: false,
        },
        border: {
          color: "white",
        },
      },
      y: {
        ticks: {
          color: "white",
          font: {
            weight: "bold" as const,
          },
        },
        title: {
          display: true,
          text: "Videos Watched Per Hour",
          color: "white",
          font: {
            size: 20,
            weight: "bold" as const,
          },
        },
        grid: {
          display: false,
        },
        border: {
          color: "white",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <div style={{ position: "relative", height: "500px" }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontSize: 25,
          fontWeight: "bold",
          paddingLeft: 10,
        }}
      >
        YouTube Usage per Hour:
      </Typography>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default YouTubeUsageChart;
