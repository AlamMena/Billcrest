import React from "react";
import PageHeader from "../../components/globals/pageHeader";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import Router from "next/router";
import useAxios from "../../axios/index";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { SellOutlined } from "@mui/icons-material";
import GoodReceiptList from "../../components/createInvoice/goodReceiptList";
import { useTranslation } from "react-i18next";

export default function Invoices() {
  const { t } = useTranslation();
  const [goodreceipt, setGoodReceipt] = useState({
    isLoading: true,
    data: [],
  });

  const { axiosInstance } = useAxios();

  const setGoodReceiptAsync = async () => {
    try {
      const response = await axiosInstance.get(
        "/goodreceipts?limit=200&page=1"
      );
      setGoodReceipt({ isLoading: false, data: response.data.data });
    } catch (error) {
      toast.error(t("error"));
    }
  };

  const locationRoutes = [
    {
      text: t("nav.home"),
      link: "/",
    },
    {
      text: t("nav.invoices"),
      link: "/recepcionmercancia",
    },
  ];

  useEffect(() => {
    setGoodReceiptAsync();
  }, []);

  return (
    <>
      <div className="w-full  flex flex-col">
        <div className="flex w-full justify-between items-center">
          <div>
            <PageHeader
              header="Recepcion de Mercancias"
              locationRoutes={locationRoutes}
              Icon={<SellOutlined />}
            />
          </div>
          <div className="flex">
            <Button
              variant="contained"
              onClick={() =>
                Router.push("./recepcionmercancia/crearfacturamercancia")
              }
              startIcon={<Add className="text-white ml-2 xs:ml-0" />}
              color="primary"
            >
              <span className="text-sm hidden xs:flex whitespace-nowrap text-neutral-50 capitalize font-bold">
                {t("newInvoice")}
              </span>
            </Button>
          </div>
        </div>
        {/* <CategoryList
          setFormOpen={setFormOpen}
          data={categories}
          setFormData={setFormData}
          setItemToDelete={setItemToDelete}
          setConfirmOpen={setConfirmOpen}
        /> */}
        <GoodReceiptList data={goodreceipt} />
      </div>
    </>
  );
}
