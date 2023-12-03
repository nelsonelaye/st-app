/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { withRouter, useLocation } from "react-router-dom";
import {
  Dashboard,
  Expense,
  People,
  Product,
  Time,
  Users1,
  settings,
  Purchase,
  Transfer,
  Sales1,
} from "../../EntryFile/imagePath";
import { Link, useHistory } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import toast from "react-hot-toast";

import Cookies from "js-cookie";
import useAuthContext from "../../../hooks/useAuth";
import whatsappSvg from "../../../src/assets/img/icons/whatsapp.svg";
import houseSvg from "../../../src/assets/img/icons/house.svg";
import mailSvg from "../../../src/assets/img/icons/mail.svg";
import { useMutate } from "../../../hooks/useMutate";
import { LoadingAbsolute } from "../../components/Loading";
import { useCurrentUserProfile } from "../../../hooks/useGetProfile";

const Sidebar = () => {
  const history = useHistory();
  const { token, pageIsReady, user } = useAuthContext();
  const { profile: userProfile } = useCurrentUserProfile();
  const [isSideMenu, setSideMenu] = useState("");
  const [menuList, setMenuList] = useState("");
  const mutuation = useMutate();
  const [loading, setLoading] = useState(false);

  // console.log(userProfile);

  const whatsappLink = () => {
    const url =
      "https://api.whatsapp.com/send?phone=2348101032506&text=Hello%20Kaybill%20Tech%20Support%20team%2C%20I%20need%20your%20assistance%20on%20SalesTrack%20application...";
    window.open(url, "_blank")?.focus();
  };

  useEffect(() => {
    if (pageIsReady && !token) {
      history.push({
        pathname: "/signin",
      });
    }
  }, [token, history, pageIsReady]);

  useEffect(() => {
    if (pageIsReady && token) {
      const menus = Cookies.get("access");
      console.log(menus);
      setMenuList(JSON.parse(menus));
    }
  }, [token, history, pageIsReady]);

  // const { access_lists } = useAccessLists();
  // const accessData = access_lists?.data;

  // const userAccessMenu = accessData?.filter((item) =>
  //   menuList.includes(item.name)
  // );
  // console.log(userAccessMenu)

  const toggleSidebar = (value) => {
    setSideMenu(value);
  };
  const expandMenu = () => {
    document.body.classList.remove("expand-menu");
  };
  const expandMenuOpen = () => {
    document.body.classList.add("expand-menu");
  };

  const location = useLocation();
  let pathname = location.pathname;

  const openTab = () => {
    window.open("https://localhost:5173/dashboard");
  };

  // const verifyPayment = (reference) => {
  //   setLoading(true);

  //   mutuation.mutate(
  //     {
  //       url: `/v1/ManageUsers/VerifyPayment/${reference}`,
  //       method: "POST",
  //     },
  //     {
  //       onSuccess(res) {
  //         setLoading(false);

  //         if (res.statusCode == 200) {
  //           const { message } = res;
  //           toast.success(message);
  //         }
  //         if (res.statusCode == 205) {
  //           setLoading(false);
  //           toast.error(res.message);
  //           console.log(res);
  //         }
  //       },
  //       onError(err) {
  //         setLoading(false);
  //         const error_response = err.response.data;
  //         const errorMsg = error_response.Message;
  //         toast.error(errorMsg);
  //         console.log(err);
  //       },
  //     }
  //   );
  // };

  const initiatePlanRenewal = () => {
    setLoading(true);

    mutuation.mutate(
      {
        url: "/v1/ManageUsers/RenewPlan",
        method: "POST",
      },
      {
        onSuccess(res) {
          setLoading(false);

          if (res.statusCode == 200) {
            console.log(res);

            toast.success("Payment initiated");

            // verifyPayment(res.data.payReference);
            //  return res.data.checkoutPaymentUrl;
            if (res?.data?.payReference) {
              window.open(res.data.checkoutPaymentUrl, "_blank");
              localStorage.setItem(
                "pay_reference",
                JSON.stringify(res.data.payReference)
              );
            } else if (res?.data?.payReference === null) {
              toast.success(res?.data.message);
              openTab();
              localStorage.clear();
            }
          }
          if (res.statusCode == 205) {
            setLoading(false);
            toast.error(res.message);
          }
        },
        onError(err) {
          setLoading(false);
          const error_response = err.response.data;
          const errorMsg = error_response.Message;
          toast.error(errorMsg);
        },
      }
    );
  };

  useEffect(() => {
    document.querySelector(".main-wrapper").classList.remove("slide-nav");
    document.querySelector(".sidebar-overlay").classList.remove("opened");
    document.querySelector(".sidebar-overlay").onclick = function () {
      this.classList.remove("opened");
      document.querySelector(".main-wrapper").classList.remove("slide-nav");
    };
  }, [pathname]);

  return (
    <>
      {loading && <LoadingAbsolute />}
      <div className="sidebar" id="sidebar">
        <Scrollbars>
          <div className="sidebar-inner slimscroll">
            <div
              id="sidebar-menu"
              className="sidebar-menu"
              onMouseLeave={expandMenu}
              onMouseOver={expandMenuOpen}
            >
              <ul>
                {user?.planName && (
                  <li className="active">{userProfile?.data?.planName}</li>
                )}

                <li className={pathname.includes("dashboard") ? "active" : ""}>
                  <Link
                    to="/dashboard"
                    onClick={() => toggleSidebar(isSideMenu == "" ? "" : "")}
                  >
                    <img src={Dashboard} alt="img" />
                    <span>Dashboard</span>
                  </Link>
                </li>
                {menuList.includes("Manage Users") && (
                  <li className="submenu">
                    <a
                      className={
                        pathname.includes("/users")
                          ? "subdrop active"
                          : "" || isSideMenu == "Users"
                          ? "subdrop active"
                          : ""
                      }
                      onClick={() =>
                        toggleSidebar(isSideMenu == "Users" ? "" : "Users")
                      }
                    >
                      <img src={Users1} alt="img" />
                      <span>Manage Users</span> <span className="menu-arrow" />
                    </a>
                    {isSideMenu == "Users" ? (
                      <ul>
                        <li>
                          <Link
                            to="/users/newuser"
                            className={
                              pathname.includes("newuser") ? "active" : ""
                            }
                          >
                            Create User{" "}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/users/userlists"
                            className={
                              pathname.includes("userlists") ? "active" : ""
                            }
                          >
                            Users List
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/users/addrole"
                            className={
                              pathname.includes("addrole") ? "active" : ""
                            }
                          >
                            Create Role
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/users/changepassword"
                            className={
                              pathname.includes("changepassword")
                                ? "active"
                                : ""
                            }
                          >
                            Change Password
                          </Link>
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                  </li>
                )}
                {menuList.includes("Sales") && (
                  <li className="submenu">
                    <a
                      // href="#"
                      className={
                        pathname.includes("/sales")
                          ? "active subdrop"
                          : "" || isSideMenu == "sales"
                          ? "subdrop active"
                          : ""
                      }
                      onClick={() =>
                        toggleSidebar(isSideMenu == "sales" ? "" : "sales")
                      }
                    >
                      <img src={Sales1} alt="img" />
                      <span> Sales </span> <span className="menu-arrow" />
                    </a>
                    {isSideMenu == "sales" ? (
                      <ul>
                        <li>
                          <Link
                            className={
                              pathname === "/sales/pos" ? "active" : ""
                            }
                            to="/sales/pos"
                          >
                            POS
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname === "/sales/history" ? "active" : ""
                            }
                            to="/sales/history"
                          >
                            History
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname === "/sales/in-stock-products"
                                ? "active"
                                : ""
                            }
                            to="/sales/in-stock-products"
                          >
                            InStock products
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname === "/sales/out-stock-products"
                                ? "active"
                                : ""
                            }
                            to="/sales/out-stock-products"
                          >
                            OutStock products
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname === "/sales/sales-chart" ? "active" : ""
                            }
                            to="/sales/sales-chart"
                          >
                            Sales chart
                          </Link>
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                  </li>
                )}
                {menuList.includes("Products") && (
                  <li className="submenu">
                    <a
                      // href="#"
                      className={
                        pathname.includes("/product")
                          ? "active subdrop"
                          : "" || isSideMenu == "product"
                          ? "subdrop active"
                          : ""
                      }
                      onClick={() =>
                        toggleSidebar(isSideMenu == "product" ? "" : "product")
                      }
                    >
                      <img src={Product} alt="img" />
                      <span> Product </span> <span className="menu-arrow" />
                    </a>
                    {isSideMenu == "product" ? (
                      <ul className="sidebar-ul">
                        <li>
                          <Link
                            className={
                              pathname.includes("productlist-") ? "active" : ""
                            }
                            to="/product/productlist-product"
                          >
                            Product List
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("addproduct-") ? "active" : ""
                            }
                            to="/product/addproduct-product"
                          >
                            Add Product
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("categorylist-") ? "active" : ""
                            }
                            to="/product/categorylist-product"
                          >
                            Category List
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("addcategory-") ? "active" : ""
                            }
                            to="/product/addcategory-product"
                          >
                            Add Category{" "}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("subcategorytable-")
                                ? "active"
                                : ""
                            }
                            to="/product/subcategorytable-product"
                          >
                            Sub Category List
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("addsubcategory-")
                                ? "active"
                                : ""
                            }
                            to="/product/addsubcategory-product"
                          >
                            Add Sub Category{" "}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("brandlist-") ? "active" : ""
                            }
                            to="/product/brandlist-product"
                          >
                            Brand list{" "}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("addbrand-") ? "active" : ""
                            }
                            to="/product/addbrand-product"
                          >
                            Add Brand
                          </Link>
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                  </li>
                )}
                {menuList.includes("Inventory") && (
                  <li className="submenu">
                    <a
                      // href="#"
                      className={
                        pathname.includes("/inventory")
                          ? "subdrop active"
                          : "" || isSideMenu == "inventory"
                          ? "subdrop active"
                          : ""
                      }
                      onClick={() =>
                        toggleSidebar(
                          isSideMenu == "inventory" ? "" : "inventory"
                        )
                      }
                    >
                      {" "}
                      <img src={Purchase} alt="img" /> <span>Inventory</span>{" "}
                      <span className="menu-arrow"></span>
                    </a>
                    {isSideMenu == "inventory" ? (
                      <ul>
                        <li>
                          <Link
                            className={
                              pathname.includes("inventorylist") ? "active" : ""
                            }
                            to="/inventory/inventorylist"
                          >
                            Inventory List
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("addinventory") ? "active" : ""
                            }
                            to="/inventory/addinventory"
                          >
                            Add Inventory
                          </Link>
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                  </li>
                )}
                {menuList.includes("Stores") && (
                  <li className="submenu">
                    <a
                      // href="#"
                      className={
                        pathname.includes("/store")
                          ? "subdrop active"
                          : "" || isSideMenu == "store"
                          ? "subdrop active"
                          : ""
                      }
                      onClick={() =>
                        toggleSidebar(isSideMenu == "store" ? "" : "store")
                      }
                    >
                      {" "}
                      <img src={Transfer} alt="img" /> <span>Store</span>{" "}
                      <span className="menu-arrow"></span>
                    </a>
                    {isSideMenu == "store" ? (
                      <ul>
                        <li>
                          <Link
                            className={
                              pathname.includes("storelist-") ? "active" : ""
                            }
                            to="/store/storelist-all"
                          >
                            Store List
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("addstore") ? "active" : ""
                            }
                            to="/store/addstore"
                          >
                            Add Store
                          </Link>
                        </li>
                        {/* <li>
                            <Link
                              className={
                                pathname.includes("importtransfer-") ? "active" : ""
                              }
                              to="/transfer/importtransfer-transfer"
                            >
                              Import Transfer
                            </Link>
                          </li> */}
                      </ul>
                    ) : (
                      ""
                    )}
                  </li>
                )}
                {menuList.includes("Expenses") && (
                  <li className="submenu">
                    <a
                      // href="#"
                      className={
                        pathname.includes("/expense")
                          ? "subdrop active"
                          : "" || isSideMenu == "expense"
                          ? "subdrop active"
                          : ""
                      }
                      onClick={() =>
                        toggleSidebar(isSideMenu == "expense" ? "" : "expense")
                      }
                    >
                      {" "}
                      <img src={Expense} alt="img" /> <span>Expenses</span>{" "}
                      <span className="menu-arrow"></span>
                    </a>
                    {isSideMenu == "expense" ? (
                      <ul>
                        <li>
                          <Link
                            className={
                              pathname.includes("expenselist") ? "active" : ""
                            }
                            to="/expense/expenselist"
                          >
                            Expense List
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname === "/expense/addexpense" ? "active" : ""
                            }
                            to="/expense/addexpense"
                          >
                            Add Expense
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname === "/expense/categorylist"
                                ? "active"
                                : ""
                            }
                            to="/expense/categorylist"
                          >
                            Categories
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname === "/expense/addcategory"
                                ? "active"
                                : ""
                            }
                            to="/expense/addcategory"
                          >
                            Add Category
                          </Link>
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                  </li>
                )}
                {menuList.includes("Manage Customers") && (
                  <li className="submenu">
                    <a
                      // href="#"
                      className={
                        pathname.includes("/people")
                          ? "subdrop active"
                          : "" || isSideMenu == "people"
                          ? "subdrop active"
                          : ""
                      }
                      onClick={() =>
                        toggleSidebar(isSideMenu == "people" ? "" : "people")
                      }
                    >
                      {" "}
                      <img src={People} alt="img" /> <span>Customers</span>{" "}
                      <span className="menu-arrow"></span>
                    </a>
                    {isSideMenu == "people" ? (
                      <ul>
                        <li>
                          <Link
                            className={
                              pathname.includes("customerlist-") ? "active" : ""
                            }
                            to="/people/customerlist-people"
                          >
                            Customer List
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("addcustomer-") ? "active" : ""
                            }
                            to="/people/addcustomer-people"
                          >
                            Add Customer
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("supplierlist-") ? "active" : ""
                            }
                            to="/people/supplierlist-people"
                          >
                            Supplier List
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("addsupplier-") ? "active" : ""
                            }
                            to="/people/addsupplier-people"
                          >
                            Add Supplier
                          </Link>
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                  </li>
                )}

                {/* <li className="submenu">
                  <a
                    href="#"
                    className={
                      pathname.includes("/quotation")
                        ? "subdrop active"
                        : "" || isSideMenu == "quotation"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "quotation" ? "" : "quotation"
                      )
                    }
                  >
                    {" "}
                    <img src={Quotation} alt="img" /> <span>Quotation</span>{" "}
                    <span className="menu-arrow"></span>
                  </a>
                  {isSideMenu == "quotation" ? (
                    <ul>
                      <li>
                        <Link
                          className={
                            pathname.includes("quotationlist-") ? "active" : ""
                          }
                          to="/quotation/quotationlist-quotation"
                        >
                          Quotation List
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            pathname.includes("addquotation-") ? "active" : ""
                          }
                          to="/quotation/addquotation-quotation"
                        >
                          Add Quotation
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li> */}
                {/* <li className="submenu">
                      <a
                        // href="#"
                        className={
                          pathname.includes("/return")
                            ? "subdrop active"
                            : "" || isSideMenu == "return"
                            ? "subdrop active"
                            : ""
                        }
                        onClick={() =>
                          toggleSidebar(isSideMenu == "return" ? "" : "return")
                        }
                      >
                        {" "}
                        <img src={Return} alt="img" /> <span>Return</span>{" "}
                        <span className="menu-arrow"></span>
                      </a>
                      {isSideMenu == "return" ? (
                        <ul>
                          <li>
                            <Link
                              className={
                                pathname.includes("salesreturnlist-")
                                  ? "active"
                                  : ""
                              }
                              to="/return/salesreturnlist-return"
                            >
                              Sales Return List
                            </Link>
                          </li>
                          <li>
                            <Link
                              className={
                                pathname.includes("addsalesreturn-") ? "active" : ""
                              }
                              to="/return/addsalesreturn-return"
                            >
                              Add Sales Return
                            </Link>
                          </li>
                          <li>
                            <Link
                              className={
                                pathname.includes("purchasereturnlist-")
                                  ? "active"
                                  : ""
                              }
                              to="/return/purchasereturnlist-return"
                            >
                              Purchase Return List
                            </Link>
                          </li>
                          <li>
                            <Link
                              className={
                                pathname.includes("addpurchasereturn-")
                                  ? "active"
                                  : ""
                              }
                              to="/return/addpurchasereturn-return"
                            >
                              Add Purchase Return
                            </Link>
                          </li>
                        </ul>
                      ) : (
                        ""
                      )}
                    </li> */}
                {menuList.includes("Report") && (
                  <li className="submenu">
                    <a
                      // to="#"
                      className={
                        pathname.includes("/report")
                          ? "subdrop active"
                          : "" || isSideMenu == "Report"
                          ? "subdrop active"
                          : ""
                      }
                      onClick={() =>
                        toggleSidebar(isSideMenu == "Report" ? "" : "Report")
                      }
                    >
                      <img src={Time} alt="img" />
                      <span> Report</span> <span className="menu-arrow" />
                    </a>
                    {isSideMenu == "Report" ? (
                      <ul>
                        <li>
                          <Link
                            to="/report/purchaseorderreport"
                            className={
                              pathname.includes("purchaseorderreport")
                                ? "active"
                                : ""
                            }
                          >
                            Purchase order report
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/report/inventoryreport"
                            className={
                              pathname.includes("inventoryreport")
                                ? "active"
                                : ""
                            }
                          >
                            Inventory Report
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/report/salesreport"
                            className={
                              pathname.includes("salesreport") ? "active" : ""
                            }
                          >
                            Sales Report
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/report/invoicereport"
                            className={
                              pathname.includes("invoicereport") ? "active" : ""
                            }
                          >
                            Invoice Report
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/report/purchasereport"
                            className={
                              pathname.includes("purchasereport")
                                ? "active"
                                : ""
                            }
                          >
                            Expense Report
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/report/supplierreport"
                            className={
                              pathname.includes("supplierreport")
                                ? "active"
                                : ""
                            }
                          >
                            Supplier Report
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/report/customerreport"
                            className={
                              pathname.includes("customerreport")
                                ? "active"
                                : ""
                            }
                          >
                            Customer Report
                          </Link>
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                  </li>
                )}
                {menuList.includes("AuditTrail") && (
                  <li className="submenu">
                    <a
                      // href="#"
                      className={
                        pathname.includes("/expense")
                          ? "subdrop active"
                          : "" || isSideMenu == "expense"
                          ? "subdrop active"
                          : ""
                      }
                      onClick={() =>
                        toggleSidebar(isSideMenu == "expense" ? "" : "expense")
                      }
                    >
                      {" "}
                      <img src={Expense} alt="img" /> <span>Expenses</span>{" "}
                      <span className="menu-arrow"></span>
                    </a>
                    {isSideMenu == "expense" ? (
                      <ul>
                        <li>
                          <Link
                            className={
                              pathname.includes("expenselist") ? "active" : ""
                            }
                            to="/expense/expenselist"
                          >
                            Expense List
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname === "/expense/addexpense" ? "active" : ""
                            }
                            to="/expense/addexpense"
                          >
                            Add Expense
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname === "/expense/categorylist"
                                ? "active"
                                : ""
                            }
                            to="/expense/categorylist"
                          >
                            Categories
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname === "/expense/addcategory"
                                ? "active"
                                : ""
                            }
                            to="/expense/addcategory"
                          >
                            Add Category
                          </Link>
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                  </li>
                )}
                {menuList.includes("Settings") && (
                  <li className="submenu">
                    <a
                      // to="#"
                      className={
                        pathname.includes("/settings")
                          ? "subdrop active"
                          : "" || isSideMenu == "Settings"
                          ? "subdrop active"
                          : ""
                      }
                      onClick={() =>
                        toggleSidebar(
                          isSideMenu == "Settings" ? "" : "Settings"
                        )
                      }
                    >
                      <img src={settings} alt="img" />
                      <span> Settings</span> <span className="menu-arrow" />
                    </a>
                    {isSideMenu == "Settings" ? (
                      <ul>
                        <li>
                          <Link
                            to="/settings/generalsettings"
                            className={
                              pathname.includes("generalsettings")
                                ? "active"
                                : ""
                            }
                          >
                            General Settings
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/settings/grouppermissions"
                            className={
                              pathname.includes("grouppermissions")
                                ? "active"
                                : ""
                            }
                          >
                            Access List
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/settings/findpermission"
                            className={
                              pathname.includes("findpermission")
                                ? "active"
                                : ""
                            }
                          >
                            User Permission
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/settings/updateuserpermission"
                            className={
                              pathname.includes("updateuserpermission")
                                ? "active"
                                : ""
                            }
                          >
                            Update User Permission
                          </Link>
                        </li>
                        {/* <li>
                        <Link
                          to='/settings/paymentsettings'
                          className={
                            pathname.includes('paymentsettings') ? 'active' : ''
                          }>
                          Payment Settings
                        </Link>
                      </li> */}
                      </ul>
                    ) : (
                      ""
                    )}
                  </li>
                )}

                {menuList.includes("Feedback") && (
                  <li className="submenu">
                    <a
                      // href="#"
                      className={
                        pathname.includes("/feedback")
                          ? "subdrop active"
                          : "" || isSideMenu == "feedback"
                          ? "subdrop active"
                          : ""
                      }
                      onClick={() =>
                        toggleSidebar(
                          isSideMenu == "feedback" ? "" : "feedback"
                        )
                      }
                    >
                      {" "}
                      <img src={Expense} alt="img" /> <span>Feddback</span>{" "}
                      <span className="menu-arrow"></span>
                    </a>
                    {isSideMenu == "feedback" ? (
                      <ul>
                        <li>
                          <Link
                            className={
                              pathname.includes("expenselist-") ? "active" : ""
                            }
                            to="/expense/expenselist-expense"
                          >
                            Expense List
                          </Link>
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                  </li>
                )}

                {userProfile?.data?.roleName?.toLowerCase() === "superadmin" ||
                userProfile?.data?.roleName?.toLowerCase() === "admnin" ||
                userProfile?.data?.roleName?.toLowerCase() === "sa" ? (
                  <li className="submenu">
                    <a className={"subdrop"} href="/ecommerce">
                      <img src={houseSvg} alt="img" /> <span>Ecommerce</span>{" "}
                    </a>
                  </li>
                ) : null}

                <li className="submenu">
                  <Link
                    // href="#"
                    to={"/feedback"}
                    className={pathname === "/feedback" ? "subdrop active" : ""}
                  >
                    <img src={mailSvg} alt="img" /> <span>Feedback</span>{" "}
                  </Link>
                  {/* {isSideMenu == 'feedback' ? (
                  <ul>
                    <li>
                      <Link
                        className={
                          pathname.includes('expenselist-') ? 'active' : ''
                        }
                        to='/expense/expenselist-expense'>
                        Expense List
                      </Link>
                    </li>
                  </ul>
                ) : (
                  ''
                )} */}
                </li>

                <li className="submenu">
                  <a className={"subdrop"} onClick={whatsappLink}>
                    <img src={whatsappSvg} alt="img" /> <span>Support</span>{" "}
                  </a>
                </li>
                <li>
                  {userProfile?.data?.isPlanExpired ? (
                    <div className="page-btn" onClick={initiatePlanRenewal}>
                      <span className="btn plan-action-btn">Renew plan</span>
                    </div>
                  ) : (
                    <div className="page-btn" role="button">
                      <a
                        href="https://subscribe.salestrack.app/pricing"
                        className="btn plan-action-btn"
                        target="__blank"
                      >
                        Upgrade plan
                      </a>
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </Scrollbars>
      </div>
    </>
  );
};

export default withRouter(Sidebar);
