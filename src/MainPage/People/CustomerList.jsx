import { useState } from 'react';
import { FullTable } from '../../EntryFile/datatable';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  Noimage,
  search_whites,
  EditIcon,
  DeleteIcon,
} from '../../EntryFile/imagePath';
import { useGetAllCustomers } from '../../../hooks/useGetCustomer';
import { useMutate } from '../../../hooks/useMutate';
import { toast } from 'react-hot-toast';
import { LoadingAbsolute } from '../../components/Loading';
import { useForm } from 'react-hook-form';

const CustomerList = () => {
  const [inputfilter, setInputfilter] = useState(false);

  const { customers_list, refetch_list, search, isFetching } =
    useGetAllCustomers();

  const mutation = useMutate();

  const deleteCustomer = (id) => {
    mutation.mutate(
      {
        url: `/v1/Customers/Delete-Customer?Id=${id}`,
        method: 'DELETE',
      },
      {
        onSuccess(res) {
          if (res.statusCode == 200) {
            Swal.fire({
              type: 'success',
              title: 'Deleted!',
              text: res?.message,
              confirmButtonClass: 'btn btn-success',
            });
            refetch_list();
          } else {
            toast.error(res.message);
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
    const { isConfirmed } = await Swal.fire({
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
    if (isConfirmed) deleteCustomer(id);
  };

  const togglefilter = (value) => {
    !value &&
      setFilter({
        code: undefined,
        customerName: undefined,
        phoneNumber: undefined,
        email: undefined,
      });
    setInputfilter(value);
  };

  const unfilteredData = customers_list?.data || [];

  const [filter, setFilter] = useState({
    code: undefined,
    customerName: undefined,
    phoneNumber: undefined,
    email: undefined,
  });

  const filterData = () => {
    const codeSearch = filter.code
      ? unfilteredData.filter((x) => x.customerCode === filter.code)
      : unfilteredData;

    const nameSearch = filter.customerName
      ? codeSearch.filter((x) => x.customerName === filter.customerName)
      : codeSearch;

    const phoneSearch = filter.phoneNumber
      ? nameSearch.filter((x) => x.phoneNumber === filter.phoneNumber)
      : nameSearch;

    const emailSearch = filter.email
      ? phoneSearch.filter((x) => x.email === filter.email)
      : phoneSearch;

    return emailSearch;
  };

  const data =
    (filter.code && filter.code.length > 0) ||
    (filter.customerName && filter.customerName.length > 0) ||
    (filter.phoneNumber && filter.phoneNumber.length > 0) ||
    (filter.email && filter.email.length > 0)
      ? filterData()
      : unfilteredData;

  const columns = [
    {
      title: 'Customer Name',
      dataIndex: 'productName',
      render: (text, record) => (
        <div className='productimgname'>
          <img
            src={record.image || Noimage}
            alt='dp'
            className='rounded-circle'
            style={{ width: '30px', height: '30px' }}
          />
          <p
            style={{
              fontSize: '15px',
              marginLeft: '2px',
              whiteSpace: 'nowrap',
            }}>
            {record.customerName}
          </p>
        </div>
      ),
      sorter: (a, b) => a.customerName.length - b.customerName.length,
    },
    {
      title: 'Code',
      dataIndex: 'customerCode',
      sorter: (a, b) => a.customerCode.length - b.customerCode.length,
    },
    // {
    //   title: 'Customer',
    //   dataIndex: 'customer',
    //   sorter: (a, b) => a.customer.length - b.customer.length,
    // },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      sorter: (a, b) => a.phoneNumber.length - b.phoneNumber.length,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: 'Country',
      dataIndex: 'country',
      sorter: (a, b) => a.country.length - b.country.length,
    },
    {
      title: 'Action',
      render: (a) => (
        <>
          <Link
            className='me-3'
            to={`/people/editcustomer-people/${a.customerID}`}>
            <img src={EditIcon} alt='img' />
          </Link>
          <button className='confirm-text ' onClick={() => confirmDelete(a.id)}>
            <img src={DeleteIcon} alt='img' />
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      {(mutation.isLoading || isFetching) && <LoadingAbsolute />}
      {/* /product list */}
      <FullTable
        pageTitle='Customer List'
        pageSubTitle='Manage your Customers'
        addHref={'/people/addcustomer-people'}
        addText='Add Customer'
        columns={columns}
        data={data}
        inputfilter={inputfilter}
        handleSearch={search}
        togglefilter={togglefilter}>
        <Filter inputfilter={inputfilter} setFilter={setFilter} />
      </FullTable>
      {/* /product list */}
    </>
  );
};

const Filter = ({ inputfilter, setFilter }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({});

  // const triggerSearch = (values) => {
  //   setFilter({
  //     code: values.code,
  //     customerName: values.customerName,
  //     phoneNumber: values.phoneNumber,
  //     email: values.email,
  //   });
  // };

  return (
    <div
      className={`card mb-0 ${inputfilter ? 'toggleCls' : ''}`}
      id='filter_inputs'
      style={{ display: inputfilter ? 'block' : 'none' }}>
      <div className='card-body pb-0'>
        <form
          onSubmit={handleSubmit((values) => setFilter(values))}
          className='row'>
          <div className='col-lg-2 col-sm-6 col-12'>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Enter Customer Code'
                {...register('code')}
              />
            </div>
          </div>
          <div className='col-lg-2 col-sm-6 col-12'>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Enter Customer Name'
                {...register('customerName')}
              />
            </div>
          </div>
          <div className='col-lg-2 col-sm-6 col-12'>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Enter Phone Number'
                {...register('phoneNumber')}
              />
            </div>
          </div>
          <div className='col-lg-2 col-sm-6 col-12'>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Enter Email'
                {...register('email')}
              />
            </div>
          </div>
          <div className='col-lg-1 col-sm-6 col-12  ms-auto'>
            <div className='form-group'>
              <button
                disabled={!isDirty}
                type='submit'
                className='btn btn-filters ms-auto'>
                <img src={search_whites} alt='img' />
              </button>
            </div>
          </div>
          <div className='row text-center'>
            <button
              className='text-orange-500'
              style={{ color: 'orange', marginBottom: '10px' }}
              onClick={() => {
                reset();
                setFilter({
                  code: undefined,
                  customerName: undefined,
                  phoneNumber: undefined,
                  email: undefined,
                });
              }}>
              Clear Filter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerList;
