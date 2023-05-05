import React from "react";
import { Card, InputAdornment, OutlinedInput, Tab, Tabs } from "@mui/material";
import {
  DeleteOutline,
  EditOutlined,
  RemoveRedEyeOutlined,
  SearchRounded,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { formatCurrency } from "../../utils/methods";
import { generatePDF, InvoicePdf } from "../invoices/invoicePdf";
import { useTranslation } from "react-i18next";

export default function InvoiceList({ data }) {
  const { t } = useTranslation();
  const columns = [
    {
      field: "id",
      minWidth: 150,
      flex: 1,
      headerName: "Id",
    },
    {
      field: "clientName",
      minWidth: 160,
      flex: 1,
      headerName: t("clientName"),
    },
    {
      field: "invoiceTypeName",
      minWidth: 160,
      flex: 1,
      headerName: t("invoiceType"),
    },
    {
      field: "ncf",
      minWidth: 160,
      flex: 1,
      headerName: "NCF",
    },
    {
      field: "date",
      minWidth: 180,
      flex: 1,
      headerName: t("date"),
    },
    {
      field: "total",
      minWidth: 120,
      flex: 1,
      headerName: "Total",
      renderCell: (cells) => {
        return <span>{formatCurrency(cells.row.total)}</span>;
      },
    },
    {
      field: "action",
      minWidth: 60,
      flex: 1,
      headerName: "",
      renderCell: (cells) => {
        return (
          <>
            <div className="hidden">
              <InvoicePdf invoice={cells.row} />
            </div>
            <RemoveRedEyeOutlined
              onClick={() => generatePDF(cells.row)}
              className=" cursor-pointer hover:text-blue-500 inline-block"
            />
          </>
        );
      },
    },
    // {
    //   field: "IsDeleted",
    //   width: "150",
    //   headerName: "Estatus",
    //   //   renderCell: (cells) => {
    //   //     return <StatusRow active={!cells.row.IsDeleted} />;
    //   //   },
    // },

    // {
    //   field: "Acciones",
    //   sortable: false,
    //   width: 190,
    //   //   renderCell: (cells) => {
    //   //     return (
    //   //       <div className="flex space-x-4">
    //   //         <a
    //   //           onClick={() => {
    //   //             setFormData(cells.row);
    //   //             setFormOpen(true);
    //   //           }}
    //   //           className="text-green-400 cursor-pointer"
    //   //         >
    //   //           <EditOutlined className="text-green-400 mx-2" />
    //   //           Edit
    //   //         </a>
    //   //         <a
    //   //           onClick={() => {
    //   //             setItemToDelete(cells.row);
    //   //             setConfirmOpen(true);
    //   //           }}
    //   //           className="text-red-500 cursor-pointer"
    //   //         >
    //   //           <DeleteOutline className="text-red-500 mx-2" /> Delete
    //   //         </a>
    //   //       </div>
    //   //     );
    //   //   },
    // },
  ];
  // useEffect(() => {
  //   console.log(data);
  // }, []);

  return (
    <>
      <Card className="flex flex-col h-full  w-full  my-3">
        <div className="flex items-center space-x-4 px-4 my-4">
          <OutlinedInput
            id="input-with-icon-adornment"
            className="input-rounded rounded-xl"
            fullWidth
            placeholder={t("searchInvoice")}
            startAdornment={
              <InputAdornment position="start">
                <SearchRounded className="text-slate-400" />
              </InputAdornment>
            }
          />
        </div>

        <div className="h-96 w-full my-2">
          <DataGrid
            getRowId={(row) => row.id}
            rows={data.data}
            columns={columns}
            className="p-2"
            pageSize={5}
            // loading={dataFiltered.isLoading}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            hideFooterSelectedRowCount
          />
        </div>
      </Card>
    </>
  );
}
