import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../lib/context/AuthContext";
import { baseUrl } from "../../lib/static";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const LogIn = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Valid Email address is required")
      .email("Valid Email address is required"),
    password: yup.string().required("Please enter your password"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    // setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const logInSumbit = async (userCredentials) => {
    try {
      const { email, password } = userCredentials;

      const body = JSON.stringify({ email, password });

      const config = {
        headers: {
          "Content-Type": "application/JSON",
        },
        withCredentials: "include",
      };

      const response = await axios.post(`${baseUrl}/login`, body, config);

      const token = response.data.accessToken;

      localStorage.setItem("tsToken", JSON.stringify(token));

      if (!token) {
        toast.error("Uh-oh. Something went wrong!");
      }

      setIsAuthenticated(true);

      navigate("/main");
    } catch (e) {
      const { response } = e;

      if (response.status === 500) {
        toast.error("Cannot reach server");
      }
      toast.error("Uh oh, something went wrong!");
    }
  };

  return (
    <div className="app-container">
      <form className="credentials-box" onSubmit={handleSubmit(logInSumbit)}>
        <div className="credentials-header">
          <div className="credentials-header-icon">
            <FontAwesomeIcon size="2x" icon={solid("lock")} />
          </div>
          <div className="credentials-header-title">Log In</div>
        </div>
        <div className="credentials-input-body">
          <div className="credentials-input-body-section">
            <Controller
              name="email"
              control={control}
              defaultValue=""
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
              defaultValue=""
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
        pauseOnFocusLoss
        limit={1}
      />
    </div>
  );
};

export default LogIn;
