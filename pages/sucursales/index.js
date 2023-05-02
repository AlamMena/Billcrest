import { ApartmentOutlined } from "@mui/icons-material";
import React from "react";
import CrudPage from "../../components/crud/crudPage";
import { useTranslation } from "react-i18next";

export default function Branch() {
  const { t } = useTranslation();

  const locationRoutes = [
    {
      text: t("nav.home"),
      link: "/",
    },
    {
      text: t("nav.branches"),
      link: "/sucursales",
    },
  ];
  const cols = [
    {
      field: "name",
      headerName: t("branch"),
      minWidth: 270,
      flex: 1,
    },
    {
      field: "location",
      headerName: t("location"),
      minWidth: 270,
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: t("phone"),
      minWidth: 270,
      flex: 1,
    },
  ];

  const fields = [
    {
      name: "name",
      placeholder: t("branchNamePlaceh"),
      label: t("name"),
      validation: {
        required: true,
      },
      fullWidth: false,
    },
    {
      name: "location",
      placeholder: "Santo Domingo #0001",
      label: t("location"),
      validation: {
        required: true,
      },
      fullWidth: false,
    },
    {
      name: "phoneNumber",
      placeholder: "809-001-01111",
      validation: {
        required: true,
      },
      label: t("phone"),
      fullWidth: false,
    },
    {
      name: "description",
      placeholder: t("branchDescPlaceh"),
      label: t("description"),
      multiline: true,
      fullWidth: false,
    },
  ];
  return (
    <CrudPage
      cols={cols}
      fields={fields}
      getUrl={"branches"}
      updateUrl={"branch"}
      postUrl={"branch"}
      deleteUrl={"branch"}
      createButtonMessage={t("newBranch")}
      deleteConfirmMessage="¿Estas seguro que deseas eliminar esta sucursal?"
      headerMessage="Cada vez que un negocio se expande trae mayores desafíos para todos los niveles de operación. Maneja tus sucursales y cada uno de sus niveles operativos."
      succesUpsertMessage={t("branchSaved")}
      successDeleteMessage={t("branchDeleted")}
      headerText={t("nav.branches")}
      icon={<ApartmentOutlined className="text-green-400" />}
      locationRoutes={locationRoutes}
      search={t("searchBranches")}
    />
  );
}
