import { Calendar } from '../../EntryFile/imagePath';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from '../../components/Select';
import { useMutate } from '../../../hooks/useMutate';
import { useQueryClient } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useGetCategories } from '../../../hooks/useGetExpense';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  catId: Yup.string().required('Required').max(200).required('required'),
  expenseFor: Yup.string().required('required'),
  description: Yup.string().required('required'),
  requestAmount: Yup.string().required('required'),
  // expenseDate: Yup.string().required('Country is required'),
});

const AddExpense = () => {
  const { categories } = useGetCategories();

  const categoryOptions = (categories?.data || []).map((x) => ({
    label: x.categoryName,
    value: x.id,
  }));
  const history = useHistory();
  const {
    register,
    handleSubmit,
    control,
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
        url: `/v1/Expenses/AddExpense`,
        method: 'POST',
        data: values,
      },
      {
        onSuccess(res) {
          if (res.statusCode == 200) {
            const { message } = res;
            toast.success(message);
            qc.refetchQueries({ queryKey: ['all-expenses'] });
            history.push({
              pathname: '/expense/expenselist',
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
      <div className='page-wrapper'>
        <div className='content'>
          <div className='page-header'>
            <div className='page-title'>
              <h4>Add Expense</h4>
              <h6>Add/Update Expenses</h6>
            </div>
          </div>
          <div className='card'>
            <form onSubmit={handleSubmit(addExpense)} className='card-body'>
              <div className='row'>
                <div className='col-lg-3 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label>Expense Category</label>
                    <div className='row'>
                      <Controller
                        name='catId'
                        control={control}
                        render={({ field: { value, onChange, ref } }) => (
                          <div className='form-group'>
                            <Select
                              ref={ref}
                              value={categoryOptions.find(
                                (x) => x.label === value
                              )}
                              onChange={(e) => onChange(e.value)}
                              options={categoryOptions}
                            />
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className='col-lg-3 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label>Expense Date </label>
                    <Controller
                      name='expenseDate'
                      control={control}
                      render={({ field: { value, onChange, ref } }) => (
                        <div className='input-groupicon'>
                          <DatePicker
                            ref={ref}
                            selected={value}
                            onChange={onChange}
                          />
                          <div className='addonset'>
                            <img src={Calendar} alt='img' />
                          </div>
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className='col-lg-3 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label>Amount</label>
                    <div className='input-groupicon'>
                      <input type='text' {...register('requestAmount')} />

                      <div className='addonset'>₦</div>
                    </div>
                    <div className='invalid-feedback'>
                      {errors?.requestAmount?.message}
                    </div>
                  </div>
                </div>

                <div className='col-lg-12 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label>Expense for</label>
                    <input type='text' {...register('expenseFor')} />
                    <div className='invalid-feedback'>
                      {errors?.expenseFor?.message}
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

export default AddExpense;
