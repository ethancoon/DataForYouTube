// Import Chart.js components
import { Bar } from "react-chartjs-2";

const StreaksChart = ({ streaks }) => {
  // Prepare data for the chart
  const data = {
    labels: streaks.map((_, index) => `Streak ${index + 1}`),
    datasets: [
      {
        label: "Length of Streak (Days)",
        data: streaks.map((streak) => streak.length),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options for styling
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Days",
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend if not needed
      },
    },
    maintainAspectRatio: false, // Allows custom dimensions
  };

  return (
    <div style={{ width: "600px", height: "400px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default StreaksChart;
