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
import { useMutate } from '../../../hooks/useMutate';
import { Loading, LoadingAbsolute } from '../../components/Loading';
import {
  useGetInventory,
  useGetInventoryList,
} from '../../../hooks/useGetInventory';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert2';
import { useProductList } from '../../../hooks/useProductList';

const rArgs = { shouldDirty: true, shouldTouch: true, shouldValidate: true };

const Component = ({ data, refetch, preview, product_list }) => {
  const history = useHistory();
  const { supplier_list } = useGetSupplierList();
  const suppliers = (supplier_list?.data || []).map((x) => ({
    label: x.name,
    value: x.id,
  }));

  const {
    register,
    handleSubmit,
    setValue,
    control,
    // reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      ...data,
      purchaseDate: data?.purchaseDate && new Date(data.purchaseDate),
      supplierCompanyName: data?.supplierName,
    },
    resolver: yupResolver(validationSchema),
  });

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

  const { refetch_list } = useGetInventoryList();

  const updateInventory = (values) => {
    const { purchaseDate, itemCount, ...rest } = values;

    mutation.mutate(
      {
        url: `/v1/Inventory/UpdateInventory`,
        method: 'PUT',
        data: {
          purchaseDate: getDateStr(purchaseDate),
          itemCount: rest?.items?.length || itemCount,
          ...rest,
        },
      },
      {
        onSuccess(res) {
          // console.log(res)
          if (res.statusCode == 200) {
            const { message } = res;
            toast.success(message);
            refetch_list();
            refetch();
            history.push({
              pathname: '/inventory/inventorylist',
            });
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

  const approveInventory = () => {
    mutation.mutate(
      {
        url: `/v1/Inventory/ApproveInventory?Id=${data.id}&ReceiptNo=${data.receiptNo}`,
        method: 'POST',
        // data: {},
      },
      {
        onSuccess(res) {
          // console.log(res)
          if (res.statusCode == 200) {
            const { message } = res;
            toast.success(message);
            refetch_list();
            refetch();
            history.push({
              pathname: '/inventory/inventorylist',
            });
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

  const confirmApprove = async () => {
    const { value } = await swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: !0,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve it!',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn btn-danger ml-1',
      buttonsStyling: !1,
    });
    if (value) approveInventory();
  };

  return (
    <>
      <div className='page-wrapper'>
        {mutation.isLoading && <LoadingAbsolute />}
        <div className='content'>
          <div className='page-header'>
            <div className='page-title'>
              <h4>Inventory Update</h4>
              <h6>Add/Update Inventory</h6>
            </div>

            {data?.status !== 'Approved' && (
              <div>
                <button
                  onClick={() => confirmApprove()}
                  className='btn btn-submit py-2'
                  to=''>
                  Approve
                </button>
              </div>
            )}
          </div>
          <div className='card'>
            <div className='card-body'>
              <form
                id='main'
                onSubmit={handleSubmit(updateInventory)}
                className='row'>
                <div className='col-lg-3 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label>Supplier Name</label>
                    <Controller
                      name='supplierName'
                      control={control}
                      render={({ field: { onChange, ref, value } }) => (
                        <Select
                          isDisabled={preview}
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
                      disabled={preview}
                      type='text'
                      {...register('receiptNo')}
                      className={` ${errors.receiptNo ? 'is-invalid' : ''}`}
                      placeholder='Enter supplier'
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
                            disabled={preview}
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
                preview={preview}
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
                  setValue('grandTotalAmount', grandTotal, rArgs);
                  setValue('items', items, rArgs);
                }}
              />

              <div className='row'>
                <div className='col-lg-12'>
                  {!preview && (
                    <button
                      form='main'
                      type='submit'
                      className='btn btn-submit me-2'
                      disabled={!isDirty}>
                      Submit
                    </button>
                  )}
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

const AddPurchase = ({ preview }) => {
  const receiptNo = useParams()?.id;
  const { inventory, isLoading, refetch } = useGetInventory(receiptNo);
  const { product_list, isLoading: Ploading } = useProductList();

  if (isLoading || Ploading) return <Loading />;

  return (
    <Component
      data={inventory?.data}
      refetch={refetch}
      preview={preview}
      product_list={product_list}
    />
  );
};

export default AddPurchase;
