import React from "react";
import PageHeader from "../../components/globals/pageHeader";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import Router from "next/router";
import InvoiceList from "../../components/createInvoice/invoiceList";
import useAxios from "../../axios/index";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { SellOutlined } from "@mui/icons-material";
import InvoiceStatus from "../../components/invoices/invoiceStatus";
import { useTranslation } from "react-i18next";

export default function Invoices() {
  const { t } = useTranslation();
  const [invoices, setInvoices] = useState({
    isLoading: true,
    data: [],
  });

  const { axiosInstance } = useAxios();

  const setInvoicesAsync = async () => {
    try {
      const response = await axiosInstance.get("/invoices?limit=200&page=1");
      setInvoices({ isLoading: false, data: response.data.data });
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
      link: "/facturas",
    },
  ];

  useEffect(() => {
    setInvoicesAsync();
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex w-full justify-between items-center ">
        <div>
          <PageHeader
            header={t("nav.invoices")}
            locationRoutes={locationRoutes}
            Icon={<SellOutlined />}
          />
        </div>
        <div className="flex">
          <Button
            color="primary"
            variant="contained"
            onClick={() => Router.push("./facturas/crearfactura")}
            startIcon={<Add className="text-white ml-2 xs:ml-0" />}
          >
            <span className="text-sm hidden xs:flex whitespace-nowrap text-neutral-50 capitalize font-bold">
              {t("newInvoice")}
            </span>
          </Button>
        </div>
      </div>
      <InvoiceStatus />
      {/* <CategoryList
          setFormOpen={setFormOpen}
          data={categories}
          setFormData={setFormData}
          setItemToDelete={setItemToDelete}
          setConfirmOpen={setConfirmOpen}
        /> */}
      <InvoiceList data={invoices} />
    </div>
  );
}
