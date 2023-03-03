import "../styles/globals.css";
import SideBar from "../components/sideBar/index.js";

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
  return (
    <ThemeProvider>
      <Head>
        <title>Billcrest</title>
      </Head>
      <Provider store={store}>
        <PrivateRouter>
          <SideBar />
          <div className="md:ml-72 mr-5 ml-5 mb-5  ">
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
