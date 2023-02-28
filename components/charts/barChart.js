import React from "react";
import { TrendingUpOutlined, TrendingDownOutlined } from "@mui/icons-material";
import ApexCharts from "./apexCharts";
import { useTheme } from "@emotion/react";
import { Card, Typography } from "@mui/material";
import { formatCurrency } from "../../utils/methods";

export default function BarChart({ data }) {
  const theme = useTheme();

  const valueValidation = (value) => {};

  const series = [
    {
      name: "LineChart",
      data: data.data.map((item) => item.value),
    },
  ];
  const options = {
    labels: data.data.map((item) => item.date),
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
    <Card className=" w-full my-4  h-48  flex items-center justify-between ">
      <div className="flex flex-col p-3 mx-2 w-32 space-y-4">
        <Typography variant="h6">{data.label}</Typography>
        <span className=" text-2xl font-bold">
          {(data.total <= 0 && <span>-</span>) ||
            (data.label !== "Products Sold" ? (
              <span>{formatCurrency(data.total)}</span>
            ) : (
              data.total
            ))}
        </span>
        <div className="text-xs text-neutral-500 w-72">
          {data.increasePercentage > 0 ? (
            <TrendingUpOutlined className=" bg-green-100 rounded-full p-1 text-green-600 mr-2 wide" />
          ) : (
            <TrendingDownOutlined className=" bg-red-100 rounded-full p-1 text-red-600 mr-2 wide" />
          )}
          <span className=" font-bold text-black">
            {(data.increasePercentage <= 0 && <span>-</span>) || (
              <span>{formatCurrency(data.increasePercentage)}</span>
            )}
          </span>
          <span> la semana pasada</span>
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
