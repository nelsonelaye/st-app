import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useMutate } from '../../../hooks/useMutate';
import { toast } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import { useGetRoles } from '../../../hooks/useRoleList';
import { useState } from 'react';

const AddRole = () => {
  const mutation = useMutate();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const { all_roles } = useGetRoles();
  const data = all_roles?.data;
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
  });

  const goBack = () => {
    history.push({
      pathname: '/users/userlists',
    });
  };
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
    mutation.mutate(
      {
        url: `/v1/ManageUsers/Create-r?param=${data.name}`,
        method: 'POST',
        data: '',
      },
      {
        onSuccess(res) {
          if (res.statusCode == 200) {
            const { message } = res;
            toast.success(message);
            setLoading(false);
            reset();
          }
        },
        onError(err) {
          setLoading(false);
          const error_response = err.response.data;
          const errorMsg = error_response.message;
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
            <h4>User Management</h4>
            <h6>Add/Update Role</h6>
          </div>
        </div>
        {/* /add */}
        <div className='card'>
          <div className='card-body'>
            <div className='row'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row'>
                  <div className='col-lg-3 col-sm-6 col-12'>
                    <div className='form-group'>
                      <label>Role Name</label>
                      <div className='form-addon'>
                        <input
                          type='text'
                          {...register('name')}
                          placeholder='Enter Role name'
                          className={` ${errors.email ? 'is-invalid' : ''}`}
                        />
                        <div className='invalid-feedback'>
                          {errors.email?.message}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-12'>
                    <button className='btn btn-submit me-2'>
                      {loading ? (
                        <div
                          className='spinner-border'
                          style={{ height: '1.2rem', width: '1.2rem' }}></div>
                      ) : (
                        'Submit'
                      )}
                    </button>
                    <button onClick={() => goBack()} className='btn btn-cancel'>
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className='row my-5'>
              <div className='col-4'>
                <div className='productdetails product-respon'>
                  <h4 className='h6'>All roles</h4>
                  <ul>
                    {data?.map(({ name, id }) => {
                      return (
                        <li key={id} className='p-3'>
                          {name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /add */}
      </div>
    </div>
  );
};

export default AddRole;
