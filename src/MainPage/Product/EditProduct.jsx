import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";

import { useLocation, useHistory } from "react-router-dom";
import {
  useMainCategory,
  useSubCategory,
} from "../../../hooks/useProductCategory";
import { useBrandList } from "../../../hooks/useBrandList";
import { useState } from "react";
import { useMutate } from "../../../hooks/useMutate";
import { useGetStores } from "../../../hooks/useGetStore";
import UploadComponent from "../../components/UploadComponent";
import { useProductList } from "../../../hooks/useProductList";
import { useEffect } from "react";
import { InputNumber } from "antd";

const EditProduct = () => {
  const location = useLocation();
  const history = useHistory();
  const mutuation = useMutate();
  const productInfo = location?.state;

  const [loading, setLoading] = useState(false);
  const { main_categories } = useMainCategory();
  const { sub_categories } = useSubCategory();
  const { brand_list } = useBrandList();
  const { all_stores } = useGetStores();
  const { refetch_list } = useProductList();

  const categoryOptions = main_categories?.data;
  const subcategoryOptions = sub_categories?.data;
  const brandOptions = brand_list?.data;
  const storeOptions = all_stores?.data;

  const goBack = () => {
    history.push({
      pathname: "/product/productlist-product",
    });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    category: Yup.string().required("category is required"),
    subcategory: Yup.string().required("sub category is required"),
    brandId: Yup.number().required("Brand Name is required"),
    storeName: Yup.string().required("Store Name is required"),
    sku: Yup.string().required("sku is required"),
    unitPrice: Yup.number().required("Price is required"),
    bulkPrice: Yup.number().required("Bulk price is required"),
    description: Yup.string(),
    unitInStock: Yup.number().required("Initial quantity is required"),
    serialNumber: Yup.string(),
    expiredDate: Yup.string(),
    quantity: Yup.string().required("quantity is required"),
    status: Yup.boolean().required("status is required"),
    discountPercentage: Yup.string(),
    barCode: Yup.string(),
    qrCode: Yup.string(),
    image: Yup.string().required("Image required"),
    id: Yup.number().required("Required"),
    productCode: Yup.string().required("Required"),
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
      name: productInfo?.name,
      categoryId: productInfo?.categoryId,
      subcategoryId: productInfo?.subcategoryId,
      brandName: productInfo?.brandName,
      storeName: productInfo?.storeName,
      sku: productInfo?.sku,
      unitPrice: productInfo?.unitPrice,
      bulkPrice: productInfo?.bulkPrice,
      description: productInfo?.description,
      unitInStock: productInfo?.unitInStock,
      serialNumber: productInfo?.serialNumber,
      expiredDate: productInfo?.expiredDate,
      quantity: productInfo?.quantity,
      status: productInfo?.status,
      storeId: productInfo?.storeId,
      id: productInfo?.id,
      discountPercentage: productInfo?.discountPercentage,
      barCode: productInfo?.barCode,
      qrCode: productInfo?.qrCode,
      image: productInfo?.image,
      productCode: productInfo?.productCode,
      createdBy: productInfo?.createdBy,
    });
  }, [reset, productInfo]);

  const onSubmit = (data) => {
    setLoading(true);
    mutuation.mutate(
      {
        url: "/v1/Product/Update",
        method: "PUT",
        data: {
          ...data,
          expiredDate: new Date(data.expiredDate + "T00:00:00Z").toISOString(),
        },
      },
      {
        onSuccess(res) {
          if (res.statusCode == 200) {
            const { message } = res;
            refetch_list();
            toast.success(message);
            history.push({
              pathname: "/product/productlist-product",
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

  const onChange = (value) => {
    setValue("unitPrice", value, { shouldValidate: true });
  };

  const onChange2 = (value) => {
    setValue("bulkPrice", value, { shouldValidate: true });
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>Product Edit</h4>
              <h6>Update your product</h6>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Product Name</label>
                      <input
                        type="text"
                        defaultValue={location?.state.name}
                        {...register("name")}
                        className={` ${errors.name ? "is-invalid" : ""}`}
                      />
                      <div className="invalid-feedback">
                        {errors.name?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Category</label>
                      {categoryOptions && (
                        <select
                          {...register("category")}
                          defaultValue={location?.state.categoryId}
                          className={` ${errors.category ? "is-invalid" : ""}`}
                        >
                          {categoryOptions?.map(({ id, name }) => {
                            return (
                              <option value={name} key={id}>
                                {name}
                              </option>
                            );
                          })}
                        </select>
                      )}
                      <div className="invalid-feedback">
                        {errors.category?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Sub Category</label>
                      {subcategoryOptions && (
                        <select
                          {...register("subcategory")}
                          defaultValue={location?.state.subcategory}
                          className={` ${
                            errors.subcategory ? "is-invalid" : ""
                          }`}
                        >
                          {subcategoryOptions?.map(({ id, name }) => {
                            return (
                              <option value={name} key={id}>
                                {name}
                              </option>
                            );
                          })}
                        </select>
                      )}
                      <div className="invalid-feedback">
                        {errors.subcategory?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Select Brand</label>
                      {brandOptions && (
                        <select
                          {...register("brandId")}
                          defaultValue={location?.state.brandId}
                          className={` ${errors.brandName ? "is-invalid" : ""}`}
                        >
                          {brandOptions?.map(({ id, name }) => {
                            return (
                              <option value={id} key={id}>
                                {name}
                              </option>
                            );
                          })}
                        </select>
                      )}
                      <div className="invalid-feedback">
                        {errors.brandId?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Store</label>
                      {storeOptions && (
                        <select
                          {...register("storeName")}
                          defaultValue={location?.state.storeName}
                          className={` ${errors.storeName ? "is-invalid" : ""}`}
                        >
                          {storeOptions?.map(({ storeId, storeName }) => {
                            return (
                              <option value={storeName} key={storeId}>
                                {storeName}
                              </option>
                            );
                          })}
                        </select>
                      )}
                      <div className="invalid-feedback">
                        {errors.storeName?.message}
                      </div>
                    </div>
                  </div>
                  {/* <div className='col-lg-3 col-sm-6 col-12'>
                    <div className='form-group'>
                      <label>Unit in stock</label>
                      <input
                        type='text'
                        defaultValue={location?.state?.unitInStock}
                        {...register('unitInStock')}
                        className={` ${errors.unitInStock ? 'is-invalid' : ''}`}
                      />
                      <div className='invalid-feedback'>
                        {errors.unitInStock?.message}
                      </div>
                    </div>
                  </div> */}
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>SKU</label>
                      <input
                        type="text"
                        defaultValue={location?.state?.sku}
                        {...register("sku")}
                        className={` ${errors.sku ? "is-invalid" : ""}`}
                      />
                      <div className="invalid-feedback">
                        {errors.sku?.message}
                      </div>
                    </div>
                  </div>
                  {/* <div className='col-lg-3 col-sm-6 col-12'>
                    <div className='form-group'>
                      <label>Quantity</label>
                      <input
                        type='text'
                        defaultValue={location?.state?.quantity}
                        {...register('quantity')}
                        className={` ${errors.quantity ? 'is-invalid' : ''}`}
                      />
                      <div className='invalid-feedback'>
                        {errors.quantity?.message}
                      </div>
                    </div>
                  </div> */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        defaultValue={location?.state?.description}
                        {...register("description")}
                        className={` ${
                          errors.description ? "is-invalid" : ""
                        }, form-control`}
                      />
                      <div className="invalid-feedback">
                        {errors.description?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Discount</label>
                      <input
                        type="text"
                        defaultValue={location?.state?.discountPercentage}
                        {...register("discountPercentage")}
                        className={` ${
                          errors.discountPercentage ? "is-invalid" : ""
                        }`}
                      />
                      <div className="invalid-feedback">
                        {errors.discountPercentage?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Price</label>
                      <InputNumber
                        className={` ${
                          errors.unitPrice ? "is-invalid" : ""
                        } form-control`}
                        defaultValue={location?.state.unitPrice}
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        onChange={onChange}
                      />
                      <div className="invalid-feedback">
                        {errors.unitPrice?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Bulk Price</label>
                      <InputNumber
                        className={` ${
                          errors.bulkPrice ? "is-invalid" : ""
                        } form-control`}
                        defaultValue={location?.state.bulkPrice}
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        onChange={onChange2}
                      />
                      <div className="invalid-feedback">
                        {errors.bulkPrice?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label> Status</label>
                      <select
                        {...register("status")}
                        defaultValue={location?.state?.status}
                        className={` ${errors.status ? "is-invalid" : ""}`}
                      >
                        <option value="">Select status</option>
                        <option value="true">Active</option>
                        <option value="false">In-Active</option>
                      </select>
                      <div className="invalid-feedback">
                        {errors.status?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Barcode</label>
                      <input
                        type="text"
                        defaultValue={location?.state?.barCode}
                        {...register("barCode")}
                        className={` ${errors.barCode ? "is-invalid" : ""}`}
                      />
                      <div className="invalid-feedback">
                        {errors.barCode?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>QR Code</label>
                      <input
                        type="text"
                        defaultValue={location?.state?.qrCode}
                        {...register("qrCode")}
                        className={` ${errors.qrCode ? "is-invalid" : ""}`}
                      />
                      <div className="invalid-feedback">
                        {errors.qrCode?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Serial Number</label>
                      <input
                        type="text"
                        defaultValue={location?.state?.serialNumber}
                        {...register("serialNumber")}
                        className={` ${
                          errors.serialNumber ? "is-invalid" : ""
                        }`}
                      />
                      <div className="invalid-feedback">
                        {errors.serialNumber?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Expiring Date</label>
                      <input
                        type="date"
                        {...register("expiredDate")}
                        className={` ${errors.expiredDate ? "is-invalid" : ""}`}
                        placeholder=""
                      />
                      <div className="invalid-feedback">
                        {errors.expiredDate?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label> Product Image</label>
                      <UploadComponent
                        setValue={setValue}
                        value={"image"}
                        errors={errors}
                      />
                      <div className="invalid-feedback">
                        {errors.image?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="product-list">
                      <ul className="row">
                        <li>
                          <div className="productviews">
                            <div className="productviewsimg">
                              <img src={location?.state.image} alt="img" />
                            </div>
                            <div className="productviewscontent">
                              <div className="productviewsname">
                                <h2>{location?.state.name}</h2>
                                {/* <h3>581kb</h3> */}
                              </div>
                              <a href="javascript:void(0);" className="hideset">
                                x
                              </a>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <button className="btn btn-submit me-2">
                      {loading ? (
                        <div
                          className="spinner-border"
                          style={{ height: "1.2rem", width: "1.2rem" }}
                        ></div>
                      ) : (
                        "Update"
                      )}
                    </button>
                    <a onClick={() => goBack()} className="btn btn-cancel">
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

export default EditProduct;
