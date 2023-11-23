import ReactToPrint from 'react-to-print';
import { Printer } from '../../../../EntryFile/imagePath';
import { useRef } from 'react';
import './style.css';
import { formatCurrency } from '../../../../../utils/helpers';
import Details from '../../details/details';

// const getPageMargins = () => {
//   return `@page { margin: 8px 25px !important; }`;
// };

const Receipt = ({ data }) => {
  // console.log(data);
  // const data = {
  //   storeName: 'string',
  //   address: 'string',
  //   contact: 'string',
  //   customerName: 'string',
  //   receiptDate: '2023-08-14T11:35:01.492Z',
  //   receiptNO: 'string',
  //   reference: 'string',
  //   customerCode: 'string',
  //   itemsDescription: [
  //     {
  //       item: 'string',
  //       quantity: 0,
  //       unitPrice: 0,
  //       totalPrice: 0,
  //       productId: 0,
  //     },
  //   ],
  //   totalAmount: 0,
  // };

  const ref = useRef(null);
  return (
    <>
      {/* <style>{getPageMargins()}</style> */}

      <div>
        <div className='d-flex flex-column align-items-center justify-content-center my-3'>
          <h3>{data.storeName}</h3>
          <p className='m-0'>{data.address}</p>
          <p className='m-0'>{data.contact}</p>
        </div>
        <div className='mt-4'>
          <div className='d-flex justify-content-between my-3'>
            <p>Invoice {data.receiptNO}</p>
            <p>
              {new Date(data.receiptDate).toLocaleDateString('en', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </div>

          <table className='w-100 table'>
            <thead>
              <tr>
                <th>Qty</th>
                <th>Product</th>
                <th>Unit Price</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {data.itemsDescription.map((item) => (
                <tr key={item.productId} className=''>
                  <td>{item.quantity}</td>
                  <td>{item.item}</td>
                  <td>{formatCurrency(item.unitPrice)}</td>
                  <td>{formatCurrency(item.totalPrice)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className='w-100 my-4 border-bottom'>
            <p className='w-100 d-flex justify-content-between'>
              Total <span>{formatCurrency(data.totalAmount)}</span>{' '}
            </p>
          </div>

          <div className='mb-2 d-flex justify-content-between px-3'>
            <p>Thank you and see you again {data.customerName}</p>

            <div className='d-flex justify-content-center'>
              <div style={{ display: 'none' }}>
                <Details ref={ref} data={data} />
              </div>
              <ReactToPrint
                trigger={() => (
                  <button data-tip='Print' className='print-receipt'>
                    <p>Print</p>
                    <img src={Printer} alt='img' />
                  </button>
                )}
                content={() => ref.current}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Receipt;
