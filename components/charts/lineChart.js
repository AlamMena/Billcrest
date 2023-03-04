import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
} from "@mui/material";
import { Typography } from "@mui/material";
import ApexCharts from "./apexCharts";
import { useTheme } from "@mui/system";

export default function LineChart() {
  const theme = useTheme();
  const [year, setYear] = useState(2022);

  const handleChange = (event) => {
    setYear(event.target.value);
  };

  const series = [
    {
      name: "AloC",
      data: [90, 10, 50, 30, 50, 12, 0],
    },
    {
      name: "Alo",
      data: [10, 90, 90, 20, 30, 90, 20, 30, 60],
    },
  ];

  const options = {
    colors: [theme.palette.primary.main, theme.palette.secondary.main],
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      labels: { style: { colors: "grey" } },
    },
    yaxis: {
      labels: { style: { colors: "grey" } },
    },
    grid: {
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    stroke: {
      curve: "smooth",
      lineCap: "round",
      width: 2.4,
    },
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  };

  return (
    <Card className=" flex flex-col  p-5 flex-auto   ">
      <div className="flex justify-between items-center">
        <div className="flex flex-col text-left p-5">
          <Typography variant="h6">Ventas anuales</Typography>
          <span className="text-xs text-neutral-500">(+45 el ano pasado)</span>
        </div>
        <div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Year</InputLabel>
            <Select
              id="year"
              value={year}
              label="year"
              onChange={handleChange}
              size="small"
            >
              <MenuItem value={2021}>2021</MenuItem>
              <MenuItem value={2022}>2022</MenuItem>
              <MenuItem value={2023}>2023</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div>
        <ApexCharts
          options={options}
          series={series}
          type="area"
          height={350}
          width={"100%"}
        />
      </div>
    </Card>
  );
}
