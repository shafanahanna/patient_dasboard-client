import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import instance from "../axios/axios_instance";
import { ClipLoader } from "react-spinners"; 

const AdminLogin = ({ setIsAdmin }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await instance.post("/auth/login", {
          username: values.username,
          password: values.password,
        });

        if (response.data.status === "success" && response.data.data) {
          const token = response.data.data;
          setIsAdmin(true);
          localStorage.setItem("token", token);
          navigate("/dashboard");
        } else {
          setErrors({ password: "Invalid credentials" });
        }
      } catch (error) {
        console.error(error);
        setErrors({ password: "An error occurred during login. Please try again." });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-teal-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Admin Login
        </h2>

        {formik.errors.password && (
          <p className="text-red-500 text-center mb-4">{formik.errors.password}</p>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border ${
                formik.touched.username && formik.errors.username
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200`}
              placeholder="Enter your username"
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-500 text-sm">{formik.errors.username}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200`}
              placeholder="Enter your password"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className={`w-full py-2 bg-teal-600 text-white font-semibold rounded-lg ${
              formik.isSubmitting
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-teal-700"
            } transition duration-200 ease-in-out transform hover:scale-105 flex items-center justify-center`}
          >
            {formik.isSubmitting ? (
              <ClipLoader
                color="#ffffff" 
                loading={formik.isSubmitting} 
                size={20} 
                className="mr-2" 
              />
            ) : null}
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
