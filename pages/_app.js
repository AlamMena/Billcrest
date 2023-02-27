import "../styles/globals.css";
import SideBar from "../components/sideBar/index.js";
import { createTheme } from "@mui/material";
import { StyledEngineProvider } from "@mui/material";
import { AuthProvider } from "firebase/auth";
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
      <Head></Head>
      <Provider store={store}>
        <PrivateRouter>
          <SideBar />
          <div className="md:ml-72 md:mr-10 ">
            <div className=" max-w-screen-2xl mt-0 mb-0 mr-auto ml-auto ">
              <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <Component {...pageProps} />
              </QueryClientProvider>
              <ToastContainer />
            </div>
          </div>
        </PrivateRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
