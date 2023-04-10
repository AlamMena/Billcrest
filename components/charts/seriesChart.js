import React from "react";

import { Typography } from "@mui/material";
import { useTheme, alpha } from "@mui/system";
import ApexCharts from "./apexCharts";
import { Card } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function SeriesChart() {
  const { t } = useTranslation();
  const theme = useTheme();
  const options = {
    colors: [theme.palette.primary.main, theme.palette.secondary.main],
    chart: {
      height: 350,
      type: "radialBar",
    },
    labels: ["Hombre", "Mujer"],
    dataLabels: {
      show: true,
      name: {
        show: true,
      },
    },
    legend: {
      show: true,
      position: "bottom",
      floating: true,
    },
    plotOptions: {
      radialBar: {
        hollow: { size: "65%" },
        dataLabels: {
          show: true,
          name: {
            show: true,
            fontSize: "10px",
          },
          total: {
            show: true,
          },
        },
      },
    },
    stroke: {
      lineCap: "round",
    },
  };

  const series = [70, 34];

  return (
    <Card className="  p-5 my-3  lg:w-80 w-full flex-auto md:flex-initial">
      <div className=" text-left p-2 px-1  ">
        <Typography variant="h6">{t("home.sales")}</Typography>
      </div>
      <div className="  w-full ">
        <ApexCharts
          options={options}
          series={series}
          height={350}
          type="radialBar"
        />
      </div>
    </Card>
  );
}
