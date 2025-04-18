import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
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
  Legend
);

function LineGraph({ datas, label }) {
  const [currentData, setCurrentData] = useState(Array(20).fill(0));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentData((prevData) => {
        const updatedData = [...prevData, datas];
        if (updatedData.length > 20) updatedData.shift();
        return updatedData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [datas]);

  const options = {
    scales: {
      x: { display: false },
      y: { beginAtZero: true },
    },
  };

  const data = {
    labels: Array(currentData.length).fill(""),
    datasets: [
      {
        label,
        data: currentData,
        borderColor: "#2196f3",
        backgroundColor: "rgba(33, 150, 243, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
}

export default LineGraph;
