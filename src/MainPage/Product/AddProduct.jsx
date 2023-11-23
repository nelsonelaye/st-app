import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Select from "react-select";
import { useEffect, useState } from "react";
import { InputNumber } from "antd";
import {
  useMainCategory,
  useSubCategoryMain,
} from "../../../hooks/useProductCategory";
import { useMutate } from "../../../hooks/useMutate";
import { convertArray, convertStore } from "../../../utils/convertArray";
import { useBrandList } from "../../../hooks/useBrandList";
import { useGetStores } from "../../../hooks/useGetStore";
import { useProductList } from "../../../hooks/useProductList";
import UploadComponent from "../../components/UploadComponent";

const AddProduct = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [mainId, setMainId] = useState("");
  const { main_categories } = useMainCategory();
  const { brand_list } = useBrandList();
  const { all_stores } = useGetStores();
  const { subcatergories, refetch_subcategories } = useSubCategoryMain(mainId);

  const main_cat_option = convertArray(main_categories?.data);
  const subCategories_Option = convertArray(subcatergories?.data);
  const brand_option = convertArray(brand_list?.data);
  const store_option = convertStore(all_stores?.data);

  const { refetch_list } = useProductList();
  const mutuation = useMutate();

  useEffect(() => {
    if (mainId !== "") {
      refetch_subcategories();
    }
  }, [mainId, refetch_subcategories]);

  const goBack = () => {
    history.push({
      pathname: "/product/productlist-product",
    });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    categoryId: Yup.string().required("Category is required"),
    subcategoryId: Yup.string(),
    brandId: Yup.string(),
    storeId: Yup.string().required("Store Name is required"),
    sku: Yup.string(),
    unitPrice: Yup.number().required("Price is required"),
    bulkPrice: Yup.number(),
    description: Yup.string(),
    serialNumber: Yup.string(),
    expiredDate: Yup.string(),
    status: Yup.boolean().required("status is required"),
    discountPercentage: Yup.string(),
    barCode: Yup.string(),
    qrCode: Yup.string(),
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

  const options = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];

  const handleSelect = (data, type) => {
    if (type === "categoryId") {
      setValue("subcategoryId", "", { shouldValidate: true });
      setMainId(data.value);
    }
    setValue(type, data.value, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    setLoading(true);
    const formData = {
      name: data?.name,
      categoryId: data?.categoryId,
      subcategoryId: data?.subcategoryId || 0,
      brandId: data?.brandId || 0,
      storeId: data?.storeId,
      sku: data?.sku,
      unitPrice: data?.unitPrice,
      bulkPrice: data?.bulkPrice,
      description: data?.description,
      unitInStock: data?.unitInStock,
      serialNumber: data?.serialNumber,
      expiredDate: new Date(data?.expiredDate + "T00:00:00Z").toISOString(),

      quantity: data?.quantity,
      status: data?.status,
      id: data?.id,
      discountPercentage: data?.discountPercentage || 0,
      barCode: data?.barCode,
      qrCode: data?.qrCode,
      image: data?.image || "No imge added",
      productCode: data?.productCode,
      createdBy: data?.createdBy,
    };
    console.log(formData);
    mutuation.mutate(
      {
        url: "/v1/Product/AddNew",
        method: "POST",
        data: formData,
      },
      {
        onSuccess(res) {
          if (res.statusCode == 200) {
            const { message } = res;
            toast.success(message);
            refetch_list();
            history.push({
              pathname: "/product/productlist-product",
            });
          }
          if (res.statusCode == 205) {
            setLoading(false);
            toast.error(res.message);
          }
        },
        onError(err) {
          setLoading(false);
          const error_response = err.response.data;
          const errorMsg = error_response.Message;
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
      <>
        <div className="page-wrapper">
          <div className="content">
            <div className="page-header">
              <div className="page-title">
                <h4 className="bold">Add New Product</h4>
                <h6 className="bold">Create new product</h6>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label>
                          Product Name <span className="manitory">*</span>
                        </label>
                        <input
                          type="text"
                          {...register("name")}
                          className={` ${errors.name ? "is-invalid" : ""}`}
                          placeholder="Enter product name"
                        />
                        <div className="invalid-feedback">
                          {errors.name?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label>
                          Category <span className="manitory">*</span>
                        </label>
                        <Select
                          className="select"
                          options={main_cat_option}
                          placeholder="Choose Category"
                          onChange={(val) => handleSelect(val, "categoryId")}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label>Sub Category</label>
                        <Select
                          className="select"
                          defaultInputValue=""
                          options={subCategories_Option}
                          placeholder="Choose Sub Category"
                          onChange={(val) => handleSelect(val, "subcategoryId")}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label>Brand</label>
                        <Select
                          className="select"
                          options={brand_option}
                          placeholder="Choose Brand"
                          onChange={(val) => handleSelect(val, "brandId")}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label>
                          Store <span className="manitory">*</span>
                        </label>
                        <Select
                          className="select"
                          options={store_option}
                          placeholder="Choose Store"
                          onChange={(val) => handleSelect(val, "storeId")}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label>SKU</label>
                        <input
                          type="text"
                          {...register("sku")}
                          className={` ${errors.sku ? "is-invalid" : ""}`}
                        />
                        <div className="invalid-feedback">
                          {errors.sku?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label>
                          Unit Sales Price <span className="manitory">*</span>
                        </label>
                        <InputNumber
                          className={` ${
                            errors.unitPrice ? "is-invalid" : ""
                          } form-control`}
                          placeholder="0.00"
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
                        <label>Bulk Sales Price</label>
                        <InputNumber
                          className={` ${
                            errors.bulkPrice ? "is-invalid" : ""
                          } form-control`}
                          placeholder="0.00"
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
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Description</label>
                        <textarea
                          defaultValue={""}
                          {...register("description")}
                          className={` ${
                            errors.description ? "is-invalid" : ""
                          } form-control`}
                        />
                        <div className="invalid-feedback">
                          {errors.description?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label>Discount Percentage</label>
                        <input
                          type="text"
                          {...register("discountPercentage")}
                          className={` ${
                            errors.discountPercentage ? "is-invalid" : ""
                          } form-control`}
                          placeholder=""
                        />
                        <div className="invalid-feedback">
                          {errors.discountPercentage?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label>Barcode</label>
                        <input
                          type="text"
                          {...register("barCode")}
                          className={` ${errors.barCode ? "is-invalid" : ""}`}
                          placeholder=""
                        />
                        <div className="invalid-feedback">
                          {errors.barCode?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label>
                          Product Available <span className="manitory">*</span>
                        </label>
                        <Select
                          className="select"
                          options={options}
                          placeholder="Choose status"
                          onChange={(val) => handleSelect(val, "status")}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label>QR Code</label>
                        <input
                          type="text"
                          {...register("qrCode")}
                          className={` ${errors.qrCode ? "is-invalid" : ""}`}
                          placeholder=""
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
                          {...register("serialNumber")}
                          className={` ${
                            errors.serialNumber ? "is-invalid" : ""
                          }`}
                          placeholder=""
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
                          className={` ${
                            errors.expiredDate ? "is-invalid" : ""
                          }`}
                          placeholder=""
                        />
                        <div className="invalid-feedback">
                          {errors.expiredDate?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Product Image</label>
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
                    <div className="col-lg-12">
                      <button className="btn btn-submit me-2">
                        {loading ? (
                          <div
                            className="spinner-border"
                            style={{ height: "1.2rem", width: "1.2rem" }}
                          ></div>
                        ) : (
                          "Create"
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
    </>
  );
};
export default AddProduct;
