/* eslint-disable react/prop-types */
import { Redirect, Route, Switch } from 'react-router-dom';
import Newuser from './newuser'
import Userlists from './userlists'
import Newuseredit from './newuseredit'
import AddRole from './addRole';
import ChangePassword from './changePassword';


const UserIndex = ({ match }) =>{
    return(
    <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/newuser`} />
        <Route path={`${match.url}/newuser`} component={Newuser} />                                                                                             
        <Route path={`${match.url}/userlists`} component={Userlists} />                                                                                             
        <Route path={`${match.url}/newuseredit`} component={Newuseredit} />                                                                                             
        <Route path={`${match.url}/addrole`} component={AddRole} />                                                                                             
        <Route path={`${match.url}/changepassword`} component={ChangePassword} />                                                                                             
                                                                                                
    </Switch>
)}

export default UserIndex