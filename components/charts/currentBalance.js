import React from "react";
import Button from "@mui/material/Button";
import { Card, Typography } from "@mui/material";

export default function CurrentBalance() {
  return (
    <Card className=" p-5 space-y-3 my-2 lg:w-96 ">
      <div className="flex flex-col space-y-1">
        <Typography variant="h6">Current Balance</Typography>
        <span className=" text-2xl font-bold">$216,500</span>
      </div>
      <div className="flex text-sm  text-neutral-600 justify-between">
        <span>Your Current Balance</span>
        <span>$1,500</span>
      </div>
      <div className="flex text-sm text-neutral-600  justify-between">
        <span>Your Current Balance</span>
        <span>$1,500</span>
      </div>
      <div className="flex text-sm  justify-between">
        <span className="text-neutral-700 font-bold">Total Amount </span>
        <span className="font-bold text-lg">$3,000</span>
      </div>
      <div className="flex justify-center space-x-2">
        <Button
          variant="contained"
          className="w-full bg-orange-500 text-black font-bold hover:bg-orange-600"
          color="warning"
        >
          Transfer
        </Button>
        <Button
          variant="contained"
          className="w-full bg-green-500 text-white font-bold hover:bg-green-600"
          color="primary"
        >
          Receive
        </Button>
      </div>
    </Card>
  );
}
