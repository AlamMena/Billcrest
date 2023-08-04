import List from "./list.js";
import { useState, useEffect, useRef } from "react";
import useAxios from "../../axios/index";
import PageHeader from "../globals/pageHeader";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import ConfirmationForm from "../globals/confirmationForm.js";
import Form from "./form.js";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
export default function CPage({
  getUrl,
  postUrl,
  updateUrl,
  deleteUrl,
  succesUpsertMessage,
  successDeleteMessage,
  createButtonMessage,
  deleteConfirmMessage,
  headerMessage,
  headerText,
  locationRoutes,
  fields,
  formatAutoComplete,
  formatApiResult,
  cols,
  icon,
  search,
}) {
  const [pageState, setPageState] = useState({
    isLoading: true,
    data: [],
    pageSize: 5,
    page: 1,
    totalData: 0,
  });
  const [filter, setFilter] = useState("");
  const { t } = useTranslation();

  // upsert states
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({});

  // confirmation form states
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();

  const toastId = useRef(null);

  const { axiosInstance } = useAxios();

  const setDataAsync = async () => {
    try {
      setPageState({ ...pageState, isLoading: true });

      const queryFilters = `page=${pageState.page}&limit=${pageState.pageSize}&value=${filter}`;

      const { data: apiResponse } = await axiosInstance.get(
        `${getUrl}?${queryFilters}`
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

  const upsertAsync = async (data) => {
    try {
      toastId.current = toast(t("loading"), {
        type: toast.TYPE.LOADING,
      });

      // if there's any id we create the item in other way we update the item
      data.id
        ? await axiosInstance.put(`${updateUrl}`, data)
        : await axiosInstance.post(`${postUrl}`, data);

      await setDataAsync();

      toast.update(toastId.current, {
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
        render: `${succesUpsertMessage}`,
      });

      setFormOpen(false);
    } catch (error) {
      toast.update(toastId.current, {
        type: toast.TYPE.ERROR,
        autoClose: 5000,
        render:
          error.response.data.status === 400
            ? error.response.data.message
            : t("error"),
      });
    }
  };

  const deleteAsync = async () => {
    try {
      toastId.current = toast(t("loading"), {
        type: toast.TYPE.LOADING,
      });
      await axiosInstance.delete(`${deleteUrl}/${itemToDelete.id}`);

      toast.update(toastId.current, {
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
        render: `${successDeleteMessage}`,
      });

      setConfirmOpen(false);
      await setDataAsync();
    } catch (error) {
      toast.update(toastId.current, {
        type: toast.TYPE.ERROR,
        autoClose: 5000,
        render:
          error.response.data.status === 400
            ? error.response.data.message
            : t("error"),
      });
    }
  };

  useEffect(() => {
    setDataAsync();
  }, [pageState.page, pageState.pageSize, filter]);

  return (
    <>
      <div className="w-full flex flex-col">
        <div className="flex w-full justify-between items-center">
          <PageHeader
            header={headerText}
            locationRoutes={locationRoutes}
            text={headerMessage}
            Icon={icon}
          />

          <div className="flex">
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                setFormOpen(true);
                setFormData({});
              }}
              startIcon={<Add className="text-white -mr-2 xs:mr-0" />}
            >
              <span className="hidden xs:flex text-sm whitespace-nowrap text-neutral-50 capitalize font-bold">
                {createButtonMessage}
              </span>
            </Button>
          </div>
        </div>
        <List
          cols={cols}
          pageState={pageState}
          setFilter={setFilter}
          setPageState={setPageState}
          setFormOpen={setFormOpen}
          setFormData={setFormData}
          setItemToDelete={setItemToDelete}
          setConfirmOpen={setConfirmOpen}
          searchText={search}
        />

        <ConfirmationForm
          open={confirmOpen}
          setOpen={setConfirmOpen}
          onConfirm={deleteAsync}
          message={deleteConfirmMessage}
        />
        <Form
          open={formOpen}
          setOpen={setFormOpen}
          data={formData}
          onSave={upsertAsync}
          fields={fields}
          icon={icon}
          headerText={headerText}
          formatAutoComplete={formatAutoComplete}
          formatApiResult={formatApiResult}
        />
      </div>
    </>
  );
}
