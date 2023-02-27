import axios from "axios";
import Auth from "../auth/firebaseAuthContext";

export default function useAxios() {
  // const { data: user } = useSelector((state) => state.user);

  const axiosInstance = axios.create({
    baseURL: "https://fastbilling.azurewebsites.net/api",
  });

  axiosInstance.interceptors.request.use(
    function (config) {
      Auth.onAuthStateChanged(function (user) {
        if (user) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
      });
      return config;
    },
    function (error) {
      // Request error
      return Promise.reject(error);
    }
  );
  return { axiosInstance };
}
