import { useState, useEffect } from 'react';
import Table from '../../EntryFile/datatable';
import { Link, useHistory } from 'react-router-dom';
import Tabletop from '../../EntryFile/tabletop';
import { PlusIcon, EditIcon, DeleteIcon } from '../../EntryFile/imagePath';
import Swal from 'sweetalert2';
import {
  useCategorySearch,
  useMainCategory,
} from '../../../hooks/useProductCategory';
import { toast } from 'react-hot-toast';
import { useMutate } from '../../../hooks/useMutate';
import LoadingSpinner from '../../InitialPage/Sidebar/LoadingSpinner';

const CategoryList = () => {
  const history = useHistory();
  const mutuation = useMutate();
  const [keyword, setKeyword] = useState('');
  const [inputfilter, setInputfilter] = useState(false);
  const [tableData, setTabledata] = useState([]);
  const [query, setQuery] = useState(false);

  const { main_categories, refetch } = useMainCategory();
  const { category_type, isLoading } = useCategorySearch(
    query,
    keyword,
    setQuery
  );

  useEffect(() => {
    if (main_categories?.data && keyword === '') {
      setTabledata(main_categories?.data);
      setQuery(false);
    }
  }, [main_categories, keyword]);

  useEffect(() => {
    if (keyword && category_type && query) {
      setTabledata(category_type?.data);
      // setQuery(false)
    }
  }, [keyword, query, category_type]);

  const togglefilter = (value) => {
    setInputfilter(value);
  };

  const handleNavigate = (data) => {
    history.push({
      pathname: `/product/editcategory-product/${data.id}`,
      state: data,
    });
  };

  const handleSearch = () => {
    if (keyword) {
      setQuery(true);
    }
  };

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
            url: `/v1/ProductCategory/Delete?Id=${id}`,
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
      title: 'Category Name',
      dataIndex: 'name',
      render: (text) => (
        <div className='productimgname'>
          <Link to='#' style={{ fontSize: '15px', marginLeft: '10px' }}>
            {text}
          </Link>
        </div>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Category Type',
      dataIndex: 'categoryType',
      sorter: (a, b) => a.categoryType.length - b.categoryType.length,
    },
    {
      title: ' Description',
      dataIndex: 'description',
      render: () => (
        <>
          <p>Main category</p>
        </>
      ),
    },
    // {
    //   title: 'Created At',
    //   dataIndex: 'createdDate',
    //   render: (item) => {
    //     const newDate = new Date(item);
    //     const [month, day, year] = [
    //       newDate.getMonth(),
    //       newDate.getDate(),
    //       newDate.getFullYear(),
    //       newDate.getDay(),
    //     ];
    //     return <p>{` ${day} ${monthList[month]}, ${year} `}</p>;
    //   },
    //   sorter: (a, b) => a.createdDate.length - b.createdDate.length,
    // },
    {
      title: 'Action',
      render: (record) => (
        <>
          <>
            <span className='me-3' onClick={() => handleNavigate(record)}>
              <img src={EditIcon} alt='img' />
            </span>
            <a className='confirm-text' onClick={() => handleDelete(record.id)}>
              <img src={DeleteIcon} alt='img' />
            </a>
          </>
        </>
      ),
    },
  ];

  return (
    <>
      <div className='page-wrapper'>
        <div className='content'>
          <div className='page-header'>
            <div className='page-title'>
              <h4>Product Category List </h4>
              <h6>View/Search product Category</h6>
            </div>
            <div className='page-btn'>
              <Link to='/product/addcategory-product' className='btn btn-added'>
                <img src={PlusIcon} alt='img' className='me-1' />
                Add Category
              </Link>
            </div>
          </div>
          <div className='card'>
            <div className='card-body'>
              <Tabletop
                inputfilter={inputfilter}
                togglefilter={togglefilter}
                setKeyword={setKeyword}
                keyword={keyword}
                handleSearch={handleSearch}
                isLoading={isLoading}
              />
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
    </>
  );
};
export default CategoryList;
