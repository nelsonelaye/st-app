import { Redirect, Route, Switch } from 'react-router-dom';
import Purchaseorder from './purchaseorder';
import Inventory from './Inventory';
import Sales from './Sales';
import Invoices from './invoices';
import Expense from './expense';
import Supplier from './supplier';
import Customer from './customer';

const AppIndex = ({ match }) => (
  <Switch>
    <Redirect
      exact
      from={`${match.url}/`}
      to={`${match.url}/purchaseorderreport`}
    />
    <Route
      path={`${match.url}/purchaseorderreport`}
      component={Purchaseorder}
    />
    <Route path={`${match.url}/inventoryreport`} component={Inventory} />
    <Route path={`${match.url}/salesreport`} component={Sales} />
    <Route path={`${match.url}/invoicereport`} component={Invoices} />
    <Route path={`${match.url}/purchasereport`} component={Expense} />
    <Route path={`${match.url}/supplierreport`} component={Supplier} />
    <Route path={`${match.url}/customerreport`} component={Customer} />
  </Switch>
);

export default AppIndex;
