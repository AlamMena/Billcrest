import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Login from "../pages/login";
import Loading from "../components/loading/index";
import Auth from "./firebaseAuthContext";

export default function PrivateRouter({ children }) {
  // Router
  const { pathname } = useRouter();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // const { data: user } = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  // const user = useContext(AuthContext);
  useEffect(() => {
    Auth.onAuthStateChanged(function (userCredential) {
      if (userCredential) {
        setUser(userCredential);
      }
      setIsLoading(false);
    });
  }, [user]);

  if (user) {
    if (pathname === "/login") {
      return <Login />;
    }
    return children;
  } else if (!user && !isLoading) {
    return <Login />;
  }
  return <Loading />;
}
