import { Redirect, Route, Switch } from 'react-router-dom';
import CustomerList from './CustomerList';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import SupplierList from './SupplierList';
import AddSupplier from './AddSupplier';
import EditSupplier from './EditSupplier';
const PeopleIndex = ({ match }) => (
  <Switch>
    <Redirect
      exact
      from={`${match.url}/`}
      to={`${match.url}/customerlist-people`}
    />
    <Route path={`${match.url}/customerlist-people`} component={CustomerList} />
    <Route path={`${match.url}/addcustomer-people`} component={AddCustomer} />
    <Route
      path={`${match.url}/editcustomer-people/:id`}
      component={EditCustomer}
    />
    <Route path={`${match.url}/supplierlist-people`} component={SupplierList} />
    <Route path={`${match.url}/addsupplier-people`} component={AddSupplier} />
    <Route
      path={`${match.url}/editsupplier-people/:id`}
      component={EditSupplier}
    />
  </Switch>
);

export default PeopleIndex;
