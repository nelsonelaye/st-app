import { Dollar } from '../../EntryFile/imagePath';
import 'react-datepicker/dist/react-datepicker.css';
import { useMutate } from '../../../hooks/useMutate';
import { useQueryClient } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';
import { LoadingAbsolute } from '../../components/Loading';

const validationSchema = Yup.object().shape({
  categoryName: Yup.string().required('Required').max(200).required('required'),
  description: Yup.string().required('required'),
  initialAmount: Yup.string().required('required'),
});

const AddExpenseCategory = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: { expenseDate: new Date() },
    resolver: yupResolver(validationSchema),
  });

  const qc = useQueryClient();

  const mutation = useMutate();

  const addExpense = async (values) => {
    mutation.mutate(
      {
        url: `/v1/Expenses/AddCategory`,
        method: 'POST',
        data: values,
      },
      {
        onSuccess(res) {
          // console.log(res)
          if (res.statusCode == 200) {
            const { message } = res;
            toast.success(message);
            qc.refetchQueries({ queryKey: ['expense-categories'] });
            history.push({
              pathname: '/expense/expensecategory',
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

  return (
    <>
      {mutation.isLoading && <LoadingAbsolute />}
      <div className='page-wrapper'>
        <div className='content'>
          <div className='page-header'>
            <div className='page-title'>
              <h4>Add Expense Category </h4>
              <h6>Add/Update Category</h6>
            </div>
          </div>
          <div className='card'>
            <form onSubmit={handleSubmit(addExpense)} className='card-body'>
              <div className='row'>
                <div className='col-lg-3 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label>Category Name</label>
                    <input type='text' {...register('categoryName')} />

                    <div className='invalid-feedback'>
                      {errors?.categoryName?.message}
                    </div>
                  </div>
                </div>
                <div className='col-lg-3 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label>Amount</label>
                    <div className='input-groupicon'>
                      <input type='text' {...register('initialAmount')} />

                      <div className='addonset'>
                        <h6>₦</h6>
                       
                      </div>
                    </div>
                    <div className='invalid-feedback'>
                      {errors?.requestAmount?.message}
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-lg-12'>
                <div className='form-group'>
                  <label>Description</label>
                  <textarea
                    className='form-control'
                    {...register('description')}
                  />
                </div>
              </div>
              <div className='col-lg-12'>
                <button
                  disabled={!isDirty}
                  type='submit'
                  className='btn btn-submit me-2'>
                  Submit
                </button>
                <button
                  type='button'
                  onClick={() => history.goBack()}
                  className='btn btn-cancel'>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddExpenseCategory;
