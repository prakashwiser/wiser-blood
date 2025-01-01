"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

const Login = () => {
  const [apiData, setApiData] = useState([]);
  const navigate = useRouter();

  useEffect(() => {
    axios
      .get("https://66f0f85341537919154f06e7.mockapi.io/signup")
      .then((response) => setApiData(response.data))
      .catch(() => toast.error("Error fetching user data"));
  }, []);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required"),
  });

  const handleSubmit = (values) => {
    const { email, password } = values;
    const user = apiData.find((item) => item.email === email);
    if (!user) {
      toast.error("Email not found. Please register first.");
      navigate.push("/signup");
      return;
    }

    if (password !== user.password) {
      toast.warning("Incorrect password. Please try again.");
      return;
    }

    toast.success("Login successful");
    localStorage.setItem("userData", JSON.stringify(user));
    navigate.push("/dashboard/blooddonor");
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center vh-100">
        <Col xs={12} md={6} lg={4}>
          <Card className="shadow-lg border-0 rounded p-4">
            <Card.Body>
              <div className="text-center">
                <h2 className="fw-bold text-success mb-4">Sign in</h2>
              </div>

              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-3">
                      <Field
                        type="email"
                        className="form-control shadow-sm"
                        id="email"
                        name="email"
                        placeholder="Enter Email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger mt-1"
                      />
                    </div>

                    <div className="mb-3">
                      <Field
                        type="password"
                        className="form-control shadow-sm"
                        id="password"
                        name="password"
                        placeholder="Enter Password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger mt-1"
                      />
                    </div>

                    <div className="d-grid gap-2 mt-4">
                      <button
                        type="submit"
                        className="btn btn-success fw-bold shadow-sm"
                      >
                        Sign in
                      </button>
                      <Link
                        href="/signup"
                        className="btn btn-outline-success fw-bold shadow-sm"
                      >
                        Create Account
                      </Link>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
};

export default Login;
