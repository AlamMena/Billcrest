import { useEffect, useState } from "react";
import useAxios from "../../axios/index";
import ContactForm from "../../components/contacts/contactForm";
import PageHeader from "../../components/globals/pageHeader";
import SuppliersForm from "../../components/suppliers/suppliersForm";
import { ContactPageOutlined } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export default function CreateSuplier() {
  const { t } = useTranslation();
  const locationRoutes = [
    {
      text: t("nav.home"),
      link: "/",
    },
    {
      text: t("nav.providers"),
      link: "/proveedores",
    },
    {
      text: t("create"),
      link: "/proveedores/crear",
    },
  ];

  return (
    <>
      <div className="col-span-12 flex w-full justify-between items-center pr-8">
        <div>
          <PageHeader
            header={t("createProvider")}
            locationRoutes={locationRoutes}
            Icon={<ContactPageOutlined />}
          />
        </div>
      </div>
      <SuppliersForm />
    </>
  );
}
