import {
  DeleteOutline,
  EditOutlined,
  SearchRounded,
} from "@mui/icons-material";
import {
  Card,
  FormControl,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router.js";
import { debounce } from "../../utils/methods.js";
import Image from "next/image.js";

export default function ContactList({
  pageState,
  setPageState,
  setFilter,
  setItemToDelete,
  setConfirmOpen,
}) {
  const router = useRouter();

  const columns = [
    {
      field: "id",
      width: 120,
      headerName: "Id",
    },
    {
      field: "name",
      width: "300",
      headerName: "Contacto",
      renderCell: (cells) => {
        return (
          <div className="flex space-x-4 items-center">
            <Image
              alt=""
              className=" rounded-xl w-10 h-10"
              src={
                cells.row.imageUrl
                  ? cells.row.imageUrl
                  : "https://cdn-icons-png.flaticon.com/128/3135/3135768.png"
              }
            />
            <span className="font-semibold ">{cells.row.name}</span>
          </div>
        );
      },
    },

    {
      field: "email",
      width: 190,
      headerName: "Correo electronico",
    },
    {
      field: "addresses[0]",
      width: 190,
      headerName: "Direccion",
      renderCell: (cells) => {
        return cells.row.addresses[0] && cells.row.addresses[0].address1;
      },
    },

    {
      field: "contacts[0]",
      width: 150,
      headerName: "Telefono",
      renderCell: (cells) => {
        return cells.row.contacts[0] && cells.row.contacts[0].number;
      },
    },

    {
      field: "Acciones",
      sortable: false,
      width: 150,
      renderCell: (cells) => {
        return (
          <div className="flex space-x-4">
            <a
              onClick={() => {
                router.push(`/clientes/${cells.row.id}`);
              }}
              className="text-green-400 cursor-pointer``"
            >
              <EditOutlined className="text-green-400 mx-2" />
            </a>
            <a
              onClick={() => {
                setItemToDelete(cells.row);
                setConfirmOpen(true);
              }}
              className="text-red-500 cursor-pointer"
            >
              <DeleteOutline className="text-red-500 mx-2" />
            </a>
          </div>
        );
      },
    },
  ];

  // status tab object style
  const tabStyle = {
    style: { backgroundColor: "rgb(22 163 74 / var(--tw-text-opacity))" },
  };

  // methods

  // const onTabStatusChange = debounce((e, newValue) =>
  //   setContactStatus(newValue)
  // );

  // const onSelectTypeChange = debounce((e) => setContactType(e.target.value));
  const onInputFilterChange = debounce((e) => setFilter(e.target.value));

  const onDataGridPageChange = (newPage) => {
    setPageState({ ...pageState, page: newPage + 1 });
  };

  const onDataGridPageSizeChange = (newPageSize) => {
    setPageState({ ...pageState, pageSize: newPageSize });
  };

  return (
    <Card className="flex flex-col h-full w-full ">
      {/* ------------------   Tab Status -------------------- */}
      {/* <div className=" bg-slate-200 rounded-t-lg">
        <Tabs className="text-neutral-500">
          tab options
          <Tab className="capitalize" value="all" label="Tabla de clientes" />
          <Tab className="capitalize" value={"false"} label="Activos" />
          <Tab className="capitalize" value={"true"} label="Inactivos" />
        </Tabs>
      </div> */}

      {/* ----------------------- Grid header ----------------- */}
      <div className="flex items-center space-x-4 px-4 mt-4">
        {/* search input */}
        <FormControl className="w-full">
          <OutlinedInput
            id="input-with-icon-adornment"
            className="input-rounded rounded-xl"
            onChange={onInputFilterChange}
            placeholder="Buscar clientes..."
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
      <div className=" w-full h-full my-2">
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
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          experimentalFeatures={{ newEditingApi: true }}
          paginationMode="server"
          className="p-2"
          localeText={{
            noRowsLabel: "No hay datos",
          }}
          autoHeight
          pagination
          disableColumnFilter
          disableColumnSelector
        />
      </div>
    </Card>
  );
}
