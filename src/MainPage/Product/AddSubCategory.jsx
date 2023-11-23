import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import Select from 'react-select';
import { useMutate } from '../../../hooks/useMutate';
import {
  useMainCategory,
  useSubCategory,
} from '../../../hooks/useProductCategory';
import { convertArray } from '../../../utils/convertArray';
import { useState } from 'react';

const AddSubCategory = () => {
  const history = useHistory();
  const mutuation = useMutate();
  const [loading, setLoading] = useState(false);
  const { main_categories } = useMainCategory();
  const { refetch } = useSubCategory();
  const optionData = convertArray(main_categories?.data);

  const goBack = () => {
    history.push({
      pathname: '/product/subcategorytable-product',
    });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string(),
    mainCategoryId: Yup.string().required('Category is required'),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleSelect = (data) => {
    setValue('mainCategoryId', data.value, { shouldValidate: true });
  };
  const onSubmit = (data) => {
    setLoading(true);
    mutuation.mutate(
      {
        url: '/v1/ProductCategory/Add-Sub-Category',
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
              pathname: '/product/subcategorytable-product',
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
    <div className='page-wrapper'>
      <div className='content'>
        <div className='page-header'>
          <div className='page-title'>
            <h4>Product Add sub Category</h4>
            <h6>Create new product Category</h6>
          </div>
        </div>
        {/* /add */}
        <div className='card'>
          <div className='card-body'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='row'>
                <div className='col-lg-4 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label>Parent Category</label>
                    <Select
                      className='select'
                      name='mainCategoryId'
                      onChange={(val) => handleSelect(val)}
                      options={optionData}
                      placeholder='Category'
                    />
                  </div>
                </div>
                <div className='col-lg-4 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label>Sub Category Name</label>
                    <input
                      {...register('name')}
                      className={` ${
                        errors.name ? 'is-invalid' : ''
                      } form-control`}
                      placeholder='Enter name'
                    />
                    <div className='invalid-feedback'>
                      {errors.name?.message}
                    </div>
                  </div>
                </div>
                <div className='col-lg-4 col-sm-6 col-12'></div>
                <div className='col-lg-12'>
                  <div className='form-group'>
                    <label>Description</label>
                    <textarea
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
                <a onClick={() => goBack()} className='btn btn-cancel'>
                  Cancel
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubCategory;
