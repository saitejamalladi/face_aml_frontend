import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";
import * as Yup from "yup";
import { Formik } from "formik";
import { signUp } from "../../redux/actions/authActions";

import {
  Button,
  Paper,
  TextField as MuiTextField,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { Alert as MuiAlert } from "@material-ui/lab";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)}px;

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)}px;
  }
`;

const BrandTitle = styled(Typography)`
  text-transform: uppercase;
  color: orange;
  font-size: 24px;
  text-align: center;
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
`;

function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Wrapper>
      <Helmet title="Sign Up" />

      <BrandTitle variant="body1" gutterBottom>
        IOT Management Group
      </BrandTitle>
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        Get started
      </Typography>
      <Typography component="h2" variant="body1" align="center">
        Register a new Super Admin
      </Typography>

      <Formik
        initialValues={{
          name: "",
          company: "",
          email: "",
          password: "",
          confirmPassword: "",
          address: "",
          submit: false,
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required("Name is required"),
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          password: Yup.string()
            .min(5, "Must be at least 5 characters")
            .max(15, "Must be at least 15 characters")
            .required("Required"),
          confirmPassword: Yup.string().when("password", {
            is: (val) => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
              [Yup.ref("password")],
              "Both password need to be the same"
            ),
          }),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await dispatch(
              signUp({
                name: "test",
                company: "test",
                email: values.email,
                password: values.password,
                address: values.address,
              })
            );
            history.push("/");
          } catch (error) {
            const message = error.message || "Something went wrong";

            setStatus({ success: false });
            setErrors({ submit: message });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            {errors.submit && (
              <Alert mt={2} mb={1} severity="warning">
                {errors.submit}
              </Alert>
            )}
            <TextField
              type="text"
              name="name"
              label="Name"
              value={values.name}
              error={Boolean(touched.name && errors.name)}
              fullWidth
              helperText={touched.name && errors.name}
              onBlur={handleBlur}
              onChange={handleChange}
              my={3}
            />
            <TextField
              type="text"
              name="company"
              label="Company"
              value={values.company}
              error={Boolean(touched.company && errors.company)}
              fullWidth
              helperText={touched.company && errors.company}
              onBlur={handleBlur}
              onChange={handleChange}
              my={3}
            />
            <TextField
              type="email"
              name="email"
              label="Email Address"
              value={values.email}
              error={Boolean(touched.email && errors.email)}
              fullWidth
              helperText={touched.email && errors.email}
              onBlur={handleBlur}
              onChange={handleChange}
              my={3}
            />
            <TextField
              type="password"
              name="password"
              label="Password"
              value={values.password}
              error={Boolean(touched.password && errors.password)}
              fullWidth
              helperText={touched.password && errors.password}
              onBlur={handleBlur}
              onChange={handleChange}
              my={3}
            />
            <TextField
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              value={values.confirmPassword}
              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
              fullWidth
              helperText={touched.confirmPassword && errors.confirmPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              my={3}
            />
            <TextField
              type="text"
              name="address"
              label="Address"
              value={values.address}
              error={Boolean(touched.address && errors.address)}
              fullWidth
              helperText={touched.address && errors.address}
              onBlur={handleBlur}
              onChange={handleChange}
              my={3}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Sign up
            </Button>
            <Button
              component={Link}
              to="/"
              fullWidth
              color="primary"
            >
              Already have account? Log in
            </Button>
          </form>
        )}
      </Formik>
    </Wrapper>
  );
}

export default SignUp;
