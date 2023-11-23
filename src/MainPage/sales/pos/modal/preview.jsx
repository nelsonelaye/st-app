import { formatCurrency } from '../../../../../utils/helpers';
import { cash, debitcard, scan } from '../../../../EntryFile/imagePath';

const Preview = ({ sale, setSale, subTotal, saveSale }) => {
  const items = sale.items;

  const addPaymentMethod = (type) => {
    setSale((x) => {
      const exists = x.paymentMethods.find((y) => y === type);
      return {
        ...x,
        paymentMethods: exists
          ? x.paymentMethods.filter((y) => y !== type)
          : [...x.paymentMethods.filter((y) => y !== type), type],
      };
    });
  };

  const onDescriptionChange = (e) => {
    setSale((x) => ({ ...x, paymentDescription: e.target.value }));
  };

  return (
    <>
      {' '}
      <div className='preview-overflow'>
        <div className='table-responsive'>
          <table className='w-100 my-4 table overflow-auto'>
            <thead className='border-bottom'>
              <tr>
                <td>SN</td>
                <td>Item</td>
                <td>Qty</td>
                <td>UnitPrice</td>
                <td>Total Price</td>
              </tr>
            </thead>

            <tbody className=''>
              {items.map((x) => (
                <tr key={x.id}>
                  <td>{x.serialNumber}</td>
                  <td>{x.name}</td>
                  <td>{x.quantity}</td>
                  <td>{formatCurrency(x.unitPrice)}</td>
                  <td>{formatCurrency(x.quantity * x.unitPrice)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h5>Customer</h5>
        <p style={{}}>Name: {sale.customer?.name}</p>
        <p style={{ lineHeight: '5px' }}>
          Phone Number: {sale.customer?.phoneNumber}
        </p>
        <p style={{ fontSize: '18px' }}>
          Total Amount: {formatCurrency(subTotal)}
        </p>
      </div>
      <div className='setvaluecash my-3'>
        <button
          onClick={() => addPaymentMethod('cash')}
          className={`paymentmethod ${
            sale.paymentMethods.includes('cash') ? 'active' : ''
          }`}>
          <img src={cash} alt='img' className='me-2' />
          Cash
        </button>
        <button
          onClick={() => addPaymentMethod('transfer')}
          className={`paymentmethod ${
            sale.paymentMethods.includes('transfer') ? 'active' : ''
          }`}>
          <img src={debitcard} alt='img' className='me-2' />
          Transfer
        </button>
        <button
          onClick={() => addPaymentMethod('pos')}
          className={`paymentmethod ${
            sale.paymentMethods.includes('pos') ? 'active' : ''
          }`}>
          <img src={scan} alt='img' className='me-2' />
          POS
        </button>
      </div>
      {sale.paymentMethods.length > 1 && (
        <div className='my-3 form-group'>
          <label className=''>Description</label>
          <textarea
            rows={2}
            className='form-control'
            style={{ resize: 'none' }}
            placeholder='Enter description'
            value={sale.paymentDescription}
            onChange={onDescriptionChange}
          />
        </div>
      )}
      <button
        disabled={
          !sale.customer?.code ||
          sale.items.length < 1 ||
          sale.paymentMethods.length < 1
        }
        className='btn btn-submit d-flex justify-content-center w-100'
        onClick={saveSale}>
        <h5>Save</h5>
      </button>
    </>
  );
};

export default Preview;
