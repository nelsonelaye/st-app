import { useState } from 'react';
import Table from '../../EntryFile/datatable';
import { Link } from 'react-router-dom';
import {
  search_whites,
  EditIcon,
  DeleteIcon,
  Calendar,
  PlusIcon,
} from '../../EntryFile/imagePath';
import { useGetInventoryList } from '../../../hooks/useGetInventory';
import swal from 'sweetalert2';
import { toast } from 'react-hot-toast';
import { useMutate } from '../../../hooks/useMutate';
import { LoadingAbsolute } from '../../components/Loading';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TableHeader } from '../../EntryFile/tabletop';
import { useRef } from 'react';
import { onShowSizeChange } from '../../components/pagination';
import Select from '../../components/Select';
import { formatCurrency } from '../../../utils/helpers';

const emptyFilterState = {
  purchaseDate: undefined,
  receiptNo: undefined,
  referenceId: undefined,
  supplierName: undefined,
};

const InventoryList = () => {
  const {
    inventory_list,
    search,
    refetch_list,
    isFetching,
    status,
    setStatus,
  } = useGetInventoryList();

  const unfilteredData = inventory_list?.data || [];

  const [inputfilter, setInputfilter] = useState(false);

  const [filter, setFilter] = useState(emptyFilterState);

  const filterData = () => {
    const nameSearch = filter.supplierName
      ? unfilteredData.filter((x) => x.supplierName === filter.supplierName)
      : unfilteredData;

    const referenceSearch = filter.referenceId
      ? nameSearch.filter((x) => x.referenceId === filter.referenceId)
      : nameSearch;

    const receiptSearch = filter.receiptNo
      ? nameSearch.filter((x) => x.receiptNo === filter.receiptNo)
      : referenceSearch;

    const purchaseDateSearch = filter.purchaseDate
      ? receiptSearch.filter(
          (x) =>
            new Date(x.purchaseDate).toDateString() ===
            new Date(filter.purchaseDate).toDateString()
        )
      : receiptSearch;

    return purchaseDateSearch;
  };

  const data =
    (filter.supplierName && filter.supplierName.length > 0) ||
    (filter.referenceId && filter.referenceId.length > 0) ||
    (filter.receiptNo && filter.receiptNo.length > 0) ||
    filter.purchaseDate
      ? filterData()
      : unfilteredData;

  const togglefilter = (value) => {
    !value && setFilter(emptyFilterState);
    setInputfilter(value);
  };

  // console.log(inventory_list);

  const mutation = useMutate();

  const deleteInventory = (id) => {
    mutation.mutate(
      {
        url: `/v1/Inventory/Delete?Id=${id}`,
        method: 'DELETE',
      },
      {
        onSuccess(res) {
          if (res.statusCode == 200) {
            swal.fire({
              type: 'success',
              title: 'Deleted!',
              text: res?.message,
              confirmButtonClass: 'btn btn-success',
            });
            refetch_list();
          }
        },
        onError(err) {
          const error_response = err.response.data;
          const errorMsg = error_response.Message;
          toast.error(errorMsg);
        },
      }
    );
  };

  const confirmDelete = async (id) => {
    const { value } = await swal.fire({
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
    });
    if (value) deleteInventory(id);
  };

  const columns = [
    {
      title: 'Supplier Name',
      dataIndex: 'supplierName',
      sorter: (a, b) => a.supplierName.length - b.supplierName.length,
      align: 'center',
    },
    {
      title: 'Reference',
      dataIndex: 'referenceId',
      sorter: (a, b) => a.reference.length - b.reference.length,
      align: 'center',
    },
    {
      title: 'Date',
      dataIndex: 'createDate',
      sorter: (a, b) => a.date.length - b.date.length,
      render: (text) => (
        <>
          {new Date(text).toLocaleString('en', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </>
      ),
      align: 'center',
    },
    {
      title: 'ReceiptNo',
      dataIndex: 'receiptNo',
      sorter: (a, b) => a.due.length - b.due.length,
      align: 'center',
    },
    {
      title: 'Grand Total',
      dataIndex: 'grandTotalAmount',
      sorter: (a, b) => a.grandTotal.length - b.grandTotal.length,
      align: 'center',
      render: (text) => <>{formatCurrency(text)}</>,
    },
    // {
    //   title: 'Paid',
    //   dataIndex: 'paid',
    //   sorter: (a, b) => a.paid.length - b.paid.length,
    // },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      align: 'center',
      render: (text) => (
        <span
          className={
            text === 'Paid'
              ? 'badges bg-lightgreen'
              : text == 'Unpaid'
              ? 'badges bg-lightred'
              : 'badges bg-lightyellow'
          }>
          {text}
        </span>
      ),
      sorter: (a, b) => a.paymentStatus.length - b.paymentStatus.length,
    },
    {
      title: 'Actions',
      dataIndex: 'receiptNo',
      align: 'center',
      render: (receiptNo, record) => (
        <div className='d-flex align-items-center justify-content-center gap-2'>
          <Link
            className={
              record?.status === 'Approved'
                ? 'btn btn-submit py-1 px-1 text-white'
                : ' me-3'
            }
            to={
              record?.status === 'Approved'
                ? `/inventory/previewinventory/${receiptNo}`
                : `/inventory/editinventory/${receiptNo}`
            }>
            {record?.status === 'Approved' ? (
              'View'
            ) : (
              <img src={EditIcon} alt='img' />
            )}
          </Link>
          {record?.status !== 'Approved' && (
            <>
              <Link
                to={`/inventory/previewinventory/${receiptNo}`}
                className='btn btn-submit py-1 text-white'>
                View
              </Link>
              <button
                onClick={() => confirmDelete(record.id)}
                className='confirm-text'
                to=''>
                <img src={DeleteIcon} alt='img' />
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  const printRef = useRef(null);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    // console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const selectOptions = [
    { label: 'All Inventories', value: 'all' },
    {
      label: 'Pending Inventories',
      value: 'pending',
    },
    {
      label: 'Approved Inventories',
      value: 'approved',
    },
  ];

  return (
    <>
      {(mutation.isLoading || isFetching) && <LoadingAbsolute />}

      <div className='page-wrapper'>
        <div className='content'>
          <div className='page-header'>
            <div className='page-title'>
              <h4>Inventory List</h4>
              <h6>Manage your Inventory</h6>
            </div>
            <div className='page-btn'>
              <Link to={'/inventory/addinventory'} className='btn btn-added'>
                <img src={PlusIcon} alt='img' className='me-1' />
                Add New Inventory
              </Link>
            </div>
          </div>

          <div className='card'>
            <div className='card-body'>
              <TableHeader
                inputfilter={inputfilter}
                togglefilter={togglefilter}
                excelData={data}
                refFn={() => printRef.current}
                excelFilename='inventory'
                handleSearch={search}>
                <Select
                  value={selectOptions.find((x) => x.value === status)}
                  onChange={(e) => setStatus(e.value)}
                  options={selectOptions}
                />
              </TableHeader>
              <Filter inputfilter={inputfilter} setFilter={setFilter} />
              <div className='table-responsive'>
                <Table
                  ref={printRef}
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
    </>
  );
};

const Filter = ({ inputfilter, setFilter }) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    // formState: { isDirty },
  } = useForm({});

  return (
    <div
      className={`card mb-0 ${inputfilter ? 'toggleCls' : ''}`}
      id='filter_inputs'
      style={{ display: inputfilter ? 'block' : 'none' }}>
      <form
        onSubmit={handleSubmit((values) => setFilter(values))}
        className='card-body pb-0'>
        <div className='row'>
          <div className='col-lg-12 col-sm-12'>
            <div className='row'>
              <div className='col-lg col-sm-6 col-12'>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Enter Supplier Name'
                    {...register('supplierName')}
                  />
                </div>
              </div>

              <div className='col-lg col-sm-6 col-12'>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Enter Reference'
                    {...register('referenceId')}
                  />
                </div>
              </div>

              <div className='col-lg col-sm-6 col-12'>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Enter Receipt Number'
                    {...register('receiptNo')}
                  />
                </div>
              </div>

              <div className='col-lg col-sm-6 col-12'>
                <div className='form-group'>
                  <div className='input-groupicon'>
                    <Controller
                      name='purchaseDate'
                      control={control}
                      render={({ field: { onChange, ref, value } }) => (
                        <DatePicker
                          ref={ref}
                          selected={value}
                          onChange={onChange}
                          placeholderText='Enter Purchase Date'
                        />
                      )}
                    />
                    <div className='addonset'>
                      <img src={Calendar} alt='img' />
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-lg-1 col-sm-6 col-12'>
                <div className='form-group'>
                  <button type='submit' className='btn btn-filters ms-auto'>
                    <img src={search_whites} alt='img' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row text-center'>
          <button
            type='button'
            className='text-orange-500'
            style={{ color: 'orange', marginBottom: '10px' }}
            onClick={() => {
              reset();
              setFilter(emptyFilterState);
            }}>
            Clear Filter
          </button>
        </div>
      </form>
    </div>
  );
};

export default InventoryList;
