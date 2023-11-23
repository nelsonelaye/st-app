import { useEffect, useState } from 'react';
import Table from '../../EntryFile/datatable';
import { Link, useHistory } from 'react-router-dom';
import Tabletop from '../../EntryFile/tabletop';
import { PlusIcon, EditIcon, DeleteIcon } from '../../EntryFile/imagePath';
import {
  useCategorySearch,
  useSubCategory,
} from '../../../hooks/useProductCategory';
import Swal from 'sweetalert2';
import { useMutate } from '../../../hooks/useMutate';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '../../InitialPage/Sidebar/LoadingSpinner';

const SubCategoryList = () => {
  const history = useHistory();
  const mutuation = useMutate();
  const { sub_categories, refetch } = useSubCategory();

  const [inputfilter, setInputfilter] = useState(false);
  const [tableData, setTabledata] = useState([]);
  const [query, setQuery] = useState(false);
  const [keyword, setKeyword] = useState('');

  const { category_type, isLoading } = useCategorySearch(
    query,
    keyword,
    setQuery
  );

  useEffect(() => {
    if (sub_categories?.data && keyword === '') {
      setTabledata(sub_categories?.data);
      setQuery(false);
    }
  }, [sub_categories, keyword]);

  useEffect(() => {
    if (keyword && category_type && query) {
      setTabledata(category_type?.data);
      // setQuery(false)
    }
  }, [keyword, query, category_type]);

  const togglefilter = (value) => {
    setInputfilter(value);
  };

  const handleSearch = () => {
    if (keyword) {
      setQuery(true);
    }
  };

  const handleNavigate = (data) => {
    history.push({
      pathname: `/product/editsubcategory-product/${data.id}`,
      state: data,
    });
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
              const errorMsg = error_response.Message;
              toast.error(errorMsg);
            },
          }
        );
    });
  };

  const columns = [
    {
      title: 'Category',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Parent Category',
      dataIndex: 'parentCategory',
      sorter: (a, b) => a.parentCategory.length - b.parentCategory.length,
    },
    {
      title: 'Category Code',
      dataIndex: 'categoryCode',
      sorter: (a, b) => a.categoryCode.length - b.categoryCode.length,
    },
    {
      title: ' Description',
      dataIndex: 'description',
    },
    {
      title: 'Action',
      render: (record) => (
        <>
          <>
            <span className='me-3' onClick={() => handleNavigate(record)}>
              <img src={EditIcon} alt='img' />
            </span>
            <Link
              className='confirm-text'
              to='#'
              onClick={() => handleDelete(record.id)}>
              <img src={DeleteIcon} alt='img' />
            </Link>
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
              <h4>Sub Category List </h4>
              <h6>View/Search product Category</h6>
            </div>
            <div className='page-btn'>
              <Link
                to='/product/addsubcategory-product'
                className='btn btn-added'>
                <img src={PlusIcon} alt='img' className='me-1' />
                Add Sub Category
              </Link>
            </div>
          </div>
          <div className='card'>
            <div className='card-body'>
              <Tabletop
                inputfilter={inputfilter}
                togglefilter={togglefilter}
                keyword={keyword}
                setKeyword={setKeyword}
                isLoading={isLoading}
                handleSearch={handleSearch}
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
export default SubCategoryList;
