import {
  Root,
  Content,
  Portal,
  Trigger,
  Overlay,
} from '@radix-ui/react-dialog';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import './style.css';
import { useCountriesStates } from '../../../../../hooks/useCountryState';
import { useQueryClient } from 'react-query';
import { useMutate } from '../../../../../hooks/useMutate';
import Select from '../../../../components/Select';
import { toast } from 'react-hot-toast';
import { LoadingAbsolute } from '../../../../components/Loading';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = Yup.object().shape({
  customerName: Yup.string().required('Name is required').min(2).max(200),
  email: Yup.string().email().required('Email is required'),
  address: Yup.string().required('Enter Address'),
  phoneNumber: Yup.string().required('phone number is required'),
  city: Yup.string().required('City is required'),
  country: Yup.string().required('Country is required'),
  customerBio: Yup.string(),
  image: Yup.string(),
});

const AddCustomer = () => {
  const [open, setOpen] = useState(false);
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
          // console.log(res)
          if (res.statusCode == 200) {
            toast.success(res?.message);
            qc.refetchQueries({ queryKey: ['all-customers'] });
            setOpen(false);
          } else {
            toast.error(res?.message);
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

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: { country: undefined },
    resolver: yupResolver(validationSchema),
  });

  return (
    <Root open={open} onOpenChange={setOpen}>
      <div className='col-12'>
        <Trigger className='btn btn-adds'>
          <i className='fa fa-plus' />
          Add Customer
        </Trigger>
      </div>
      <Portal>
        <Overlay className='DialogOverlay' />
        {mutation.isLoading && <LoadingAbsolute />}
        <Content className='DialogContent' style={{ padding: '10px' }}>
          <div className='modal-header'>
            <h5 className='modal-title'>Add Customer</h5>
            <button
              type='button'
              className='close'
              onClick={() => setOpen(false)}>
              <span aria-hidden='true'>×</span>
            </button>
          </div>
          <form onSubmit={handleSubmit(addCustomer)} className='modal-body'>
            <div className='row'>
              <div className='col-lg-6 col-sm-12 col-12'>
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
              <div className='col-lg-6 col-sm-12 col-12'>
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
              <div className='col-lg-6 col-sm-12 col-12'>
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
              <div className='col-lg-6 col-sm-12 col-12'>
                <Controller
                  name='country'
                  control={control}
                  render={({ field: { onChange, ref, value } }) => (
                    <div className='form-group'>
                      <label>Country</label>
                      <Select
                        ref={ref}
                        value={countries.find((x) => x.label === value)}
                        onChange={(e) => {
                          onCountryChange(e.value);
                          onChange(e.label);
                        }}
                        options={countries}
                      />
                      {errors.country && (
                        <div
                          className=''
                          style={{
                            fontSize: '12px',
                            color: 'red',
                            margin: '4px 0',
                          }}>
                          {errors.country?.message}
                        </div>
                      )}
                    </div>
                  )}
                />
              </div>
              <div className='col-lg-6 col-sm-12 col-12'>
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
                  {errors.city && (
                    <div
                      className=''
                      style={{
                        fontSize: '12px',
                        color: 'red',
                        margin: '4px 0',
                      }}>
                      {errors.city?.message}
                    </div>
                  )}
                </div>
              </div>

              {/* <div className='col-lg-6 col-sm-6 col-12'>
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

              <div className='col-lg-12 col-sm-12 col-12'>
                <div className='form-group'>
                  <label>Address</label>
                  <textarea
                    {...register('address')}
                    className={` ${
                      errors.address ? 'is-invalid' : ''
                    } form-control`}
                    style={{ resize: 'none' }}
                    placeholder='Enter cutomer address'
                  />
                  <div className='invalid-feedback'>
                    {errors.address?.message}
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-12'>
              <button
                type='submit'
                disabled={!isDirty}
                className='btn btn-submit me-2'>
                Submit
              </button>
              <button
                type='button'
                onClick={() => setOpen(false)}
                className='btn btn-cancel'
                data-bs-dismiss='modal'>
                Cancel
              </button>
            </div>
          </form>
        </Content>
      </Portal>
    </Root>
  );
};

// const AddCustomer = () => {
//   const [open, setOpen] = useState(false);

//   return (
//     <>

//         <ModalContent setOpen={setOpen} />
//       </Portal>
//     </Root>
//   );
// };

export default AddCustomer;
