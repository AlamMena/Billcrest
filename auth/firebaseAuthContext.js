import App from "./fireBaseAppConfig";
import { getAuth } from "firebase/auth";

const Auth = getAuth(App);

export default Auth;
