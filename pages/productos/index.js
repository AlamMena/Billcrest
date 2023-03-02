import { Add, Inventory2Rounded } from "@mui/icons-material";
import useAxios from "../../axios/index";
import { Button } from "@mui/material";
import { useRef, useState } from "react";
import PageHeader from "../../components/globals/pageHeader";
import { toast } from "react-toastify";
import ConfirmationForm from "../../components/globals/confirmationForm";
import { useRouter } from "next/router";
import ProductList from "../../components/products/productsList";

export default function Products() {
  // confirmation form states
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [itemToDelete, setItemToDelete] = useState();

  const toastId = useRef(null);
  const { axiosInstance } = useAxios();

  const router = useRouter();
  const locationRoutes = [
    {
      text: "Inicio",
      link: "/",
    },
    {
      text: "Productos",
      link: "/productos",
    },
  ];

  const deleteAsync = async () => {
    try {
      await toast.promise(axiosInstance.delete(`product/${itemToDelete.id}`), {
        pending: "Eliminando producto...",
        success: "Genial!, tu producto ha sido eliminado.",
        error: "Oops, algo ha ocurrido",
      });

      setConfirmOpen(false);
      await setDataAsync();
    } catch (error) {
      toast.error(`Opps!, Algo ha ocurrido`);
    }
  };

  // status tab object style
  const tabStyle = {
    style: { backgroundColor: "rgb(22 163 74 / var(--tw-text-opacity))" },
  };

  return (
    <div className="w-full md:px-0 px-3 md:pr-8 flex flex-col">
      <div className="flex w-full justify-between items-center pr-0 md:pr-8">
        <div>
          <PageHeader
            header="Productos"
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
          startIcon={<Add />}
        >
          Nuevo producto
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
        message={"eliminar el producto"}
      />
    </div>
  );
}
