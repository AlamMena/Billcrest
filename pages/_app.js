import "../styles/globals.css";
import Nav from "../components/nav/index.js";
import { createTheme } from "@mui/material";
import { useEffect, useState, createContext } from "react";
import { useTranslation } from "react-i18next";
import PrivateRouter from "../auth/privateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "../store/store";
import ThemeProvider from "../styles/providers/themeProvider";
import Head from "next/head";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export const LanContext = createContext(undefined);

export default function MyApp({ Component, pageProps }) {
  const [flag, setFlag] = useState(false);
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState("en");

  const changeLanguage = (e) => {
    if (e === "en") {
      setLanguage("en");
    } else {
      setLanguage("es");
    }
  };

  useEffect(() => {
    const lanPreference = localStorage.getItem("selectedLang");
    if (lanPreference) {
      setLanguage(lanPreference);
    }
    setFlag(true);
  }, []);

  useEffect(() => {
    if (flag) {
      localStorage.setItem("selectedLang", language ? language : " ");
    }
    // i18n.changeLanguage(language);
  }, [language, flag, i18n]);

  return (
    <LanContext.Provider value={{ language, changeLanguage }}>
      <ThemeProvider>
        <Head>
          <title>BillCrest</title>
          <link rel="icon" href="/logo.png"></link>
        </Head>
        <Provider store={store}>
          <PrivateRouter>
            <QueryClientProvider client={queryClient}>
              <Nav>
                <Component {...pageProps} />
              </Nav>
            </QueryClientProvider>
            <ToastContainer />
          </PrivateRouter>
        </Provider>
      </ThemeProvider>
    </LanContext.Provider>
  );
}
