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
import { useGetSupplierList } from '../../../hooks/useGetSupplier';
import { useMutate } from '../../../hooks/useMutate';
import { toast } from 'react-hot-toast';
import { LoadingAbsolute } from '../../components/Loading';
import { useForm } from 'react-hook-form';

const SupplierList = () => {
  const [inputfilter, setInputfilter] = useState(false);

  const { supplier_list, refetch_list, search, isFetching } =
    useGetSupplierList();
  const unfilteredData = supplier_list?.data || [];

  const mutation = useMutate();

  const deleteSupplier = (id) => {
    mutation.mutate(
      {
        url: `/v1/Supplier/Delete-Supplier?Id=${id}`,
        method: 'DELETE',
      },
      {
        onSuccess(res) {
          if (res.statusCode == 200) {
            Swal.fire({
              type: 'success',
              title: 'Deleted!',
              text: 'Your file has been deleted.',
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

  const confirmDelete = (id) => {
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
      t.value && deleteSupplier(id);
    });
  };

  const [filter, setFilter] = useState({
    code: undefined,
    name: undefined,
    phoneNumber: undefined,
    email: undefined,
  });

  const filterData = () => {
    const codeSearch = filter.code
      ? unfilteredData.filter((x) => x.customerCode === filter.code)
      : unfilteredData;

    const nameSearch = filter.name
      ? codeSearch.filter((x) => x.customerName === filter.name)
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
    (filter.name && filter.name.length > 0) ||
    (filter.phoneNumber && filter.phoneNumber.length > 0) ||
    (filter.email && filter.email.length > 0)
      ? filterData()
      : unfilteredData;

  const togglefilter = (value) => {
    !value &&
      setFilter({
        code: undefined,
        name: undefined,
        phoneNumber: undefined,
        email: undefined,
      });
    setInputfilter(value);
  };

  const columns = [
    {
      title: 'Supplier Name',
      // dataIndex: 'name',
      render: (row) => (
        <div className='productimgname align-items-center'>
          <div className=''>
            <img
              src={row.image || Noimage}
              alt='dp'
              className='rounded-circle'
              style={{ width: '40px', height: '40px' }}
            />
          </div>
          <Link to='#'>{row.name}</Link>
        </div>
      ),
      sorter: (a, b) => a.supplierName.length - b.supplierName.length,
      width: '250px',
    },
    {
      title: 'Code',
      dataIndex: 'code',
      sorter: (a, b) => a.code.length - b.code.length,
    },
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
      render: (row) => (
        <div className='d-flex gap-1'>
          <Link className='' to={`/people/editsupplier-people/${row.email}`}>
            <img src={EditIcon} alt='img' />
          </Link>
          <button
            className='confirm-text'
            to='#'
            onClick={() => confirmDelete(row.id)}>
            <img src={DeleteIcon} alt='img' />
          </button>
        </div>
      ),
    },
  ];
  return (
    <>
      {(mutation.isLoading || isFetching) && <LoadingAbsolute />}
      <FullTable
        pageTitle='Supplier List'
        addText={'Add Supplier'}
        addHref={'/people/addsupplier-people'}
        pageSubTitle='Manage your Suppliers'
        columns={columns}
        data={data}
        handleSearch={search}
        inputfilter={inputfilter}
        togglefilter={togglefilter}>
        <Filter inputfilter={inputfilter} setFilter={setFilter} />
      </FullTable>
    </>
  );
};

const Filter = ({ inputfilter, setFilter }) => {
  const {
    register,
    handleSubmit,
    reset,
    // formState: { isDirty },
  } = useForm({});

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
                placeholder='Enter Supplier Code'
                {...register('code')}
              />
            </div>
          </div>
          <div className='col-lg-2 col-sm-6 col-12'>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Enter Supplier'
                {...register('name')}
              />
            </div>
          </div>
          <div className='col-lg-2 col-sm-6 col-12'>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Enter Phone'
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
          <div className='col-lg-1 col-sm-6 col-12 ms-auto'>
            <div className='form-group'>
              <button type='submit' className='btn btn-filters ms-auto'>
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

export default SupplierList;
