import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useMutate } from '../../../hooks/useMutate';
import { toast } from 'react-hot-toast';

const ChangePassword = () => {
  const mutation = useMutate();
  const [eye, seteye] = useState(true);
  const [eye2, seteye2] = useState(true);
  const [loading, setLoading] = useState(false);

  const onEyeClick = () => {
    seteye(!eye);
  };
  const onEyeClick2 = () => {
    seteye2(!eye2);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    newPassword: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must not exceed 20 characters'),
    oldPassword: Yup.string()
      .required('Old Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must not exceed 20 characters'),
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
    console.log('click')
    setLoading(true);
    mutation.mutate(
      {
        url: `/v1/ManageUsers/Change-Password-User`,
        method: 'POST',
        data: data,
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
          console.log(error_response)
          const errorMsg = error_response.message;
          toast.error(errorMsg);
        },
      }
    );
  };

  console.log(errors)

  return (
    <div className='page-wrapper'>
      <div className='content'>
        <div className='page-header'>
          <div className='page-title'>
            <h4>User Management</h4>
            <h6>Update Password</h6>
          </div>
        </div>
        {/* /add */}
        <div className='card'>
          <div className='card-body'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='row'>
                <div className='col-lg-4 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label>Email</label>
                    <div className=''>
                      <input
                        type='text'
                        {...register('email')}
                        className={` ${errors.email ? 'is-invalid' : ''}`}
                        placeholder='Enter email'
                      />
                      <div className='invalid-feedback'>
                        {errors.email?.message}
                      </div>
                    </div>
                  </div>
                  <div className='form-group'>
                    <label>Old Password</label>
                    <div className='pass-group'>
                      <input
                        type={eye2 ? 'password' : 'text'}
                        className={` ${errors.oldPassword ? 'is-invalid' : ''}`}
                        placeholder='Enter your password'
                        {...register('oldPassword')}
                        form
                      />
                      <span
                        onClick={onEyeClick2}
                        className={`fas toggle-password ${
                          eye2 ? 'fa-eye-slash' : 'fa-eye'
                        } `}
                      />
                      <div className='invalid-feedback'>
                        {errors.oldPassword?.message}
                      </div>
                    </div>
                  </div>
                  <div className='form-group'>
                    <label>New Password</label>
                    <div className='pass-group'>
                      <input
                        type={eye ? 'password' : 'text'}
                        className={` ${errors.newPassword ? 'is-invalid' : ''}`}
                        placeholder='Enter your password'
                        {...register('newPassword')}
                      />
                      <span
                        onClick={onEyeClick}
                        className={`fas toggle-password ${
                          eye ? 'fa-eye-slash' : 'fa-eye'
                        } `}
                      />
                      <div className='invalid-feedback'>
                        {errors.newPassword?.message}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-12'>
                  <button type='submit' className='btn btn-submit me-2'>
                    {loading ? (
                      <div
                        className='spinner-border'
                        style={{ height: '1.2rem', width: '1.2rem' }}></div>
                    ) : (
                      'Submit'
                    )}
                  </button>
                  <button className='btn btn-cancel'>Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
