import { Link, useHistory } from 'react-router-dom';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAccessLists } from '../../../hooks/useAccessList';
import { convertArray } from '../../../utils/convertArray';
import { useMutate } from '../../../hooks/useMutate';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { ArrowLeft } from 'feather-icons-react/build/IconComponents';

const UserAccess = () => {
  const history = useHistory();
  const { access_lists } = useAccessLists();
  const mutuation = useMutate();
  const [loading, setLoading] = useState(false);
  const data = convertArray(access_lists?.data);
  const validationSchema = Yup.object().shape({
    user: Yup.string().required('Acess name is required'),
    role: Yup.string().required('Role is required'),
  });

  const goBack = () => {
    history.push({
      pathname: '/settings/grouppermissions',
    });
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleSelect = (data) => {
    setValue('role', data.value, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    setLoading(true);
    mutuation.mutate(
      {
        url: `/v1/ManageSetUps/Get-User-Access-Items?roleId=${data.role}&userPhoneNumberOrEmail=${data.user}`,
        method: 'GET',
        data: '',
      },
      {
        onSuccess(res) {
          if (res.statusCode == 205) {
            const { Message } = res;
            toast.error(Message);
            setLoading(false);
            reset();
          } else if (res.statusCode == 200) {
            toast.success('User has access');
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
            <h4>User Permission</h4>
            <h6>Check user permissions</h6>
          </div>
        </div>
        <div className='mb-2'>
          <Link to='/dashboard' className='mb-3'>
            <ArrowLeft />
            <span className='ms-2'>Go back</span>
          </Link>
        </div>
        <div className='card'>
          <div className='card-body'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='row'>
                <div className='col-lg-4 col-sm-12'>
                  <div className='form-group'>
                    <label>
                      User Email/Phone Number{' '}
                      <span className='manitory'>*</span>
                    </label>
                    <input
                      type='text'
                      {...register('user')}
                      placeholder='useremail@gmai.com'
                      className={` ${errors.user ? 'is-invalid' : ''}`}
                    />
                    <div className='invalid-feedback'>
                      {errors.user?.message}
                    </div>
                  </div>
                </div>
                <div className='col-lg-4 col-sm-12'>
                  <div className='form-group'>
                    <label>
                      Access Items<span className='manitory'>*</span>
                    </label>
                    <Select
                      name='role'
                      options={data}
                      placeholder='Select role'
                      className={` ${errors.role ? 'is-invalid' : ''}`}
                      onChange={(val) => handleSelect(val)}
                    />
                    <div className='invalid-feedback'>
                      {errors.role?.message}
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-lg-12'>
                    <button className='btn btn-submit me-2'>
                      {loading ? (
                        <div
                          className='spinner-border'
                          style={{ height: '1.2rem', width: '1.2rem' }}></div>
                      ) : (
                        'Check Permission'
                      )}
                    </button>
                    <a onClick={() => goBack()} className='btn btn-cancel'>
                      Cancel
                    </a>
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

export default UserAccess;
