import * as React from "react";
import BarChart from "../components/charts/barChart";
import SeriesChart from "../components/charts/seriesChart";
import LineChart from "../components/charts/lineChart";
import ProgressBar from "../components/charts/progressBar";
import CurrentBalance from "../components/charts/currentBalance";
import useAxios from "../axios/index";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/loading";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  const { axiosInstance } = useAxios();

  // const {
  //   isLoading,
  //   success,
  //   error,
  //   data: dataCharts,
  // } = useQuery({
  //   queryKey: ["getStatus"],
  //   queryFn: () =>
  //     axiosInstance
  //       .get("reports/index/status")
  //       .then((res) => res.data),
  // });

  const dataCharts = [
    {
      label: t("charts.productsSold"),
      data: [
        { date: "0001-01-01T00:00:00", value: 25 },
        { date: "2023-02-19T17:09:45", value: 10 },
        { date: "2023-02-20T12:00:50", value: 12 },
        { date: "2023-02-21T01:03:07", value: 38 },
        { date: "2023-02-22T14:27:08", value: 39 },
      ],
      total: 289.45,
      increasePercentage: 28,
    },
    {
      label: t("charts.earningsMonth"),
      data: [
        { date: "0001-01-01T00:00:00", value: 10 },
        { date: "2023-02-19T17:09:45", value: 34 },
        { date: "2023-02-20T12:00:50", value: 40 },
        { date: "2023-02-21T01:03:07", value: 18 },
        { date: "2023-02-22T14:27:08", value: 9 },
      ],
      total: 345.95,
      increasePercentage: 14,
    },
    {
      label: t("charts.totalBalance"),
      data: [
        { date: "0001-01-01T00:00:00", value: 40 },
        { date: "2023-02-19T17:09:45", value: 20 },
        { date: "2023-02-20T12:00:50", value: 22 },
        { date: "2023-02-21T01:03:07", value: 38 },
        { date: "2023-02-22T14:27:08", value: 19 },
      ],
      total: 4234.34,
      increasePercentage: 50,
    },
  ];

  return (
    <>
      {/* {isLoading ? (
        <Loading />
      ) : ( */}
      <>
        <div className="lg:flex justify-between gap-5">
          <div className=" max-w-4xl  space-x-4 bg-green-200 flex md:flex-nowrap justify-center flex-wrap items-center p-8 rounded-2xl">
            <div className="flex flex-col ">
              <span className="font-semibold text-2xl tracking-wider">
                {t("home.welcome")}
              </span>
              <p className="text-xs mt-4">
                If you are going to use a passage of Lorem Ipsum, you need to be
                sure there is not anything
              </p>
              <div className="flex w-full justify-center md:justify-start my-4">
                <button
                  // onClick={generatePDF}
                  className=" my-4 shadow-sm w-24 bg-green-500 border-0 cursor-pointer hover:scale-110 transition-all duration-200 py-2 px-4 text-xs rounded-xl text-white"
                >
                  {t("home.go")}
                </button>
              </div>
            </div>
            <div className="flex">
              <img
                alt="welcome image"
                className="md:w-72 h-full w-64"
                src="/dashboard_welcome.png"
              />
            </div>
          </div>
          <div className=" w-full lg:max-w-md mt-3 lg:mt-0  space-x-4 bg-yellow-100 flex md:flex-nowrap justify-center flex-wrap items-center p-8 rounded-2xl">
            <div className="flex flex-col ">
              <span className="font-semibold text-2xl tracking-wider">
                {t("home.congrats")}
              </span>
              <p className="text-lg font-bold mt-4">{t("home.seller")}</p>
              <div className="flex w-full justify-center md:justify-start my-4">
                <button
                  // onClick={generatePDF}
                  className=" my-4 shadow-sm border-0 cursor-pointer hover:scale-110 transition-all duration-200 bg-yellow-500 py-2 px-4 text-xs rounded-xl text-white"
                >
                  {t("home.claim")}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className=" lg:flex gap-4 justify-around items-center  my-2 ">
          {dataCharts?.map((item, index) => (
            <BarChart data={item} key={index} />
          ))}
        </div>
        <div className="lg:flex my-3 gap-4 ">
          <SeriesChart />
          <LineChart />
        </div>
        <div className="lg:flex  my-3 gap-4">
          <ProgressBar />
          <CurrentBalance />
        </div>
      </>
      {/* )} */}
    </>
  );
}
