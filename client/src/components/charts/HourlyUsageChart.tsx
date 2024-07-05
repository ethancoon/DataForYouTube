import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { AnalysisResults } from "../../types";

interface YouTubeUsageChartProps {
  analysisResults: AnalysisResults;
}

const YouTubeUsageChart = (props: YouTubeUsageChartProps) => {
  if (!props.analysisResults) {
    return null;
  }

  // Prepare chart data
  const chartData = {
    labels: props.analysisResults.activeTimes.map((time) => `${time.hour}:00`),
    datasets: [
      {
        label: "YouTube Usage",
        data: props.analysisResults.activeTimes.map((time) => time.count),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h4>YouTube Usage Over Hours of the Day</h4>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default YouTubeUsageChart;
