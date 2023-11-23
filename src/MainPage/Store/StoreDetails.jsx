import { ArrowLeftOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

const StoreDetails = () => {
  let location = useLocation();

  return (
    <div className='page-wrapper'>
      <div className='content'>
        <div className='page-header'>
          <div className='page-title'>
            <h4>Store Details</h4>
            <h6>Full details of a store</h6>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 mb-4'>
            <a href='/store/storelist-all'>
              <ArrowLeftOutlined />
              <span className='ms-2'>Back</span>
            </a>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-8 col-sm-12'>
            <div className='card'>
              <div className='card-body'>
                <div className='productdetails'>
                  <ul className='product-bar'>
                    <li>
                      <h4>Store Name</h4>
                      <h6>{location?.state.storeName}</h6>
                    </li>
                    <li>
                      <h4>Store Owner</h4>
                      <h6>{location?.state.storeOwner}</h6>
                    </li>
                    <li>
                      <h4>Address</h4>
                      <h6>{location?.state.address}</h6>
                    </li>
                    <li>
                      <h4>Phone</h4>
                      <h6>{location?.state.contactPhone}</h6>
                    </li>
                    <li>
                      <h4>Email</h4>
                      <h6>{location?.state.emailAddress}</h6>
                    </li>
                    <li>
                      <h4>Tag</h4>
                      <h6>{location?.state.storeTag}</h6>
                    </li>
                    <li>
                      <h4>Store Website</h4>
                      <h6>{location?.state.storeWebSiteUrl}</h6>
                    </li>
                    <li>
                      <h4>Availability</h4>
                      <h6>{location?.state.isOpen ? 'Open' : 'Closed'}</h6>
                    </li>
                    <li>
                      <h4>Cover Image</h4>
                      <h6>{location?.state.coverImage}</h6>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetails;
