import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useLocation, useHistory } from 'react-router-dom';
import Select from 'react-select';

import { useMutate } from '../../../hooks/useMutate';
import {
  useMainCategory,
  useSubCategory,
} from '../../../hooks/useProductCategory';
import { convertArray } from '../../../utils/convertArray';

const EditSubCategory = () => {
  let location = useLocation();
  let history = useHistory();

  const { main_categories } = useMainCategory();
  const { refetch } = useSubCategory();
  const main_cat_option = convertArray(main_categories?.data);

  const mutuation = useMutate();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    // image: Yup.string(),
    mainCatId: Yup.string(),
    mainCategory: Yup.string(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleSelect2 = (data) => {
    setValue('mainCatId', data.value, { shouldValidate: true });
    setValue('mainCategory', data.label, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    const formData = {
      id: location?.state.id,
      name: data.name,
      description: data.description,
      imageUrl: data.image,
      mainCategory: data?.mainCategory || '',
      mainCatId: data?.mainCatId || 0,
      categoryType: 'S',
    };
    mutuation.mutate(
      {
        url: '/v1/ProductCategory/Update',
        method: 'PUT',
        data: formData,
      },
      {
        onSuccess(res) {
          if (res.statusCode == 200) {
            const { message } = res;
            refetch();
            toast.success(message);
            history.push({
              pathname: '/product/subcategorytable-product',
            });
          }
        },
        onError(err) {
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
              <h4>Product Edit Sub Category</h4>
              <h6>Create new product Category</h6>
            </div>
          </div>
          <div className='card'>
            <div className='card-body'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row'>
                  <div className='col-lg-4 col-sm-6 col-12'>
                    <div className='form-group'>
                      <label>Parent Category</label>
                      <Select
                        className='select'
                        name='mainCatId'
                        onChange={(val) => handleSelect2(val)}
                        options={main_cat_option}
                        placeholder='Select main category'
                      />
                      <div className='invalid-feedback'>
                        {errors.mainCatId?.message}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-4 col-sm-6 col-12'>
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
                    <button className='btn btn-submit me-2'>Submit</button>
                    <a href='#' className='btn btn-cancel'>
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

export default EditSubCategory;
