import { Redirect, Route, Switch } from 'react-router-dom';
import ExpenseList from './ExpenseList.jsx';
import AddExpense from './AddExpense.jsx';
import EditExpense from './EditExpense.jsx';
import ExpenseCategory from './ExpenseCategory.jsx';
import AddExpenseCategory from './AddExpenseCategory.jsx';
import EditExpenseCategory from './EditExpenseCategory.jsx';

const PurchaseRoute = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/expenselist`} />
    <Route path={`${match.url}/expenselist`} component={ExpenseList} />
    <Route path={`${match.url}/addexpense`} component={AddExpense} />
    <Route path={`${match.url}/editexpense/:id`} component={EditExpense} />
    <Route path={`${match.url}/categorylist`} component={ExpenseCategory} />
    <Route path={`${match.url}/addcategory`} component={AddExpenseCategory} />
    <Route
      path={`${match.url}/editcategory/:id`}
      component={EditExpenseCategory}
    />
  </Switch>
);

export default PurchaseRoute;
