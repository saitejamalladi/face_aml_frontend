import React, { useEffect, useState } from "react";
import * as Yup from "yup";

import { Formik } from "formik";

import { DatePicker } from "@material-ui/pickers";

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

import { addMealCount } from "../redux/actions/scaleActions";
import moment from "moment";
import { fetchLocations } from "../services/scaleService";
import { AUTH_TOKEN } from "../constants";

let initialValues = {
  mealCountType: "guest",
  mandayTotalCount: 100,
  mandayFunctionCount: 100,
  guestBreakfastCount: 100,
  guestLunchCount: 100,
  guestDinnerCount: 100,
  guestFunctionCount: 100,
  location: "Select Location",
};

let validationSchema = Yup.object().shape({
  mealCountType: Yup.string().required("Required"),
  location: Yup.string().required("Required"),
  mandayTotalCount: Yup.number().required("Required"),
});

export const MealCountForm = () => {
  const dispatch = useDispatch();
  const scale = useSelector((state) => state.scaleReducer);
  const [reportDate, setReportDate] = useState(moment().format("YYYY-MM-DD"));
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let accountStack = scale.accountStack;
      if (accountStack.length <= 0) {
        return alert("Please select the account");
      }
      let selectedAccount = accountStack[accountStack.length - 1];
      let token = localStorage.getItem(AUTH_TOKEN);
      let localLocations = await fetchLocations(
        token,
        selectedAccount.account_id
      );
      localLocations = localLocations.map((item) => item.location);
      setLocations(localLocations);
    }
    fetchData();
  }, [scale]);

  const handleSubmit = async (
    values,
    { resetForm, setErrors, setStatus, setSubmitting }
  ) => {
    try {
      let accountStack = scale.accountStack;
      if (accountStack.length <= 0) {
        return alert("Please select the account");
      }
      let selectedAccount = accountStack[accountStack.length - 1];

      let mealCountForm;
      if (values.mealCountType === "manday") {
        mealCountForm = [
          {
            meal_count_type: values.mealCountType,
            total_count: values.mandayFunctionCount,
            service: "Function",
            account_id: selectedAccount.account_id,
            location: values.location,
            report_date: reportDate,
          },
          {
            meal_count_type: values.mealCountType,
            total_count: values.mandayTotalCount,
            service: "Total",
            account_id: selectedAccount.account_id,
            location: values.location,
            report_date: reportDate,
          },
        ];
      } else {
        mealCountForm = [
          {
            meal_count_type: values.mealCountType,
            total_count: values.guestBreakfastCount,
            service: "Breakfast",
            account_id: selectedAccount.account_id,
            location: values.location,
            report_date: reportDate,
          },
          {
            meal_count_type: values.mealCountType,
            total_count: values.guestLunchCount,
            service: "Lunch",
            account_id: selectedAccount.account_id,
            location: values.location,
            report_date: reportDate,
          },
          {
            meal_count_type: values.mealCountType,
            total_count: values.guestDinnerCount,
            service: "Dinner",
            account_id: selectedAccount.account_id,
            location: values.location,
            report_date: reportDate,
          },
          {
            meal_count_type: values.mealCountType,
            total_count: values.guestFunctionCount,
            service: "Function",
            account_id: selectedAccount.account_id,
            location: values.location,
            report_date: reportDate,
          },
        ];
      }

      await dispatch(addMealCount(mealCountForm));
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
                    <Alert severity="success" my={3}>
                      Meal count added successfully!
                    </Alert>
                  )}
                  {status && !status.sent && (
                    <Alert severity="error" my={3}>
                      Meal count addition failed!
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
                    <Grid item md={8}>
                      <Select
                        name="location"
                        label="Location"
                        value={values.location}
                        fullWidth
                        error={Boolean(values.location === "Select Location")}
                        helpertext={touched.location && errors.location}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        my={2}
                      >
                        <MenuItem value={"Select Location"}>
                          Select location
                        </MenuItem>
                        {locations.map((location) => (
                          <MenuItem key={location} value={location}>
                            {location}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item md={4}>
                      <DatePicker
                        id="date"
                        name="report_date"
                        label="Report Date"
                        value={reportDate}
                        onChange={setReportDate}
                        clearable
                        autoOk
                        format="dd-MM-yyyy"
                        disableOpenOnEnter
                        animateYearScrolling={false}
                      />
                    </Grid>
                    <Grid item md={12}>
                      <Select
                        name="mealCountType"
                        label="Meal Count Type"
                        value={values.mealCountType}
                        error={Boolean(
                          values.mealCountType === "mealCountType"
                        )}
                        helpertext={
                          touched.mealCountType && errors.mealCountType
                        }
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                      >
                        <MenuItem value={"guest"}>Guest Entry</MenuItem>
                        <MenuItem value={"manday"}>
                          Manday/Resident Entry
                        </MenuItem>
                      </Select>
                    </Grid>
                    {values.mealCountType === "manday" ? (
                      <React.Fragment>
                        <Grid item sm={6}>
                          <TextField
                            id="standard-number"
                            name="mandayFunctionCount"
                            label="Function count"
                            type="number"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={values.mandayFunctionCount}
                            error={Boolean(
                              touched.mandayFunctionCount &&
                                errors.mandayFunctionCount
                            )}
                            fullWidth
                            helperText={
                              touched.mandayFunctionCount &&
                              errors.mandayFunctionCount
                            }
                            onBlur={handleBlur}
                            onChange={handleChange}
                            my={2}
                          />
                        </Grid>
                        <Grid item sm={6}>
                          <TextField
                            name="mandayTotalCount"
                            label="Total count"
                            type="number"
                            value={values.mandayTotalCount}
                            error={Boolean(
                              touched.mandayTotalCount &&
                                errors.mandayTotalCount
                            )}
                            fullWidth
                            helperText={
                              touched.mandayTotalCount &&
                              errors.mandayTotalCount
                            }
                            onBlur={handleBlur}
                            onChange={handleChange}
                            my={2}
                          />
                        </Grid>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <Grid item sm={6}>
                          <TextField
                            name="guestBreakfastCount"
                            label="Breakfast count"
                            type="number"
                            value={values.guestBreakfastCount}
                            error={Boolean(
                              touched.guestBreakfastCount &&
                                errors.guestBreakfastCount
                            )}
                            fullWidth
                            helperText={
                              touched.guestBreakfastCount &&
                              errors.guestBreakfastCount
                            }
                            onBlur={handleBlur}
                            onChange={handleChange}
                            my={2}
                          />
                        </Grid>
                        <Grid item sm={6}>
                          <TextField
                            name="guestLunchCount"
                            label="Lunch count"
                            type="number"
                            value={values.guestLunchCount}
                            error={Boolean(
                              touched.guestLunchCount && errors.guestLunchCount
                            )}
                            fullWidth
                            helperText={
                              touched.guestLunchCount && errors.guestLunchCount
                            }
                            onBlur={handleBlur}
                            onChange={handleChange}
                            my={2}
                          />
                        </Grid>
                        <Grid item sm={6}>
                          <TextField
                            name="guestDinnerCount"
                            label="Dinner count"
                            type="number"
                            value={values.guestDinnerCount}
                            error={Boolean(
                              touched.guestDinnerCount &&
                                errors.guestDinnerCount
                            )}
                            fullWidth
                            helperText={
                              touched.guestDinnerCount &&
                              errors.guestDinnerCount
                            }
                            onBlur={handleBlur}
                            onChange={handleChange}
                            my={2}
                          />
                        </Grid>
                        <Grid item sm={6}>
                          <TextField
                            name="guestFunctionCount"
                            label="Function count"
                            type="number"
                            value={values.guestFunctionCount}
                            error={Boolean(
                              touched.guestFunctionCount &&
                                errors.guestFunctionCount
                            )}
                            fullWidth
                            helperText={
                              touched.guestFunctionCount &&
                              errors.guestFunctionCount
                            }
                            onBlur={handleBlur}
                            onChange={handleChange}
                            my={2}
                          />
                        </Grid>
                      </React.Fragment>
                    )}
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        mt={3}
                      >
                        Add Meal Count
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
};
