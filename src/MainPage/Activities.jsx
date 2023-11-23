import { Link } from "react-router-dom";
// import { Bruklin, Profile3, Profile4, Profile5 } from "../EntryFile/imagePath";
import { Profile3 } from "../EntryFile/imagePath";
import { useGetAllreadNotification } from "../../hooks/useGetNotification";
import moment from "moment";
import { LoadingAbsolute } from "../components/Loading";

const Activities = () => {
  const { all_notifications, isLoading } = useGetAllreadNotification();
  console.log(all_notifications?.data?.notifications[185]);
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>All Notifications</h4>
            <h6>View your all activities</h6>
          </div>
        </div>
        {/* /product list */}
        <div className="activity">
          <div className="activity-box">
            <ul className="activity-list">
              {isLoading && <LoadingAbsolute />}
              {all_notifications?.data?.notifications?.map((notification) => (
                <li key={notification.id}>
                  <div className="activity-user">
                    <Link
                      to="/profile/user-profile"
                      title=""
                      data-toggle="tooltip"
                      data-original-title="Lesley Grauer"
                    >
                      <img
                        alt="Lesley Grauer"
                        src={Profile3}
                        className=" img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="activity-content">
                    <div className="timeline-content">
                      {notification.message}
                      <span className="time">
                        {moment(notification.notiDate).fromNow()}
                      </span>
                    </div>
                  </div>
                </li>
              ))}

              {/* <li>
                <div className="activity-user">
                  <Link
                    to="/profile/user-profile"
                    title=""
                    data-toggle="tooltip"
                    data-original-title="Lesley Grauer"
                  >
                    <img
                      alt="Lesley Grauer"
                      src={Profile3}
                      className=" img-fluid"
                    />
                  </Link>
                </div>
                <div className="activity-content">
                  <div className="timeline-content">
                    <Link to="/profile/user-profile" className="name">
                      Elwis Mathew{" "}
                    </Link>{" "}
                    added a new product <Link to="#">Redmi Pro 7 Mobile</Link>
                    <span className="time">4 mins ago</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="activity-user">
                  <Link
                    to="/profile/user-profile"
                    title=""
                    data-toggle="tooltip"
                    data-original-title="Lesley Grauer"
                  >
                    <img
                      alt="Lesley Grauer"
                      src={Profile4}
                      className=" img-fluid"
                    />
                  </Link>
                </div>
                <div className="activity-content">
                  <div className="timeline-content">
                    <Link to="/profile/user-profile" className="name">
                      Elizabeth Olsen
                    </Link>{" "}
                    added a new product category{" "}
                    <Link to="#">Desktop Computers</Link>
                    <span className="time">6 mins ago</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="activity-user">
                  <Link
                    to="/profile/user-profile"
                    title=""
                    data-toggle="tooltip"
                    data-original-title="Lesley Grauer"
                  >
                    <img
                      alt="Lesley Grauer"
                      src={Profile5}
                      className=" img-fluid"
                    />
                  </Link>
                </div>
                <div className="activity-content">
                  <div className="timeline-content">
                    <div className="timeline-content">
                      <Link to="/profile/user-profile" className="name">
                        William Smith
                      </Link>{" "}
                      added a new sales list for
                      <Link to="#">January Month</Link>
                      <span className="time">12 mins ago</span>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="activity-user">
                  <Link
                    to="/profile/user-profile"
                    title=""
                    data-toggle="tooltip"
                    data-original-title="Lesley Grauer"
                  >
                    <img
                      alt="Lesley Grauer"
                      src={Bruklin}
                      className=" img-fluid"
                    />
                  </Link>
                </div>
                <div className="activity-content">
                  <div className="timeline-content">
                    <Link to="/profile/user-profile" className="name">
                      Lesley Grauer
                    </Link>{" "}
                    has updated invoice <Link to="#">#987654</Link>
                    <span className="time">4 mins ago</span>
                  </div>
                </div>
              </li> */}
            </ul>
          </div>
        </div>
        {/* /product list */}
      </div>
    </div>
  );
};

export default Activities;
