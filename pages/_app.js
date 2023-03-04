import "../styles/globals.css";
import Nav from "../components/nav/index.js";
import { createTheme } from "@mui/material";
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

function MyApp({ Component, pageProps }) {
  const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: "#11cb5f",
      },
      secondary: {
        // This is green.A700 as hex.
        main: "#11cb5f",
      },
    },
  });

  return (
    <ThemeProvider>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/contacts_clients_profile.png"></link>
      </Head>
      <Provider store={store}>
        <PrivateRouter>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <Nav>
              <Component {...pageProps} />
            </Nav>
          </QueryClientProvider>
          <ToastContainer />
        </PrivateRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
