import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";

import { Helmet } from "react-helmet-async";

import DailyWastageByLocationChart from "../charts/DailyWastageByLocationChart";
import DailyWastageByMealCountChart from "../charts/DailyWastageByMealCountChart";
import { Alert as MuiAlert, AlertTitle } from "@material-ui/lab";

import {
  Divider as MuiDivider,
  FormControl as MuiFormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  Table,
  TableCell as MuiTableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

const Alert = styled(MuiAlert)(spacing);

import { spacing } from "@material-ui/system";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchReport,
  fetchBenchmark,
} from "../../../redux/actions/scaleActions";
import ServiceWasteReport from "./ServiceWasteReport";
import MealCountReport from "./MealCountReport";
import DailyWastageReport from "./DailyWastageReport";
import { DatePicker } from "@material-ui/pickers";
import moment from "moment";
import { NavLink } from "react-router-dom";
import Loader from "../../../components/Loader";
import NonFoodWasteReport from "./NonFoodWasteReport";

const Divider = styled(MuiDivider)(spacing);

const CustomTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.025);
  }
`;

const TableCell = styled(MuiTableCell)`
  padding: 10px 10px;
  font-size: 12px;
`;
const TableHeadCell = styled(TableCell)`
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
`;
const ReportHeader = styled.span`
  text-transform: capitalize;
  font-size: ${(props) => props.theme.typography.h5.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
`;

const FormControlSpacing = styled(MuiFormControl)(spacing);

const Select = styled(MuiSelect)(spacing);

const FormControl = styled(FormControlSpacing)`
  min-width: 148px;
`;

const Legend = () => {
  return (
    <TableContainer>
      <Table
        aria-labelledby="tableTitle"
        size={"medium"}
        aria-label="enhanced table"
      >
        <TableHead>
          <TableCell align="center" colSpan={11}>
            <ReportHeader>Colour Legend</ReportHeader>
          </TableCell>
          <CustomTableRow hover>
            <TableHeadCell align="left">
              Benchmark is less than or equal too
            </TableHeadCell>
            <TableHeadCell align="left">
              Benchmark 0.1%-5% increase
            </TableHeadCell>
            <TableHeadCell align="left">
              Benchmark 5%-25% increase
            </TableHeadCell>
            <TableHeadCell align="left">
              Benchmark greater than 25%
            </TableHeadCell>
          </CustomTableRow>
          <CustomTableRow hover>
            <TableCell style={{ backgroundColor: "#006400" }}> </TableCell>
            <TableCell style={{ backgroundColor: "#32CD32" }}> </TableCell>
            <TableCell style={{ backgroundColor: "#F0D500" }}> </TableCell>
            <TableCell style={{ backgroundColor: "#CA0B00" }}> </TableCell>
          </CustomTableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
};

function ReportLayout({ reportDate, accountStack }) {
  const scaleReducer = useSelector((state) => state.scaleReducer);
  const reportData = scaleReducer.reportData;
  const benchmarkData = scaleReducer.benchmark ? scaleReducer.benchmark : [];
  const [selectedLocation, setSelectedLocation] = useState("All");

  const handleChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  if (accountStack.length <= 0) {
    return (
      <div>
        Please select the account <NavLink to={"/"}>here</NavLink> to fetch the
        report.
      </div>
    );
  }
  if (reportData) {
    if (reportData.locations && reportData.locations.length > 0) {
      return (
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <DailyWastageByLocationChart
              reportDate={reportDate}
              reportData={reportData.service}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <InputLabel htmlFor="report_location">Location</InputLabel>
              <Select
                value={selectedLocation}
                onChange={handleChange}
                inputProps={{
                  name: "report_location",
                  id: "report_location",
                }}
              >
                <MenuItem value="All">All Locations</MenuItem>
                {reportData.locations.map((location) => (
                  <MenuItem key={location} value={location}>
                    {location}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <DailyWastageByMealCountChart
              reportDate={reportDate}
              location={selectedLocation}
              mealCountData={reportData.mealCount}
              wasteData={reportData.overall}
            />
          </Grid>
          <Grid item xs={12}>
            <Legend />
          </Grid>
          <Grid item xs={12}>
            <MealCountReport
              reportDate={reportDate}
              location={selectedLocation}
              reportData={reportData.mealCount}
            />
          </Grid>
          <Grid item xs={12}>
            <DailyWastageReport
              reportDate={reportDate}
              location={selectedLocation}
              mealCountData={reportData.mealCount}
              wasteData={reportData.overall}
            />
          </Grid>
          <Grid item xs={12}>
            <ServiceWasteReport
              title={"Waste Per Meal or Manday/Resident By Service Period"}
              reportDate={reportDate}
              total_description={"Daily total waste Kg"}
              waste_type={"Daily Total By Service Period"}
              reportData={reportData.overall}
              location={selectedLocation}
              benchmarkData={benchmarkData}
              category={"Overall"}
            />
          </Grid>
          <Grid item xs={12}>
            <ServiceWasteReport
              reportDate={reportDate}
              title={"Production Waste Type By Service Period"}
              total_description={"Daily total production waste Kg"}
              waste_type={"Production Waste Information"}
              reportData={reportData.service}
              mealCountData={reportData.mealCount}
              location={selectedLocation}
              benchmarkData={benchmarkData}
              category={"Production Waste"}
            />
          </Grid>
          <Grid item xs={12}>
            <ServiceWasteReport
              reportDate={reportDate}
              title={"Service Waste Type By Service Period"}
              total_description={"Total service waste Kg"}
              waste_type={"Service Waste Information"}
              reportData={reportData.service}
              mealCountData={reportData.mealCount}
              location={selectedLocation}
              benchmarkData={benchmarkData}
              category={"Service Waste"}
            />
          </Grid>
          <Grid item xs={12}>
            <ServiceWasteReport
              reportDate={reportDate}
              title={"Customer Waste Type By Service Period"}
              total_description={"Total customer waste Kg"}
              waste_type={"Customer Waste information"}
              reportData={reportData.service}
              mealCountData={reportData.mealCount}
              location={selectedLocation}
              benchmarkData={benchmarkData}
              category={"Customer Waste"}
            />
          </Grid>
          <Grid item xs={12}>
            <NonFoodWasteReport
              reportDate={reportDate}
              title={"Non Food Waste information"}
              total_description={"Total Non Food Waste Kg"}
              waste_type={"Non Food Waste information"}
              reportData={reportData.service}
              location={selectedLocation}
              benchmarkData={benchmarkData}
              category={"Non Food Waste"}
            />
          </Grid>
          <Grid item xs={12}>
            <ServiceWasteReport
              reportDate={reportDate}
              title={"Waste Goes To Type By Service Period"}
              total_description={"Total"}
              waste_type={"Waste Goes To Information"}
              reportData={reportData.wasteType}
              location={selectedLocation}
            />
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Alert mb={4} severity="error">
          <AlertTitle>No Data</AlertTitle>
          This is no data on the selected date. Select a different date to view
          the report.
        </Alert>
      );
    }
  } else {
    return <Loader />;
  }
}

const Report = () => {
  const dispatch = useDispatch();
  const scale = useSelector((state) => state.scaleReducer);
  const [reportDate, setReportDate] = useState(moment().format("YYYY-MM-DD"));
  let accountStack = scale.accountStack;

  // I only want this request to be ran once when the account changes.
  useEffect(() => {
    let selectedAccount = accountStack[accountStack.length - 1];
    // First account is null.
    if (selectedAccount) {
      console.log("reportDate");
      console.log(reportDate);
      dispatch(fetchReport(selectedAccount.account_id, reportDate));
      dispatch(fetchBenchmark());
    }
  }, [accountStack, reportDate]);
  return (
    <React.Fragment>
      <Helmet title="Report" />
      <Grid justify="space-between" container spacing={4}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Report
          </Typography>
        </Grid>
        <Grid item>
          <DatePicker
            id="date"
            name="report_date"
            label="Report Date"
            value={reportDate}
            onChange={setReportDate}
            clearable
            autoOk
            format="yyyy-MM-dd"
            disableOpenOnEnter
            animateYearScrolling={false}
          />
        </Grid>
      </Grid>
      <Divider my={6} />
      <ReportLayout reportDate={reportDate} accountStack={accountStack} />
    </React.Fragment>
  );
};

export default Report;
