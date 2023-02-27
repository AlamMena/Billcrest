import React from "react";
import { TrendingUpOutlined } from "@mui/icons-material";
import ApexCharts from "./apexCharts";
import { useTheme } from "@emotion/react";
import { Card, Typography } from "@mui/material";

export default function BarChart({ props }) {
  const data = [
    {
      label: "ProductSold",
      data: [
        { date: "22 feb", value: 1200 },
        { date: "23 feb", value: 10 },
        { date: "24 feb", value: 140 },
        { date: "25 feb", value: 4200 },
      ],
    },
    {
      label: "SalesPerYear",
      data: [
        { date: "22 feb", value: 1200 },
        { date: "23 feb", value: 10 },
        { date: "24 feb", value: 140 },
        { date: "25 feb", value: 4200 },
      ],
    },
  ];

  const theme = useTheme();
  const series = [
    {
      name: "LineChart",
      data: data[0].data.map((item) => item.value),
    },
  ];
  const options = {
    labels: data[0].data.map((item) => item.date),
    colors: [theme.palette.primary.main],
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      show: false,
      labels: { show: false, style: { colors: "grey" } },
      axisTicks: { show: false },
    },
    yaxis: {
      show: false,
      labels: { show: false, style: { colors: "grey" } },
    },
    grid: {
      show: false,
    },
    stroke: {
      curve: "smooth",
      lineCap: "round",
      width: 2.4,
    },
  };

  return (
    <Card className=" w-full my-4  h-48 shadow-lg flex items-center justify-between rounded-xl">
      <div className="flex flex-col p-3 mx-2 w-32 space-y-4">
        <Typography variant="h6">Producto vendido</Typography>
        <span className=" text-2xl font-bold">765</span>
        <div className="text-xs text-neutral-500">
          <TrendingUpOutlined className=" bg-green-100 rounded-full p-1 text-green-600 mr-2 wide" />
          <span className=" font-bold text-black">1</span>
          last week
        </div>
      </div>
      <div className=" max-w-xs flex-auto p-3">
        <ApexCharts
          options={options}
          series={series}
          height={115}
          // width={180}
        />
      </div>
    </Card>
  );
}
