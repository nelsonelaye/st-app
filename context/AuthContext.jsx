import { createContext, useEffect, useState, useMemo } from "react";

import { userToken } from "../config";
import nookies, { setCookie } from "nookies";

export const AuthContext = createContext({
  token: "",
  user: "",
  setCurrentUser: () => {},
  pageIsReady: false,
  handleSetToken: () => {},
  handleLogOut: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  const [pageIsReady, setpageisReady] = useState(false);

  const value = useMemo(() => {
    //set cookie

    const handleSetToken = (value) => {
      setToken(value);
      setCookie(null, userToken, value, {
        path: "/",
        maxAge: 4 * 60 * 60, // Expires in 3 - 4 hours
        secure: true,
      });
    };

    const setCurrentUser = (value) => {
      setUser(value);
    };

    const handleLogOut = () => {
      setToken("");
      nookies.destroy(null, userToken);
    };

    return {
      token,
      user,
      setCurrentUser,
      pageIsReady,
      handleSetToken,
      handleLogOut,
    };
  }, [token, user, pageIsReady]);

  const checkCookieForAuthToken = () => {
    const user_token = nookies.get(null, userToken);

    if (user_token[userToken] !== undefined) {
      const tokenInCookie = user_token[userToken];

      if (tokenInCookie) {
        setToken(tokenInCookie);
        setpageisReady(true);
      } else {
        setpageisReady(true);
      }
    } else {
      setpageisReady(true);
    }
  };

  useEffect(() => {
    // Execute on initial load
    // setpageisReady(true);

    checkCookieForAuthToken();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
