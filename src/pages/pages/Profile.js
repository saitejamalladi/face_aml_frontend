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
  firstName: "John",
  lastName: "doe",
  email: "john.doe@hotmail.com",
  phoneNumber: "+97123091401824",
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email().required("Required"),
  phoneNumber: Yup.string().required("Required"),
});

function ProfileForm() {
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
                    Profile updated successfully!
                  </Alert>
                )}
              </Grid>
            </Grid>

            {isSubmitting ? (
              <Box display="flex" justifyContent="center" my={6}>
                <CircularProgress />
              </Box>
            ) : (
              <form onSubmit={handleSubmit}>
                <Grid container direction={"column"} spacing={6}>
                  <Grid item xs={12} sm={6}>
                    <Grid container spacing={6}>
                      <Grid item md={6}>
                        <TextField
                          name="firstName"
                          label="First Name"
                          value={values.firstName}
                          error={Boolean(touched.firstName && errors.firstName)}
                          fullWidth
                          helperText={touched.firstName && errors.firstName}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          my={2}
                        />
                      </Grid>
                      <Grid item md={6}>
                        <TextField
                          name="lastName"
                          label="Last Name"
                          value={values.lastName}
                          error={Boolean(touched.lastName && errors.lastName)}
                          fullWidth
                          helperText={touched.lastName && errors.lastName}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          my={2}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="email"
                      label="Email"
                      value={values.email}
                      error={Boolean(touched.email && errors.email)}
                      fullWidth
                      helperText={touched.email && errors.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="email"
                      my={2}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="phone_number"
                      label="Phone Number"
                      value={values.phoneNumber}
                      error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                      fullWidth
                      helperText={touched.email && errors.phoneNumber}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      my={2}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
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

function Profile() {
  return (
    <React.Fragment>
      <Helmet title="Profile" />

      <Typography variant="h3" gutterBottom display="inline">
        Profile
      </Typography>
      <Divider my={6} />

      <ProfileForm />
    </React.Fragment>
  );
}

export default Profile;
