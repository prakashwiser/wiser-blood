"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Update = ({ params }) => {
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    num: "",
  });
  const redirect = useRouter();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    num: Yup.string().required("Number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    repassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`/api/signup/${params.id}`);
      setInitialValues(res.data.products);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleUpdate = async (values, { setSubmitting }) => {
    try {
      await axios.put(`/api/editUser/${params.id}`, values);
      alert("User data updated successfully");
      redirect.push("/dashboard/blooddonor");
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="col-lg-6 mx-auto my-5 p-5 shadow">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleUpdate}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mt-4">
              <Field
                type="text"
                name="name"
                placeholder="Enter user name"
                className="form-control"
              />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>
            <div className="mt-4">
              <Field
                type="text"
                name="email"
                placeholder="Enter email ID"
                className="form-control"
              />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>
            <div className="mt-4">
              <Field
                type="text"
                name="num"
                placeholder="Enter mobile number"
                className="form-control"
              />
              <ErrorMessage name="num" component="div" className="text-danger" />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="btn btn-warning"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Update;
