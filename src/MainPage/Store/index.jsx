/* eslint-disable react/prop-types */
import { Redirect, Route, Switch } from 'react-router-dom';
import AddQuotation from './AddStore';
import StoreList from './StoreList';
import StoreDetails from './StoreDetails';
import EditStore from './EditStore';

const StoreRoute = ({ match}) =>(
    <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/storelist-all`} />
        <Route path={`${match.url}/storelist-all`} component={StoreList} />
        <Route path={`${match.url}/addstore`} component={AddQuotation} />
        <Route path={`${match.url}/edit-store/:id`} component={EditStore} />
        <Route path={`${match.url}/store-details/:id`} component={StoreDetails} />
    </Switch>
)

export default StoreRoute;