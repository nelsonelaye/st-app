import { useState } from 'react';
import Table from '../../EntryFile/datatable';
import { Link, useHistory } from 'react-router-dom';
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
  PlusIcon,
  EditIcon,
  DeleteIcon,
} from '../../EntryFile/imagePath';
import { useGetUsers } from '../../../hooks/useGetUsers';
import { monthList } from '../../../utils/convertArray';
import { useMutate } from '../../../hooks/useMutate';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../InitialPage/Sidebar/LoadingSpinner';

const UserLists = () => {
  const history = useHistory();
  const [startDate, setStartDate] = useState(new Date());
  const [inputfilter, setInputfilter] = useState(false);
  const mutuation = useMutate();
  const { all_users, refetch } = useGetUsers();
  const togglefilter = (value) => {
    setInputfilter(value);
  };
  const handleEditNavigate = (data) => {
    history.push({
      pathname: `/users/newuseredit/${data.id}`,
      state: data,
    });
  };
  const tableData = all_users?.data;
  const handleDelete = (id) => {
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
        mutuation.mutate(
          {
            url: `/v1/ManageUsers/DeleteUser?EmailAddress=${id}`,
            method: 'DELETE',
            data: '',
          },
          {
            onSuccess(res) {
              if (res.statusCode == 200) {
                const { message } = res;
                toast.success(message);
                refetch();
              }
            },
            onError(err) {
              const error_response = err.response.data;
              const errorMsg = error_response.message;
              toast.error(errorMsg);
            },
          }
        );
    });
  };

  const columns = [
    {
      title: 'User Name',
      dataIndex: 'userName',
      sorter: (a, b) => a.userName.length - b.userName.length,
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      sorter: (a, b) => a.phoneNumber.length - b.phoneNumber.length,
    },
    {
      title: 'email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: 'Role',
      dataIndex: 'roleName',
      sorter: (a, b) => a.roleName.length - b.roleName.length,
    },
    {
      title: 'Created On',
      dataIndex: 'createdDate',
      sorter: (a, b) => a.createdDate.length - b.createdDate.length,
      render: (item) => {
        const newDate = new Date(item);
        const [month, day, year] = [
          newDate.getMonth(),
          newDate.getDate(),
          newDate.getFullYear(),
          newDate.getDay(),
        ];
        return <p>{` ${day} ${monthList[month]}, ${year} `}</p>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      render: (text) => (
        <>
          {text && <span className='badges bg-lightgreen'>Active</span>}
          {!text && <span className='badges bg-lightred'>Inactive</span>}
        </>
      ),
      sorter: (a, b) => a.isActive.length - b.isActive.length,
    },
    {
      title: 'Action',
      render: (record) => (
        <>
          <a className='me-3' onClick={() => handleEditNavigate(record)}>
            <img src={EditIcon} alt='img' />
          </a>
          <a
            className='me-3 confirm-text'
            onClick={() => handleDelete(record.email)}>
            <img src={DeleteIcon} alt='img' />
          </a>
        </>
      ),
    },
  ];

  return (
    <div className='page-wrapper'>
      <div className='content'>
        <div className='page-header'>
          <div className='page-title'>
            <h4>User List</h4>
            <h6>Manage your User</h6>
          </div>
          <div className='page-btn'>
            <Link to='/users/newuser' className='btn btn-added'>
              <img src={PlusIcon} alt='img' className='me-2' />
              Add User
            </Link>
          </div>
        </div>
        {/* /product list */}
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
                      <input type='text' placeholder='Enter User Name' />
                    </div>
                  </div>
                  <div className='col-lg-2 col-sm-6 col-12'>
                    <div className='form-group'>
                      <input type='text' placeholder='Enter Phone' />
                    </div>
                  </div>
                  <div className='col-lg-2 col-sm-6 col-12'>
                    <div className='form-group'>
                      <input type='text' placeholder='Enter Email' />
                    </div>
                  </div>
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
                    <div className='form-group'></div>
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
              {tableData ? (
                <Table columns={columns} dataSource={tableData} />
              ) : (
                <LoadingSpinner />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLists;
