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
  FormControl as MuiFormControl,
  Grid as MuiGrid,
  InputLabel,
  MenuItem,
  Paper,
  Select as MuiSelect,
  TextField,
  Typography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

import { Alert as MuiAlert } from "@material-ui/lab";

import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const timeOut = (time) => new Promise((res) => setTimeout(res, time));

const Button = styled(MuiButton)(spacing);

const Card = styled(MuiCard)(spacing);

const Alert = styled(MuiAlert)(spacing);

const FormControlSpacing = styled(MuiFormControl)(spacing);

const FormControl = styled(FormControlSpacing)`
  min-width: 148px;
`;

const BrandTitle = styled(Typography)`
  text-transform: uppercase;
  color: orange;
  font-size: 24px;
  text-align: center;
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
`;

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)}px;

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)}px;
  }
`;

const Select = styled(MuiSelect)(spacing);

const Grid = styled(MuiGrid)(spacing);

const initialValues = {
  role: "Public",
  companyName: "",
  region: "",
  firstName: "",
  timeZone: "AWST",
  lastName: "",
  country: "AUS",
  username: "",
  state: "",
  email: "",
  city: "",
  phoneNumber: "",
  address1: "",
  address2: "",
  password: "",
  confirmPassword: "",
  postalCode: "",
};

const validationSchema = Yup.object().shape({
  role: Yup.string().required("Required"),
  companyName: Yup.string().required("Required"),
  region: Yup.string().required("Required"),
  firstName: Yup.string().required("Required"),
  timezone: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  username: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  email: Yup.string().email().required("Required"),
  phoneNumber: Yup.string().required("Required"),
  password: Yup.string()
    .min(5, "Must be at least 5 characters")
    .max(255)
    .required("Required"),
  confirmPassword: Yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "Both password need to be the same"
    ),
  }),
  postalCode: Yup.string().required("Required"),
});

function PublicRegisterForm() {
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
              <Grid item>
                {status && status.sent && (
                  <Alert severity="success" my={3}>
                    User added successfully!
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
                <Grid container spacing={4}>
                  <Grid item md={12}>
                    <FormControl style={{ minWidth: "50%" }}>
                      <InputLabel htmlFor="role">User Role</InputLabel>
                      <Select
                        value={values.role}
                        onChange={handleChange}
                        inputProps={{
                          name: "role",
                          id: "role",
                          readOnly: true,
                        }}
                      >
                        <MenuItem value="Public">Public</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      name="companyName"
                      label="Company Name"
                      value={values.companyName}
                      error={Boolean(touched.companyName && errors.companyName)}
                      fullWidth
                      helperText={touched.companyName && errors.companyName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      my={2}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <FormControl style={{ minWidth: "100%" }}>
                      <InputLabel htmlFor="region">Region</InputLabel>
                      <Select
                        value={values.region}
                        onChange={handleChange}
                        inputProps={{
                          name: "region",
                          id: "region",
                        }}
                      >
                        <MenuItem value="Australia">Australia</MenuItem>
                        <MenuItem value="New south wales">
                          New south wales
                        </MenuItem>
                        <MenuItem value="Western australia">
                          Western australia
                        </MenuItem>
                        <MenuItem value="Pertha">Pertha</MenuItem>
                        <MenuItem value="Rockingham">Rockingham</MenuItem>
                        <MenuItem value="Freemantle">Freemantle</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
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
                    <FormControl style={{ minWidth: "100%" }}>
                      <InputLabel htmlFor="timezone">Timezone</InputLabel>
                      <Select
                        value={values.timezone}
                        onChange={handleChange}
                        inputProps={{
                          name: "timezone",
                          id: "timezone",
                        }}
                      >
                        <MenuItem value="AEST">
                          Australian Eastern Standard Time (AEST UTC+10)
                        </MenuItem>
                        <MenuItem value="ACST">
                          Australian Central Standard Time (ACST UTC+9.5)
                        </MenuItem>
                        <MenuItem value="AWST">
                          Australian Western Standard Time (AWST UTC+8)
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item sm={6}>
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
                  <Grid item md={6}>
                    <FormControl style={{ minWidth: "100%" }}>
                      <InputLabel htmlFor="country">Country</InputLabel>
                      <Select
                        value={values.country}
                        onChange={handleChange}
                        inputProps={{
                          name: "country",
                          id: "country",
                        }}
                      >
                        <MenuItem value="AUS">Australia</MenuItem>
                        <MenuItem value="SG">Singapore</MenuItem>
                        <MenuItem value="MY">Malaysia</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item sm={6}>
                    <TextField
                      name="username"
                      label="Username"
                      value={values.username}
                      error={Boolean(touched.username && errors.username)}
                      fullWidth
                      helperText={touched.username && errors.username}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      my={2}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <FormControl style={{ minWidth: "100%" }}>
                      <InputLabel htmlFor="state">State</InputLabel>
                      <Select
                        value={values.state}
                        onChange={handleChange}
                        inputProps={{
                          name: "state",
                          id: "state",
                        }}
                      >
                        <MenuItem value="New South Wales">
                          New South Wales
                        </MenuItem>
                        <MenuItem value="Queensland">Queensland</MenuItem>
                        <MenuItem value="South Australia">
                          South Australia
                        </MenuItem>
                        <MenuItem value="Tasmania">Tasmania</MenuItem>
                        <MenuItem value="Victoria">Victoria</MenuItem>
                        <MenuItem value="Western Australia">
                          Western Australia
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      name="email"
                      label="Email Address"
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
                  <Grid item md={6}>
                    <TextField
                      name="city"
                      label="City"
                      value={values.city}
                      error={Boolean(touched.city && errors.city)}
                      fullWidth
                      helperText={touched.city && errors.city}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      my={2}
                    />
                  </Grid>
                  <Grid item md={6}>
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
                  <Grid item md={6}>
                    <TextField
                      name="address1"
                      label="Address 1"
                      value={values.city}
                      error={Boolean(touched.address1 && errors.address1)}
                      fullWidth
                      helperText={touched.address1 && errors.address1}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      my={2}
                    />
                  </Grid>
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
                      name="address2"
                      label="Address 2"
                      value={values.city}
                      error={Boolean(touched.address2 && errors.address2)}
                      fullWidth
                      helperText={touched.address2 && errors.address2}
                      onBlur={handleBlur}
                      onChange={handleChange}
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
                  <Grid item md={6}>
                    <TextField
                      name="postalCode"
                      label="Post Code"
                      value={values.city}
                      error={Boolean(touched.postalCode && errors.postalCode)}
                      fullWidth
                      helperText={touched.postalCode && errors.postalCode}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      my={2}
                    />
                  </Grid>
                  <Grid item xs={12}>
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

function SignUp() {
  return (
    <Wrapper>
      <Helmet title="Users" />
      <BrandTitle variant="body1" gutterBottom>
        IOT Management Group
      </BrandTitle>
      <Typography component="h2" variant="body1" align="center">
        Register a new Public/Individual
      </Typography>
      <PublicRegisterForm />
    </Wrapper>
  );
}

export default SignUp;
