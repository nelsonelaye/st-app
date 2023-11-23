import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { LoadingAbsolute } from "../../components/Loading";
import { useMutate } from "../../../hooks/useMutate";
import { useGetStores } from "../../../hooks/useGetStore";
import { useState } from "react";
import { Button, message, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";

export const storeType_options = [
  {
    label: "SuperMarket",
    value: 0,
  },
  {
    label: "Pharmacy",
    value: 1,
  },
  {
    label: "Shop",
    value: 2,
  },
  {
    label: "Ventures",
    value: 3,
  },
  {
    label: "Shopping Mall",
    value: 4,
  },
  {
    label: "Restaurants",
    value: 5,
  },
  {
    label: "others",
    value: 6,
  },
];

const AddQuotation = () => {
  const { refetch } = useGetStores();
  const history = useHistory();
  const mutuation = useMutate();
  const [loading, setLoading] = useState(false);

  const goBack = () => {
    history.push({
      pathname: "/store/storelist-all",
    });
  };

  const validationSchema = Yup.object().shape({
    storeName: Yup.string().required("Name is required"),
    storeOwner: Yup.string().required("store owner is required"),
    storeType: Yup.string().required("store type is required"),
    emailAddress: Yup.string(),
    contactPhone: Yup.string(),
    address: Yup.string().required("Address is required"),
    storeWebSiteUrl: Yup.string(),
    coverImage: Yup.string(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const dummyRequest = async ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const props = {
    name: "file",
    multiple: false,
    customRequest: dummyRequest,
    beforeUpload: (info) => {
      if (info) {
        getBase64(info, (url) => {
          setValue("coverImage", url, { shouldValidate: true });
        });
        message.success(`${info.file.name} file selected`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const uploadButton = (
    <div>
      <Button icon={<InboxOutlined />}></Button>
      <div style={{ marginTop: 8 }}>Click to Upload Image</div>
    </div>
  );

  const onSubmit = (data) => {
    setLoading(true);
    mutuation.mutate(
      {
        url: "/v1/StoreManagement/CreateStore",
        method: "POST",
        data: data,
      },
      {
        onSuccess(res) {
          console.log(res);

          if (res.statusCode == 200) {
            const { message } = res;
            toast.success(message);
            refetch();
            history.push({
              pathname: "/store/storelist-all",
            });
          }
          if (res.statusCode == 205) {
            toast.error(res.message);
          }
          setLoading(false);
        },
        onError(err) {
          console.log(err);
          setLoading(false);
          const error_response = err.response.data;
          const errorMsg = error_response.message;
          toast.error(errorMsg);
        },
      }
    );
  };

  const handleSelect = (data) => {
    setValue("storeType", data.value);
  };
  return (
    <>
      <div className="page-wrapper">
        {mutuation.isLoading && <LoadingAbsolute />}
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>Add Store</h4>
              <h6>Add/Update Store</h6>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="form-group">
                      <label>
                        Store Name <span className="manitory">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("storeName")}
                        className={` ${errors.storeName ? "is-invalid" : ""}`}
                        placeholder="Enter store name"
                      />
                      <div className="invalid-feedback">
                        {errors.storeName?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="form-group">
                      <label>
                        Store Owner <span className="manitory">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("storeOwner")}
                        className={` ${errors.storeOwner ? "is-invalid" : ""}`}
                        placeholder="Enter store owner"
                      />
                      <div className="invalid-feedback">
                        {errors.storeOwner?.message}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>
                        Store Type <span className="manitory">*</span>
                      </label>
                      <Select
                        className="select"
                        options={storeType_options}
                        placeholder="Choose Store type"
                        onChange={(val) => handleSelect(val)}
                      />
                      <div className="invalid-feedback">
                        {errors.storeType?.message}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        {...register("contactPhone")}
                        className={` ${
                          errors.contactPhone ? "is-invalid" : ""
                        }`}
                        placeholder="Enter phone number"
                      />
                      <div className="invalid-feedback">
                        {errors.contactPhone?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        type="text"
                        {...register("emailAddress")}
                        className={` ${
                          errors.emailAddress ? "is-invalid" : ""
                        }`}
                        placeholder="Enter email address"
                      />
                      <div className="invalid-feedback">
                        {errors.emailAddress?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Website</label>
                      <input
                        type="text"
                        {...register("storeWebSiteUrl")}
                        className={` ${
                          errors.storeWebSiteUrl ? "is-invalid" : ""
                        }`}
                        placeholder="www.website.com"
                      />
                      <div className="invalid-feedback">
                        {errors.storeWebSiteUrl?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-sm-12 col-12">
                    <div className="form-group">
                      <label>
                        Address <span className="manitory">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("address")}
                        className={` ${errors.address ? "is-invalid" : ""}`}
                        placeholder="Enter business address"
                      />
                      <div className="invalid-feedback">
                        {errors.address?.message}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label> Product Image</label>
                    <Upload {...props} listType="picture-card" name="avatar">
                      {uploadButton}
                    </Upload>
                  </div>
                </div>
                <div className="col-lg-12">
                  <button className="btn btn-submit me-2" type="submit">
                    {loading ? (
                      <div
                        className="spinner-border"
                        style={{ height: "1.2rem", width: "1.2rem" }}
                      ></div>
                    ) : (
                      "Submit"
                    )}
                  </button>
                  <a className="btn btn-cancel" onClick={() => goBack()}>
                    Cancel
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddQuotation;
