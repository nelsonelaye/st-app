import { useState } from 'react';
import { FullTable } from '../../EntryFile/datatable';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Eye1,
  search_whites,
  EditIcon,
  Dollar1,
  Download,
  delete1,
  plusCircle,
} from '../../EntryFile/imagePath';
// import { useGetStockReport } from '../../../hooks/useGetSale';

const StockReport = () => {
  // const { all_reports } = useGetStockReport();
  const [inputfilter, setInputfilter] = useState(false);
  const data = [];
  const togglefilter = (value) => {
    setInputfilter(value);
  };

  const confirmText = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: !0,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn btn-danger ml-1',
      buttonsStyling: !1,
    }).then(function (t) {
      t.value &&
        Swal.fire({
          type: 'success',
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          confirmButtonClass: 'btn btn-success',
        });
    });
  };

  const columns = [
    {
      title: 'Costumer name',
      dataIndex: 'customerName',
      sorter: (a, b) => a.Date.length - b.Date.length,
    },
    {
      title: 'Date',
      dataIndex: 'salesDate',
      sorter: (a, b) => a.Name.length - b.Name.length,
    },
    {
      title: 'Reference',
      dataIndex: 'orderRef',
      sorter: (a, b) => a.Reference.length - b.Reference.length,
    },
    {
      title: 'Receipt Id',
      dataIndex: 'receiptNo',
      sorter: (a, b) => a.Reference.length - b.Reference.length,
    },
    {
      title: "Seller's name",
      dataIndex: 'salePersonName',
      sorter: (a, b) => a.Reference.length - b.Reference.length,
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
    },
    {
      title: 'Action',
      render: () => (
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
                <Link to='/sales/sales-details' className='dropdown-item'>
                  <img src={Eye1} className='me-2' alt='img' />
                  Sale Detail
                </Link>
              </li>
              <li>
                <Link to='/sales/edit-sales' className='dropdown-item'>
                  <img src={EditIcon} className='me-2' alt='img' />
                  Edit Sale
                </Link>
              </li>
              <li>
                <Link
                  to='#'
                  className='dropdown-item'
                  data-bs-toggle='modal'
                  data-bs-target='#showpayment'>
                  <img src={Dollar1} className='me-2' alt='img' />
                  Show Payments
                </Link>
              </li>
              <li>
                <Link
                  to='#'
                  className='dropdown-item'
                  data-bs-toggle='modal'
                  data-bs-target='#createpayment'>
                  <img src={plusCircle} className='me-2' alt='img' />
                  Create Payment
                </Link>
              </li>
              <li>
                <Link to='#' className='dropdown-item'>
                  <img src={Download} className='me-2' alt='img' />
                  Download pdf
                </Link>
              </li>
              <li>
                <Link
                  to='#'
                  className='dropdown-item confirm-text'
                  onClick={confirmText}>
                  <img src={delete1} className='me-2' alt='img' />
                  Delete Sale
                </Link>
              </li>
            </ul>
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <FullTable
        pageTitle='Sales List'
        pageSubTitle='Manage your Sales'
        addHref={'/sales/pos'}
        addText='POS'
        columns={columns}
        data={data}
        inputfilter={inputfilter}
        // handleSearch={search}
        togglefilter={togglefilter}>
        <div
          className={`card mb-0 ${inputfilter ? 'toggleCls' : ''}`}
          id='filter_inputs'
          style={{ display: inputfilter ? 'block' : 'none' }}>
          <div className='card-body pb-0'>
            <div className='row'>
              <div className='col-lg-3 col-sm-6 col-12'>
                <div className='form-group'>
                  <input type='text' placeholder='Enter Name' />
                </div>
              </div>
              <div className='col-lg-3 col-sm-6 col-12'>
                <div className='form-group'>
                  <input type='text' placeholder='Enter Reference No' />
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
                  <Link className='btn btn-filters ms-auto'>
                    <img src={search_whites} alt='img' />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FullTable>
    </>
  );
};

export default StockReport;
