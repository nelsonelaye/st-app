import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

import { useMutate } from '../../../hooks/useMutate';
import { useBrandList } from '../../../hooks/useBrandList';
import { useState } from 'react';
import UploadComponent from '../../components/UploadComponent';

const AddBrand = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { refetch } = useBrandList();
  const mutuation = useMutate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string(),
    image: Yup.string(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    setLoading(true);
    mutuation.mutate(
      {
        url: '/v1/ProductBrand/AddNew',
        method: 'POST',
        data: data,
      },
      {
        onSuccess(res) {
          if (res.statusCode == 200) {
            const { message } = res;
            toast.success(message);
            refetch();
            history.push({
              pathname: '/product/brandlist-product',
            });
          }
          if(res.statusCode == 205){
            setLoading(false)
            toast.error(res.message);
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
    <>
      <div className='page-wrapper'>
        <div className='content'>
          <div className='page-header'>
            <div className='page-title'>
              <h4>Brand</h4>
              <h6>Create new Brand</h6>
            </div>
          </div>
          <div className='card'>
            <div className='card-body'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row'>
                  <div className='col-lg-3 col-sm-6 col-12'>
                    <div className='form-group'>
                      <label>Brand Name</label>
                      <input
                        type='text'
                        {...register('name')}
                        className={` ${errors.name ? 'is-invalid' : ''}`}
                        placeholder='Enter product name'
                      />
                      <div className='invalid-feedback'>
                        {errors.name?.message}
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-12'>
                    <div className='form-group'>
                      <label>Description</label>
                      <textarea
                        defaultValue={''}
                        {...register('description')}
                        className={` ${
                          errors.description ? 'is-invalid' : ''
                        } form-control`}
                      />
                      <div className='invalid-feedback'>
                        {errors.description?.message}
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-12'>
                    <div className='form-group'>
                      <label> Product Image</label>
                      <UploadComponent setValue={setValue} value={'image'} />
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
                    <a onClick={() => history.goBack()} className='btn btn-cancel'>
                      Cancel
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBrand;
