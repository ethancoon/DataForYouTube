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
  console.log(activeDayTimes);
  if (!activeDayTimes || activeDayTimes.length === 0) {
    return <div>No data available</div>;
  }

  const data = {
    datasets: [
      {
        label: "YouTube Usage Heatmap",
        data: activeDayTimes.map((item) => ({
          x: new Date(`1970-01-01T${item.day.hour}:00:00`).getHours(),
          y: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ].indexOf(item.day),
          v: item.count,
        })),
        backgroundColor: (context) => {
          const value = context.dataset.data[context.dataIndex].v;
          const alpha = Math.min(1, Math.max(0.1, value / 10));
          return `rgba(255, 0, 0, ${alpha})`; // Red color with varying transparency
        },
        borderColor: "rgba(255, 0, 0, 0.1)",
        borderWidth: 1,
        width: ({ chart }) => chart.chartArea.width / 24 - 2,
        height: ({ chart }) => chart.chartArea.height / 7 - 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        min: 0,
        max: 23,
        ticks: {
          stepSize: 1,
          callback: (value) => `${value}:00`,
          color: "white",
        },
        title: {
          display: true,
          text: "Hour of Day",
          color: "white",
        },
      },
      y: {
        type: "linear",
        position: "left",
        min: 0,
        max: 6,
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
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            const day = tooltipItems[0].raw.y;
            const hour = tooltipItems[0].raw.x;
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
            } at ${hour}:00`;
          },
          label: (tooltipItem) => {
            return `Videos Watched: ${tooltipItem.raw.v}`;
          },
        },
      },
    },
  };

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <Chart type="matrix" data={data} options={options} />
    </div>
  );
};

export default WeekUsageHeatmap;
