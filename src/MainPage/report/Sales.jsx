import { useState } from 'react';
import { FullTable } from '../../EntryFile/datatable';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar, search_whites } from '../../EntryFile/imagePath';

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
      title: 'Product Name',
      dataIndex: 'Name',
      render: (text, record) => (
        <div className='productimgname'>
          <Link to='#' className='product-img'>
            <img src={record.image} alt='product' />
          </Link>
          <Link to='#'>{text}</Link>
        </div>
      ),
      sorter: (a, b) => a.Name.length - b.Name.length,
    },
    {
      title: 'SKU',
      dataIndex: 'Sku',
      sorter: (a, b) => a.Sku.length - b.Sku.length,
    },
    {
      title: 'Category',
      dataIndex: 'Category',
      sorter: (a, b) => a.Category.length - b.Category.length,
    },
    {
      title: 'Brand',
      dataIndex: 'Brand',
      sorter: (a, b) => a.Brand.length - b.Brand.length,
    },
    {
      title: 'Sold Amount',
      dataIndex: 'Price',
      sorter: (a, b) => a.Price.length - b.Price.length,
    },
    {
      title: 'Sold QTY',
      dataIndex: 'Unit',
      sorter: (a, b) => a.Unit.length - b.Unit.length,
    },
    {
      title: 'Instock QTY',
      dataIndex: 'Instock',
      sorter: (a, b) => a.Instock.length - b.Instock.length,
    },
  ];

  const noData = true;

  return (
    <>
      {noData ? (
        <div className='page-wrapper'>
          <div className='content'>
            <div className='page-header'>
              <div className='page-title'>
                <h4>Sales Report</h4>
                <h6>Manage your Sales Report</h6>
              </div>
            </div>

            <div className='no-data-screen'>
              <p>Not enough usage in the last 30 days. </p>

              <Link className='no-data-link' to={'/sales/history'}>
                View Sales
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <FullTable
          pageTitle='Sales Report'
          pageSubTitle='Manage your Sales Report'
          data={data}
          columns={columns}
          inputfilter={inputfilter}
          togglefilter={togglefilter}>
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
        </FullTable>
      )}
    </>
  );
};

export default Sales;
