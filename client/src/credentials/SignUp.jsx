import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./index.css";

const SignUp = () => {
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

  const signUpSumbit = () => console.log("gh");

  return (
    <div className="container">
      <form
        className="credentials-container"
        onSubmit={handleSubmit(signUpSumbit)}
      >
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value } }) => (
            <input
              onChange={(text) => onChange(text)}
              value={value}
              placeholder="Email Address"
              className="credentials-input-body-section-input"
            />
          )}
        />
        {errors.email ? errors.email.message : <span>&nbsp;</span>}

        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value } }) => (
            <input
              onChange={(text) => onChange(text)}
              value={value}
              placeholder="Password"
              className="credentials-input-body-section-input"
            />
          )}
        />
        {errors.password ? errors.password.message : <span>&nbsp;</span>}
      </form>
    </div>
  );
};

export default SignUp;
