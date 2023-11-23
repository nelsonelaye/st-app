import { Link, useLocation } from 'react-router-dom';
import { Carousel } from 'antd';

import { barcode1, Printer } from '../../EntryFile/imagePath';
import { ArrowLeftOutlined } from '@ant-design/icons';

const ProductDetails = () => {
  let location = useLocation();

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <div className='page-wrapper'>
      <div className='content'>
        <div className='page-header'>
          <div className='page-title'>
            <h4>Product Details</h4>
            <h6>Full details of a product</h6>
          </div>
        </div>
        <div className="row">
          <div className="col-12 mb-4">
            <Link to="/product/productlist-product">
              <ArrowLeftOutlined />
              <span className="ms-2">Back</span>
            </Link>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-8 col-sm-12'>
            <div className='card'>
              <div className='card-body'>
                <div className='bar-code-view'>
                  <img src={barcode1} alt='barcode' />
                  <Link to='#' className='printimg'>
                    <img src={Printer} alt='print' />
                  </Link>
                </div>
                <div className='productdetails'>
                  <ul className='product-bar'>
                    <li>
                      <h4>Product</h4>
                      <h6>{location?.state.name}</h6>
                    </li>
                    <li>
                      <h4>Category</h4>
                      <h6>{location?.state.category}</h6>
                    </li>
                    <li>
                      <h4>Sub Category</h4>
                      <h6>{location?.state.subcategory}</h6>
                    </li>
                    <li>
                      <h4>Brand</h4>
                      <h6>{location?.state.brandName}</h6>
                    </li>
                    <li>
                      <h4>Unit</h4>
                      <h6>{location?.state.unitInStock}</h6>
                    </li>
                    <li>
                      <h4>SKU</h4>
                      <h6>{location?.state.sku}</h6>
                    </li>
                    <li>
                      <h4>Product code</h4>
                      <h6>{location?.state.productCode}</h6>
                    </li>
                    <li>
                      <h4>Store Name</h4>
                      <h6>{location?.state.storeName}</h6>
                    </li>
                    <li>
                      <h4>Available Quantity</h4>
                      <h6>{location?.state.quantity}</h6>
                    </li>
                    <li>
                      <h4>Tax</h4>
                      <h6>{location?.state.discountPercentage} %</h6>
                    </li>
                    <li>
                      <h4>Discount Type</h4>
                      <h6>Percentage</h6>
                    </li>
                    <li>
                      <h4>Price</h4>
                      <h6>{location?.state.unitPrice?.toLocaleString()}.00</h6>
                    </li>
                    <li>
                      <h4>Status</h4>
                      <h6>{location?.state.status ? 'Active' : 'Inactive'}</h6>
                    </li>
                    <li>
                      <h4>Description</h4>
                      <h6>{location?.state.description}</h6>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-4 col-sm-12'>
            <div className='card'>
              <div className='card-body'>
                <div className='slider-product-details'>
                  <Carousel afterChange={onChange}>
                    <div className='slider-product item'>
                      <img src={location?.state.image} alt='img' />
                      <h4 className='pt-3'>{location?.state.name}</h4>
                    </div>
                    <div className='slider-product item'>
                      <img src={location?.state.image} alt='img' />
                      <h4 className='pt-3'>{location?.state.name}</h4>
                    </div>
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
