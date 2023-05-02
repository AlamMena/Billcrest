import { Add, ContactPageOutlined } from "@mui/icons-material";
import useAxios from "../../axios/index";
import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ContactForm from "../../components/contacts/contactForm";
import ContactList from "../../components/contacts/contactList";
import PageHeader from "../../components/globals/pageHeader";
import { toast } from "react-toastify";
import ConfirmationForm from "../../components/globals/confirmationForm";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

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
  const [contactStatus, setContactStatus] = useState("all");
  const [contactType, setContactType] = useState("all");
  const [filter, setFilter] = useState("");
  const [itemToDelete, setItemToDelete] = useState();

  const { t } = useTranslation();

  const toastId = useRef(null);
  const { axiosInstance } = useAxios();

  const router = useRouter();
  const locationRoutes = [
    {
      text: t("nav.home"),
      link: "/",
    },
    {
      text: t("nav.clients"),
      link: "/clientes",
    },
  ];

  const deleteAsync = async () => {
    try {
      await toast.promise(axiosInstance.delete(`client/${itemToDelete.id}`), {
        pending: t("deletingClient"),
        success: t("clientDeleted"),
        error: t("error"),
      });

      await setDataAsync();
    } catch (error) {
      toast.error(t("error"));
    } finally {
      setConfirmOpen(false);
    }
  };

  const setDataAsync = async () => {
    try {
      setPageState({ ...pageState, isLoading: true });

      const queryFilters = `page=${pageState.page}&limit=${pageState.pageSize}&value=${filter}`;

      const { data: apiResponse } = await axiosInstance.get(
        `clients?${queryFilters}` //filtered?
      );

      setPageState({
        ...pageState,
        isLoading: false,
        data: apiResponse.data,
        totalData: apiResponse.dataQuantity,
      });
    } catch (error) {
      toast.error(t("error"));
      setPageState({ ...pageState, isLoading: false });
    }
  };

  useEffect(() => {
    setDataAsync();
  }, [pageState.page, pageState.pageSize, filter, contactStatus, contactType]);
  return (
    <div className="w-full flex flex-col">
      <div className="flex w-full justify-between items-center pr-8">
        <div>
          <PageHeader
            header={t("nav.clients")}
            locationRoutes={locationRoutes}
            Icon={<ContactPageOutlined />}
          />
        </div>
        <div className="flex">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              router.push("/clientes/crear");
            }}
            startIcon={<Add className="text-white" />}
          >
            <span className="text-sm whitespace-nowrap text-neutral-50 capitalize font-bold">
              {t("newClient")}
            </span>
          </Button>
        </div>
      </div>
      <ContactList
        pageState={pageState}
        setContactStatus={setContactStatus}
        setContactType={setContactType}
        contactStatus={contactStatus}
        contactType={contactType}
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
      />
    </div>
  );
}
