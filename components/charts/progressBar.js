import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { Typography } from "@mui/material";
import { Card } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function ProgressBar() {
  const { t } = useTranslation();
  return (
    <Card className=" flex flex-col p-5 my-2 flex-auto space-y-3 ">
      <div className=" text-left  ">
        <Typography variant={"h6"}>{t("home.summary")}</Typography>
      </div>
      <div className=" space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-left ">{t("charts.totalProfit")}</span>
          <div>
            <span className=" font-semibold">$1,600 </span>
            <span className=" text-neutral-400">(10.8%)</span>
          </div>
        </div>
        <LinearProgress variant="determinate" value={10} color="success" />
      </div>
      <div className=" space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-left ">{t("charts.totalIncome")}</span>
          <div>
            <span className=" font-semibold">$1,600 </span>
            <span className=" text-neutral-400">(70%)</span>
          </div>
        </div>
        <LinearProgress variant="determinate" color="info" value={70} />
      </div>
      <div className=" space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-left ">{t("charts.totalExpenses")}</span>
          <div>
            <span className=" font-semibold">$1,600 </span>
            <span className=" text-neutral-400">(45.8%)</span>
          </div>
        </div>
        <LinearProgress variant="determinate" color="warning" value={45} />
      </div>
    </Card>
  );
}
