/* eslint-disable react/prop-types */
import Table from '../../EntryFile/datatable';
import { Link, useHistory } from 'react-router-dom';
import { PlusIcon, EditIcon, DeleteIcon } from '../../EntryFile/imagePath';
import Swal from 'sweetalert2';
import { useBrandList, useBrandSearch } from '../../../hooks/useBrandList';
import { useMutate } from '../../../hooks/useMutate';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../../InitialPage/Sidebar/LoadingSpinner';
import Tabletop from '../../EntryFile/tabletop';

const BrandList = () => {
  const history = useHistory();
  const mutuation = useMutate();
  const [keyword, setKeyword] = useState('');
  const [tableData, setTabledata] = useState([]);
  const [query, setQuery] = useState(false);
  const [inputfilter, setInputfilter] = useState(false);

  const { brand_list, refetch } = useBrandList();
  const { brand_search, isLoading } = useBrandSearch(keyword, query);

  useEffect(() => {
    if (brand_list?.data && keyword === '') {
      setTabledata(brand_list?.data);
      setQuery(false);
    }
  }, [brand_list, keyword]);

  useEffect(() => {
    if (keyword && brand_search && query) {
      setTabledata(brand_search?.data);
      // setQuery(false)
    }
  }, [keyword, query, brand_search]);

  const handleSearch = () => {
    if (keyword) {
      setQuery(true);
    }
  };

  const togglefilter = (value) => {
    setInputfilter(value);
  };

  const handleNavigate = (data) => {
    history.push({
      pathname: `/product/editbrand-product/${data.id}`,
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
            url: `/v1/ProductBrand/Delete?Id=${id}`,
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
      title: 'Image',
      dataIndex: 'image',
      className: 'text-center',
      render: (text, record) => (
        <span className='product-img text-center'>
          <img
            alt=''
            src={record.imageUrl}
            style={{ height: '40px', width: '40px' }}
          />
        </span>
      ),
      sorter: (a, b) => a.image.length - b.image.length,
      width: '150px',
    },
    {
      title: 'Brand Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Brand Description',
      dataIndex: 'description',
      sorter: (a, b) => a.description.length - b.description.length,
    },
    {
      title: 'Action',
      render: (record) => {
        return (
          <>
            <span
              className='me-3 cursor-pointer'
              onClick={() => handleNavigate(record)}>
              <img src={EditIcon} alt='img' />
            </span>
            <Link
              className='confirm-text'
              to='#'
              onClick={() => handleDelete(record.id)}>
              <img src={DeleteIcon} alt='img' />
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className='page-wrapper'>
        <div className='content'>
          <div className='page-header'>
            <div className='page-title'>
              <h4>Brand List</h4>
              <h6>Manage your Brand</h6>
            </div>
            <div className='page-btn'>
              <Link to='/product/addbrand-product' className='btn btn-added'>
                <img src={PlusIcon} alt='img' className='me-1' />
                Add Brand
              </Link>
            </div>
          </div>
          {/* /product list */}
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
                {tableData.length >= 1 ? (
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
export default BrandList;
