import { WarehouseOutlined } from "@mui/icons-material";
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
      text: t("nav.warehouses"),
      link: "/alamcenes",
    },
  ];
  const cols = [
    {
      field: "name",
      headerName: t("warehouse"),
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
      placeholder: t("wareNamePlaceh"),
      label: t("name"),
      validation: {
        required: true,
      },
      fullWidth: false,
    },
    {
      name: "description",
      placeholder: t("wareDescPlaceh"),
      label: t("description"),
      multiline: true,
      fullWidth: false,
    },
  ];
  return (
    <CrudPage
      cols={cols}
      fields={fields}
      getUrl={"warehouses"}
      updateUrl={"warehouse"}
      postUrl={"warehouse"}
      deleteUrl={"warehouse"}
      createButtonMessage={t("newWarehouse")}
      deleteConfirmMessage="¿Estas seguro que deseas eliminar este almacen?"
      headerMessage="Cada vez que un negocio se expande trae mayores desafíos para todos los niveles de operación. Maneja tus almacenes y cada uno de sus niveles operativos."
      succesUpsertMessage={t("warehouseSaved")}
      successDeleteMessage={t("warehouseDeleted")}
      headerText={t("nav.warehouses")}
      icon={<WarehouseOutlined className="text-green-400" />}
      locationRoutes={locationRoutes}
      search={t("searchWarehouse")}
    />
  );
}
