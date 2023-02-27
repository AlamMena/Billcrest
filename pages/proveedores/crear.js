import { useEffect, useState } from "react";
import useAxios from "../../axios/index";
import ContactForm from "../../components/contacts/contactForm";
import PageHeader from "../../components/globals/pageHeader";
import SuppliersForm from "../../components/suppliers/suppliersForm";
import { ContactPageOutlined } from "@mui/icons-material";

export default function CreateSuplier() {
  const locationRoutes = [
    {
      text: "Inicio",
      link: "/",
    },
    {
      text: "Proveedores",
      link: "/proveedores",
    },
    {
      text: "Crear",
      link: "/proveedores/crear",
    },
  ];

  return (
    <>
      <div className="col-span-12 flex w-full justify-between items-center pr-8">
        <div>
          <PageHeader
            header="Crear Proveedor"
            locationRoutes={locationRoutes}
            Icon={<ContactPageOutlined />}
          />
        </div>
      </div>
      <SuppliersForm />
    </>
  );
}
