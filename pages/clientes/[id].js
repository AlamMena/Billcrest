import { useEffect, useState } from "react";
import useAxios from "../../axios/index";
import ContactForm from "../../components/contacts/contactForm";
import PageHeader from "../../components/globals/pageHeader";
import { Box } from "@mui/material";
import { SettingsOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

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
      {value === index && <Box className="p-2">{children}</Box>}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function UpsertContact() {
  const [value, setValue] = useState(0);
  const [client, setClient] = useState();
  const { axiosInstance } = useAxios();
  const { t } = useTranslation();

  const router = useRouter();
  const { id } = router.query;

  const getClientAsync = async () => {
    const { data } = await axiosInstance.get(`/client/${id}`);
    setClient(data);
  };

  useEffect(() => {
    getClientAsync();
  }, []);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const locationRoutes = [
    {
      text: t("nav.home"),
      link: "/",
    },
    {
      text: t("nav.clients"),
      link: "/clientes",
    },
    {
      text: t("create"),
      link: "/clientes/crear",
    },
  ];

  return (
    <div className="w-full md:px-0 md:pr-8 flex flex-col pb-5">
      <div className="flex w-full justify-between items-center pr-8 ">
        <PageHeader
          header={t("modifyContact")}
          locationRoutes={locationRoutes}
          Icon={<SettingsOutlined />}
        />
      </div>
      <ContactForm contact={client} invoices={true} />
      {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
      </Box> */}
      {/* <TabPanel value={value} index={0}> */}
      {/* </TabPanel> */}
      {/* <TabPanel value={value} index={1}>
        <ContactHistory contact={client} />
      </TabPanel> */}
    </div>
  );
}

// export async function getServerSideProps({ params }) {
//   return {
//     props: { id: params.id },
//   };
// }
