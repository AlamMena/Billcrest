import { CategoryOutlined } from "@mui/icons-material";
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
      text: t("nav.categories"),
      link: "/categorias",
    },
  ];
  const cols = [
    {
      field: "name",
      headerName: t("category"),
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
      placeholder: t("categoryNamePlaceh"),
      label: t("name"),
      validation: {
        required: true,
      },
      fullWidth: false,
    },
    {
      name: "description",
      placeholder: t("categoryDescPlaceh"),
      label: t("description"),
      multiline: true,
      fullWidth: false,
    },
  ];
  return (
    <CrudPage
      cols={cols}
      fields={fields}
      getUrl={"categories"}
      updateUrl={"category"}
      postUrl={"category"}
      deleteUrl={"category"}
      createButtonMessage={t("newCategory")}
      deleteConfirmMessage="¿Estas seguro que deseas eliminar esta categoria?"
      headerMessage="Cada vez que un negocio se expande trae mayores desafíos para todos los niveles de operación. Maneja tus categorias y cada uno de sus niveles operativos."
      succesUpsertMessage={t("categorySaved")}
      successDeleteMessage={t("categoryDeleted")}
      headerText={t("nav.categories")}
      icon={<CategoryOutlined className="text-green-400" />}
      locationRoutes={locationRoutes}
      search={t("searchCategory")}
    />
  );
}
