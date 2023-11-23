import ArrowLeft from 'feather-icons-react/build/IconComponents/ArrowLeft';
import { useCurrentUserProfile } from '../../../hooks/useGetProfile';
import { Link } from 'react-router-dom';

const EmployeeProfile = () => {
  const { profile } = useCurrentUserProfile();
  const userData = profile?.data;
  const dob = userData?.dob.split('T')[0];

  return (
    <>
      <div className='page-wrapper'>
        <div className='content'>
          <div className='page-header'>
            <div className='page-title'>
              <h4>Profile</h4>
              <h6>User Profile</h6>
            </div>
          </div>
          <div className='mb-2'>
            <Link to='/dashboard' className='mb-3'>
              <ArrowLeft />
              <span className='ms-2'>Go back</span>
            </Link>
          </div>
          {/* /product list */}
          <div className='card'>
            <div className='card-body'>
              <div className='profile-set'>
                <div className='profile-head'></div>
                <div className='profile-top'>
                  <div className='profile-content'>
                    <div className='profile-contentimg'>
                      <img src={userData?.profileImage} alt='img' id='blah' />
                    </div>
                    <div className='profile-contentname'>
                      <h2>
                        {userData?.firstName} {userData?.lastName}
                      </h2>
                      <h4>Updates Your Photo and Personal Details.</h4>
                    </div>
                  </div>
                  {/* <div className="ms-auto">
                    <button className="btn btn-submit me-2">Save</button>
                    <button className="btn btn-cancel">Cancel</button>
                  </div> */}
                </div>
              </div>
              <div className='row'>
                <div className='col-lg-6 col-sm-12'>
                  <div className='form-group'>
                    <label>
                      First Name<span className='manitory'>*</span>
                    </label>
                    <input
                      type='text'
                      defaultValue={userData?.firstName}
                      disabled={true}
                    />
                  </div>
                </div>
                <div className='col-lg-6 col-sm-12'>
                  <div className='form-group'>
                    <label>
                      Last Name<span className='manitory'>*</span>
                    </label>
                    <input
                      type='text'
                      defaultValue={userData?.lastName}
                      disabled={true}
                    />
                  </div>
                </div>
                <div className='col-lg-6 col-sm-12'>
                  <div className='form-group'>
                    <label>
                      User Name <span className='manitory'>*</span>
                    </label>
                    <input
                      type='text'
                      defaultValue={userData?.userName}
                      disabled={true}
                    />
                  </div>
                </div>
                <div className='col-lg-6 col-sm-12'>
                  <div className='form-group'>
                    <label>
                      Email <span className='manitory'>*</span>
                    </label>
                    <input
                      type='text'
                      defaultValue={userData?.email}
                      disabled={true}
                    />
                  </div>
                </div>
                <div className='col-lg-6 col-sm-12'>
                  <div className='form-group'>
                    <label>
                      Dob <span className='manitory'>*</span>
                    </label>
                    <input
                      type='date'
                      className='form-control'
                      defaultValue={dob || ''}
                      disabled={true}
                    />
                  </div>
                </div>
                <div className='col-lg-6 col-sm-12'>
                  <div className='form-group'>
                    <label>
                      Phone<span className='manitory'>*</span>
                    </label>
                    <input
                      type='text'
                      defaultValue={userData?.phoneNumber}
                      disabled={true}
                    />
                  </div>
                </div>
                <div className='col-lg-6 col-sm-12'>
                  <div className='form-group'>
                    <label>
                      Gender<span className='manitory'>*</span>
                    </label>
                    <input
                      type='text'
                      defaultValue={userData?.gender}
                      disabled={true}
                    />
                  </div>
                </div>
                <div className='col-lg-6 col-sm-12'>
                  <div className='form-group'>
                    <label>
                      Store<span className='manitory'>*</span>
                    </label>
                    <input
                      type='text'
                      defaultValue={userData?.storeName}
                      disabled={true}
                    />
                  </div>
                </div>
                <div className='col-lg-6 col-sm-12'>
                  <div className='form-group'>
                    <label>
                      Role<span className='manitory'>*</span>
                    </label>
                    <input
                      type='text'
                      defaultValue={userData?.roleName}
                      disabled={true}
                    />
                  </div>
                </div>
                <div className='col-lg-6 col-sm-12'>
                  <div className='form-group'>
                    <label>
                      Status<span className='manitory'>*</span>{' '}
                    </label>
                    <input
                      type='text'
                      defaultValue={userData?.isActive ? 'Active' : 'Inactive'}
                      disabled={true}
                    />
                  </div>
                </div>
                <div className='col-12'>
                  <div className='form-group'>
                    <label>Home Address</label>
                    <input
                      type='text'
                      defaultValue={userData?.address}
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeProfile;
