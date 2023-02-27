import { Add } from "@mui/icons-material";
import useAxios from "../../axios/index";
import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import PageHeader from "../../components/globals/pageHeader";
import { toast } from "react-toastify";
import ConfirmationForm from "../../components/globals/confirmationForm";
import { useRouter } from "next/router";
import SuppliersList from "../../components/suppliers/suppliersList";
import { ContactPageOutlined } from "@mui/icons-material";

export default function Contacts() {
  // list data
  const [pageState, setPageState] = useState({
    isLoading: true,
    data: [],
    pageSize: 10,
    page: 1,
    totalData: 0,
  });

  // confirmation form states
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [suplierStatus, setSuplierStatus] = useState("all");
  const [filter, setFilter] = useState("");
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
      text: "Proveedores",
      link: "/proveedores",
    },
  ];

  const setDataAsync = async () => {
    try {
      setPageState({ ...pageState, isLoading: true });

      const queryFilters = `page=${pageState.page}&limit=${pageState.pageSize}&value=${filter}`;

      const { data: apiResponse } = await axiosInstance.get(
        `/suppliers?${queryFilters}`
      );
      setPageState({
        ...pageState,
        isLoading: false,
        data: apiResponse.data,
        totalData: apiResponse.dataQuantity,
      });
    } catch (error) {
      toast.error(`Opps!, algo ha ocurrido ${error}`);
      setPageState({ ...pageState, isLoading: false });
    }
  };

  const deleteAsync = async () => {
    try {
      await toast.promise(
        axiosInstance.delete(`/supplier/${itemToDelete.id}`),
        {
          pending: "Eliminando proveedor",
          success: "Genial!, tu proveedor ha sido eliminado.",
          error: "Oops, algo ha ocurrido",
        }
      );

      setConfirmOpen(false);
      await setDataAsync();
    } catch (error) {
      toast.error(`Opps!, Algo ha ocurrido`);
    }
  };

  useEffect(() => {
    setDataAsync();
  }, [pageState.page, pageState.pageSize, filter]);
  return (
    <div className="w-full md:px-0 px-4 md:pr-8 flex flex-col">
      <div className="flex w-full justify-between items-center pr-8">
        <div>
          <PageHeader
            header="Proveedores"
            locationRoutes={locationRoutes}
            Icon={<ContactPageOutlined />}
          />
        </div>
        <div className="flex">
          <Button
            className=" z-auto rounded-xl py-2 bg-green-600 hover:bg-green-800"
            variant="contained"
            color="primary"
            onClick={() => {
              router.push("/proveedores/crear");
            }}
            startIcon={<Add className="text-white" />}
          >
            <span className="text-sm whitespace-nowrap text-neutral-50 capitalize font-bold">
              Nuevo Proveedor
            </span>
          </Button>
        </div>
      </div>
      <SuppliersList
        pageState={pageState}
        setFilter={setFilter}
        setPageState={setPageState}
        setItemToDelete={setItemToDelete}
        setConfirmOpen={setConfirmOpen}
      />
      <ConfirmationForm
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={() => {
          deleteAsync(itemToDelete);
        }}
        message="Estas seguro que deseas eliminar este proveedor?"
      />
    </div>
  );
}
