import { useState } from 'react';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import { Checkbox } from 'antd';

import { useMutate } from '../../../hooks/useMutate';
import { useGetRoles } from '../../../hooks/useRoleList';
import { convertArray, convertStore } from '../../../utils/convertArray';
import { ErrorHandler } from '../../../utils/errorHandler';
import { useGetStores } from '../../../hooks/useGetStore';
import { useHistory } from 'react-router-dom';

// const menuList = [
//   { label: 'Dashboard', value: 'Dashboard' },
//   { label: 'Products', value: 'Products' },
//   { label: 'Sales', value: 'Sales' },
//   { label: 'AuditTrail', value: 'AuditTrail' },
//   { label: 'Inventory', value: 'Inventory' },
//   { label: 'Manage Customers', value: 'Manage Customers' },
//   { label: 'Manage Users', value: 'Manage Users' },
//   { label: 'Profile', value: 'Profile' },
//   { label: 'Report', value: 'Report' },
//   { label: 'Support', value: 'Support' },
//   { label: 'Settings', value: 'Settings' },
// ];

import { useGetUsers } from '../../../hooks/useGetUsers';
import UploadComponent from '../../components/UploadComponent';
import { useAccessLists } from '../../../hooks/useAccessList';

const Newuser = () => {
  const { all_roles } = useGetRoles();
  const { all_stores } = useGetStores();
  const { refetch } = useGetUsers();
  const { access_lists } = useAccessLists();
  const menuList = convertArray(access_lists?.data);
  
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState('');
  const mutation = useMutate();
  const history = useHistory();

  const [eye, seteye] = useState(true);
  const [eye2, seteye2] = useState(true);

  const onEyeClick = () => {
    seteye(!eye);
  };
  const onEyeClick2 = () => {
    seteye2(!eye2);
  };

  const optionData = convertArray(all_roles?.data);
  const storeOptions = convertStore(all_stores?.data);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    userName: Yup.string().required('Name is required'),
    phoneNumber: Yup.string().required('phone is required'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    userRoleId: Yup.string().required('role is required'),
    storeId: Yup.string().required('store is required'),
    profileImage: Yup.string(),
    passWord: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .max(20, 'Password must not exceed 20 characters')
      .matches(/[A-Z]+/, 'One uppercase character required')
      .matches(/\d+/, 'One number required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('passWord'), null], 'Passwords must match')
      .required(),
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

  const handleSelect = (data) => {
    setValue('userRoleId', data.value, { shouldValidate: true });
  };
  const handleSelectStore = (data) => {
    setValue('storeId', data.value, { shouldValidate: true });
  };

  const onCheckItem = (value) => {
    setList([...list, value]);
    if (list.includes(value)) {
      const items = list.filter((x) => x !== value);
      setList(items);
    }
  };

  const onSubmit = (data) => {
    setLoading(true);
    setValue('AccessItems', list.toString(), { shouldValidate: true });
    const formdata = {
      email: data.email,
      phoneNumber: data.phoneNumber,
      passWord: data.passWord,
      userRoleId: data.userRoleId,
      userName: data.userName,
      profileImage: data.profileImage,
      storeId: data.storeId,
      firstName: data.firstName,
      lastName: data.lastName,
      accessItems: list.toString(),
    }
    console.log(formdata)
    mutation.mutate(
      {
        url: `/v1/ManageUsers/Add-New-User`,
        method: 'POST',
        data: formdata,
      },
      {
        onSuccess(res) {
          if (res.statusCode == 200) {
            const { message } = res;
            toast.success(message);
            reset();
            refetch();
            setLoading(false);
            history.push({
              pathname: '/users/userlists',
            });
          } else if (res.statusCode == 205) {
            setLoading(false);
            const message = res.message;
            toast.error(message);
          }
        },
        onError(err) {
          setLoading(false);
          const error_response = err.response.data;
          const errorValue = error_response.errors;
          const error = ErrorHandler(errorValue);
          toast.error(error);
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
            <h6>Add User</h6>
          </div>
        </div>
        <div className='card'>
          <div className='card-body'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='row'>
                <div className='col-lg-3 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label>First Name</label>
                    <div className=''>
                      <input
                        type='text'
                        {...register('firstName')}
                        className={` ${errors.firstName ? 'is-invalid' : ''}`}
                        placeholder='Enter first name'
                      />
                      <div className='invalid-feedback'>
                        {errors.firstName?.message}
                      </div>
                    </div>
                  </div>
                  <div className='form-group'>
                    <label>User Name</label>
                    <div className=''>
                      <input
                        type='text'
                        {...register('userName')}
                        className={` ${errors.userName ? 'is-invalid' : ''}`}
                        placeholder='Enter username'
                      />
                      <div className='invalid-feedback'>
                        {errors.userName?.message}
                      </div>
                    </div>
                  </div>
                  <div className='form-group'>
                    <label>Email</label>
                    <div className=''>
                      <input
                        type='email'
                        {...register('email')}
                        className={` ${
                          errors.email ? 'is-invalid' : ''
                        }, form-control`}
                        placeholder='Enter email'
                      />
                      <div className='invalid-feedback'>
                        {errors.email?.message}
                      </div>
                    </div>
                  </div>
                  <div className='form-group'>
                    <label>Password</label>
                    <div className='pass-group'>
                      <input
                        type={eye ? 'password' : 'text'}
                        className={` ${errors.passWord ? 'is-invalid' : ''}`}
                        placeholder='Enter your password'
                        {...register('passWord')}
                      />
                      <span
                        onClick={onEyeClick}
                        className={`fas toggle-password ${
                          eye ? 'fa-eye-slash' : 'fa-eye'
                        } `}
                      />
                      <div className='invalid-feedback'>
                        {errors.passWord?.message}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-3 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label>Last Name</label>
                    <div className=''>
                      <input
                        type='text'
                        {...register('lastName')}
                        className={` ${errors.lastName ? 'is-invalid' : ''}`}
                        placeholder='Enter last name'
                      />
                      <div className='invalid-feedback'>
                        {errors.lastName?.message}
                      </div>
                    </div>
                  </div>
                  <div className='form-group'>
                    <label>Mobile</label>
                    <div className=''>
                      <input
                        type='text'
                        {...register('phoneNumber')}
                        className={` ${errors.phoneNumber ? 'is-invalid' : ''}`}
                        placeholder='Enter mobile number'
                      />
                      <div className='invalid-feedback'>
                        {errors.phoneNumber?.message}
                      </div>
                    </div>
                  </div>
                  <div className='form-group'>
                    <label>Role</label>
                    <Select
                      className='select'
                      placeholder='Select role'
                      name='userRoleId'
                      onChange={(val) => handleSelect(val)}
                      options={optionData}
                    />
                    <div className='invalid-feedback'>
                      {errors.userRoleId?.message}
                    </div>
                  </div>
                  <div className='form-group'>
                    <label>Confirm Password</label>
                    <div className='pass-group'>
                      <input
                        type={eye2 ? 'password' : 'text'}
                        className={` ${
                          errors.confirmPassword ? 'is-invalid' : ''
                        }`}
                        placeholder='Enter your password'
                        {...register('confirmPassword')}
                      />
                      <span
                        onClick={onEyeClick2}
                        className={`fas toggle-password ${
                          eye2 ? 'fa-eye-slash' : 'fa-eye'
                        } `}
                      />
                      <div className='invalid-feedback'>
                        {errors.confirmPassword?.message}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-3 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label> Profile Picture</label>
                    <UploadComponent
                      setValue={setValue}
                      value={'profileImage'}
                    />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-lg-6'>
                  <div className='form-group'>
                    <label>Pick Store</label>
                    <Select
                      className='select'
                      placeholder='Select store'
                      name='storeId'
                      onChange={(val) => handleSelectStore(val)}
                      options={storeOptions}
                    />
                    <div className='invalid-feedback'>
                      {errors.storeId?.message}
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-lg-9'>
                  <div className='form-group'>
                    <label>Select Access Items</label>
                    <div className='row gap-3'>
                      {menuList?.map((item, idx) => (
                        <div className='col-3' key={idx}>
                          <Checkbox
                            onChange={() => onCheckItem(item.value)}
                            // checked={list.includes(item.value)}
                          >
                            {item.label}
                          </Checkbox>
                        </div>
                      ))}
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
                  <button onClick={() => history.goBack()} className='btn btn-cancel'>
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* /add */}
      </div>
    </div>
  );
};

export default Newuser;
