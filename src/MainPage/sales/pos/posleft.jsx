import Select from '../../../components/Select';
// import { useProductList } from '../../../../hooks/useProductList';
import { formatCurrency } from '../../../../utils/helpers';

const Posleft = ({ addToCart, product_list, refetch_list }) => {
  const products = product_list?.data
    ?.filter((x) => x.quantity > 0)
    .map((x) => ({
      label: x.name,
      value: x,
    }));

  return (
    <div className='col-lg-8 col-sm-12 tabs_wrapper'>
      <div className='page-header '>
        <div className='page-title'>
          <h4>Products</h4>
          <h6>Products List</h6>
        </div>
      </div>

      <div className='row my-4'>
        <div className='col-lg-6 col-sm-6 col-12 mb-3'>
          <Select
            placeholder='Search Product name, code, category'
            onChange={(e) => {
              addToCart(e.value);
            }}
            options={products}
          />
        </div>

        <div className='col-lg-2 col-sm-6 col-12 form-group'>
          <button
            className='btn btn-filters w-100'
            onClick={() => refetch_list()}>
            Refresh
          </button>
        </div>
      </div>

      <div className='tabs_container'>
        <div className='tab_content active' data-tab='fruits'>
          <div className='row '>
            {product_list?.data.map((x) => (
              <div
                key={x.id}
                className='col-lg-3 col-sm-6 d-flex '
                onClick={() => addToCart(x)}>
                <div className='productset flex-fill'>
                  {x.quantity < 1 ? (
                    <div className='out-of-stock'>
                      <p>Out of stock</p>
                    </div>
                  ) : null}

                  <div className='qty'>
                    <p>Qty: {x.quantity}</p>
                    <div className='check-product'>
                      <i className='fa fa-check' />
                    </div>
                  </div>

                  <div className='productsetimg'>
                    <img src={x.image} alt='img' />
                  </div>
                  <div className='productsetcontent'>
                    <h5>{x.category}</h5>
                    <h4>{x.name}</h4>
                    <h6>₦{formatCurrency(x.unitPrice)}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posleft;
