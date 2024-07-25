import { Line } from "react-chartjs-2";
import { type DayTimeCount } from "../../types";
import { Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const TotalUsageChart = ({
  countsPerDay,
}: {
  countsPerDay: DayTimeCount[];
}) => {
  // Ensure countsPerDay is an array
  const validCountsPerDay = Array.isArray(countsPerDay) ? countsPerDay : [];

  // Group data by month and calculate the average
  const months: { [key: string]: { total: number; count: number } } = {};

  validCountsPerDay.forEach((day) => {
    const date = new Date(day.day);
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

    if (!months[month]) {
      months[month] = { total: 0, count: 0 };
    }

    months[month].total += day.count;
    months[month].count += 1;
  });

  const labels = Object.keys(months);
  const data = labels.map((month) => months[month].total / months[month].count);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Usage",
        data,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "red",
        borderWidth: 1,
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const options = {
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
          text: "Date",
          color: "white",
          font: {
            size: 16,
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
        beginAtZero: true,
        ticks: {
          color: "white",
          font: {
            weight: "bold" as const,
          },
        },
        title: {
          display: true,
          text: "Videos Watched",
          color: "white",
          font: {
            size: 16,
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
        display: false, // Hide the legend
      },
      title: {
        display: false, // Hide the title
      },
    },
  };

  return (
    <div style={{ height: "400px" }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontSize: 25,
          fontWeight: "bold",
          paddingLeft: 10,
        }}
      >
        YouTube Usage Over Time:
      </Typography>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default TotalUsageChart;
