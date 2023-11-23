import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { LoadingAbsolute } from "../../components/Loading";
import { useMutate } from "../../../hooks/useMutate";
import { useEffect, useState } from "react";
import { Button, message, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { storeType_options } from "../Store/AddStore";
import { useGetEcommerceSetup } from "../../../hooks/useGetEcommerce";
import { useCurrentUserProfile } from "../../../hooks/useGetProfile";

const payment_methods = [
  {
    label: "Paystack",
    value: 0,
  },
  {
    label: "Bank",
    value: 1,
  },
  {
    label: "USD",
    value: 2,
  },
  {
    label: "Card",
    value: 3,
  },
];

const yes_no = [
  {
    label: "Yes",
    value: "Yes",
  },
  {
    label: "No",
    value: "No",
  },
];
const currencies = [
  {
    label: "Naira",
    value: "Naira",
  },
  {
    label: "USD",
    value: "USD",
  },
];

const Ecommerce = () => {
  // const { refetch } = useGetStores();
  const history = useHistory();
  const mutuation = useMutate();
  const [loading, setLoading] = useState(false);
  const { profile } = useCurrentUserProfile();
  const [isESetup, setIsESetup] = useState(false);
  const [eCommerceDetails, setECommerceDetails] = useState(false);
  const { ecommerce_details } = useGetEcommerceSetup();
  console.log(ecommerce_details);
  const goBack = () => {
    history.push({
      pathname: "/store/storelist-all",
    });
  };

  const validationSchema = Yup.object().shape({
    domainName: Yup.string().required("Name is required"),

    siteLogo: Yup.string(),
    siteHero: Yup.string().required("heroHeadline is required"),
    siteBanner: Yup.string(),
    businessDescription: Yup.string().required(
      "business description is required"
    ),
    supportEmail: Yup.string().required("Email address is required"),
    fbPage: Yup.string().required("facebook is required"),
    igHandle: Yup.string().required("instagram is required"),
    twitterHandle: Yup.string().required("twitter is required"),
    linkedinHandle: Yup.string(),
    tiktokHandle: Yup.string().required("tiktok is required"),
    storeId: Yup.number().required("store type is required"),
    defaultCurrency: Yup.string().required("payment currency is required"),
    address: Yup.string().required("Address is required"),
    refundPolicy: Yup.string(),
    termsOfUse: Yup.string(),
    homeDelivery: Yup.string(),
    paymentMethod: Yup.number().required("payment method is required"),
    deliveryVendor: Yup.string(),
    affiliation: Yup.string(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: ecommerce_details?.data,
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

  // const convertBase64ToImage = (base64String) => {
  //   const img = new Image();
  //   img.src = base64String;
  //   img.alt = "Converted Image";

  //   // Display the image by updating the state
  //   // setBase64String(img.src);

  //   return img.src;
  // };

  const logoProps = {
    name: "file",
    multiple: false,
    defaultFileList: [
      {
        uid: "1",
        name: "defaultImage.png",
        status: "done",
        url: eCommerceDetails?.siteLogo,
      },
    ],
    customRequest: dummyRequest,
    beforeUpload: (info) => {
      if (info) {
        getBase64(info, (url) => {
          setValue("siteLogo", url, { shouldValidate: true });
        });
        message.success(`${info.file.name} file selected`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const bannerProps = {
    name: "file",
    multiple: false,
    defaultFileList: [
      {
        uid: "1",
        name: "defaultBanner.png",
        status: "done",
        url: eCommerceDetails?.siteBanner,
      },
    ],
    customRequest: dummyRequest,
    beforeUpload: (info) => {
      if (info) {
        getBase64(info, (url) => {
          setValue("siteBanner", url, { shouldValidate: true });
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
    console.log(data);

    setLoading(true);
    mutuation.mutate(
      {
        url: "/v1/EcommerceManagement/Setup-ecommerce",
        method: "POST",
        data: data,
      },
      {
        onSuccess(res) {
          console.log(res);

          if (res.statusCode == 200) {
            const { message } = res;
            toast.success(message);

            history.push({
              pathname: "/dashboard",
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

  const handleSelect = (key, data) => {
    setValue(key, data.value);
  };

  useEffect(() => {
    if (profile?.data?.isEcommerceSetup && ecommerce_details?.data) {
      setIsESetup(true);
      setECommerceDetails(ecommerce_details?.data);
    } else {
      setIsESetup(false);
    }
  }, [profile, ecommerce_details]);
  return (
    <>
      <div className="page-wrapper">
        {mutuation.isLoading && <LoadingAbsolute />}
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>E-commerce</h4>
              <h6>
                {isESetup
                  ? "View e-Commerce details"
                  : "Create e-commerce store"}
              </h6>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="form-group">
                      <label>
                        Subdomain <span className="manitory">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("domainName")}
                        defaultValue={eCommerceDetails.domainName}
                        disabled={isESetup && true}
                        className={` ${errors.domainName ? "is-invalid" : ""}`}
                        placeholder="Enter store subdomain"
                      />
                      <div className="invalid-feedback">
                        {errors.domainName?.message}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        type="text"
                        {...register("supportEmail")}
                        defaultValue={eCommerceDetails.supportEmail}
                        disabled={isESetup && true}
                        className={` ${
                          errors.supportEmail ? "is-invalid" : ""
                        }`}
                        placeholder="Enter email address"
                      />
                      <div className="invalid-feedback">
                        {errors.supportEmail?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Store Address</label>
                      <input
                        type="text"
                        {...register("address")}
                        defaultValue={eCommerceDetails.address}
                        disabled={isESetup && true}
                        className={` ${errors.address ? "is-invalid" : ""}`}
                        placeholder="Enter store address"
                      />
                      <div className="invalid-feedback">
                        {errors.address?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-sm-12 col-12">
                    <div className="form-group">
                      <label>
                        Hero headline <span className="manitory">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("siteHero")}
                        defaultValue={eCommerceDetails.siteHero}
                        disabled={isESetup && true}
                        className={` ${errors.siteHero ? "is-invalid" : ""}`}
                        placeholder="Enter headline on landing page"
                      />
                      <div className="invalid-feedback">
                        {errors.siteHero?.message}
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
                        defaultValue={storeType_options.filter(
                          (option) => option.value === eCommerceDetails.storeId
                        )}
                        placeholder="Choose Store type"
                        onChange={(val) => handleSelect("storeId", val)}
                        isDisabled={isESetup && true}
                      />
                      <div className="invalid-feedback">
                        {errors.storeId?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>
                        Business Description <span className="manitory">*</span>
                      </label>
                      <textarea
                        {...register("businessDescription")}
                        defaultValue={eCommerceDetails.businessDescription}
                        disabled={isESetup && true}
                        className={` ${
                          errors.businessDescription ? "is-invalid" : ""
                        } form-control`}
                      />
                      <div className="invalid-feedback">
                        {errors.businessDescription?.message}
                      </div>
                    </div>
                  </div>

                  {/* dropdown select inputs */}

                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>
                        Did you offer Home Delivery{" "}
                        <span className="manitory">*</span>
                      </label>
                      <Select
                        className="select"
                        options={[
                          ...yes_no,
                          {
                            label: "Later",
                            value: "Later",
                          },
                        ]}
                        placeholder=""
                        onChange={(val) => handleSelect("homeDelivery", val)}
                        isDisabled={isESetup && true}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>
                        Did You have Delivery Vendors{" "}
                        <span className="manitory">*</span>
                      </label>
                      <Select
                        className="select"
                        options={[
                          ...yes_no,
                          {
                            label: "Link me up",
                            value: "Link me up",
                          },
                        ]}
                        placeholder=""
                        onChange={(val) => handleSelect("deliveryVendor", val)}
                        defaultValue={eCommerceDetails.deliveryVendor}
                        isDisabled={isESetup && true}
                      />
                    </div>
                  </div>
                  <div
                    className="col-lg-3 col-sm-6 col-12"
                    style={{
                      width: "fit-content",
                    }}
                  >
                    <div className="form-group">
                      <label>
                        Did you have affliated Logistic/Delivery Company{" "}
                        <span className="manitory">*</span>
                      </label>
                      <Select
                        className="select"
                        options={yes_no}
                        placeholder=""
                        onChange={(val) => handleSelect("affiliation", val)}
                        isDisabled={isESetup && true}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>
                        Payment method <span className="manitory">*</span>
                      </label>
                      <Select
                        className="select"
                        options={payment_methods}
                        placeholder="Choose payment method"
                        onChange={(val) => handleSelect("paymentMethod", val)}
                        isDisabled={isESetup && true}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>
                        Payment Currency <span className="manitory">*</span>
                      </label>
                      <Select
                        className="select"
                        options={currencies}
                        placeholder="Choose payment currency"
                        onChange={(val) => handleSelect("defaultCurrency", val)}
                        isDisabled={isESetup && true}
                      />
                    </div>
                  </div>

                  {/* Social handles */}

                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="form-group">
                      <label>
                        Facebook <span className="manitory">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("fbPage")}
                        className={` ${errors.fbPage ? "is-invalid" : ""}`}
                        placeholder="Enter Facebook handle"
                        defaultValue={eCommerceDetails.fbPage}
                        disabled={isESetup && true}
                      />
                      <div className="invalid-feedback">
                        {errors.fbPage?.message}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="form-group">
                      <label>
                        Instagram <span className="manitory">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("igHandle")}
                        className={` ${errors.igHandle ? "is-invalid" : ""}`}
                        placeholder="Enter Instagram handle"
                        defaultValue={eCommerceDetails.igHandle}
                        disabled={isESetup && true}
                      />
                      <div className="invalid-feedback">
                        {errors.igHandle?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="form-group">
                      <label>
                        LinkedIn <span className="manitory">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("linkedinHandle")}
                        defaultValue={eCommerceDetails.linkedinHandle}
                        disabled={isESetup && true}
                        className={` ${
                          errors.linkedinHandle ? "is-invalid" : ""
                        }`}
                        placeholder="Enter your LinkedIn handle"
                      />
                      <div className="invalid-feedback">
                        {errors.linkedinHandle?.message}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="form-group">
                      <label>
                        Twitter <span className="manitory">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("twitterHandle")}
                        defaultValue={eCommerceDetails.twitterHandle}
                        disabled={isESetup && true}
                        className={` ${
                          errors.twitterHandle ? "is-invalid" : ""
                        }`}
                        placeholder="Enter Twitter handle"
                      />
                      <div className="invalid-feedback">
                        {errors.twitterHandle?.message}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="form-group">
                      <label>
                        TikTok <span className="manitory">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("tiktokHandle")}
                        defaultValue={eCommerceDetails.tiktokHandle}
                        disabled={isESetup && true}
                        className={` ${
                          errors.tiktokHandle ? "is-invalid" : ""
                        }`}
                        placeholder="Enter TikTok handle"
                      />
                      <div className="invalid-feedback">
                        {errors.tiktokHandle?.message}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>
                        Refund Policy <span className="manitory">*</span>
                      </label>
                      <textarea
                        defaultValue={eCommerceDetails.refundPolicy}
                        disabled={isESetup && true}
                        {...register("refundPolicy")}
                        className={` ${
                          errors.refundPolicy ? "is-invalid" : ""
                        } form-control`}
                      />
                      <div className="invalid-feedback">
                        {errors.refundPolicy?.message}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>
                        Term of Use Policy <span className="manitory">*</span>
                      </label>
                      <textarea
                        defaultValue={eCommerceDetails.termsOfUse}
                        disabled={isESetup && true}
                        {...register("termsOfUse")}
                        className={` ${
                          errors.termsOfUse ? "is-invalid" : ""
                        } form-control`}
                      />
                      <div className="invalid-feedback">
                        {errors.termsOfUse?.message}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Logo</label>
                    <Upload
                      {...logoProps}
                      listType="picture-card"
                      name="avatar"
                    >
                      {uploadButton}
                    </Upload>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label> Store banner</label>
                    <Upload
                      {...bannerProps}
                      listType="picture-card"
                      name="avatar"
                    >
                      {uploadButton}
                    </Upload>
                  </div>
                </div>

                {!isESetup && (
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
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ecommerce;
