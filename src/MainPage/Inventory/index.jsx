import { Redirect, Route, Switch } from 'react-router-dom';
import AddPurchase from './AddInventory';
import InventoryList from './InventoryList';
import EditPurchase from './EditInventory';

const PurchaseRoute = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/inventorylist`} />
    <Route path={`${match.url}/inventorylist`} component={InventoryList} />
    <Route path={`${match.url}/addinventory`} component={AddPurchase} />
    <Route
      path={`${match.url}/editinventory/:id`}
      component={() => <EditPurchase />}
    />
    <Route
      path={`${match.url}/previewinventory/:id`}
      component={() => <EditPurchase preview />}
    />
  </Switch>
);

export default PurchaseRoute;
