import { useState } from 'react';
import Table from '../../EntryFile/datatable';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  ClosesIcon,
  Excel,
  Filter,
  Pdf,
  Calendar,
  Printer,
  search_whites,
  Search,
} from '../../EntryFile/imagePath';

const Costumer = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [startDate1, setStartDate1] = useState(new Date());
  const [inputfilter, setInputfilter] = useState(false);

  const togglefilter = (value) => {
    setInputfilter(value);
  };
  const data = [];

  const columns = [
    {
      title: 'Reference',
      dataIndex: 'Reference',
      sorter: (a, b) => a.Reference.length - b.Reference.length,
    },
    {
      title: 'Supplier name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Amount',
      dataIndex: 'Amount',
      sorter: (a, b) => a.Amount.length - b.Amount.length,
    },
    {
      title: 'Paid',
      dataIndex: 'Paid',
      sorter: (a, b) => a.Paid.length - b.Paid.length,
    },
    {
      title: '	Amount due',
      dataIndex: 'due',
      sorter: (a, b) => a.due.length - b.due.length,
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      render: (text) => (
        <>
          <span className='badges bg-lightgreen'>{text}</span>
        </>
      ),
      sorter: (a, b) => a.Status.length - b.Status.length,
    },
    {
      title: 'Payment Status',
      dataIndex: 'Payment',
      render: (text) => (
        <>
          {text === 'Paid' && (
            <span className='badges bg-lightgreen'>{text}</span>
          )}
          {text === 'Unpaid' && (
            <span className='badges bg-lightgrey'>{text}</span>
          )}
          {text === 'Overdue' && (
            <span className='badges bg-lightred'>{text}</span>
          )}
        </>
      ),
      sorter: (a, b) => a.Payment.length - b.Payment.length,
    },
  ];

  const noData = true;

  return (
    <div className='page-wrapper'>
      <div className='content'>
        <div className='page-header'>
          <div className='page-title'>
            <h4>Customer Report</h4>
            <h6>Manage your Customer Report</h6>
          </div>
        </div>
        {/* /product list */}
        {noData ? (
          <div className='no-data-screen'>
            <p>Not enough usage in the last 30 days. </p>

            <Link className='no-data-link' to={'/people/customerlist-people'}>
              View Customers
            </Link>
          </div>
        ) : (
          <div className='card'>
            <div className='card-body'>
              <div className='table-top'>
                <div className='search-set'>
                  <div className='search-path'>
                    <a
                      className={` btn ${
                        inputfilter ? 'btn-filter setclose' : 'btn-filter'
                      } `}
                      id='filter_search'
                      onClick={() => togglefilter(!inputfilter)}>
                      <img src={Filter} alt='img' />
                      <span>
                        <img src={ClosesIcon} alt='img' />
                      </span>
                    </a>
                  </div>
                  <div className='search-input'>
                    <input
                      className='form-control form-control-sm search-icon'
                      type='text'
                      placeholder='Search...'
                    />
                    <a className='btn btn-searchset'>
                      <img src={Search} alt='img' />
                    </a>
                  </div>
                </div>
                <div className='wordset'>
                  <ul>
                    <li>
                      <a
                        data-bs-toggle='tooltip'
                        data-bs-placement='top'
                        title='pdf'>
                        <img src={Pdf} alt='img' />
                      </a>
                    </li>
                    <li>
                      <a
                        data-bs-toggle='tooltip'
                        data-bs-placement='top'
                        title='excel'>
                        <img src={Excel} alt='img' />
                      </a>
                    </li>
                    <li>
                      <a
                        data-bs-toggle='tooltip'
                        data-bs-placement='top'
                        title='print'>
                        <img src={Printer} alt='img' />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* /Filter */}
              <div
                className={`card mb-0 ${inputfilter ? 'toggleCls' : ''}`}
                id='filter_inputs'
                style={{ display: inputfilter ? 'block' : 'none' }}>
                <div className='card-body pb-0'>
                  <div className='row'>
                    <div className='col-lg-2 col-sm-6 col-12'>
                      <div className='form-group'>
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
                    <div className='col-lg-2 col-sm-6 col-12'>
                      <div className='form-group'>
                        <div className='input-groupicon'>
                          <DatePicker
                            selected={startDate1}
                            onChange={(date) => setStartDate1(date)}
                          />
                          <div className='addonset'>
                            <img src={Calendar} alt='img' />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-1 col-sm-6 col-12 ms-auto'>
                      <div className='form-group'>
                        <a className='btn btn-filters ms-auto'>
                          <img src={search_whites} alt='img' />
                        </a>
                      </div>
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
        )}
        {/* /product list */}
      </div>
    </div>
  );
};

export default Costumer;
