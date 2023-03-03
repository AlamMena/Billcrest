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

export default function Invoices() {
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
      link: "/recepcionmercancia",
    },
  ];

  useEffect(() => {
    setGoodReceiptAsync();
  }, []);

  return (
    <>
      <div className="w-full  flex flex-col">
        <div className="flex w-full justify-between items-center pr-8">
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
              startIcon={<Add className="text-white" />}
              color="primary"
            >
              <span className="text-sm whitespace-nowrap text-neutral-50 capitalize font-bold">
                Nueva Factura
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
