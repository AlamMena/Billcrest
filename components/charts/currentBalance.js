import { Card, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

export default function CurrentBalance() {
  const { t } = useTranslation();
  return (
    <Card className=" p-5 space-y-3 my-2 lg:w-96 ">
      <div className="flex flex-col space-y-1">
        <Typography variant="h6">{t("home.currentB")}</Typography>
        <span className=" text-2xl font-bold">$216,500</span>
      </div>
      <div className="flex text-sm  text-neutral-600 justify-between">
        <span>{t("charts.currentBalance")}</span>
        <span>$1,500</span>
      </div>
      <div className="flex text-sm text-neutral-600  justify-between">
        <span>{t("charts.currentBalance")}</span>
        <span>$1,500</span>
      </div>
      <div className="flex text-sm  justify-between">
        <span className="text-neutral-700 font-bold">
          {t("charts.totalAmount")}{" "}
        </span>
        <span className="font-bold text-lg">$3,000</span>
      </div>
      <div className="flex justify-center space-x-2">
        <Button variant="contained" className="w-full" color="secondary">
          {t("charts.transfer")}
        </Button>
        <Button variant="contained" className="w-full" color="primary">
          {t("charts.receive")}
        </Button>
      </div>
    </Card>
  );
}
