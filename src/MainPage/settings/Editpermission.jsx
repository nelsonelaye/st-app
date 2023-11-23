import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { useAccessLists } from '../../../hooks/useAccessList';
import { useMutate } from '../../../hooks/useMutate';
import { ArrowLeft } from 'feather-icons-react/build/IconComponents';

const Editpermission = () => {
  const mutuation = useMutate();
  const history = useHistory();
  const location = useLocation();
  const { refetch_list } = useAccessLists();
  const [loading, setLoading] = useState(false);

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
    const formData = {
      name: data.name,
      id: location?.state.id,
      createdDate: location?.state.createdDate,
    };
    setLoading(true);
    mutuation.mutate(
      {
        url: `/v1/ManageSetUps/Update-Access-Item`,
        method: 'POST',
        data: formData,
      },
      {
        onSuccess(res) {
          if (res.statusCode == 200) {
            const { message } = res;
            toast.success(message);
            setLoading(false);
            refetch_list();
            history.push('/settings/grouppermissions');
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
            <h4>Edit Permission</h4>
            <h6>Manage Edit Permissions</h6>
          </div>
        </div>
        <div className='mb-2'>
          <Link to='/settings/grouppermissions' className='mb-3'>
            <ArrowLeft />
            <span className='ms-2'>Go back</span>
          </Link>
        </div>
        {/* /product list */}
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
                      defaultValue={location?.state.name}
                    />
                    <div className='invalid-feedback'>
                      {errors.name?.message}
                    </div>
                  </div>
                </div>
                <div className='col-lg-3 col-sm-12'>
                  <div className='form-group mt-4'>
                    <label className='sr-only'>button</label>
                    <button className='btn bg-black text-white w-50 mt-1'>
                      {loading ? (
                        <div
                          className='spinner-border'
                          style={{ height: '1.2rem', width: '1.2rem' }}></div>
                      ) : (
                        'Edit title'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editpermission;
