import React from "react";
import * as Yup from "yup";

import { Formik } from "formik";

import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

let initialValues = {};
  
const validateType = (isEdit) => {

  let validationSchema;
  if(isEdit){
    validationSchema = Yup.object().shape({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email().required("Required")
    });
  }else{
    validationSchema = Yup.object().shape({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email().required("Required"),
      username: Yup.string().required("Required"),
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
    });
  }

  return validationSchema;
}


export const UserForm = (props) => {
    const dispatch = useDispatch();
    const scale = useSelector((state) => state.scaleReducer);
    const validationSchema = validateType(props.isEdit);
    if(props.user){

      let addresses = [];
      if(props.user.address){
        addresses = props.user.address.split(",");
      }

      initialValues = {
        firstName: props.user.first_name,
        lastName: props.user.last_name,
        email: props.user.email,
        accountId: props.user.account,
        address: addresses[0],
        address2: addresses[1],
        role: props.user.role,
     };
    }
    else
    {
      initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        address: "",
        address2: "",
        role: "role",
      }
    }
    
    const handleSubmit = async (
      values,
      { resetForm, setErrors, setStatus, setSubmitting }
    ) => {
      try {
        let userForm;
        if(props.isEdit){
          userForm = {
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            address: values.address,
            address2: values.address2,
            role: values.role,
            id_users : props.user.id_user
          };
        }
        else
        {
          let accountStack = scale.accountStack;
          if(accountStack.length <= 0) {
            return alert("Please select the account");
          }
          let selectedAccount = accountStack[accountStack.length - 1];
          userForm = {
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            username: values.username,
            password: values.password,
            confirm_password: values.confirmPassword,
            address: values.address,
            address2: values.address2,
            account_id: selectedAccount.account_id,
            role: values.role
          };
        }
        await dispatch(props.event(userForm));
        resetForm();
        setStatus({ sent: true });
        setSubmitting(false);
        if(props.setUser){
          props.setUser({});
        }
      } catch (error) {
        setStatus({ sent: false });
        setErrors({ submit: error.message });
        setSubmitting(false);
      }
    };
  
    return (
      <React.Fragment>
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
                      (!props.isEdit ?  <Alert severity="success" my={3}>
                      User added successfully!
                    </Alert> : <Alert severity="success" my={3}>
                      User edited successfully!
                    </Alert>)
                     
                    )}
                    {status && !status.sent && (
                       (!props.isEdit ?  <Alert severity="error" my={3}>
                       User addition failed!
                     </Alert> : <Alert severity="error" my={3}>
                       User edit failed!
                     </Alert>)
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
                      {!props.isEdit && (
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
                      </Grid>)}
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
                      {!props.isEdit && (
                        <React.Fragment>
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
                      </React.Fragment>)}

                      <Grid item md={6}>
                        <TextField
                          name="address"
                          label="Address 1"
                          value={values.address}
                          error={Boolean(touched.address && errors.address)}
                          fullWidth
                          helperText={touched.address && errors.address}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          my={2}
                        />
                      </Grid>
                      <Grid item md={6}>
                        <TextField
                          name="address2"
                          label="Address 2"
                          value={values.address2}
                          error={Boolean(touched.address2 && errors.address2)}
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          my={2}
                        />
                      </Grid>
                      <Grid item md={6}>
                        <Select
                          name="role"
                          label="role"
                          value={values.role}
                          error={Boolean(values.role === "role")}
                          helpertext={touched.role && errors.role}
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                        >
                          <MenuItem  
                            value={"role"}>
                              Role
                          </MenuItem>
                          <MenuItem  
                            value={"administrator"}>
                              Administrator
                          </MenuItem>
                          <MenuItem  
                            value={"manager"}>
                              Manager
                          </MenuItem>
                          <MenuItem  
                            value={"user"}>
                              User
                          </MenuItem>
                        </Select>
                                
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          mt={3}
                        >
                          {props.buttonText}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </CardContent>
            </Card>
          )}
        </Formik>
      </React.Fragment>
    );
  }

  export default UserForm;