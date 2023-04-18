import { useEffect, useState } from "react";
import useAxios from "../../axios/index";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { AccountCircle, Receipt } from "@mui/icons-material";
import axios from "axios";
import SuplierForm from "../../components/suppliers/suppliersForm";
import PageHeader from "../../components/globals/pageHeader";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function UpsertSuplier({ id }) {
  const [value, setValue] = useState(0);
  const [supplier, setSupplier] = useState();
  const { axiosInstance } = useAxios();

  // const getSupplierAsync = async () => {
  //   const { data } = await axiosInstance.get(`/supplier/${id}`);
  //   setSupplier(data);
  // };

  // useEffect(() => {
  //   getSupplierAsync();
  // }, []);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const locationRoutes = [
    {
      text: "home",
      link: "/",
    },
    {
      text: "Proveedores",
      link: "/proveedores",
    },
    {
      text: "crear",
      link: "/proveedores/crear",
    },
  ];

  return (
    <div className="-full md:px-0 px-4 md:pr-8 flex flex-col pb-5">
      <div className="flex w-full justify-between items-center pr-8 ">
        <PageHeader
          header="Modificar Contactos"
          locationRoutes={locationRoutes}
        />
      </div>
      <SuplierForm supplier={supplier} />
      {/* 
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          aria-label="basic tabs example"
          value={value}
          onChange={handleChange}
        >
          <Tab
            icon={<AccountCircle />}
            style={{
              minHeight: "10px",
              fontSize: "14px",
              textTransform: "none",
            }}
            iconPosition="start"
            label="Ajustes"
            {...a11yProps(0)}
          />
          <Tab
            icon={<Receipt />}
            style={{
              minHeight: "10px",
              fontSize: "14px",
              textTransform: "none",
            }}
            iconPosition="start"
            label="Historial"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}></TabPanel>
      <TabPanel value={value} index={1}>
        <ContactHistory contact={contact} />
      </TabPanel> */}
    </div>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const response = await axios.get(
      `https://fastbilling.azurewebsites.net/api/supplier/${params.id}`
    );
    const data = response.data;
    return { props: { data } };
  } catch (error) {
    console.error(error);
    return { props: {} };
  }
}
