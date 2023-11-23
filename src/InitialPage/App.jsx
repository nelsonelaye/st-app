/* eslint-disable react/prop-types */
import { Redirect, Route, Switch } from 'react-router-dom';

import SignIn from './SignIn';
import ForgetPassword from './ForgetPassword';
import SignUp from './SignUp';
import DefaultLayout from './Sidebar/DefaultLayout';
import Error404 from '../MainPage/ErrorPage/Error404';
import Error500 from '../MainPage/ErrorPage/Error500';

const App = () => {
  if (location.pathname === '/') {
    return <Redirect to={'/signIn'} />;
  }

  return (
    <Switch>
      <Route path='/signIn' component={SignIn} />
      <Route path='/forgetPassword' component={ForgetPassword} />
      <Route path='/signUp' component={SignUp} />
      <Route path='/' component={DefaultLayout} />
      <Route path='/error-404' component={Error404} />
      <Route path='/error-500' component={Error500} />
    </Switch>
  );
};

export default App;
