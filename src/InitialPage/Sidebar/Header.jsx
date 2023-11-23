import { useState } from "react";
import {
  SalesTrackSmall,
  Avatar2,
  // Avatar3,
  // Avatar6,
  // Avatar17,
  // Avatar13,
  Logout,
  Notification,
} from "../../EntryFile/imagePath";
import { Link } from "react-router-dom";
import { useCurrentUserProfile } from "../../../hooks/useGetProfile";
import useAuthContext from "../../../hooks/useAuth";
import { useGetUnreadNotification } from "../../../hooks/useGetNotification";
import moment from "moment";

const Header = () => {
  const { profile } = useCurrentUserProfile();
  const { handleLogOut } = useAuthContext();
  const [toggle, SetToggle] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);

  const handlesidebar = () => {
    document.body.classList.toggle("mini-sidebar");
    SetToggle((current) => !current);
  };

  const expandMenu = () => {
    document.body.classList.remove("expand-menu");
  };
  const expandMenuOpen = () => {
    document.body.classList.add("expand-menu");
  };
  const sidebarOverlay = () => {
    document.querySelector(".main-wrapper").classList.toggle("slide-nav");
    document.querySelector(".sidebar-overlay").classList.toggle("opened");
    document.querySelector("html").classList.toggle("menu-opened");
  };

  const handleNotifications = () => {
    setShowNotifs(!showNotifs);
  };
  let pathname = location.pathname;

  // console.log(profile);
  const { unread_notifications } = useGetUnreadNotification();
  console.log(unread_notifications);

  return (
    <>
      <div className="header">
        {/* Logo */}
        <div
          className={`header-left ${toggle ? "" : "active"}`}
          onMouseLeave={expandMenu}
          onMouseOver={expandMenuOpen}
        >
          <Link to="/dashboard" className="logo">
            <img src={SalesTrackSmall} alt="" />
          </Link>
          <Link to="/dashboard" className="logo-small">
            <img src={SalesTrackSmall} alt="" />
          </Link>
          <Link
            id="toggle_btn"
            to="#"
            style={{
              display: pathname.includes("tasks")
                ? "none"
                : pathname.includes("compose")
                ? "none"
                : "",
            }}
            onClick={handlesidebar}
          ></Link>{" "}
        </div>
        <Link
          id="mobile_btn"
          className="mobile_btn"
          to="#"
          onClick={sidebarOverlay}
        >
          <span className="bar-icon">
            <span />
            <span />
            <span />
          </span>
        </Link>

        {/* Header Menu */}
        <ul className="nav user-menu">
          {/* Notifications */}
          <li className="nav-item dropdown">
            {showNotifs && (
              <div className="dropdown-menus notifications">
                <div
                  className="topnav-dropdown-header"
                  onClick={handleNotifications}
                >
                  <span className="notification-title">Notifications</span>
                  <Link to="#" className="clear-noti">
                    {" "}
                    Clear All{" "}
                  </Link>
                </div>
                <div className="noti-content">
                  <ul className="notification-list">
                    {unread_notifications?.data?.notifications
                      ?.slice(0, 5)
                      .map((not) => (
                        <li key={not.id} className="notification-message">
                          <Link to="/activities">
                            <div className="media d-flex">
                              <span className="avatar flex-shrink-0">
                                <img alt="" src={Avatar2} />
                              </span>
                              <div className="media-body flex-grow-1">
                                <p className="noti-details">
                                  <span className="noti-title">
                                    {not.title}
                                  </span>
                                </p>
                                <p className="noti-time">
                                  <span className="notification-time">
                                    {moment(not.notiDate).fromNow()}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
                <div
                  className="topnav-dropdown-footer"
                  onClick={handleNotifications}
                >
                  <Link to="/activities">View all Notifications</Link>
                </div>
              </div>
            )}
          </li>
          {/* /Notifications */}

          {/* notification bell*/}
          <li>
            <div className="notification-icon" onClick={handleNotifications}>
              {unread_notifications?.totalRecord && (
                <span>
                  {unread_notifications?.totalRecord > 99
                    ? "99+"
                    : unread_notifications?.totalRecord}
                </span>
              )}

              <img src={Notification} alt="bell" />
            </div>
          </li>
          <li className="nav-item dropdown has-arrow main-drop">
            <Link
              to="#"
              className="dropdown-toggle nav-link userset"
              data-bs-toggle="dropdown"
            >
              <span className="user-img">
                <img src={profile?.data.profileImage} alt="" />
                <span className="status online" />
              </span>
            </Link>
            <div className="dropdown-menu menu-drop-user">
              <div className="profilename">
                <div className="profileset">
                  <span className="user-img">
                    <img src={profile?.data.profileImage} alt="" />
                    <span className="status online" />
                  </span>
                  <div className="profilesets">
                    <h6>
                      {profile?.data?.firstName} {profile?.data?.lastName}
                    </h6>
                    <h5>{profile?.data?.roleName}</h5>
                  </div>
                </div>
                <hr className="m-0" />
                <Link className="dropdown-item" to="/profile/user-profile">
                  <i className="me-2" data-feather="user" /> My Profile
                </Link>
                <Link className="dropdown-item" to="/settings/generalsettings">
                  <i className="me-2" data-feather="settings" />
                  Settings
                </Link>
                <hr className="m-0" />
                <a
                  className="dropdown-item logout pb-0"
                  onClick={() => handleLogOut()}
                >
                  <img src={Logout} className="me-2" alt="img" />
                  Logout
                </a>
              </div>
            </div>
          </li>
        </ul>
        {/* /Header Menu */}
        {/* Mobile Menu */}
        <div className="dropdown mobile-user-menu">
          <Link
            to="#"
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v" />
          </Link>
          <div className="dropdown-menu dropdown-menu-right">
            <Link className="dropdown-item" to="/profile/user-profile">
              My Profile
            </Link>
            <Link className="dropdown-item" to="/settings/generalsettings">
              Settings
            </Link>
            <a className="dropdown-item" onClick={() => handleLogOut()}>
              Logout
            </a>
          </div>
        </div>
        {/* /Mobile Menu */}
      </div>
    </>
  );
};

export default Header;
