/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Table } from 'antd';
import './antd.css';
import { onShowSizeChange } from '../components/pagination';
import { forwardRef } from 'react';
import { TableHeader } from './tabletop';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon } from '../EntryFile/imagePath';

const Datatable = forwardRef(({ columns, dataSource }, ref) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    // console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <Table
      ref={ref}
      // key={props}
      className='table datanew dataTable no-footer'
      rowSelection={rowSelection}
      columns={columns}
      dataSource={dataSource}
      pagination={{
        total: dataSource.length,
        showTotal: (total, range) =>
          ` ${range[0]} to ${range[1]} of ${total} items`,
        showSizeChanger: true,
        onShowSizeChange: onShowSizeChange,
      }}
      rowKey={(record) =>
        record?.id ||
        record?.storeId ||
        record?.customerId ||
        JSON.stringify(record)
      }
    />
  );
});

Datatable.displayName = 'Datatable';

export default Datatable;

export const FullTable = ({
  pageTitle,
  pageSubTitle,
  addHref,
  addText,
  columns,
  data,
  excelFilename = 'data',
  inputfilter,
  togglefilter,
  handleSearch,
  children,
}) => {
  const ref = useRef(null);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    // console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className='page-wrapper'>
      <div className='content'>
        <div className='page-header'>
          <div className='page-title'>
            <h4>{pageTitle}</h4>
            <h6>{pageSubTitle}</h6>
          </div>
          {addHref && (
            <div className='page-btn'>
              <Link to={addHref} className='btn btn-added'>
                <img src={PlusIcon} alt='img' className='me-1' />
                {addText}
              </Link>
            </div>
          )}
        </div>

        <div className='card'>
          <div className='card-body'>
            <TableHeader
              inputfilter={inputfilter}
              togglefilter={togglefilter}
              excelData={data}
              refFn={() => ref.current}
              excelFilename={excelFilename}
              handleSearch={handleSearch}
            />

            {children}

            {/* for more like pagination, add props */}
            <div className='table-responsive'>
              <Table
                ref={ref}
                columns={columns}
                dataSource={data}
                className='table datanew dataTable no-footer'
                rowSelection={rowSelection}
                pagination={{
                  total: data.length,
                  showTotal: (total, range) =>
                    ` ${range[0]} to ${range[1]} of ${total} items`,
                  showSizeChanger: true,
                  onShowSizeChange: onShowSizeChange,
                }}
                rowKey={(record) =>
                  record?.id ||
                  record?.storeId ||
                  record?.customerId ||
                  JSON.stringify(record)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
