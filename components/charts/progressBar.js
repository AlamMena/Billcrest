import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { Typography } from "@mui/material";
import { Card } from "@mui/material";

export default function ProgressBar() {
  return (
    <Card className=" flex flex-col p-5 my-2 flex-auto space-y-3   shadow-xl rounded-xl ">
      <div className=" text-left px-3 ">
        <Typography variant={"h6"}>Resumen de ventas</Typography>
      </div>
      <div className=" space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-left ">Total Profit</span>
          <div>
            <span className=" font-semibold">$1,600 </span>
            <span className=" text-neutral-400">(10.8%)</span>
          </div>
        </div>
        <LinearProgress variant="determinate" value={10} color="success" />
      </div>
      <div className=" space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-left ">Total Income</span>
          <div>
            <span className=" font-semibold">$1,600 </span>
            <span className=" text-neutral-400">(70%)</span>
          </div>
        </div>
        <LinearProgress variant="determinate" color="info" value={70} />
      </div>
      <div className=" space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-left ">Total Expenses</span>
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
