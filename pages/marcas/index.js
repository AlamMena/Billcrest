import { MuseumOutlined } from "@mui/icons-material";
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
      text: t("nav.brands"),
      link: "/marcas",
    },
  ];
  const cols = [
    {
      field: "name",
      headerName: t("nav.brands"),
      minWidth: 270,
      flex: 1,
    },
    {
      field: "description",
      headerName: t("description"),
      minWidth: 270,
      flex: 1,
    },
  ];

  const fields = [
    {
      name: "name",
      placeholder: t("brandPlaceh"),
      label: t("name"),
      validation: {
        required: true,
      },
      fullWidth: false,
    },
    {
      name: "description",
      placeholder: t("brandDesPlaceh"),
      label: t("description"),
      multiline: true,
      fullWidth: false,
    },
  ];
  return (
    <CrudPage
      cols={cols}
      fields={fields}
      getUrl={"brands"}
      updateUrl={"brand"}
      postUrl={"brand"}
      deleteUrl={"brand"}
      createButtonMessage={t("newBrand")}
      deleteConfirmMessage="¿Estas seguro que deseas eliminar esta marca?"
      headerMessage="Cada vez que un negocio se expande trae mayores desafíos para todos los niveles de operación. Maneja tus marca y cada uno de sus niveles operativos."
      succesUpsertMessage={t("brandSaved")}
      successDeleteMessage={t("brandDeleted")}
      headerText={t("nav.brands")}
      icon={<MuseumOutlined />}
      locationRoutes={locationRoutes}
      search={t("searchBrands")}
    />
  );
}
