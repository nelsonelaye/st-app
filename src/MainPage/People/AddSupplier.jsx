import { Loading } from '../../components/Loading';
import { useHistory } from 'react-router-dom';
import { useMutate } from '../../../hooks/useMutate';
import { useQueryClient } from 'react-query';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import Select from '../../components/Select';
import UploadComponent from '../../components/UploadComponent';
import { useCountriesStates } from '../../../hooks/useCountryState';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(2).max(200),
  email: Yup.string().email().required('Email is required'),
  address: Yup.string(),
  phoneNumber: Yup.string().required('phone number is required'),
  city: Yup.string().required('City is required'),
  country: Yup.string().required('Country is required'),
  description: Yup.string(),
  image: Yup.string(),
  // storeId: Yup.string().required('Enter store id'),
});

const AddSupplier = () => {
  const history = useHistory();
  const mutation = useMutate();
  const qc = useQueryClient();

  const { countries, cities, onCountryChange } = useCountriesStates();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const addSupplier = async (values) => {
    mutation.mutate(
      {
        url: `/v1/Supplier/Add-Supplier`,
        method: 'POST',
        data: values,
      },
      {
        onSuccess(res) {
          // console.log(res)
          if (res.statusCode == 200) {
            toast.success(res.message);
            qc.refetchQueries({ queryKey: ['all-suppliers'] });
            history.push('/people/supplierlist-people');
            //  reset();
          } else {
            toast.success(res.message);
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
      {mutation.isLoading && <Loading />}
      <div className='page-wrapper'>
        <div className='content'>
          <div className='page-header'>
            <div className='page-title'>
              <h4>Supplier Management</h4>
              <h6>Edit/Update Customer</h6>
            </div>
          </div>
          {/* /add */}
          <div className='card'>
            <form onSubmit={handleSubmit(addSupplier)} className='card-body'>
              <div className='row'>
                <div className='col-lg-3 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label>Supplier Name</label>
                    <input
                      type='text'
                      {...register('name')}
                      className={` ${errors.name ? 'is-invalid' : ''}`}
                      placeholder='Enter supplier name'
                    />
                    <div className='invalid-feedback'>
                      {errors.name?.message}
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
                    <label>Code</label>
                    <input
                      type='text'
                      {...register('code')}
                      className={` ${
                        errors.code ? 'is-invalid' : ''
                      } form-control`}
                      placeholder='Enter cutomer code'
                    />
                    <div className='invalid-feedback'>
                      {errors.code?.message}
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
                <div className='col-lg-9 col-12'>
                  <div className='form-group'>
                    <label>Address</label>
                    <input
                      type='text'
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
                    <label>Description</label>
                    <textarea
                      {...register('description')}
                      className={` ${
                        errors.description ? 'is-invalid' : ''
                      } form-control`}
                      placeholder='Enter cutomer description'
                    />
                    <div className='invalid-feedback'>
                      {errors.description?.message}
                    </div>
                  </div>
                </div>

                <UploadComponent setValue={setValue} value={'image'} />

                <div className='col-lg-12'>
                  <button
                    disabled={!isDirty}
                    type='submit'
                    className='btn btn-submit me-2'>
                    Submit
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

export default AddSupplier;
