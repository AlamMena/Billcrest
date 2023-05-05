import {
  DeleteOutline,
  EditOutlined,
  SearchRounded,
} from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  Card,
  FormControl,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router.js";
import { debounce } from "../../utils/methods.js";
import currency from "currency.js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxios from "../../axios/index";
import { useTranslation } from "react-i18next";

export default function ProductList({
  statusFilter,
  setItemToDelete,
  setConfirmOpen,
  actions,
  onRowClick,
}) {
  const { t } = useTranslation();
  const [pageState, setPageState] = useState({
    isLoading: true,
    data: [],
    pageSize: 5,
    page: 1,
    filter: {
      value: "",
      status: "all",
    },
    totalData: 0,
  });
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const chip = [
    {
      name: "Ana",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/3048/3048122.png",
    },
    {
      name: "TrapKing",
      imageUrl: "https://cdn-icons-png.flaticon.com/128/3048/3048189.png",
    },
    {
      name: "Eldiablo",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/3048/3048122.png",
    },
  ];
  const columns = [
    {
      field: "id",
      width: 70,
      headerName: "Id",
    },
    {
      field: "name",
      width: "250",
      headerName: t("nav.products"),
      renderCell: (cells) => {
        return (
          <div className="flex space-x-4 items-center ">
            <img
              alt=""
              className=" rounded-xl w-10 h-10"
              src={
                cells.row.imageUrl
                  ? cells.row.imageUrl
                  : "https://cdn-icons-png.flaticon.com/128/1524/1524983.png"
              }
            />
            <span className="font-semibold ">{cells.row.name}</span>
          </div>
        );
      },
    },
    {
      field: "cost",
      width: 120,
      headerName: t("cost"),
      renderCell: (cells) => {
        return <span>{currency(cells.row.cost).format()}</span>;
      },
    },
    {
      field: "price",
      width: 120,
      headerName: t("price"),
      renderCell: (cells) => {
        return <span>{currency(cells.row.price).format()}</span>;
      },
    },
    {
      field: "marginBenefit",
      width: 120,
      headerName: t("benefit"),
      renderCell: (cells) => {
        return <span>{currency(cells.row.marginBenefit).format()}</span>;
      },
    },

    {
      field: "Cantidad",
      width: 90,
      headerName: t("quantity"),
      renderCell: (cells) => {
        return <span>{cells.row.stock}</span>;
      },
    },
    {
      field: "stock",
      width: 150,
      headerName: t("inventory"),
      renderCell: (cells) => {
        return cells.row.stock < 1 ? (
          <span className="bg-red-200 rounded-2xl px-2 py-1 flex items-center">
            <span className="w-2 h-2 rounded-full mx-2 bg-red-700 animate-pulse  "></span>
            {t("soldout")}
          </span>
        ) : (
          <span className="bg-green-200 rounded-2xl px-2 py-1 flex items-center">
            <span className="w-2 h-2 rounded-full mx-2 bg-green-700 animate-pulse  "></span>
            {t("available")}
          </span>
        );
      },
    },
    {
      field: "supliers",
      width: 150,
      headerName: t("nav.providers"),
      renderCell: (cell) => {
        return (
          <AvatarGroup max={4}>
            {chip.map((item, index) => {
              return (
                <Avatar
                  className="w-8 h-8 "
                  key={index}
                  alt={item.name}
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                />
              );
            })}
          </AvatarGroup>
        );
      },
    },
    {
      field: t("actions"),
      sortable: false,
      hide: !actions,
      width: 250,
      renderCell: (cells) => {
        return (
          <div className="flex space-x-4">
            <a
              onClick={() => {
                router.push(`/productos/${cells.row.id}`);
              }}
              className="text-green-400 cursor-pointer"
            >
              <EditOutlined className="text-green-400" />
            </a>
            <a
              onClick={() => {
                setItemToDelete(cells.row.id);
                setConfirmOpen(true);
              }}
              className="text-red-500 cursor-pointer"
            >
              <DeleteOutline className="text-red-500" />
            </a>
          </div>
        );
      },
    },
  ];

  // methods

  const setProductsAsync = async () => {
    try {
      // set loading
      setPageState({ ...pageState, isLoading: true });
      // querys filters definition
      const queryFilters = `page=${pageState.page}&limit=${pageState.pageSize}&value=${pageState.filter.value}`;
      const { data: apiResponse } = await axiosInstance.get(
        `products?${queryFilters}`
      );
      setPageState({
        ...pageState,
        data: apiResponse.data,
        totalData: apiResponse.dataQuantity,
        isLoading: false,
      });
    } catch (error) {
      toast.error(t("error"));
    }
  };
  const onInputFilterChange = debounce((e) =>
    setPageState({
      ...pageState,
      filter: { value: e.target.value, status: "all" },
    })
  );

  const onDataGridPageChange = (newPage) => {
    setPageState({
      ...pageState,
      page: newPage + 1,
      pageSize: pageState.pageSize,
    });
  };

  const onDataGridPageSizeChange = (newPageSize) => {
    setPageState({
      ...pageState,
      page: pageState.page,
      pageSize: newPageSize,
    });
  };

  useEffect(() => {
    setProductsAsync();
  }, [pageState.page, pageState.pageSize, pageState.filter, statusFilter]);
  return (
    <Card className="flex flex-col h-full w-full ">
      <div className="flex items-center space-x-4 px-4 mt-4">
        {/* search input */}
        <FormControl className="w-full">
          <OutlinedInput
            id="input-with-icon-adornment"
            className="input-rounded rounded-xl"
            onChange={onInputFilterChange}
            placeholder={t("searchProducts")}
            fullWidth
            startAdornment={
              <InputAdornment position="start">
                <SearchRounded className="text-slate-400" />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>

      {/*------------------ DataGrid ---------------- */}
      <div className=" w-full my-2">
        <DataGrid
          getRowId={(row) => row.id}
          rows={pageState.data}
          rowCount={pageState.totalData}
          pageSize={pageState.pageSize}
          page={pageState.page - 1}
          loading={pageState.isLoading}
          onPageChange={onDataGridPageChange}
          onPageSizeChange={onDataGridPageSizeChange}
          columns={columns}
          onRowClick={onRowClick}
          rowsPerPageOptions={[5]}
          experimentalFeatures={{ newEditingApi: true }}
          paginationMode="server"
          className={`p-2 h-96 `}
          rowHeight={60}
          pagination
          disableColumnFilter
          hideFooterSelectedRowCount
          disableColumnSelector
          localeText={{
            noRowsLabel: t("ndata"),
          }}
        />
      </div>
    </Card>
  );
}
