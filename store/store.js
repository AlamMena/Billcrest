import { configureStore } from "@reduxjs/toolkit";
import invoiceReducer from "./invoiceSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    invoice: invoiceReducer,
    user: userReducer,
    // goodinvoice: goodInvoiceReducer,
  },
});
