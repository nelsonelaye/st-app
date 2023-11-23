/* eslint-disable react/prop-types */

import { Redirect, Route, Switch } from 'react-router-dom';
import History from './history';
import Editsales from './editsales';
import Saledetails from './details/saledetails';
import SalesReturnList from '../Return/SalesReturnList';
import AddSalesReturn from '../Return/AddSalesReturn';
import Pos from './pos/pos';
import InStockProducts from './in-stock-products';
import OutStockProducts from './out-stock-products';
import SalesChart from './sales-chart';

const SalesIndex = ({ match }) => (
  <Switch>
    <Redirect
      exact
      from={`${match.url}/`}
      to={`${match.url}/generalsettings`}
    />
    <Route path={`${match.url}/pos`} component={Pos} />
    <Route path={`${match.url}/history`} component={History} />
    <Route path={`${match.url}/edit-sales`} component={Editsales} />
    <Route path={`${match.url}/sales-details/:id`} component={Saledetails} />
    <Route
      path={`${match.url}/in-stock-products`}
      component={InStockProducts}
    />
    <Route
      path={`${match.url}/out-stock-products`}
      component={OutStockProducts}
    />
    <Route path={`${match.url}/sales-chart`} component={SalesChart} />
    <Route
      path={`${match.url}/salesreturnlist-return`}
      component={SalesReturnList}
    />
    <Route
      path={`${match.url}/addsalesreturn-return`}
      component={AddSalesReturn}
    />
  </Switch>
);

export default SalesIndex;
