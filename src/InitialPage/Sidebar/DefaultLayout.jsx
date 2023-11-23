import { Route, withRouter } from "react-router-dom";

import routerService from "../../Router";
import Header from "./Header";
import Sidebar from "./Sidebar";

// eslint-disable-next-line react-refresh/only-export-components
const DefaultLayout =(props)=> {
    // eslint-disable-next-line react/prop-types
    const { match } = props;
    return (
      <>
        <div className="main-wrapper">
          <Header />
          <div>
            {routerService &&
              routerService.map((route, key) => {
                return(
                <Route
                  key={key}
                  // eslint-disable-next-line react/prop-types
                  path={`${match.url}${route.path}`}
                  component={route.component}
                />
              )})}
          </div>
          <Sidebar />
        </div>
        <div className="sidebar-overlay"></div>
      </>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export default withRouter(DefaultLayout);
