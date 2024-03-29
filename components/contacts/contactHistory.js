import React from "react";
import {
  List,
  ListItem,
  IconButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";

import { Add, DateRangeRounded, Search } from "@mui/icons-material";

import { Download } from "@mui/icons-material";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers";

import { useState } from "react";

export default function ContactHistory({ contact }) {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const handleDateChange = (value) => {
    setCurrentDate(value);
  };

  const item = (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      <div className="flex justify-between items-center">
        <div className="flex space-x-10 items-center">
          <div className="w-64">
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Amazon" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Amazon Support"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    ></Typography>
                    {"10 Oct. 2022 at 4:30pm"}
                  </React.Fragment>
                }
              />
            </ListItem>
          </div>
          <div className="">
            {1 < 1 ? (
              <span className="flex space-x-2">
                <span className="bg-red-200 rounded-2xl px-1 py-1 flex items-center">
                  <span className="w-2 h-2 rounded-full mx-2 bg-red-700 animate-pulse  "></span>
                </span>
                <span>Debiendo</span>
              </span>
            ) : (
              <span className="flex space-x-2">
                <span className="bg-green-200 rounded-lg px-1 py-1 flex items-center">
                  <span className="w-2 h-2 rounded-full mx-2 bg-green-700 animate-pulse  "></span>
                </span>
                <span>Pagado</span>
              </span>
            )}
          </div>
          <div className="text-md font-semibold">$220,000USD</div>
        </div>
        <div className=" place-content-end ml-8 ">
          <IconButton
            size="medium"
            className="w-10"
            // onClick={() => setContent(0)}
            color="secondary"
            variant="contained"
          >
            <Download />
          </IconButton>
        </div>
      </div>
      <Divider className="w-full overflow-auto" />
    </List>
  );

  return (
    <div className="col-span-12">
      <div className="lg:flex lg:justify-between p-4 items-center">
        <span className=" text-lg tracking-wider font-bold ">
          Transacciones
        </span>
        <div className=" flex justify-end space-x-2 pt-4 ">
          <div>
            <OutlinedInput
              size="small"
              sx={{
                backgroundColor: "#F5F5F5	",
                borderColor: "#F5F5F5",
                color: "#B0B0B0	",
                width: 180,
              }}
              className="rounded-xl w-32 md:w-48"
              placeholder="Buscar..."
              startAdornment={
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              }
            />
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              inputFormat="MM/DD/YYYY"
              value={currentDate}
              className="rounded-xl w-14 md:w-48"
              onChange={handleDateChange}
              renderInput={(params) => (
                <OutlinedInput
                  size="small"
                  sx={{
                    backgroundColor: "#F5F5F5	",
                    borderColor: "#F5F5F5",
                    color: "#B0B0B0	",
                    width: 180,
                  }}
                  endAdornment={
                    <InputAdornment position="start">
                      <DateRangeRounded />
                    </InputAdornment>
                  }
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
          <IconButton
            size="medium"
            className="w-10  bg-green-600 hover:bg-green-700 hover:text-white text-white rounded-2xl"
            // onClick={() => setContent(0)}
            color="secondary"
            variant="contained"
          >
            <Add />
          </IconButton>
        </div>
      </div>
      <div className="max-h-80 overflow-auto w-full min-h-full">
        {item}
        {item}
      </div>
    </div>
  );
}
