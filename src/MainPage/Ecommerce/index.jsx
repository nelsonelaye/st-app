/* eslint-disable react/prop-types */
import { Redirect, Route, Switch } from "react-router-dom";
import Setup from "./Setup";

const EcommerceRoute = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/ecommerce`} />
    <Route path={`${match.url}/ecommerce`} component={Setup} />
  </Switch>
);

export default EcommerceRoute;
