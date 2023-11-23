import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

import { useMutate } from '../../../hooks/useMutate';
import { useGetStores } from '../../../hooks/useGetStore';
import { useGetRoles } from '../../../hooks/useRoleList';
import { useGetUsers } from '../../../hooks/useGetUsers';
import UploadComponent from '../../components/UploadComponent';

const NewuserEdit = () => {
  const history = useHistory();
  const location = useLocation();
  const userData = location.state;

  const mutuation = useMutate();
  const { all_stores } = useGetStores();
  const { all_roles } = useGetRoles();
  const { refetch } = useGetUsers();

  const dob = userData?.dob.split('T')[0];

  const storeOptions = all_stores?.data;
  const roleOption = all_roles?.data;
  const [loading, setLoading] = useState(false);

  const goBack = () => {
    history.push({
      pathname: '/users/userlists',
    });
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required('User Acess name is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    dob: Yup.string().required('date of birth is required'),
    gender: Yup.string().required('gender is required'),
    phoneNumber: Yup.string().required('phone number is required'),
    storeName: Yup.string().required('store name is required'),
    roleName: Yup.string().required('role is required'),
    address: Yup.string().required('address is required'),
    isActive: Yup.boolean().required('status is required'),
    profileImage: Yup.string(),
    id: Yup.number(),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    reset({
      userName: userData?.userName,
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      email: userData?.email,
      dob: dob,
      gender: userData?.gender,
      phoneNumber: userData?.phoneNumber,
      storeName: userData?.storeName,
      roleName: userData?.roleName,
      address: userData?.address,
      isActive: userData?.isActive,
      profileImage: userData?.profileImage,
      stateId: userData?.stateId,
      id: userData?.id,
    });
  }, [reset, userData, dob]);

  const onSubmit = (data) => {
    setLoading(true);
    mutuation.mutate(
      {
        url: `/v1/ManageUsers/Update-Profile`,
        method: 'POST',
        data: data,
      },
      {
        onSuccess(res) {
          if (res.statusCode == 200) {
            const { message } = res;
            toast.success(message);
            setLoading(false);
            refetch();
            history.push({
              pathname: '/users/userlists',
            });
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
            <h6>Add/Update User</h6>
          </div>
        </div>
        <div className='card'>
          <div className='card-body'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='row'>
                <div className='col-lg-9'>
                  <div className='row'>
                    <div className='col-lg-6 col-sm-6 col-12'>
                      <div className='form-group'>
                        <label>
                          Username <span className='manitory'>*</span>
                        </label>
                        <input
                          type='text'
                          defaultValue={userData?.userName}
                          disabled
                          {...register('userName')}
                          className={` ${errors.userName ? 'is-invalid' : ''}`}
                        />
                        <div className='invalid-feedback'>
                          {errors.userName?.message}
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-6 col-sm-6 col-12'>
                      <div className='form-group'>
                        <label>
                          First Name<span className='manitory'>*</span>
                        </label>
                        <input
                          type='text'
                          defaultValue={userData?.firstName}
                          placeholder='Enter first name'
                          {...register('firstName')}
                          className={` ${errors.firstName ? 'is-invalid' : ''}`}
                        />
                        <div className='invalid-feedback'>
                          {errors.firstName?.message}
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-6 col-sm-6 col-12'>
                      <div className='form-group'>
                        <label>
                          Last Name<span className='manitory'>*</span>
                        </label>
                        <input
                          type='text'
                          defaultValue={userData?.lastName}
                          placeholder='Enter last name'
                          {...register('lastName')}
                          className={` ${errors.lastName ? 'is-invalid' : ''}`}
                        />
                        <div className='invalid-feedback'>
                          {errors.lastName?.message}
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-6 col-sm-6 col-12'>
                      <div className='form-group'>
                        <label>
                          Email<span className='manitory'>*</span>
                        </label>
                        <input
                          type='text'
                          placeholder='Enter email'
                          defaultValue={userData?.email}
                          disabled
                          {...register('email')}
                          className={` ${errors.email ? 'is-invalid' : ''}`}
                        />
                        <div className='invalid-feedback'>
                          {errors.email?.message}
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-6 col-sm-6 col-12'>
                      <div className='form-group'>
                        <label>
                          Dob <span className='manitory'>*</span>
                        </label>
                        <input
                          type='date'
                          {...register('dob')}
                          defaultValue={dob || ''}
                          className={` ${
                            errors.dob ? 'is-invalid' : ''
                          }, form-control`}
                        />
                        <div className='invalid-feedback'>
                          {errors.dob?.message}
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-6 col-sm-6 col-12'>
                      <div className='form-group'>
                        <label>
                          Gender<span className='manitory'>*</span>
                        </label>
                        <select
                          {...register('gender')}
                          defaultValue={userData?.gender}
                          className={` ${errors.gender ? 'is-invalid' : ''}`}>
                          <option disabled>Select gender</option>
                          <option value='Male'>Male</option>
                          <option value='Female'>Female</option>
                        </select>
                        <div className='invalid-feedback'>
                          {errors.gender?.message}
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-6 col-sm-6 col-12'>
                      <div className='form-group'>
                        <label>
                          Phone<span className='manitory'>*</span>
                        </label>
                        <input
                          type='text'
                          placeholder='Phone number'
                          defaultValue={userData?.phoneNumber}
                          {...register('phoneNumber')}
                          className={` ${
                            errors.phoneNumber ? 'is-invalid' : ''
                          }`}
                        />
                        <div className='invalid-feedback'>
                          {errors.phoneNumber?.message}
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-6 col-sm-6 col-12'>
                      <div className='form-group'>
                        <label>
                          Store<span className='manitory'>*</span>
                        </label>
                        {storeOptions && (
                          <select
                            {...register('storeName')}
                            defaultValue={userData?.storeName}
                            className={` ${
                              errors.storeName ? 'is-invalid' : ''
                            }`}>
                            {storeOptions?.map(({ storeId, storeName }) => {
                              return (
                                <option value={storeName} key={storeId}>
                                  {storeName}
                                </option>
                              );
                            })}
                          </select>
                        )}
                        <div className='invalid-feedback'>
                          {errors.storeName?.message}
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-6 col-sm-6 col-12'>
                      <div className='form-group'>
                        <label>
                          Role<span className='manitory'>*</span>
                        </label>
                        {roleOption && (
                          <select
                            {...register('roleName')}
                            defaultValue={userData?.roleName}
                            disabled
                            className={` ${
                              errors.roleName ? 'is-invalid' : ''
                            }`}>
                            {roleOption?.map(({ id, name }) => {
                              return (
                                <option value={name} key={id}>
                                  {name}
                                </option>
                              );
                            })}
                          </select>
                        )}
                        <div className='invalid-feedback'>
                          {errors.roleName?.message}
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-6 col-sm-6 col-12'>
                      <div className='form-group'>
                        <label>
                          Status<span className='manitory'>*</span>{' '}
                        </label>
                        <select
                          {...register('isActive')}
                          defaultValue={userData?.isActive}
                          disabled
                          className={` ${
                            errors.isActive ? 'is-invalid' : ''
                          }, form-control`}>
                          <option value=''>Select status</option>
                          <option value='true'>Active</option>
                          <option value='false'>In-Active</option>
                        </select>
                        <div className='invalid-feedback'>
                          {errors.isActive?.message}
                        </div>
                      </div>
                    </div>
                    <div className='col-12'>
                      <div className='form-group'>
                        <label>
                          Address<span className='manitory'>*</span>{' '}
                        </label>
                        <input
                          type='text'
                          defaultValue={userData?.address}
                          {...register('address')}
                          className={` ${errors.address ? 'is-invalid' : ''}`}
                        />
                        <div className='invalid-feedback'>
                          {errors.address?.message}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-3 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label> Profile Picture</label>
                    <div className='image-upload image-upload-new'>
                      <div className='image-uploads'>
                        <img src={userData?.profileImage} alt='img' />
                      </div>
                    </div>
                    <div className='form-group'>
                      <label>Change Profile Picture</label>
                      <UploadComponent
                        setValue={setValue}
                        value={'profileImage'}
                      />
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
                        'Update'
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

export default NewuserEdit;
