import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Select from "react-select";
import toast from "react-hot-toast";

import { useMutate } from "../../../hooks/useMutate";
import { useGetStores } from "../../../hooks/useGetStore";
import { useState } from "react";
import UploadComponent from "../../components/UploadComponent";
import { storeType_options } from "./AddStore";

const EditStore = () => {
  const { refetch } = useGetStores();
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const mutuation = useMutate();

  const goBack = () => {
    history.push({
      pathname: "/store/storelist-all",
    });
  };

  const validationSchema = Yup.object().shape({
    storeName: Yup.string().required("Name is required"),
    storeOwner: Yup.string().required("store owner is required"),
    storeType: Yup.string().required("store type is required"),
    emailAddress: Yup.string().required("email is required"),
    contactPhone: Yup.string().required("phone is required"),
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

  const onSubmit = (data) => {
    const formdata = {
      storeName: data.storeName,
      storeOwner: data.storeOwner,
      emailAddress: data.emailAddress,
      contactPhone: data.contactPhone,
      address: data.address,
      storeWebSiteUrl: data.storeWebSiteUrl,
      coverImage: data.coverImage || location.state.coverImage,
      storeTag: location.state.storeTag,
    };
    setLoading(true);
    mutuation.mutate(
      {
        url: `/v1/StoreManagement/Update-Store/${location.state.storeId}`,
        method: "PUT",
        data: formdata,
      },
      {
        onSuccess(res) {
          if (res.statusCode == 200) {
            const { message } = res;
            toast.success(message);
            refetch();
            history.push({
              pathname: "/store/storelist-all",
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

  const handleSelect = (data) => {
    setValue("storeType", data.value);
  };
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>Edit Store</h4>
              <h6>Add/Update Store</h6>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-lg-4 col-sm-6 col-12">
                      <div className="form-group">
                        <label>Store Name</label>
                        <input
                          type="text"
                          defaultValue={location?.state.storeName}
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
                        <label>Store Owner</label>
                        <input
                          type="text"
                          defaultValue={location?.state.storeOwner}
                          {...register("storeOwner")}
                          className={` ${
                            errors.storeOwner ? "is-invalid" : ""
                          }`}
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
                          defaultValue={location?.state.contactPhone}
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
                          defaultValue={location?.state.emailAddress}
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
                          defaultValue={location?.state.storeWebSiteUrl}
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
                        <label>Address</label>
                        <input
                          type="text"
                          defaultValue={location?.state.address}
                          {...register("address")}
                          className={` ${errors.address ? "is-invalid" : ""}`}
                          placeholder="Enter business address"
                        />
                        <div className="invalid-feedback">
                          {errors.address?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label> Profile Picture</label>
                        <div className="col-lg-3">
                          <div className="image-upload">
                            <img src={location?.state.coverImage} alt="img" />
                          </div>
                        </div>
                        <UploadComponent
                          setValue={setValue}
                          value={"coverImage"}
                        />
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
                          "Submit"
                        )}
                      </button>
                      <a className="btn btn-cancel" onClick={() => goBack()}>
                        Cancel
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditStore;
