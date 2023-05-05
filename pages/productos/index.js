import { Add, Inventory2Rounded } from "@mui/icons-material";
import useAxios from "../../axios/index";
import { Button } from "@mui/material";
import { useRef, useState } from "react";
import PageHeader from "../../components/globals/pageHeader";
import { toast } from "react-toastify";
import ConfirmationForm from "../../components/globals/confirmationForm";
import { useRouter } from "next/router";
import ProductList from "../../components/products/productsList";
import { useTranslation } from "react-i18next";

export default function Products() {
  // confirmation form states
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { t } = useTranslation();

  const [itemToDelete, setItemToDelete] = useState();

  const { axiosInstance } = useAxios();

  const router = useRouter();
  const locationRoutes = [
    {
      text: t("nav.home"),
      link: "/",
    },
    {
      text: t("nav.products"),
      link: "/productos",
    },
  ];

  const deleteAsync = async () => {
    try {
      await toast.promise(axiosInstance.delete(`product/${itemToDelete}`), {
        pending: t("deletingProduct"),
        success: t("productDeleted"),
        error: t("error"),
      });
      await setDataAsync();
    } catch (error) {
    } finally {
      setConfirmOpen(false);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex w-full justify-between items-center pr-0 md:pr-8">
        <div>
          <PageHeader
            header={t("nav.products")}
            locationRoutes={locationRoutes}
            Icon={<Inventory2Rounded />}
          />
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            router.push("/productos/crear");
          }}
          startIcon={<Add className="text-white ml-2 xs:ml-0" />}
        >
          <span className="text-sm hidden xs:flex whitespace-nowrap text-neutral-50 capitalize font-bold">
            {t("newProduct")}
          </span>
        </Button>
      </div>
      <ProductList
        setItemToDelete={setItemToDelete}
        setConfirmOpen={setConfirmOpen}
        actions
      />
      <ConfirmationForm
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={() => {
          deleteAsync(itemToDelete);
        }}
      />
    </div>
  );
}
