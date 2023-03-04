import * as React from "react";
import BarChart from "../components/charts/barChart";
import SeriesChart from "../components/charts/seriesChart";
import LineChart from "../components/charts/lineChart";
import ProgressBar from "../components/charts/progressBar";
import CurrentBalance from "../components/charts/currentBalance";
import useAxios from "../axios/index";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/loading";

export default function Home() {
  const { axiosInstance } = useAxios();

  const {
    isLoading,
    success,
    error,
    data: dataCharts,
  } = useQuery({
    queryKey: ["getStatus"],
    queryFn: () =>
      axiosInstance.get("reports/index/status").then((res) => res.data),
  });

  // console.log(JSON.stringify(data));

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="px-10 max-w-2xl space-x-4 bg-green-200 flex md:flex-nowrap justify-center flex-wrap items-center p-8 rounded-2xl">
            <div className="flex flex-col ">
              <span className="font-semibold text-2xl tracking-wider">
                Welcome back Alam
              </span>
              <p className="text-xs mt-4">
                If you are going to use a passage of Lorem Ipsum, you need to be
                sure there is not anything
              </p>
              <div className="flex w-full justify-center md:justify-start my-4">
                <button
                  // onClick={generatePDF}
                  className=" my-4 shadow-sm w-24 bg-green-500 py-2 px-4 text-xs rounded-xl text-white"
                >
                  Go now
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
      )}
    </>
  );
}
