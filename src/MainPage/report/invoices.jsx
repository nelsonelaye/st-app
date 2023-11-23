import { useState } from 'react';
import Table from '../../EntryFile/datatable';
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

const Sales = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [startDate1, setStartDate1] = useState(new Date());
  const [inputfilter, setInputfilter] = useState(false);

  const togglefilter = (value) => {
    setInputfilter(value);
  };
  const data = [];

  const columns = [
    {
      title: 'Invoice number',
      dataIndex: 'number',
      sorter: (a, b) => a.Sku.length - b.Sku.length,
    },
    {
      title: 'Customer name',
      dataIndex: 'name',
      sorter: (a, b) => a.Category.length - b.Category.length,
    },
    {
      title: 'Due date',
      dataIndex: 'date',
      sorter: (a, b) => a.Brand.length - b.Brand.length,
    },
    {
      title: 'Amount',
      dataIndex: 'Amount',
      sorter: (a, b) => a.Price.length - b.Price.length,
    },
    {
      title: 'Paid',
      dataIndex: 'Paid',
      sorter: (a, b) => a.Unit.length - b.Unit.length,
    },
    {
      title: 'Amount due',
      dataIndex: 'due',
      sorter: (a, b) => a.Instock.length - b.Instock.length,
    },
    {
      title: 'Status',
      dataIndex: 'Status',
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
      sorter: (a, b) => a.Name.length - b.Name.length,
    },
  ];

  const noData = true;

  return (
    <div className='page-wrapper'>
      <div className='content'>
        <div className='page-header'>
          <div className='page-title'>
            <h4>Invoices Report</h4>
            <h6>Manage your Invoices Report</h6>
          </div>
        </div>
        {/* /product list */}
        {noData ? (
          <div className='no-data-screen'>
            <p>Not enough usage in the last 30 days. </p>

            {/* <Link className='no-data-link' to={'/sales/history'}>
              View Sales
            </Link> */}
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

export default Sales;
