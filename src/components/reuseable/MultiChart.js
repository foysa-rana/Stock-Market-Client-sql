import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const MultiChart = ({ selectValue, data }) => {
  let trade = data.filter((el) => el.trade_code === selectValue);
  const chartRef = useRef();
  const chartInstanceRef = useRef();

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d");

    chartInstanceRef.current = new Chart(myChartRef, {
      type: "line",
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
      data: {
        labels: trade.map((el) => el.date.split("T")[0]),
        datasets: [
          {
            label: "",
            data: trade.map((el) => el.close),
            type: "line",
            pointBackgroundColor: "rgb(255, 99, 132)",
          },
          // {
          //   label: "",
          //   data: trade.map((el) => Math.round((el.volume * 0.005) / 100)),
          //   type: "bar",
          //   backgroundColor: "rgb(255, 99, 132)",
          // },
        ],
      },
    });
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  });
  return <canvas ref={chartRef} />;
};

export default MultiChart;
