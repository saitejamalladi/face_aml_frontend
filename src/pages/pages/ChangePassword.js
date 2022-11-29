import React from "react";
import styled from "styled-components/macro";

import { Helmet } from "react-helmet-async";

import "../../vendor/roundedBarCharts";

import {
  Box,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  CircularProgress,
  Divider as MuiDivider,
  Grid as MuiGrid,
  TextField,
  Typography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

import { Alert as MuiAlert } from "@material-ui/lab";

import { Formik } from "formik";
import * as Yup from "yup";

const timeOut = (time) => new Promise((res) => setTimeout(res, time));

const Button = styled(MuiButton)(spacing);

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Alert = styled(MuiAlert)(spacing);

const Grid = styled(MuiGrid)(spacing);

const initialValues = {
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object().shape({
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
});

function PasswordForm() {
  const handleSubmit = async (
    values,
    { resetForm, setErrors, setStatus, setSubmitting }
  ) => {
    try {
      await timeOut(1500);
      resetForm();
      setStatus({ sent: true });
      setSubmitting(false);
    } catch (error) {
      setStatus({ sent: false });
      setErrors({ submit: error.message });
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
        status,
      }) => (
        <Card mb={6}>
          <CardContent>
            <Grid container direction={"column"} spacing={6}>
              <Grid item xs={12} sm={6}>
                {status && status.sent && (
                  <Alert severity="success" my={3}>
                    Password changed successfully!
                  </Alert>
                )}
              </Grid>
            </Grid>

            {isSubmitting ? (
              <Grid container direction={"column"} spacing={6}>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" justifyContent="center" my={6}>
                    <CircularProgress />
                  </Box>
                </Grid>
              </Grid>
            ) : (
              <form onSubmit={handleSubmit}>
                <Grid container direction={"column"} spacing={4}>
                  <Grid item md={6}>
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
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      name="confirmPassword"
                      label="Confirm password"
                      value={values.confirmPassword}
                      error={Boolean(
                        touched.confirmPassword && errors.confirmPassword
                      )}
                      fullWidth
                      helperText={
                        touched.confirmPassword && errors.confirmPassword
                      }
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      my={2}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      mt={3}
                    >
                      Save changes
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </CardContent>
        </Card>
      )}
    </Formik>
  );
}

function ChangePassword() {
  return (
    <React.Fragment>
      <Helmet title="Password" />
      <Grid justify="space-between" container spacing={4}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Change Password
          </Typography>
        </Grid>
      </Grid>
      <Divider my={6} />
      <PasswordForm />
    </React.Fragment>
  );
}

export default ChangePassword;
