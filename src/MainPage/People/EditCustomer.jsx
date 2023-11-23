import { useParams } from 'react-router-dom';
import {
  useGetAllCustomers,
  useGetCustomer,
} from '../../../hooks/useGetCustomer';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
// import { useState } from "react";
import Select from '../../components/Select';
import { useMutate } from '../../../hooks/useMutate';
import { toast } from 'react-hot-toast';
import { Loading, LoadingAbsolute } from '../../components/Loading';
import { useHistory } from 'react-router-dom';
import { useCountriesStates } from '../../../hooks/useCountryState';

const validationSchema = Yup.object().shape({
  customerName: Yup.string().required('Name is required').min(2).max(200),
  email: Yup.string().email().required('Email is required'),
  address: Yup.string(),
  phoneNumber: Yup.string().required('phone number is required'),
  city: Yup.string().required('City is required'),
  country: Yup.string().required('Country is required'),
  customerBio: Yup.string(),
  image: Yup.string(),
});

// eslint-disable-next-line react/prop-types
const EditComponent = ({ data, refetch }) => {
  const history = useHistory();
  const mutation = useMutate();
  const { refetch_list } = useGetAllCustomers();

  // const [image, setImage] = useState(null);

  const { countries, cities, onCountryChange } = useCountriesStates(
    data?.country
  );

  const defaultValues = {
    customerName: data?.customerName || '',
    email: data?.email || '',
    address: data?.address || '',
    phoneNumber: data?.phoneNumber || '',
    city: data?.city || '',
    country: data?.country || '',
    customerBio: data?.customerBio || '',
    image: data?.image || '',
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  console.log(errors);

  const updateCustomer = (values) => {
    // alert(JSON.stringify(values));
    mutation.mutate(
      {
        url: `/v1/Customers/Update-Customer`,
        method: 'PUT',
        data: { ...values, id: data.id, customerCode: data.customerCode },
      },
      {
        onSuccess(res) {
          // console.log(res)
          if (res.statusCode == 200) {
            toast.success(res.message);
            refetch_list();
            refetch();
            history.push('/people/customerlist-people');
          } else {
            toast.error(res.message);
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

  return (
    <>
      <div className='page-wrapper'>
        {mutation.isLoading && <LoadingAbsolute />}
        <div className='content'>
          <div className='page-header'>
            <div className='page-title'>
              <h4>Edit Customer Management</h4>
              <h6>Edit/Update Customer</h6>
            </div>
          </div>
          {/* /add */}
          <div className='card'>
            <form onSubmit={handleSubmit(updateCustomer)} className='card-body'>
              <div className='row'>
                <div className='col-lg-3 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label>Customer Name</label>
                    <input
                      type='text'
                      {...register('customerName')}
                      className={` ${errors.customerName ? 'is-invalid' : ''}`}
                      placeholder='Enter cutomer name'
                    />
                    <div className='invalid-feedback'>
                      {errors.customerName?.message}
                    </div>
                  </div>
                </div>
                <div className='col-lg-3 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label>Email</label>
                    <input
                      type='text'
                      {...register('email')}
                      className={` ${
                        errors.email ? 'is-invalid' : ''
                      } form-control`}
                      placeholder='Enter cutomer email'
                    />
                    <div className='invalid-feedback'>
                      {errors.email?.message}
                    </div>
                  </div>
                </div>
                <div className='col-lg-3 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label>Phone</label>
                    <input
                      type='text'
                      {...register('phoneNumber')}
                      className={` ${
                        errors.phoneNumber ? 'is-invalid' : ''
                      } form-control`}
                      placeholder='Enter cutomer email'
                    />
                    <div className='invalid-feedback'>
                      {errors.phoneNumber?.message}
                    </div>
                  </div>
                </div>
                <div className='col-lg-3 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label>Choose Country</label>
                    <Controller
                      name='country'
                      control={control}
                      render={({ field: { onChange, ref, value } }) => (
                        <Select
                          ref={ref}
                          value={countries.find((x) => x.label === value)}
                          onChange={(e) => {
                            onCountryChange(e.value);
                            onChange(e.label);
                          }}
                          options={countries}
                        />
                      )}
                    />

                    <div className='invalid-feedback'>
                      {errors.country?.message}
                    </div>
                  </div>
                </div>
                <div className='col-lg-3 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label>City</label>
                    <Controller
                      name='city'
                      control={control}
                      render={({ field: { onChange, ref, value } }) => (
                        <Select
                          ref={ref}
                          value={cities.find((x) => x.label === value)}
                          onChange={(e) => {
                            onCountryChange(e.value);
                            onChange(e.label);
                          }}
                          options={cities}
                        />
                      )}
                    />

                    <div className='invalid-feedback'>
                      {errors.city?.message}
                    </div>
                  </div>
                </div>

                {/* <div className='col-lg-3 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label>Store Id</label>
                    <input
                      type='number'
                      {...register('storeId')}
                      className={` ${
                        errors.storeId ? 'is-invalid' : ''
                      } form-control`}
                      placeholder='Enter store id'
                    />
                    <div className='invalid-feedback'>
                      {errors.storeId?.message}
                    </div>
                  </div>
                </div> */}

                <div className='col-lg-3 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label>Address</label>
                    <input
                      {...register('address')}
                      className={` ${
                        errors.address ? 'is-invalid' : ''
                      } form-control`}
                      placeholder='Enter cutomer address'
                    />
                    <div className='invalid-feedback'>
                      {errors.address?.message}
                    </div>
                  </div>
                </div>
                <div className='col-lg-12'>
                  <div className='form-group'>
                    <label>Bio</label>
                    <textarea
                      {...register('customerBio')}
                      className={` ${
                        errors.customerBio ? 'is-invalid' : ''
                      } form-control`}
                      placeholder='Enter cutomer bio'
                    />
                    <div className='invalid-feedback'>
                      {errors.customerBio?.message}
                    </div>
                  </div>
                </div>
                <div className='col-lg-12'>
                  <button
                    type='submit'
                    className='btn btn-submit me-2'
                    disabled={!isDirty}>
                    Update
                  </button>
                  <button
                    type='button'
                    className='btn btn-cancel'
                    onClick={() => history.goBack()}>
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
          {/* /add */}
        </div>
      </div>
    </>
  );
};

const EditCustomer = () => {
  const customerId = useParams().id;

  const { customer, refetch } = useGetCustomer(customerId);
  const data = customer?.data;

  if (!customer) return <Loading />;

  return <EditComponent data={data} refetch={refetch} />;
};

export default EditCustomer;
