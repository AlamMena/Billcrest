import React from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import PageHeader from "../../components/globals/pageHeader";
import { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import ProfileSettings from "./perfil";
import { SettingsOutlined } from "@mui/icons-material";
import CompanySettings from "./company";

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
      {value === index && <Box className="mt-4">{children}</Box>}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Settings() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const locationRoutes = [
    {
      text: "Inicio",
      link: "/",
    },
    {
      text: "Ajustes",
      link: "/ajustes",
    },
  ];

  return (
    <div className="w-full flex flex-col pb-5">
      <div className="flex w-full justify-between items-center pr-8">
        <PageHeader
          header="Ajustes de Perfil"
          locationRoutes={locationRoutes}
          Icon={<SettingsOutlined />}
        />
      </div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          aria-label="basic tabs example"
          value={value}
          onChange={handleChange}
        >
          <Tab
            icon={<SettingsIcon />}
            iconPosition="start"
            label="Ajustes"
            {...a11yProps(0)}
          />
          <Tab
            icon={<SettingsIcon />}
            iconPosition="start"
            label="Empresa"
            {...a11yProps(0)}
          />
          <Tab
            icon={<SettingsIcon />}
            iconPosition="start"
            label="NCF"
            {...a11yProps(1)}
          />
          <Tab
            icon={<SettingsIcon />}
            iconPosition="start"
            label="Moneda"
            {...a11yProps(3)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ProfileSettings />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CompanySettings />
      </TabPanel>
      <TabPanel value={value} index={2}>
        {/* <ProfileSettings /> */}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {/* <ProfileSettings /> */}
      </TabPanel>
    </div>
  );
}
