import { delete2 } from '../../../EntryFile/imagePath';
import Swal from 'sweetalert2';
import Select from '../../../components/Select';
import { formatCurrency } from '../../../../utils/helpers';
import Preview from './modal';
import AddCustomer from './modal/add-customer';

const PosRight = ({ sale, setSale, customers_list }) => {
  const confirmClear = () => {
    Swal.fire({
      title: 'Are you sure you want to remove all products?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: !0,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, clear!',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn btn-danger ml-1',
      buttonsStyling: !1,
    }).then((t) => {
      if (t.isConfirmed) {
        clearAll();
        Swal.fire({
          type: 'success',
          title: 'Cleared!',
          text: 'Removed',
          confirmButtonClass: 'btn btn-success',
        });
      }
    });
  };

  const subTotal = (() => {
    let total = 0;

    for (const element of sale.items) {
      total += element.unitPrice * element.quantity;
    }
    return total;
  })();

  const clearAll = () => setSale((x) => ({ ...x, items: [] }));

  const removeFromCart = (id) => {
    setSale((x) => ({ ...x, items: x.items.filter((y) => y.id !== id) }));
  };

  const incrementItems = (index) => {
    setSale((x) => {
      const items = x.items;
      const matched = items.find((_, i) => i === index);
      return {
        ...x,
        items: [
          ...items.slice(0, index),
          { ...matched, quantity: matched.quantity + 1 },
          ...items.slice(index + 1),
        ],
      };
    });
  };

  const decrementItems = (index) => {
    setSale((x) => {
      const items = x.items;
      const matched = items.find((_, i) => i === index);
      return {
        ...x,
        items: [
          ...items.slice(0, index),
          { ...matched, quantity: matched.quantity - 1 },
          ...items.slice(index + 1),
        ],
      };
    });
  };

  const customers = customers_list?.data.map((x) => ({
    label: `${x.customerName} (${x.phoneNumber})`,
    value: `${x.customerCode}-${x.phoneNumber}`,
  }));

  return (
    <>
      <div className='col-lg-4 col-sm-12 '>
        <div className='order-list'>
          <div className='orderid'>
            <h4>Order List</h4>
            {/* <h5>Transaction id : #65565</h5> */}
          </div>
          {/* <div className='actionproducts'>
            <ul>
              <li>
                <Link
                  to='#'
                  className='deletebg confirm-text'
                  // onClick={confirmText}
                >
                  <img src={delete2} alt='img' />
                </Link>
              </li>
            </ul>
          </div> */}
        </div>
        <div className='card card-order'>
          <div className='card-body'>
            <div className='row gap-3'>
              <div className='col-12'>
                <Select
                  value={
                    sale.customer
                      ? {
                          label: sale.customer?.name,
                          value: `${sale.customer?.customerCode}-${sale.customer?.phoneNumber}`,
                        }
                      : undefined
                  }
                  placeholder='Search Customer name, code, category'
                  onChange={(e) => {
                    setSale((x) => ({
                      ...x,
                      customer: {
                        code: e.value.split('-')?.[0],
                        phoneNumber: e.value.split('-')?.[1],
                        name: e.label,
                      },
                    }));
                  }}
                  options={customers}
                />
              </div>
              <AddCustomer />
              <div className='col-12 d-flex flex-column w-100'>
                <div className=''>
                  {sale.customer && (
                    <p className='font-weight-bold'>
                      Cutomer: {sale.customer?.name}
                    </p>
                  )}
                </div>
                {/* <div className='mx-auto mt-3'>
                  <button to='#' className='btn btn-scanner-set'>
                    <img src={scanner1} alt='img' className='me-2' />
                    Scan barcode
                  </button>
                </div> */}
              </div>
            </div>
          </div>
          <div className='split-card'></div>
          <div className='card-body pt-0'>
            <div className='totalitem'>
              <h4>Total items :{sale.items?.length}</h4>
              <button disabled={sale.items.length < 1} onClick={confirmClear}>
                Clear all
              </button>
            </div>
            {/* cart list */}
            <div className='product-items'>
              {sale.items.map((x, index) => (
                <div key={x.productCode} className='product-lists'>
                  <div className='productimg' style={{ width: '100%' }}>
                    <div className='productimgs'>
                      <img src={x.image} alt='img' />
                    </div>
                    <div className='productcontet'>
                      <h4>{x.name}</h4>
                      <div className='productlinkset'>
                        <h5>{x.productCode}</h5>
                      </div>
                      <div className='increment-decrement'>
                        <div className='input-groups'>
                          <input
                            disabled={x.quantity < 2}
                            onClick={() => decrementItems(index)}
                            type='button'
                            defaultValue='-'
                            className='button-minus dec button'
                          />
                          <input
                            type='text'
                            name='child'
                            value={x.quantity}
                            onChange={() => {}}
                            className='quantity-field'
                          />
                          <input
                            disabled={x.quantity > 499}
                            onClick={() => incrementItems(index)}
                            type='button'
                            defaultValue='+'
                            className='button-plus inc button '
                          />
                          <p className='' style={{ marginLeft: '40px' }}>
                            <span style={{ marginRight: '5px' }}>x</span> ₦
                            {formatCurrency(x.unitPrice)}{' '}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className='price-container'
                    style={{ lineHeight: '5px' }}>
                    <p className='' style={{ fontSize: '19px' }}>
                      ₦{formatCurrency(x.unitPrice * x.quantity)}
                    </p>
                  </div>
                  <div>
                    <button
                      style={{ width: '50px' }}
                      className='confirm-text'
                      onClick={() => removeFromCart(x.id)}>
                      <img src={delete2} alt='img' />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <Preview sale={sale} subTotal={subTotal} setSale={setSale} />
            {/* <div className='btn-pos'>
              <ul>
                <li>
                  <Link to='#' className='btn'>
                    <img src={pause1} alt='img' className='me-1' />
                    Hold
                  </Link>
                </li>
                <li>
                  <Link to='#' className='btn'>
                    <img src={Edit6} alt='img' className='me-1' />
                    Quotation
                  </Link>
                </li>
                <li>
                  <Link to='#' className='btn'>
                    <img src={trash12} alt='img' className='me-1' />
                    Void
                  </Link>
                </li>
                <li>
                  <Link to='#' className='btn'>
                    <img src={wallet1} alt='img' className='me-1' />
                    Payment
                  </Link>
                </li>
                <li>
                  <Link
                    to='#'
                    className='btn'
                    data-bs-toggle='modal'
                    data-bs-target='#recents'>
                    <img src={transcation} alt='img' className='me-1' />{' '}
                    Transaction
                  </Link>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default PosRight;
