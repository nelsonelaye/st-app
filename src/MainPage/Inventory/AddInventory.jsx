import { Calendar } from '../../EntryFile/imagePath';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from '../../components/Select';
import { Controller, useController, useForm } from 'react-hook-form';
import { validationSchema } from './validation';
import { useGetSupplierList } from '../../../hooks/useGetSupplier';
import { useHistory } from 'react-router-dom';
import AddViewProducts from './AddViewProducts';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { useMutate } from '../../../hooks/useMutate';
import { LoadingAbsolute } from '../../components/Loading';
import { useProductList } from '../../../hooks/useProductList';

const AddPurchase = () => {
  const history = useHistory();
  const { supplier_list, isLoading } = useGetSupplierList();
  const suppliers = (supplier_list?.data || []).map((x) => ({
    label: x.name,
    value: x.id,
  }));
  const { product_list, isLoading: pLoading } = useProductList();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      items: [],
      purchaseDate: new Date(),
      receiptNo: '',
      grandTotalAmount: 0,
    },
    resolver: yupResolver(validationSchema),
  });

  // console.log(errors);

  const {
    field: { value: items },
  } = useController({
    name: 'items',
    control,
  });

  const {
    field: { value: grandTotalAmount },
  } = useController({
    name: 'grandTotalAmount',
    control,
  });

  const qc = useQueryClient();

  const mutation = useMutate();

  const getDateStr = (input) => {
    const date = new Date(input);
    return (
      date.getFullYear() +
      '-' +
      ('00' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + date.getDate()).slice(-2) +
      'T' +
      ('00' + date.getHours()).slice(-2) +
      ':' +
      ('00' + date.getMinutes()).slice(-2) +
      ':' +
      ('00' + date.getSeconds()).slice(-2)
    );
  };

  const addInventory = (values) => {
    const { purchaseDate, ...rest } = values;

    mutation.mutate(
      {
        url: `/v1/Inventory/TakeNewInventory`,
        method: 'POST',
        data: {
          purchaseDate: getDateStr(purchaseDate),
          ...rest,
        },
      },
      {
        onSuccess(res) {
          if (res.statusCode == 200) {
            toast.success(res.message);
            qc.refetchQueries({ queryKey: ['all-inventories'] });
            history.push({
              pathname: '/inventory/inventorylist',
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
      {(mutation.isLoading || isLoading || pLoading) && <LoadingAbsolute />}
      <div className='page-wrapper'>
        <div className='content'>
          <div className='page-header'>
            <div className='page-title'>
              <h4>Inventory Add</h4>
              <h6>Add/Update Inventory</h6>
            </div>
          </div>
          <div className='card'>
            <div className='card-body'>
              <form
                id='main'
                onSubmit={handleSubmit(addInventory)}
                className='row'>
                <div className='col-lg-3 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label>Supplier Name</label>
                    <Controller
                      name='supplierName'
                      control={control}
                      render={({ field: { onChange, ref, value } }) => (
                        <Select
                          ref={ref}
                          value={suppliers.find((x) => x.label === value)}
                          onChange={(e) => {
                            setValue('supplierCompanyName', e?.label, {
                              shouldDirty: true,
                              shouldValidate: true,
                            });
                            setValue('supplierId', e?.value, {
                              shouldDirty: true,
                              shouldValidate: true,
                            });
                            onChange(e.label);
                          }}
                          options={suppliers}
                        />
                      )}
                    />
                    <div className='invalid-feedback'>
                      {errors.supplierName?.message}
                    </div>
                  </div>
                </div>

                <div className='col-lg-3 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label>Supplier CompanyName</label>
                    <input
                      disabled
                      type='text'
                      {...register('supplierCompanyName')}
                      className={` ${
                        errors.supplierCompanyName ? 'is-invalid' : ''
                      }`}
                      placeholder='Enter supplier'
                    />
                    <div className='invalid-feedback'>
                      {errors.supplierCompanyName?.message}
                    </div>
                  </div>
                </div>

                <div className='col-lg-3 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label>Receipt No</label>
                    <input
                      type='text'
                      {...register('receiptNo')}
                      className={` ${errors.receiptNo ? 'is-invalid' : ''}`}
                      placeholder='Enter receipt no'
                    />
                    <div className='invalid-feedback'>
                      {errors.receiptNo?.message}
                    </div>
                  </div>
                </div>

                <div className='col-lg-3 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label>Purchase Date </label>
                    <div className='input-groupicon'>
                      <Controller
                        name='purchaseDate'
                        control={control}
                        render={({ field: { onChange, ref, value } }) => (
                          <DatePicker
                            ref={ref}
                            selected={value}
                            onChange={onChange}
                          />
                        )}
                      />
                      <div className='addonset'>
                        <img src={Calendar} alt='img' />
                      </div>
                    </div>
                  </div>
                </div>
              </form>

              <div className='border-bottom my-2' />

              <AddViewProducts
                product_list={product_list}
                items={items}
                grandTotal={grandTotalAmount}
                setItems={(items) => {
                  const grandTotal = (() => {
                    let sum = 0;
                    for (const value of items) {
                      sum += value.totalCost;
                    }
                    return sum;
                  })();
                  setValue('grandTotalAmount', grandTotal);
                  setValue('items', items);
                }}
              />

              <div className='row'>
                <div className='col-lg-12'>
                  <button
                    form='main'
                    type='submit'
                    className='btn btn-submit me-2'
                    // disabled={!isDirty}
                  >
                    Submit
                  </button>
                  <button
                    // to={'/inventory/inventorylist'}
                    onClick={() => history.goBack()}
                    className='btn btn-cancel'>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPurchase;
