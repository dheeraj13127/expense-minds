import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { backgroundColor } from "../../helper/ChartBackgroundColorsData";
import { DoughnutChartType } from "../../../../interfaces/Interfaces";
ChartJS.register(ArcElement, Tooltip, Legend);
function DoughnutChart({ labels, percentages, amountType }: DoughnutChartType) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: amountType,
        data: percentages,
        backgroundColor: backgroundColor,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "left" as const,
        display: true,
        labels: {
          color: "#ffffff",
          padding: 13,
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };
  return <Doughnut data={data} options={options} />;
}

export default DoughnutChart;
