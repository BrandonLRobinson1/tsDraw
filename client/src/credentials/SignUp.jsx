import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

// TODO: rename and move
const apiRoute = "http://localhost:3100";
const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Valid Email address is required")
      .email("Valid Email address is required"),
    password: yup
      .string()
      .required("Please enter your password")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    // setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const signUpSumbit = async (userCredentials) => {
    setIsLoading(true);
    try {
      const { email, password } = userCredentials;

      const body = JSON.stringify({ email, password });

      const config = {
        headers: {
          "Content-Type": "application/JSON",
        },
      };

      const data = await axios.post(`${apiRoute}/register`, body, config);
      const { status } = data;

      // console.log("status: ", status);
      // console.log("data: ", data);
      // setIsLoading(false);
    } catch (e) {
      const { response } = e;
      setIsLoading(false);
      if (response.status === 500) {
        toast.error("Cannot reach server");
      }
      toast.error(response.data.message);
    }
  };

  if (isLoading)
    // if (true)
    return (
      <div className="app-container">
        <FontAwesomeIcon
          className="App-logo"
          size="sm"
          icon={solid("spinner")}
        />
      </div>
    );

  return (
    <div className="app-container">
      <form className="credentials-box" onSubmit={handleSubmit(signUpSumbit)}>
        <div className="credentials-header">
          <div className="credentials-header-icon">
            <FontAwesomeIcon size="2x" icon={solid("user-secret")} />
          </div>
          <div className="credentials-header-title">Sign Up</div>
        </div>
        <div className="credentials-input-body">
          <div className="credentials-input-body-section">
            <Controller
              name="email"
              control={control}
              // defaultValue=""
              defaultValue="fakeEmail@gmail.com"
              render={({ field: { onChange, value } }) => (
                <input
                  onChange={(text) => onChange(text)}
                  value={value}
                  placeholder="Email Address"
                  className="credentials-input"
                />
              )}
            />
            <div className="error-text-email">
              {errors.email ? errors.email.message : <span>&nbsp;</span>}
            </div>
          </div>
          <div className="credentials-input-body-section">
            <Controller
              name="password"
              control={control}
              // defaultValue=""
              defaultValue="Brandonr82!"
              render={({ field: { onChange, value } }) => (
                <input
                  onChange={(text) => onChange(text)}
                  value={value}
                  type="password"
                  placeholder="Password"
                  className="credentials-input"
                />
              )}
            />
            <div className="error-text-pw">
              {errors.password ? errors.password.message : <span>&nbsp;</span>}
            </div>
          </div>
        </div>
        <div className="credentials-button-section">
          <button className="credentials-button" type="submit">
            Sumbit
          </button>
          <div className="help-text">Forgot your password?</div>
        </div>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        draggable
        pauseOnHover
        limit={1}
      />
    </div>
  );
};

export default SignUp;
