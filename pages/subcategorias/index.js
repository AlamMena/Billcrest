import { AccountTreeOutlined } from "@mui/icons-material";
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
      text: t("nav.subcategories"),
      link: "/subcategorias",
    },
  ];
  const cols = [
    {
      field: "name",
      headerName: "Subcategoria",
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
      placeholder: t("subCategoryNamePlaceh"),
      label: t("name"),
      validation: {
        required: true,
      },
      fullWidth: false,
    },
    {
      name: "category",
      placeholder: t("categoryNamePlaceh"),
      label: t("nav.categories"),
      validation: {
        required: true,
      },
      fullWidth: true,
      type: "autocomplete",
      catalogName: "categories",
    },

    {
      name: "description",
      placeholder: t("subCategoryDescPlaceh"),
      label: t("description"),
      multiline: true,
      fullWidth: false,
    },
  ];

  const formatAutoComplete = (data) => {
    return {
      ...data,
      categoryId: data.category.id,
    };
  };
  const formatApiResult = (data) => {
    return {
      ...data,
      category: { id: data.categoryId, name: data.categoryName ?? "" },
    };
  };
  return (
    <CrudPage
      cols={cols}
      fields={fields}
      getUrl={"subcategories"}
      updateUrl={"subcategory"}
      postUrl={"subcategory"}
      deleteUrl={"subcategory"}
      formatAutoComplete={formatAutoComplete}
      formatApiResult={formatApiResult}
      createButtonMessage={t("newSubCategory")}
      deleteConfirmMessage="¿Estas seguro que deseas eliminar esta subcategoria?"
      headerMessage="Cada vez que un negocio se expande trae mayores desafíos para todos los niveles de operación. Maneja tus subcategorias y cada uno de sus niveles operativos."
      succesUpsertMessage={t("subCategorySaved")}
      successDeleteMessage={t("subCategoryDeleted")}
      headerText={t("nav.subcategories")}
      icon={<AccountTreeOutlined className="text-green-400" />}
      locationRoutes={locationRoutes}
      search={t("searchSubCategory")}
    />
  );
}
