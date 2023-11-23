import Dashboard from "../MainPage/Dashboard";
import Activities from "../MainPage/Activities";
import Product from "../MainPage/Product/index";
import Sales from "../MainPage/sales";
import Profile from "../MainPage/Profile/index";
import Inventory from "../MainPage/Inventory/index";
import Expense from "../MainPage/Expense/index";
import Store from "../MainPage/Store/index";
import Transfer from "../MainPage/Transfer/index";
import Return from "../MainPage/Return/index";
import People from "../MainPage/People/index";
import Report from "../MainPage/report";
import Users from "../MainPage/users";
import Ecommerce from "../MainPage/Ecommerce";
import Settings from "../MainPage/settings";
import Feedback from "../MainPage/Feedback";

export default [
  {
    path: "dashboard",
    component: Dashboard,
  },
  {
    path: "activities",
    component: Activities,
  },
  {
    path: "product",
    component: Product,
  },
  {
    path: "profile",
    component: Profile,
  },
  {
    path: "inventory",
    component: Inventory,
  },
  {
    path: "expense",
    component: Expense,
  },
  {
    path: "store",
    component: Store,
  },
  {
    path: "transfer",
    component: Transfer,
  },
  {
    path: "return",
    component: Return,
  },
  {
    path: "people",
    component: People,
  },
  {
    path: "report",
    component: Report,
  },
  {
    path: "users",
    component: Users,
  },
  {
    path: "settings",
    component: Settings,
  },
  {
    path: "Sales",
    component: Sales,
  },
  {
    path: "ecommerce",
    component: Ecommerce,
  },
  {
    path: "feedback",
    component: Feedback,
  },
];
