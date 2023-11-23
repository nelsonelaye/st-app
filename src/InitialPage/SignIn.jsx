/* eslint-disable react/prop-types */
import { useState } from "react";
import { LoginImage, SalesTrackLogo, MailIcon } from "../EntryFile/imagePath";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

import { useMutate } from "../../hooks/useMutate";
import useAuthContext from "../../hooks/useAuth";

const SignInPage = (props) => {
  const [eye, seteye] = useState(true);
  const [loading, setLoading] = useState(false);
  const mutuation = useMutate();
  const { handleSetToken, setCurrentUser } = useAuthContext();

  const onEyeClick = () => {
    seteye(!eye);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must not exceed 20 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    setLoading(true);
    mutuation.mutate(
      {
        url: "/v1/ManageUsers/Login",
        method: "POST",
        data: data,
      },
      {
        onSuccess(res) {
          if (res.statusCode == 200) {
            const { data } = res;
            handleSetToken(data.authToken);

            setCurrentUser(data.accountDetails);
            const jsonArray = JSON.stringify(data.userAccessItems.accessItems);
            Cookies.set("access", jsonArray);
            props.history.push("dashboard");
          }
          if (res.statusCode == 205) {
            toast.error(res.message);
            setLoading(false);
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

  return (
    <>
      <div className="main-wrapper">
        <Helmet>
          <title>SignIn - SalesTrack</title>
          <meta name="description" content="SignIn page" />
        </Helmet>
        <div className="account-content">
          <div className="login-wrapper">
            <div className="login-content">
              <div className="login-userset">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="login-logo">
                    <img src={SalesTrackLogo} alt="img" />
                  </div>
                  <div className="login-userheading">
                    <h3>Sign In</h3>
                    <h4>Please login to your account</h4>
                  </div>
                  <div className="form-login">
                    <label>Email</label>
                    <div className="form-addons">
                      <input
                        type="text"
                        {...register("email")}
                        className={` ${errors.email ? "is-invalid" : ""}`}
                        placeholder="Enter your email address"
                      />
                      <img src={MailIcon} alt="img" />
                      <div className="invalid-feedback">
                        {errors.email?.message}
                      </div>
                    </div>
                  </div>
                  <div className="form-login">
                    <label>Password</label>
                    <div className="pass-group">
                      <input
                        type={eye ? "password" : "text"}
                        className={` ${errors.password ? "is-invalid" : ""}`}
                        placeholder="Enter your password"
                        {...register("password")}
                      />
                      <span
                        onClick={onEyeClick}
                        className={`fas toggle-password ${
                          eye ? "fa-eye-slash" : "fa-eye"
                        } `}
                      />
                      <div className="invalid-feedback">
                        {errors.password?.message}
                      </div>
                    </div>
                  </div>
                  {/* <div className='form-login'>
                    <div className='alreadyuser'>
                      <h4>
                        <Link to='/forgetPassword' className='hover-a'>
                          Forgot Password?
                        </Link>
                      </h4>
                    </div>
                  </div> */}
                  <div className="form-login">
                    <button className="btn btn-login">
                      {loading ? (
                        <div className="spinner-border"></div>
                      ) : (
                        "Sign In"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="login-img">
              <img src={LoginImage} alt="img" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
