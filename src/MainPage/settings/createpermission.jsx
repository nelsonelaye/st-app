import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import * as Yup from 'yup';

import { useAccessLists } from '../../../hooks/useAccessList';
import { useMutate } from '../../../hooks/useMutate';
import { toast } from 'react-hot-toast';

const Createpermission = () => {
  const mutuation = useMutate();
  const { access_lists, refetch_list } = useAccessLists();
  const [loading, setLoading] = useState(false);
  const allList = access_lists?.data;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Acess name is required'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    setLoading(true);
    mutuation.mutate(
      {
        url: `/v1/ManageSetUps/Add-Access-Item?itemName=${data.name}`,
        method: 'POST',
        data: '',
      },
      {
        onSuccess(res) {
          console.log(res);
          if (res.statusCode == 200) {
            const { message } = res;
            toast.success(message);
            setLoading(false);
            refetch_list();
            reset();
          }
          if(res.statusCode == 205){
            toast.error(res.message) 
            setLoading(false);
           }
        },
        onError(err) {
          setLoading(false);
          const error_response = err.response.data;
          const errorMsg = error_response.Message;
          toast.error(errorMsg);
        },
      }
    );
  };
  return (
    <div className='page-wrapper'>
      <div className='content'>
        <div className='page-header'>
          <div className='page-title'>
            <h4>Create Permission</h4>
            <h6>Manage Create Permissions</h6>
          </div>
        </div>
        <div className='card'>
          <div className='card-body'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='row item-center'>
                <div className='col-lg-3 col-sm-12'>
                  <div className='form-group'>
                    <label>Role</label>
                    <input
                      type='text'
                      {...register('name')}
                      className={` ${errors.name ? 'is-invalid' : ''}`}
                      placeholder='Enter access name'
                    />
                    <div className='invalid-feedback'>
                      {errors.name?.message}
                    </div>
                  </div>
                </div>
                <div className='col-lg-3 col-sm-12'>
                  <div className='form-group mt-4'>
                    <label className='sr-only'>button</label>
                    <button className='mt-1 btn bg-black text-white w-50'>
                      {loading ? (
                        <div
                          className='spinner-border'
                          style={{ height: '1.2rem', width: '1.2rem' }}></div>
                      ) : (
                        'Create Access'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <div className='row'>
              <div className='col-12'>
                <div className='productdetails product-respon'>
                  <ul>
                    {allList?.map(({ name, id }) => {
                      return (
                        <li key={id}>
                          <h4>{name}</h4>
                          <div className='input-checkset'>
                            <ul>
                              <li>
                                <label className='inputcheck'>
                                  View
                                  <input type='checkbox' />
                                  <span className='checkmark' />
                                </label>
                              </li>
                              <li>
                                <label className='inputcheck'>
                                  Create
                                  <input type='checkbox' />
                                  <span className='checkmark' />
                                </label>
                              </li>
                              <li>
                                <label className='inputcheck'>
                                  Edit
                                  <input type='checkbox' />
                                  <span className='checkmark' />
                                </label>
                              </li>
                              <li>
                                <label className='inputcheck'>
                                  Delete
                                  <input type='checkbox' />
                                  <span className='checkmark' />
                                </label>
                              </li>
                            </ul>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            {/* <div className="row">
              <div className="col-12">
                <div className="productdetails product-respon">
                  <ul>
                    <li>
                      <h4>Users Management</h4>
                      <div className="input-checkset">
                        <ul>
                          <li>
                            <label className="inputcheck">
                              View
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Create
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Edit
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Delete
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              View all records of all users
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Select All
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <h4>User Permission</h4>
                      <div className="input-checkset">
                        <ul>
                          <li>
                            <label className="inputcheck">
                              View
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Create
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Edit
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Delete
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Select All
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <h4>Products</h4>
                      <div className="input-checkset">
                        <ul>
                          <li>
                            <label className="inputcheck">
                              View
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Create
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Edit
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Delete
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Barcode
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Import Products
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Select All
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <h4>Adjustment</h4>
                      <div className="input-checkset">
                        <ul>
                          <li>
                            <label className="inputcheck">
                              View
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Create
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Edit
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Delete
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Select All
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <h4>Transfer</h4>
                      <div className="input-checkset">
                        <ul>
                          <li>
                            <label className="inputcheck">
                              View
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Create
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Edit
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Delete
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Select All
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <h4>Expenses</h4>
                      <div className="input-checkset">
                        <ul>
                          <li>
                            <label className="inputcheck">
                              View
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Create
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Edit
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Delete
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Select All
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <h4>Sales</h4>
                      <div className="input-checkset">
                        <ul>
                          <li>
                            <label className="inputcheck">
                              View
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Create
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Edit
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Delete
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Select All
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <h4>Purchase</h4>
                      <div className="input-checkset">
                        <ul>
                          <li>
                            <label className="inputcheck">
                              View
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Create
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Edit
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Delete
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Select All
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <h4>Quotations</h4>
                      <div className="input-checkset">
                        <ul>
                          <li>
                            <label className="inputcheck">
                              View
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Create
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Edit
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Delete
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Select All
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <h4>Sales Return</h4>
                      <div className="input-checkset">
                        <ul>
                          <li>
                            <label className="inputcheck">
                              View
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Create
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Edit
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Delete
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Select All
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <h4>Purchase Return</h4>
                      <div className="input-checkset">
                        <ul>
                          <li>
                            <label className="inputcheck">
                              View
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Create
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Edit
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Delete
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Select All
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <h4>Payment Sales</h4>
                      <div className="input-checkset">
                        <ul>
                          <li>
                            <label className="inputcheck">
                              View
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Create
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Edit
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Delete
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Select All
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <h4>Payments purchase</h4>
                      <div className="input-checkset">
                        <ul>
                          <li>
                            <label className="inputcheck">
                              View
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Create
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Edit
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Delete
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Select All
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <h4>Payments Return</h4>
                      <div className="input-checkset">
                        <ul>
                          <li>
                            <label className="inputcheck">
                              View
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Create
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Edit
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Delete
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Select All
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <h4>Customer list</h4>
                      <div className="input-checkset">
                        <ul>
                          <li>
                            <label className="inputcheck">
                              View
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Create
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Edit
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Delete
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Select All
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <h4>Supplier List</h4>
                      <div className="input-checkset">
                        <ul>
                          <li>
                            <label className="inputcheck">
                              View
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Create
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Edit
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Delete
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Select All
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <h4>Reports</h4>
                      <div className="input-checkset">
                        <ul>
                          <li>
                            <label className="inputcheck">
                              View
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Create
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Edit
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Delete
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="inputcheck">
                              Select All
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        {/* /product list */}
      </div>
    </div>
  );
};

export default Createpermission;
