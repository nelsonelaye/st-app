import { Plus, DeleteIcon, EditIcon } from '../../EntryFile/imagePath';
import { Table } from 'antd';
import { Controller, useController, useForm } from 'react-hook-form';
import Select from '../../components/Select';
import { addProductVS } from './validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { formatCurrency } from '../../../utils/helpers';

const AddViewProducts = ({
  items,
  setItems,
  grandTotal,
  preview,
  product_list,
}) => {
  const products = (product_list?.data || []).map((x) => ({
    label: x.name,
    value: x,
  }));

  const rArgs = { shouldDirty: true, shouldTouch: true, shouldValidate: true };

  const editRow = (record) => {
    setItems(items.filter((x) => x.productId !== record.productId));
    setValue(
      'product',
      products.find((x) => x.value.id === record.productId),
      rArgs
    );
    setValue('sellingPrice', record.sellingPrice, rArgs);
    setValue('discount', record.discount, rArgs);
    setValue('quantity', record.quantity, rArgs);
    setValue('description', record.description, rArgs);
    setValue('costPrice', record.costPrice, rArgs);
    setValue('totalCost', record.totalCost, rArgs);
    setValue('rowId', record.rowId, rArgs);
  };

  const deleteRow = (productId) => {
    setItems(items.filter((x) => x.productId !== productId));
  };

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'productName',
      render: (text, record) => (
        <div className='productimgname'>
          <div className='product-img' style={{ width: '40px', height: '40p' }}>
            <img alt='' src={record.image} />
          </div>
          <p to={''} style={{ fontSize: '15px', marginLeft: '10px' }}>
            {record.productName}
          </p>
        </div>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      align: 'center',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      align: 'center',
    },
    {
      title: 'Selling Price($)',
      dataIndex: 'sellingPrice',
      render: (text) => <>{formatCurrency(text)}</>,
      align: 'center',
    },
    {
      title: 'Cost Price($)',
      dataIndex: 'costPrice',
      render: (text) => <>{formatCurrency(text)}</>,
      align: 'center',
    },
    {
      title: 'QTY',
      dataIndex: 'quantity',
      align: 'center',
    },
    {
      title: 'Total Cost($)',
      dataIndex: 'totalCost',
      render: (text) => <>{formatCurrency(text)}</>,
      align: 'center',
    },
    !preview
      ? {
          title: 'Options',
          render: (record) => (
            <div className='d-flex gap-7'>
              <button
                className='delete-set'
                to='#'
                onClick={() => editRow(record)}>
                <img src={EditIcon} alt='img' />
              </button>

              <button
                className='delete-set'
                to='#'
                onClick={() => deleteRow(record.productId)}>
                <img src={DeleteIcon} alt='img' />
              </button>
            </div>
          ),
        }
      : {},
  ];

  const generateRowId = () => {
    let id = Math.floor(Math.random() * 100);
    if (items?.some((x) => x.rowId === id)) {
      id = Math.floor(Math.random() * 100);
    }
    return id;
  };

  const addToList = (values) => {
    const product = values.product.value;
    setItems([
      ...items.filter(
        (x) => x.productId !== product.id && x.rowId !== values.rowId
      ),
      {
        productId: product.id,
        image: product.image,
        productName: product.name,
        sellingPrice: values.sellingPrice,
        discount: values.discount,
        costPrice: values.costPrice,
        description: values.description,
        quantity: values.quantity,
        totalCost: values.quantity * values.costPrice,
        rowId: values.rowId || generateRowId(),
      },
    ]);
    reset();
  };

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      costPrice: 0,
      quantity: 1,
      totalCost: 0,
      description: '',
      discount: 0,
      sellingPrice: 0,
      product: undefined,
    },
    resolver: yupResolver(addProductVS),
  });

  const {
    field: { value: quantity },
  } = useController({
    name: 'quantity',
    control,
  });
  const {
    field: { value: costPrice },
  } = useController({
    name: 'costPrice',
    control,
  });
  // const {
  //   field: { value: sellingPrice },
  // } = useController({
  //   name: 'sellingPrice',
  //   control,
  // });

  console.log(errors);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    // console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <>
      <h4 className='pageSubheading'>
        {preview ? 'Products' : 'Add Product(s)'}
      </h4>
      {!preview && (
        <form
          onSubmit={handleSubmit((values) => addToList(values))}
          className='row'>
          <div className='col-lg-3 col-sm-6 col-12 form-group'>
            <label>Product Name</label>
            <Controller
              name='product'
              control={control}
              render={({ field: { onChange, ref, value } }) => (
                <Select
                  ref={ref}
                  placeholder='Search Product by code, select...'
                  value={value}
                  onChange={(e) => {
                    onChange(e);
                    const product = e.value;
                    setValue('costPrice', 0, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                    setValue('sellingPrice', product.unitPrice, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                    setValue('discount', product.discountPercentage, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                    setValue('description', product.description, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                  options={products}
                />
              )}
            />
            <div className='' style={{ color: 'red', fontSize: '12px' }}>
              {errors.product?.message}
            </div>
          </div>

          <div className='col-lg-3 col-sm-6 col-12 form-group'>
            <label>Selling Price</label>
            <input
              disabled
              type='text'
              {...register('sellingPrice')}
              className={` ${errors.sellingPrice ? 'is-invalid' : ''}`}
              placeholder='Select Product to show'
            />
          </div>

          <div className='col-lg-3 col-sm-6 col-12 form-group'>
            <label>Discount</label>
            <input
              disabled
              type='text'
              {...register('discount')}
              className={` ${errors.discount ? 'is-invalid' : ''}`}
              placeholder='Select Product to show'
            />
            <div className='invalid-feedback'>{errors.discount?.message}</div>
          </div>

          <div className='col-lg-3 col-sm-6 col-12 form-group'>
            <label>Quantity</label>
            <input
              type='number'
              {...register('quantity')}
              className={` ${errors.quantity ? 'is-invalid' : ''}`}
              placeholder='Enter quantity'
            />
            <div className='invalid-feedback'>{errors.quantity?.message}</div>
          </div>

          <div className='col-lg-3 col-sm-6 col-12 form-group'>
            <label>Description</label>
            <textarea
              {...register('description')}
              className={` ${errors.description ? 'is-invalid' : ''}`}
              placeholder='Enter decription'
            />
            <div className='invalid-feedback'>
              {errors.description?.message}
            </div>
          </div>

          <div className='col-lg-3 col-sm-6 col-12 form-group'>
            <label>Unit Cost</label>
            <input
              type='number'
              {...register('costPrice')}
              className={` ${errors.costPrice ? 'is-invalid' : ''}`}
              placeholder='Enter unit price'
            />
            <div className='invalid-feedback'>{errors.costPrice?.message}</div>
          </div>

          <div className='col-lg-3 col-sm-6 col-12 form-group'>
            <label>Total Cost</label>
            <input
              disabled
              type='number'
              name='totalCost'
              value={costPrice * quantity}
              onChange={() => {}}
              placeholder='Enter unit price'
            />
          </div>

          <div className='col-lg-3 col-sm-6 col-12 form-group d-flex align-items-center justify-content-center '>
            <button
              disabled={!isValid}
              type='submit'
              className='btn btn-add-text'>
              <span>Add product</span>
              <img src={Plus} alt='img' />
            </button>
          </div>
        </form>
      )}

      <div className='table-responsive'>
        <Table
          columns={columns}
          dataSource={items}
          pagination={false}
          rowKey={(record) => record.productId}
          className='table datanew dataTable no-footer'
          rowSelection={rowSelection}
        />
      </div>

      <div className='row'>
        <div className='col-lg-12 float-md-right'>
          <div className='total-order'>
            <ul>
              {/* <li>
                        <h4>Discount </h4>
                        <h5>$ 0.00</h5>
                      </li> */}
              <li className='total'>
                <h4>Grand Total</h4>
                <h5>{formatCurrency(grandTotal)}</h5>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddViewProducts;
