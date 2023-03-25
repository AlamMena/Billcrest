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

export default function Invoices() {
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
      toast.error(`Opps!, something went wrong${error}`);
    }
  };

  const locationRoutes = [
    {
      text: "Inicio",
      link: "/",
    },
    {
      text: "Facturas",
      link: "/facturas",
    },
  ];

  useEffect(() => {
    setInvoicesAsync();
  }, []);

  return (
    <div className="w-full h-full  flex flex-col">
      <div className="flex w-full justify-between items-center pr-8">
        <div>
          <PageHeader
            header="Facturas"
            locationRoutes={locationRoutes}
            Icon={<SellOutlined />}
          />
        </div>
        <div className="flex">
          <Button
            // className=" z-auto rounded-xl py-2 bg-green-600 hover:bg-green-800"
            color="primary"
            variant="contained"
            onClick={() => Router.push("./facturas/crearfactura")}
            startIcon={<Add className="text-white" />}
          >
            <span className="text-sm whitespace-nowrap text-neutral-50 capitalize font-bold">
              Nueva factura
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
