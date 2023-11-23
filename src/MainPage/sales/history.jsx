import { useState } from 'react';
import { FullTable } from '../../EntryFile/datatable';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Calendar,
  Printer,
  search_whites,
  EditIcon,
  DeleteIcon,
  datepicker,
  Eye1,
} from '../../EntryFile/imagePath';
import { useGetSales } from '../../../hooks/useGetSale';
import { dateLocale, formatCurrency } from '../../../utils/helpers';
import ReactToPrint from 'react-to-print';
import { useRef } from 'react';
import Details from './details/details';
import { Root } from '@radix-ui/react-dialog';
import { Trigger } from '@radix-ui/react-dialog';
import { Portal } from '@radix-ui/react-dialog';
import { Content } from '@radix-ui/react-dialog';
import './pos/modal/style.css';
import { Overlay } from '@radix-ui/react-dialog';
import { LoadingAbsolute } from '../../components/Loading';

const SalesList = () => {
  const { all_sales, search, isLoading } = useGetSales();
  const [startDate, setStartDate] = useState(new Date());
  const [startDate1, setStartDate1] = useState(new Date());
  const [inputfilter, setInputfilter] = useState(false);

  const [filter, setFilter] = useState({
    code: undefined,
    reference: undefined,
  });

  const [filterInput, setFilterInput] = useState({
    code: '',
    reference: '',
  });

  // const confirmDelete = () => {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     type: 'warning',
  //     showCancelButton: !0,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!',
  //     confirmButtonClass: 'btn btn-primary',
  //     cancelButtonClass: 'btn btn-danger ml-1',
  //     buttonsStyling: !1,
  //   }).then(function (t) {
  //     t.value &&
  //       Swal.fire({
  //         type: 'success',
  //         title: 'Deleted!',
  //         text: 'Your file has been deleted.',
  //         confirmButtonClass: 'btn btn-success',
  //       });
  //   });
  // };

  const columns = [
    {
      title: 'Costumer name',
      dataIndex: 'customerName',
      sorter: (a, b) => a.Date.length - b.Date.length,
      align: 'center',
    },
    {
      title: 'Date',
      dataIndex: 'salesDate',
      sorter: (a, b) => a.Name.length - b.Name.length,
      align: 'center',
      render: (cell) => dateLocale(cell),
    },
    {
      title: 'Reference',
      dataIndex: 'orderRef',
      sorter: (a, b) => a.Reference.length - b.Reference.length,
      align: 'center',
    },
    {
      title: 'Receipt Id',
      dataIndex: 'receiptNo',
      sorter: (a, b) => a.Reference.length - b.Reference.length,
      align: 'center',
    },
    {
      title: "Seller's name",
      dataIndex: 'salePersonName',
      sorter: (a, b) => a.Reference.length - b.Reference.length,
      align: 'center',
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'Status',
    //   render: (text, record) => (
    //     <>
    //       {text === 'Pending' && (
    //         <span className='badges bg-lightred'>{text}</span>
    //       )}
    //       {text === 'Completed' && (
    //         <span className='badges bg-lightgreen'>{text}</span>
    //       )}
    //     </>
    //   ),
    //   sorter: (a, b) => a.Status.length - b.Status.length,
    // },
    {
      title: 'Total',
      dataIndex: 'totalAmount',
      sorter: (a, b) => a.Total.length - b.Total.length,
      render: (cell) => formatCurrency(cell),
    },
    {
      title: 'Action',
      align: 'center',
      render: (row) => {
        return (
          <>
            <div className='text-center'>
              <Link
                className='action-set'
                to='#'
                data-bs-toggle='dropdown'
                aria-expanded='true'>
                <i className='fa fa-ellipsis-v' aria-hidden='true' />
              </Link>
              <ul className='dropdown-menu'>
                <li>
                  <Link
                    to={`/sales/sales-details/${row?.orderRef}`}
                    className='dropdown-item'>
                    <img src={Eye1} className='me-2' alt='img' />
                    Sale Detail
                  </Link>
                </li>

                <PrintReceipt row={row} />

                {/* <li>
                  <Link to='/sales/edit-sales' className='dropdown-item'>
                    <img src={EditIcon} className='me-2' alt='img' />
                    Edit Sale
                  </Link>
                </li> */}

                {/* <li>
              <Link
                to='#'
                className='dropdown-item confirm-text'
                onClick={confirmDelete}>
                <img src={delete1} className='me-2' alt='img' />
                Delete Sale
              </Link>
            </li> */}
              </ul>
            </div>
          </>
        );
      },
    },
  ];

  const togglefilter = (value) => {
    !value &&
      setFilter({
        code: undefined,
        reference: undefined,
      });
    setInputfilter(value);
  };

  const unfilteredData = all_sales?.data || [];

  const filterData = () => {
    const codeSearch = filter.code
      ? unfilteredData.filter((x) => x.customerCode === filter.code)
      : unfilteredData;

    const refSearch = filter.reference
      ? codeSearch.filter((x) => x.orderRef === filter.reference)
      : codeSearch;

    return refSearch;
  };

  const data =
    (filter.code && filter.code.length > 0) ||
    (filter.reference && filter.reference.length > 0)
      ? filterData()
      : unfilteredData;

  return (
    <>
      {isLoading && <LoadingAbsolute />}
      <FullTable
        pageTitle='Sales List'
        pageSubTitle='Manage your Sales'
        addHref={'/sales/pos'}
        addText='POS'
        columns={columns}
        data={data}
        inputfilter={inputfilter}
        handleSearch={search}
        togglefilter={togglefilter}>
        <div
          className={`card mb-0 ${inputfilter ? 'toggleCls' : ''}`}
          id='filter_inputs'
          style={{ display: inputfilter ? 'block' : 'none' }}>
          <div className='card-body pb-0'>
            <div className='row text-center'>
              <button
                className='text-orange-500'
                style={{ color: 'orange', marginBottom: '10px' }}
                onClick={() => {
                  setFilter({ code: undefined, reference: undefined });
                  setFilterInput({ code: '', reference: '' });
                }}>
                Clear Filter
              </button>
            </div>
            <div className='row'>
              <div className='col-lg-3 col-sm-6 col-12'>
                <div className='form-group'>
                  <input
                    value={filterInput.code}
                    onChange={(e) =>
                      setFilterInput((x) => ({ ...x, code: e.target.value }))
                    }
                    type='text'
                    placeholder='Enter Code'
                  />
                </div>
              </div>
              <div className='col-lg-3 col-sm-6 col-12'>
                <div className='form-group'>
                  <input
                    value={filterInput.reference}
                    onChange={(e) =>
                      setFilterInput((x) => ({
                        ...x,
                        reference: e.target.value,
                      }))
                    }
                    type='text'
                    placeholder='Enter Reference No'
                  />
                </div>
              </div>
              <div className='col-lg-3 col-sm-6 col-12'>
                <div className='form-group'>
                  {/* <Select2
                          className="select"
                          data={options}
                          options={{
                            placeholder: "Choose Suppliers",
                          }}
                        /> */}
                </div>
              </div>
              <div className='col-lg-3 col-sm-6 col-12'>
                <div className='form-group'>
                  <button
                    onClick={() => setFilter(filterInput)}
                    className='btn btn-filters ms-auto'>
                    <img src={search_whites} alt='img' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FullTable>

      <>
        <div
          className='modal fade'
          id='showpayment'
          tabIndex={-1}
          aria-labelledby='showpayment'
          aria-hidden='true'>
          <div className='modal-dialog modal-lg modal-dialog-centered'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Show Payments</h5>
                <button
                  type='button'
                  className='close'
                  data-bs-dismiss='modal'
                  aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              <div className='modal-body'>
                <div className='table-responsive'>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Reference</th>
                        <th>Amount </th>
                        <th>Paid By </th>
                        <th>Paid By </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className='bor-b1'>
                        <td>2022-03-07 </td>
                        <td>INV/SL0101</td>
                        <td>$ 0.00 </td>
                        <td>Cash</td>
                        <td>
                          <Link className='me-2' to='#'>
                            <img src={Printer} alt='img' />
                          </Link>
                          <Link
                            className='me-2'
                            to='#'
                            data-bs-target='#editpayment'
                            data-bs-toggle='modal'
                            data-bs-dismiss='modal'>
                            <img src={EditIcon} alt='img' />
                          </Link>
                          <Link className='me-2 confirm-text' to='#'>
                            <img src={DeleteIcon} alt='img' />
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* show payment Modal */}
        {/* show payment Modal */}
        <div
          className='modal fade'
          id='createpayment'
          tabIndex={-1}
          aria-labelledby='createpayment'
          aria-hidden='true'>
          <div className='modal-dialog modal-lg modal-dialog-centered'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Create Payment</h5>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              <div className='modal-body'>
                <div className='row'>
                  <div className='col-lg-6 col-sm-12 col-12'>
                    <div className='form-group'>
                      <label>Customer</label>
                      <div className='input-groupicon'>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                        />
                        <div className='addonset'>
                          <img src={Calendar} alt='img' />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-6 col-sm-12 col-12'>
                    <div className='form-group'>
                      <label>Reference</label>
                      <input type='text' defaultValue='INV/SL0101' />
                    </div>
                  </div>
                  <div className='col-lg-6 col-sm-12 col-12'>
                    <div className='form-group'>
                      <label>Received Amount</label>
                      <input type='text' defaultValue={0.0} />
                    </div>
                  </div>
                  <div className='col-lg-6 col-sm-12 col-12'>
                    <div className='form-group'>
                      <label>Paying Amount</label>
                      <input type='text' defaultValue={0.0} />
                    </div>
                  </div>
                  <div className='col-lg-6 col-sm-12 col-12'>
                    <div className='form-group'>
                      <label>Payment type</label>
                      {/* <Select2
                        className="select"
                        data={options1}
                        options={{
                          placeholder: "Choose Suppliers",
                        }}
                      /> */}
                    </div>
                  </div>
                  <div className='col-lg-12'>
                    <div className='form-group mb-0'>
                      <label>Note</label>
                      <textarea className='form-control' defaultValue={''} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-submit'>
                  Submit
                </button>
                <button
                  type='button'
                  className='btn btn-cancel'
                  data-bs-dismiss='modal'>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* show payment Modal */}
        {/* edit payment Modal */}
        <div
          className='modal fade'
          id='editpayment'
          tabIndex={-1}
          aria-labelledby='editpayment'
          aria-hidden='true'>
          <div className='modal-dialog modal-lg modal-dialog-centered'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Edit Payment</h5>
                <button
                  type='button'
                  className='close'
                  data-bs-dismiss='modal'
                  aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              <div className='modal-body'>
                <div className='row'>
                  <div className='col-lg-6 col-sm-12 col-12'>
                    <div className='form-group'>
                      <label>Customer</label>
                      <div className='input-groupicon'>
                        <DatePicker
                          selected={startDate1}
                          onChange={(date) => setStartDate1(date)}
                        />
                        <div className='addonset'>
                          <img src={datepicker} alt='img' />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-6 col-sm-12 col-12'>
                    <div className='form-group'>
                      <label>Reference</label>
                      <input type='text' defaultValue='INV/SL0101' />
                    </div>
                  </div>
                  <div className='col-lg-6 col-sm-12 col-12'>
                    <div className='form-group'>
                      <label>Received Amount</label>
                      <input type='text' defaultValue={0.0} />
                    </div>
                  </div>
                  <div className='col-lg-6 col-sm-12 col-12'>
                    <div className='form-group'>
                      <label>Paying Amount</label>
                      <input type='text' defaultValue={0.0} />
                    </div>
                  </div>
                  <div className='col-lg-6 col-sm-12 col-12'>
                    <div className='form-group'>
                      <label>Payment type</label>
                      {/* <Select2
                        className="select"
                        data={options1}
                        options={{
                          placeholder: "Choose Suppliers",
                        }}
                      /> */}
                    </div>
                  </div>
                  <div className='col-lg-12'>
                    <div className='form-group mb-0'>
                      <label>Note</label>
                      <textarea className='form-control' defaultValue={''} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-submit'>
                  Submit
                </button>
                <button
                  type='button'
                  className='btn btn-cancel'
                  data-bs-dismiss='modal'>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

const PrintReceipt = ({ row }) => {
  const ref = useRef();

  const [open, setOpen] = useState(false);

  return (
    <li>
      <Root open={open} onOpenChange={setOpen}>
        <Trigger className='dropdown-item'>
          <img src={Printer} className='me-2' alt='img' />
          Print Receipt
        </Trigger>

        <Portal>
          <Overlay className='DialogOverlay' />
          <Content className='DialogContent'>
            <div className='d-flex justify-content-end'>
              <button
                type='button'
                className='close-modal'
                style={{ fontSize: '18px' }}
                onClick={() => {
                  setOpen(false);
                }}>
                <span aria-hidden='true'>×</span>
              </button>
            </div>
            <div className='my-2'>
              <Details ref={ref} data={row} />
            </div>

            <ReactToPrint
              trigger={() => (
                <button className='print-receipt m-auto'>
                  <img src={Printer} className='me-2' alt='img' />
                  <p>Print</p>
                </button>
              )}
              content={() => ref.current}
            />
          </Content>
        </Portal>
      </Root>
    </li>
  );
};

export default SalesList;
