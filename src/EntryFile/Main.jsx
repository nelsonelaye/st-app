import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import App from '../InitialPage/App';
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from "react-query";
import { Toaster } from "react-hot-toast";
import nookies from 'nookies';

import '../assets/plugins/fontawesome/css/fontawesome.min.css'
import '../assets/plugins/fontawesome/css/all.min.css'
import '../assets/css/bootstrap.min.css';
import "../assets/js/bootstrap.bundle.min.js"
import '../assets/css/font-awesome.min.css';
import '../assets/css/line-awesome.min.css'; 
import '../assets/css/style.css';
import { AuthContextProvider } from '../../context/AuthContext';
import { AuthWrapper } from '../../context/AuthWrapper';
import { useState } from 'react';
import { userToken } from '../../config';

const MainApp = () => {

   const history = useHistory();
   const [queryClient] = useState(() => new QueryClient({
            queryCache: new QueryCache({
               onError : (error) => {
                  const status = error?.response?.status;
                  if(status == 401){
                    history.push('/')
                    nookies.destroy(null, userToken);
                  }
               }
            }),
            mutationsCache: new MutationCache({
               onError : (error) => {
                  const status = error?.response?.status;
                  if(status == 401){
                     history.push('/')
                     nookies.destroy(null, userToken);
                  }
               }
            })
        })
   );

   return(
      <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
          <AuthWrapper>
            <Toaster />
            <Router
            >
               <Switch>
                  <Route path="/" component={App} />
               </Switch>
            </Router>
          </AuthWrapper>
      </QueryClientProvider>
    </AuthContextProvider>
   )
};

export default MainApp;