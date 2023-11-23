import { useState } from 'react';
import { FullTable } from '../../EntryFile/datatable';
import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { search_whites } from '../../EntryFile/imagePath';
import { useGetOustockProducts } from '../../../hooks/useGetSale';
import { LoadingAbsolute } from '../../components/Loading';
import { dateLocale } from '../../../utils/helpers';

const OutStockProducts = () => {
  const { stocks, isLoading } = useGetOustockProducts();
  const [inputfilter, setInputfilter] = useState(false);
  const data = stocks?.data || [];
  const togglefilter = (value) => {
    setInputfilter(value);
  };

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'productName',
      sorter: (a, b) => a.Date.length - b.Date.length,
      align: 'center',
    },
    {
      title: 'Qty',
      dataIndex: 'quatityInStock',
      sorter: (a, b) => a.Name.length - b.Name.length,
      align: 'center',
    },
    {
      title: 'Last Stock Qty',
      dataIndex: 'lastStockQuantity',
      sorter: (a, b) => a.Reference.length - b.Reference.length,
      align: 'center',
    },
    {
      title: 'Total Sold Qty',
      dataIndex: 'totalSoldQuantity',
      sorter: (a, b) => a.Reference.length - b.Reference.length,
      align: 'center',
    },
    {
      title: 'Last Stock By',
      dataIndex: 'lastStockBy',
      sorter: (a, b) => a.Reference.length - b.Reference.length,
      align: 'center',
    },
    {
      title: 'Last Stock Date',
      dataIndex: 'lastStockDateTime',
      sorter: (a, b) => a.Total.length - b.Total.length,
      render: (cell) => dateLocale(cell),
      align: 'center',
    },
    {
      title: 'Store Name',
      dataIndex: 'storeName',
      sorter: (a, b) => a.Total.length - b.Total.length,
      align: 'center',
    },
  ];

  return (
    <>
      {isLoading && <LoadingAbsolute />}
      <FullTable
        pageTitle='Out Stock Products'
        pageSubTitle='Manage your Sales'
        addHref={'/sales/pos'}
        addText='POS'
        columns={columns}
        data={data}
        inputfilter={inputfilter}
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

export default OutStockProducts;
