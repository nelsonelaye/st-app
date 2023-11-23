import { toast } from 'react-hot-toast';
import { useMutate } from '../../../hooks/useMutate';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from '../../components/Select';
import { useHistory } from 'react-router-dom';
import { LoadingAbsolute } from '../../components/Loading';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  message: Yup.string().required('Please enter a message').min(2).max(1000),
});

const options = [
  { label: 'Complaint', value: 'complaint' },
  { label: 'Feedback', value: 'feedback' },
  { label: 'Review', value: 'review' },
];

const Feedback = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const mutation = useMutate();

  const sendFeedback = async (values) => {
    mutation.mutate(
      {
        url: `/v1/ManageUsers/SendFeedBack`,
        method: 'POST',
        data: values,
      },
      {
        onSuccess(res) {
          if (res.statusCode == 200) {
            toast.success(res.message);
            history.replace('/dashboard');
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
    <div className='page-wrapper'>
      {mutation.isLoading && <LoadingAbsolute />}
      <div className='content'>
        <div className='page-header'>
          <div className='page-title'>
            <h4>Feedback</h4>
            <h6>Leave a feedback</h6>
          </div>
        </div>

        <form onSubmit={handleSubmit(sendFeedback)} className=''>
          <div className='col-lg-3 col-sm-6 col-12'>
            <div className='form-group'>
              <label>Title</label>
              <Controller
                name='title'
                control={control}
                render={({ field: { onChange, ref, value } }) => (
                  <Select
                    ref={ref}
                    value={options.find((x) => x.value === value)}
                    onChange={(e) => {
                      onChange(e.value);
                    }}
                    options={options}
                    className={` ${errors.title ? 'is-invalid' : ''}`}
                  />
                )}
              />
              <div className='invalid-feedback'>{errors.title?.message}</div>
            </div>
          </div>

          <div className='col-lg-6 col-sm-6 col-12'>
            <div className='form-group'>
              <label>Message</label>
              <textarea
                type='text'
                {...register('message')}
                placeholder='Enter message'
                className={` ${
                  errors.message ? 'is-invalid' : ''
                } form-control`}
                maxLength={1500}
              />
              <div className='invalid-feedback'>{errors.message?.message}</div>
            </div>
          </div>

          <div className='col-lg-12 d-flex justify-content-center justify-content-md-start gap-3'>
            <button
              type='button'
              onClick={() => history.push('/dashboard')}
              className='btn btn-cancel'>
              Cancel
            </button>
            <button
              disabled={!isDirty}
              type='submit'
              className='btn btn-submit'>
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
