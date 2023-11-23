import { Link, useHistory } from 'react-router-dom';
import {
  PlusIcon,
  Search,
  Excel,
  Printer,
  Pdf,
  EditIcon,
} from '../../EntryFile/imagePath';
import Table from '../../EntryFile/datatable';
import 'react-select2-wrapper/css/select2.css';
import { useAccessLists } from '../../../hooks/useAccessList';

const GroupPermission = () => {
  const { access_lists } = useAccessLists();
  const history = useHistory();
  const tableData = access_lists?.data;
  const handleNavigate = (data) => {
    history.push({
      pathname: `/settings/editpermission/${data.id}`,
      state: data,
    });
  };

  const columns = [
    {
      title: 'Menu',
      dataIndex: 'name',
      render: (text) => <>{text}</>,
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Access ID',
      dataIndex: 'id',
      render: (text) => <div>{text}</div>,
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      render: () => (
        <>
          <span className='badges bg-lightgreen'>Active</span>
        </>
      ),
    },
    {
      title: 'Action',
      className: 'text-center',
      render: (record) => (
        <div className='text-end'>
          <a className='me-3' onClick={() => handleNavigate(record)}>
            <img src={EditIcon} alt='img' />
          </a>
        </div>
      ),
    },
  ];
  return (
    <>
      <div className='page-wrapper'>
        <div className='content'>
          <div className='page-header'>
            <div className='page-title'>
              <h4>Access Menu List</h4>
              <h6>Manage Permissions</h6>
            </div>
            <div className='page-btn'>
              <Link to='/settings/createpermission' className='btn btn-added'>
                <img src={PlusIcon} alt='img' className='me-2' />
                Add Permission
              </Link>
            </div>
          </div>
          <div className='card'>
            <div className='card-body'>
              <div className='table-top'>
                <div className='search-set'>
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
              <div className='table-responsive'>
                {tableData && (
                  <Table columns={columns} dataSource={tableData} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupPermission;
