import {
  AccessTimeFilledOutlined,
  CheckCircleRounded,
  InsertDriveFile,
  Notifications,
  Receipt,
} from "@mui/icons-material";
import { Card, CircularProgress, Typography } from "@mui/material";
import { formatCurrency } from "../../utils/methods";

const Item = ({ title, fillPercentage, color, amount, quantity, icon }) => (
  <div className="flex w-full justify-center ml-5 space-x-4 border-r-2 border-0 border-dashed border-gray-200 last:border-0">
    <div className="relative flex items-center justify-center mx-4">
      <div className={`${color} text-xl mt-2`}>{icon}</div>
      <CircularProgress
        className="absolute z-10 text-gray-100"
        size={60}
        variant="determinate"
        value={100}
      />
      <CircularProgress
        className={`${color} absolute z-10`}
        size={60}
        variant="determinate"
        value={fillPercentage ?? 0}
      />
    </div>
    <div className="flex flex-col space-y-1">
      <Typography variant="h6">{title}</Typography>
      <span className="text-sm text-gray-500 ">
        <b className="text-black">{quantity}</b> invoices
      </span>
      <span className={`${color} text-sm`}>{formatCurrency(amount ?? 0)}</span>
    </div>
    <div className="w-[1px] h-full bg-gray-100 rounded-sm"></div>
  </div>
);

export default function InvoiceStatus() {
  return (
    <Card
      sx={{ width: "87vw" }}
      className=" flex  sm:w-full overflow-x-scroll items-center h-32 my-2"
    >
      <Item
        title="Total"
        color="text-blue-400"
        fillPercentage={100}
        quantity={10}
        amount={1203.21}
        icon={<Receipt />}
      />
      <Item
        title="Paid"
        color="text-green-400"
        fillPercentage={20}
        quantity={10}
        amount={1203.21}
        icon={<CheckCircleRounded />}
      />{" "}
      <Item
        title="Unpaid"
        color="text-orange-400"
        fillPercentage={20}
        quantity={10}
        amount={1203.21}
        icon={<AccessTimeFilledOutlined />}
      />{" "}
      <Item
        title="Overdue"
        color="text-red-400"
        fillPercentage={20}
        quantity={10}
        amount={1203.21}
        icon={<Notifications />}
      />{" "}
      <Item
        title="Draft"
        color="text-gray-400"
        fillPercentage={20}
        quantity={10}
        amount={1203.21}
        icon={<InsertDriveFile />}
      />
    </Card>
  );
}
