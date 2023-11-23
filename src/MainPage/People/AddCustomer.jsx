import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import 'react-select2-wrapper/css/select2.css';
import Select from '../../components/Select';
import { useMutate } from '../../../hooks/useMutate';
import { toast } from 'react-hot-toast';
import { LoadingAbsolute } from '../../components/Loading';
import { useHistory } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import UploadComponent from '../../components/UploadComponent';
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

const AddCustomer = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const qc = useQueryClient();
  const mutation = useMutate();

  const addCustomer = async (values) => {
    mutation.mutate(
      {
        url: `/v1/Customers/Add-Customer`,
        method: 'POST',
        data: values,
      },
      {
        onSuccess(res) {
          if (res.statusCode == 200) {
            toast.success(res.message);
            qc.refetchQueries({ queryKey: ['all-customers'] });
            history.push({
              pathname: '/people/customerlist-people',
            });
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

  const { countries, cities, onCountryChange } = useCountriesStates();

  return (
    <>
      <div className='page-wrapper'>
        {mutation.isLoading && <LoadingAbsolute />}
        <div className='content'>
          <div className='page-header'>
            <div className='page-title'>
              <h4>Customer Management</h4>
              <h6>Add/Update Customer</h6>
            </div>
          </div>
          {/* /add */}
          <div className='card'>
            <form onSubmit={handleSubmit(addCustomer)} className='card-body'>
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
                      placeholder='Enter cutomer phone number'
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
                    <textarea
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

                <div className='col-lg-3 col-sm-6 col-12'>
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

                <UploadComponent setValue={setValue} value={'image'} />

                <div className='col-lg-12'>
                  <button
                    type='submit'
                    className='btn btn-submit me-2'
                    disabled={!isDirty}>
                    Submit
                  </button>
                  <button
                    // to={'/people/customerlist-people'}
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

export default AddCustomer;
