import { useState } from 'react';
import { FullTable } from '../../EntryFile/datatable';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { search_whites, EditIcon, DeleteIcon } from '../../EntryFile/imagePath';
import { useGetCategories } from '../../../hooks/useGetExpense';
import { useMutate } from '../../../hooks/useMutate';
import { toast } from 'react-hot-toast';
import { limitText } from '../../../utils/helpers';

const ExpenseCategory = () => {
  const { categories, refetch } = useGetCategories();

  const data = categories?.data || [];

  const [inputfilter, setInputfilter] = useState(false);

  const mutation = useMutate();

  const deleteExpense = (id) => {
    mutation.mutate(
      {
        url: `/v1/Expenses/DeleteCategory/${id}`,
        method: 'DELETE',
      },
      {
        onSuccess(res) {
          if (res.statusCode == 200) {
            Swal.fire({
              type: 'success',
              title: 'Deleted!',
              text: 'Category deleted.',
              confirmButtonClass: 'btn btn-success',
            });
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
    }).then(({ isConfirmed }) => {
      if (isConfirmed) deleteExpense(id);
    });
  };

  const togglefilter = (value) => {
    setInputfilter(value);
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'createdDate',
      sorter: (a, b) => a.date.length - b.date.length,
      render: (cell) => new Date(cell).toLocaleDateString(),
      align: 'center',
    },

    {
      title: 'Category Name',
      dataIndex: 'categoryName',
      sorter: (a, b) => a.categoryName.length - b.categoryName.length,
      align: 'center',
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      sorter: (a, b) => a.reference.length - b.reference.length,
      align: 'center',
      render: (cell) => limitText(cell, 20),
    },
    {
      title: 'Amount',
      dataIndex: 'initialAmount',
      sorter: (a, b) => a.amount.length - b.amount.length,
      align: 'center',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      sorter: (a, b) => a.description.length - b.description.length,
      align: 'center',
    },
    {
      title: 'Action',
      align: 'center',
      render: (cell) => (
        <>
          <Link className='me-3' to={`/expense/editcategory/${cell?.id}`}>
            <img src={EditIcon} alt='img' />
          </Link>
          <button
            className='confirm-text'
            to='#'
            onClick={() => confirmDelete(cell?.id)}>
            <img src={DeleteIcon} alt='img' />
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      <FullTable
        pageTitle='Expense Category'
        pageSubTitle='Manage Expenses Category'
        addHref='/expense/addcategory'
        addText='Add Expenses Category'
        inputfilter={inputfilter}
        togglefilter={togglefilter}
        columns={columns}
        data={data}>
        <div
          className={`card mb-0 ${inputfilter ? 'toggleCls' : ''}`}
          id='filter_inputs'
          style={{ display: inputfilter ? 'block' : 'none' }}>
          <div className='card-body pb-0'>
            <div className='row'>
              <div className='col-lg-12 col-sm-12'>
                <div className='row'>
                  <div className='col-lg col-sm-6 col-12'>
                    <div className='form-group'>
                      {/* <Select2
                              className="select"
                              data={options}
                              options={{
                                placeholder: "Choose Product",
                              }}
                            /> */}
                    </div>
                  </div>
                  <div className='col-lg col-sm-6 col-12'>
                    <div className='form-group'>
                      {/* <Select2
                              className="select"
                              data={options2}
                              options={{
                                placeholder: "Choose Category",
                              }}
                            /> */}
                    </div>
                  </div>
                  <div className='col-lg col-sm-6 col-12'>
                    <div className='form-group'>
                      {/* <Select2
                              className="select"
                              data={options3}
                              options={{
                                placeholder: "Choose Sub Category",
                              }}
                            /> */}
                    </div>
                  </div>
                  <div className='col-lg col-sm-6 col-12'>
                    <div className='form-group'>
                      {/* <Select2
                              className="select"
                              data={options4}
                              options={{
                                placeholder: "Brand",
                              }}
                            /> */}
                    </div>
                  </div>
                  <div className='col-lg col-sm-6 col-12 '>
                    <div className='form-group'>
                      {/* <Select2
                              className="select"
                              data={options5}
                              options={{
                                placeholder: "Price",
                              }}
                            /> */}
                    </div>
                  </div>
                  <div className='col-lg-1 col-sm-6 col-12'>
                    <div className='form-group'>
                      <a className='btn btn-filters ms-auto'>
                        <img src={search_whites} alt='img' />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FullTable>
    </>
  );
};
export default ExpenseCategory;
