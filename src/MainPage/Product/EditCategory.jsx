import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useLocation, useHistory } from 'react-router-dom';

import { useMutate } from '../../../hooks/useMutate';
import Select from 'react-select';
import { useMainCategory } from '../../../hooks/useProductCategory';
import { convertArray } from '../../../utils/convertArray';
import { useEffect } from 'react';
import { useState } from 'react';

const EditCategory = () => {
  let location = useLocation();
  let history = useHistory();
  const [loading, setLoading] = useState(false);

  const data = location?.state;
  const { main_categories, refetch } = useMainCategory();
  const main_cat_option = convertArray(main_categories?.data);
  const mutuation = useMutate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    categoryType: Yup.string().required('Category is required'),
    mainCatId: Yup.string(),
    mainCategory: Yup.string(),
    createdDate: Yup.string(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    reset({
      id: data?.id,
      name: data?.name,
      description: data?.description,
      mainCategory: data?.mainCategory || '',
      mainCatId: data?.mainCatId || 0,
      categoryType: data?.categoryType,
      createdDate: data?.createdDate,
    });
  }, [reset, data]);

  const handleSelect2 = (data) => {
    setValue('mainCatId', data.value, { shouldValidate: true });
    setValue('mainCategory', data.label, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    setLoading(true);
    mutuation.mutate(
      {
        url: '/v1/ProductCategory/Update',
        method: 'PUT',
        data: data,
      },
      {
        onSuccess(res) {
          if (res.statusCode == 200) {
            const { message } = res;
            refetch();
            toast.success(message);
            history.push({
              pathname: '/product/categorylist-product',
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
    <>
      <div className='page-wrapper'>
        <div className='content'>
          <div className='page-header'>
            <div className='page-title'>
              <h4>Product Edit Category</h4>
              <h6>Edit a product Category</h6>
            </div>
          </div>
          <div className='card'>
            <div className='card-body'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row'>
                  <div className='col-lg-6 col-sm-6 col-12'>
                    <div className='form-group'>
                      <label>Category Name</label>
                      <input
                        type='text'
                        {...register('name')}
                        className={` ${errors.name ? 'is-invalid' : ''}`}
                        defaultValue={location?.state?.name}
                      />
                      <div className='invalid-feedback'>
                        {errors.name?.message}
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-6 col-sm-6 col-12'>
                    <div className='form-group'>
                      <label>Category Type</label>
                      <select
                        {...register('categoryType')}
                        defaultValue={data?.categoryType}
                        className={` ${errors.gender ? 'is-invalid' : ''}`}>
                        <option disabled>Select gender</option>
                        <option value='M'>Main</option>
                        <option value='S'>Sub Category</option>
                      </select>
                      <div className='invalid-feedback'>
                        {errors.categoryType?.message}
                      </div>
                    </div>
                  </div>
                  {data?.categoryType === 'S' && (
                    <div className='col-lg-6 col-sm-6 col-12'>
                      <div className='form-group'>
                        <label>Main Category</label>
                        {main_cat_option && (
                          <Select
                            className='select'
                            name='mainCatId'
                            defaultValue={data?.mainCatId}
                            onChange={(val) => handleSelect2(val)}
                            options={main_cat_option}
                            placeholder='Select main category'
                          />
                        )}
                        <div className='invalid-feedback'>
                          {errors.mainCatId?.message}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className='col-lg-12'>
                    <div className='form-group'>
                      <label>Description</label>
                      <textarea
                        {...register('description')}
                        className={` ${
                          errors.description ? 'is-invalid' : ''
                        } form-control`}
                        defaultValue={location?.state?.description}
                      />
                      <div className='invalid-feedback'>
                        {errors.name?.message}
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
                    <button className='btn btn-cancel'>Cancel</button>
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

export default EditCategory;
