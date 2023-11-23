import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useLocation, useHistory } from 'react-router-dom';

import { useMutate } from '../../../hooks/useMutate';
import { useBrandList } from '../../../hooks/useBrandList';
import UploadComponent from '../../components/UploadComponent';

const EditBrand = () => {
  let location = useLocation();
  let history = useHistory();
  const { refetch } = useBrandList();

  const mutuation = useMutate();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
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

  const goBack = () => {
    history.push({
      pathname: '/product/subcategorytable-product',
    });
  };

  console.log(errors)
  const onSubmit = (data) => {
    const formData = {
      id: location.state.id,
      name: data.name,
      description: data.description,
      imageUrl: data.image || location.state.imageUrl,
    };
    mutuation.mutate(
      {
        url: '/v1/ProductBrand/Update',
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
              pathname: '/product/brandlist-product',
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
              <h4>Brand Edit</h4>
              <h6>Update your Brand</h6>
            </div>
          </div>
          {/* /add */}
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
                        defaultValue={location?.state?.name}
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
                    <div className='form-group'>
                      <label> Brand Image</label>
                      <UploadComponent setValue={setValue} value={'image'} />
                    </div>
                  </div>
                  <div className='col-12'>
                    <div className='product-list'>
                      <ul className='row'>
                        <li>
                          <div className='productviews'>
                            <div className='productviewsimg'>
                              <img src={location?.state?.imageUrl} alt='img' />
                            </div>
                            <div className='productviewscontent'>
                              <div className='productviewsname'>
                                <h2>{location?.state.name}</h2>
                                <h3>581kb</h3>
                              </div>
                              {/* <a href="#">x</a> */}
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className='col-lg-12'>
                    <button type='submit' className='btn btn-submit me-2'>Submit</button>
                    <a onClick={() => goBack()} className='btn btn-cancel'>
                      Cancel
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* /add */}
        </div>
      </div>
    </>
  );
};

export default EditBrand;
