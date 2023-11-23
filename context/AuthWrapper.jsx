import { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import jwtDecode from "jwt-decode";
import useAuthContext from "../hooks/useAuth";

export const AuthWrapper = ({ children }) => {

  const history = useHistory();
  const { token, pageIsReady } = useAuthContext();

  const checkTokenExpiry = (token) => {
    if(token){
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if(decodedToken.exp < currentTime){
        return true;
      }
    }
    else return false;
  }

  useEffect(() => {
    const isExpired = checkTokenExpiry(token);
    if (pageIsReady && isExpired) {
      history.push({
        pathname : '/'
      })
    }
  }, [token, history, pageIsReady]);

  return children;
};