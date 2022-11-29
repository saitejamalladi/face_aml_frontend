import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";
import * as Yup from "yup";
import { Formik } from "formik";
import { resetPassword } from "../../redux/actions/authActions";

import {
  Button,
  Paper,
  TextField as MuiTextField,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { Alert as MuiAlert } from "@material-ui/lab";
import { Link } from "react-router-dom";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)}px;

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)}px;
  }
`;

function ResetPassword() {
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <Helmet title="Reset Password" />

      <Typography component="h1" variant="h4" align="center" gutterBottom>
        Reset Password
      </Typography>
      <Typography component="h2" variant="body1" align="center">
        Enter your username to reset your password
      </Typography>
      <Formik
        initialValues={{
          username: "",
          password: "",
          confirmPassword: "",
          submit: false,
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required("Username is required"),
          password: Yup.string()
            .min(5, "Must be at least 5 characters")
            .max(15, "Must be at most 15 characters")
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
              resetPassword({
                username: values.username,
                password: values.password,
                confirm_password: values.confirmPassword,
              })
            );
            const message = "Password Changed";
            setStatus({ success: true });
            setErrors({ success: true, submit: message });
            setSubmitting(false);
          } catch (error) {
            const message =
              error.message ||
              "Something went wrong, Please check your username";

            setStatus({ success: false });
            setErrors({ success: false, submit: message });
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
            {errors.submit &&
              (errors.success ? (
                <Alert mt={2} mb={1} severity="success">
                  {errors.submit}
                </Alert>
              ) : (
                <Alert mt={2} mb={1} severity="warning">
                  {errors.submit}
                </Alert>
              ))}
            <TextField
              type="text"
              name="username"
              label="Username"
              value={values.username}
              error={Boolean(touched.username && errors.username)}
              fullWidth
              helperText={touched.username && errors.username}
              onBlur={handleBlur}
              onChange={handleChange}
              my={3}
            />
            <TextField
              name="password"
              label="Password"
              value={values.password}
              error={Boolean(touched.password && errors.password)}
              fullWidth
              helperText={touched.password && errors.password}
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              my={2}
            />
            <TextField
              name="confirmPassword"
              label="Confirm password"
              value={values.confirmPassword}
              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
              fullWidth
              helperText={touched.confirmPassword && errors.confirmPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              my={2}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Reset password
            </Button>
            <Button
              component={Link}
              to="/auth/sign-in"
              fullWidth
              color="primary"
            >
              Sign in
            </Button>
          </form>
        )}
      </Formik>
    </Wrapper>
  );
}

export default ResetPassword;
