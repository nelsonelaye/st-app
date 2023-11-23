import {
  dateTimeLocale,
  formatCurrency,
  sumTotal,
} from '../../../../utils/helpers';
import { forwardRef } from 'react';

const Details = forwardRef(({ data, children }, ref) => {
  return (
    <div className='card'>
      <div className='card-body' ref={ref}>
        <div className='card-sales-split'>
          <h2>{data?.storeName}</h2>
          <ul>
            {/* <li>
                  <Link to='#'>
                    <img src={EditIcon} alt='img' />
                  </Link>
                </li> */}
            {children}
          </ul>
        </div>
        <div
          className='invoice-box table-height'
          style={{
            maxWidth: 1600,
            width: '100%',
            overflow: 'auto',
            margin: '15px auto',
            padding: 0,
            fontSize: 14,
            lineHeight: '24px',
            color: '#555',
          }}>
          {/* product Table */}
          {data && <InvoiceDetails data={data} />}
          {data && <ProductTable products={data.itemsDescription} />}
        </div>
      </div>
    </div>
  );
});

Details.displayName = 'Details';

const ProductTable = ({ products }) => {
  return (
    <div>
      <table
        cellPadding={0}
        cellSpacing={0}
        style={{
          width: '100%',
          lineHeight: '24px',
        }}>
        <thead style={{ width: '100%' }}>
          <tr
            className='heading '
            style={{ background: '#F3F2F7', width: '100%' }}>
            <th
              style={{
                padding: 10,
                verticalAlign: 'middle',
                fontWeight: 600,
                color: '#5E5873',
                fontSize: 14,
              }}>
              Product Name
            </th>
            <th
              style={{
                padding: 10,
                verticalAlign: 'middle',
                fontWeight: 600,
                color: '#5E5873',
                fontSize: 14,
              }}>
              QTY
            </th>
            <th
              style={{
                padding: 10,
                verticalAlign: 'middle',
                fontWeight: 600,
                color: '#5E5873',
                fontSize: 14,
              }}>
              Unit Price
            </th>
            <th
              style={{
                padding: 10,
                verticalAlign: 'middle',
                fontWeight: 600,
                color: '#5E5873',
                fontSize: 14,
              }}>
              Total Price
            </th>
          </tr>
        </thead>
        <tbody style={{ width: '100%' }}>
          {products.map((x) => (
            <tr
              key={x.productId}
              className='details'
              style={{ borderBottom: '1px solid #E9ECEF' }}>
              <td
                style={{
                  padding: 10,
                  display: 'flex',
                  alignItems: 'center',
                  whiteSpace: 'nowrap',
                  width: '170px',
                }}>
                {x.item}
              </td>
              <td style={{ padding: 10, verticalAlign: 'top' }}>
                {x.quantity}
              </td>
              <td style={{ padding: 10, verticalAlign: 'top' }}>
                {formatCurrency(x.unitPrice)}
              </td>
              <td style={{ padding: 10, verticalAlign: 'top' }}>
                {formatCurrency(x.unitPrice * x.quantity)}
              </td>
            </tr>
          ))}
        </tbody>
        <tr>
          <td style={{ fontSize: '18px', paddingTop: '15px' }}></td>
          <td style={{ fontSize: '18px', paddingTop: '15px' }}></td>
          <td style={{ fontSize: '18px', paddingTop: '15px' }}>Total</td>

          <td style={{ fontSize: '18px', paddingTop: '15px' }}>
            {formatCurrency(sumTotal(products.map((x) => x.totalPrice)))}
          </td>
        </tr>
      </table>
    </div>
  );
};

const InvoiceDetails = ({ data }) => {
  return (
    <>
      <div className='d-flex gap-2 w-100 mb-5'>
        <div className='w-50' style={{ lineHeight: '15px' }}>
          <p
            style={{
              fontSize: 14,
              color: '#7367F0',
              fontWeight: 600,
            }}>
            Customer Info
          </p>

          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
            }}>
            Code: {data.customerCode}
          </p>
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
            }}>
            Name: {data.customerName}
          </p>
        </div>

        <div className='w-50' style={{ lineHeight: '14px' }}>
          <p
            style={{
              fontSize: 14,
              color: '#7367F0',
              fontWeight: 600,
            }}>
            Invoice Info
          </p>

          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}>
            Reference: {data.orderRef}
          </p>
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}>
            Payment: {data.paymentMethods}
          </p>
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}>
            Date: {dateTimeLocale(data.salesDate)}
          </p>

          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}>
            Seller: {data.salePersonName}
          </p>

          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}>
            Receipt Number: {data.receiptNo}
          </p>
        </div>
      </div>
    </>
  );
};

export default Details;
