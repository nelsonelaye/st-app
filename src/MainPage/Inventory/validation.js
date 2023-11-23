import * as Yup from 'yup';

export const addProductVS = Yup.object().shape({
  product: Yup.object()
    .shape({
      id: Yup.number(),
      name: Yup.string(),
      image: Yup.string(),
      description: Yup.string(),
      unitPrice: Yup.number(),
      discountPercentage: Yup.number(),
    })
    .default(undefined)
    .required('required'),
  description: Yup.string().required('required'),
  costPrice: Yup.number()
    .min(0, 'required')
    .lessThan(Yup.ref('sellingPrice'), 'You need to update the product price')
    .typeError('Cost required'),
  quantity: Yup.number().typeError('quantity required'),
  discountPercentage: Yup.number(),
  sellingPrice: Yup.number(),
  totalCost: Yup.number(),
});

export const validationSchema = Yup.object().shape({
  supplierId: Yup.number().required('required'),
  supplierName: Yup.string().required('required'),
  receiptNo: Yup.string().required('required'),
  purchaseDate: Yup.string().required('required'),
  items: Yup.array(
    Yup.object().shape({
      productId: Yup.number(),
      description: Yup.string().required('required'),
      costPrice: Yup.number()
        .min(1, 'required')
        .typeError('cost price required'),
      quantity: Yup.number().typeError('quantity required'),
      discountPercentage: Yup.number(),
      sellingPrice: Yup.number(),
      totalCost: Yup.number(),
    })
  ),
  grandTotalAmount: Yup.number().required('required'),
});
