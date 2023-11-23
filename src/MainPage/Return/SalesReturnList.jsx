import { useState } from 'react';
import Table from '../../EntryFile/datatable';
import Tabletop from '../../EntryFile/tabletop';
import { Link } from 'react-router-dom';
import {
  PlusIcon,
  MacbookIcon,
  IphoneIcon,
  EarpodIcon,
  OrangeImage,
  StawberryImage,
  AvocatImage,
  EditIcon,
  DeleteIcon,
  UnpaidGray,
} from '../../EntryFile/imagePath';
import Swal from 'sweetalert2';

const SalesReturnList = () => {
  const [inputfilter, setInputfilter] = useState(false);

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

  const [data] = useState([
    {
      id: 1,
      image: MacbookIcon,
      productName: 'Macbook Pro',
      date: '19 Nov 2022',
      customer: 'Thomas',
      status: 'Received',
      grandTotal: '550',
      paid: '122',
      due: '440',
      paymentStatus: 'Paid',
    },
    {
      id: 2,
      image: OrangeImage,
      productName: 'Orange',
      date: '19 Nov 2022',
      customer: 'Benjamin',
      status: 'Orderded',
      grandTotal: '789',
      paid: '100',
      due: '697',
      paymentStatus: 'Partial',
    },
    {
      id: 3,
      image: StawberryImage,
      productName: 'Stawberry',
      date: '20 Nov 2022',
      customer: 'James',
      status: 'Pending',
      grandTotal: '765',
      paid: '90',
      due: '77',
      paymentStatus: 'Partial',
    },
    {
      id: 4,
      image: IphoneIcon,
      productName: 'iPhone 11',
      date: '19 Nov 2022',
      customer: 'Bruklin',
      status: 'Received',
      grandTotal: '909',
      paid: '786',
      due: '600',
      paymentStatus: 'Paid',
    },
    {
      id: 5,
      image: AvocatImage,
      productName: 'Avocat',
      date: '19 Nov 2022',
      customer: 'Beverly',
      status: 'Orderded',
      grandTotal: '879',
      paid: '77',
      due: '657',
      paymentStatus: 'Partial',
    },
    {
      id: 6,
      image: EarpodIcon,
      productName: 'Apple Earpods',
      date: '19 Nov 2022',
      customer: 'Best Power Tools',
      status: 'Pending',
      grandTotal: '1887',
      paid: '890',
      due: '990',
      paymentStatus: 'Partial',
    },
    {
      id: 7,
      image: UnpaidGray,
      productName: 'Unpaired gray',
      date: '21 Nov 2022',
      customer: 'Thomas',
      status: 'Received',
      grandTotal: '980',
      paid: '887',
      due: '80',
      paymentStatus: 'Paid',
    },
  ]);

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'productName',
      render: (text, record) => (
        <div className='productimgname'>
          <Link className='product-img'>
            <img alt='' src={record.image} />
          </Link>
          <Link style={{ fontSize: '15px', marginLeft: '10px' }}>
            {record.productName}
          </Link>
        </div>
      ),
      sorter: (a, b) => a.productName.length - b.productName.length,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      sorter: (a, b) => a.date.length - b.date.length,
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      sorter: (a, b) => a.customer.length - b.customer.length,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text) => (
        <span
          className={
            text === 'Received'
              ? 'badges bg-lightgreen'
              : text == 'Pending'
              ? 'badges bg-lightred'
              : 'badges bg-lightyellow'
          }>
          {text}
        </span>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: 'Grand Total ($)',
      dataIndex: 'grandTotal',
      sorter: (a, b) => a.grandTotal.length - b.grandTotal.length,
    },
    {
      title: 'Paid ($)',
      dataIndex: 'paid',
      sorter: (a, b) => a.paid.length - b.paid.length,
    },
    {
      title: 'Due ($)',
      dataIndex: 'grandTotal',
      sorter: (a, b) => a.due.length - b.due.length,
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      render: (text) => (
        <span
          className={
            text === 'Paid'
              ? 'badges bg-lightgreen'
              : text == 'Received'
              ? 'badges bg-lightred'
              : 'badges bg-lightyellow'
          }>
          {text}
        </span>
      ),
      sorter: (a, b) => a.paymentStatus.length - b.paymentStatus.length,
    },
    {
      title: 'Action',
      render: () => (
        <>
          <Link className='me-3' to='/return/editsalesreturn-return'>
            <img src={EditIcon} alt='img' />
          </Link>
          <Link className='confirm-text' to='#' onClick={confirmText}>
            <img src={DeleteIcon} alt='img' />
          </Link>
        </>
      ),
    },
  ];
  return (
    <>
      <div className='page-wrapper'>
        <div className='content'>
          <div className='page-header'>
            <div className='page-title'>
              <h4>Sales Return List</h4>
              <h6>Manage your Returns</h6>
            </div>
            <div className='page-btn'>
              <Link
                to='/return/addsalesreturn-return'
                className='btn btn-added'>
                <img src={PlusIcon} alt='img' className='me-1' />
                Add New Sales Return
              </Link>
            </div>
          </div>
          {/* /product list */}
          <div className='card'>
            <div className='card-body'>
              <Tabletop inputfilter={inputfilter} togglefilter={togglefilter} />
              {/* /Filter */}
              <div
                className={`card mb-0 ${inputfilter ? 'toggleCls' : ''}`}
                id='filter_inputs'
                style={{ display: inputfilter ? 'block' : 'none' }}>
                <div className='card-body pb-0'>
                  <div className='row'>
                    <div className='col-lg-12 col-sm-12'>
                      {/* <div className="row">
                        <div className="col-lg col-sm-6 col-12">
                          <div className="form-group">
                            <Select2
                              className="select"
                              data={options}
                              options={{
                                placeholder: "Choose Product",
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg col-sm-6 col-12">
                          <div className="form-group">
                            <Select2
                              className="select"
                              data={options2}
                              options={{
                                placeholder: "Choose Category",
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg col-sm-6 col-12">
                          <div className="form-group">
                            <Select2
                              className="select"
                              data={options3}
                              options={{
                                placeholder: "Choose sub Category",
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg col-sm-6 col-12">
                          <div className="form-group">
                            <Select2
                              className="select"
                              data={options4}
                              options={{
                                placeholder: "Brand",
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg col-sm-6 col-12 ">
                          <div className="form-group">
                            <Select2
                              className="select"
                              data={options5}
                              options={{
                                placeholder: "Price",
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg-1 col-sm-6 col-12">
                          <div className="form-group">
                            <a className="btn btn-filters ms-auto">
                              <img src={search_whites} alt="img" />
                            </a>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              {/* /Filter */}
              <div className='table-responsive'>
                <Table columns={columns} dataSource={data} />
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
      </div>
    </>
  );
};
export default SalesReturnList;
