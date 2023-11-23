import { Redirect, Route, Switch } from 'react-router-dom';
import Feedback from './feedback';

const FeedbackIndex = ({ match }) => (
  <Switch>
    {/* <Redirect exact from={`${match.url}/`} to={`${match.url}/feedback`} /> */}

    <Route path={`${match.url}/`} component={Feedback} />
  </Switch>
);

export default FeedbackIndex;
