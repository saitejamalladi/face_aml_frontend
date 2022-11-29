import React from "react";
import styled from "styled-components/macro";

import {
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell as MuiTableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

import moment from "moment";

import { spacing } from "@material-ui/system";

const Paper = styled(MuiPaper)(spacing);

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
const TableSubHeadCell = styled(TableHeadCell)`
  font-size: ${(props) => props.theme.typography.fontSizeSmall}px;
`;
const ReportTitle = styled.span`
  text-transform: capitalize;
`;
const ReportHeader = styled.span`
  text-transform: capitalize;
  font-size: ${(props) => props.theme.typography.h5.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
`;

function filterMealCount(dailyData, currentDay) {
  return dailyData
    .filter((data) => {
      return data.report_date === currentDay;
    })
    .reduce((total, item) => total + item.total_count, 0);
}
function filterMealCountAvg(avgData, days) {
  let data =
    avgData.reduce((total, item) => total + item.average_count, 0) / days;
  return Number(data).toLocaleString(undefined, {
    minimumFractionDigits: 1,
  });
}
const MealCountReport = ({ location, reportData, reportDate }) => {
  let days = [...new Array(7)].map((i, index) =>
    moment(reportDate)
      .subtract(7 - index - 1, "days")
      .format("YYYY-MM-DD")
  );
  let dailyData = reportData ? reportData.daily_data : [];
  let day28Avg = reportData ? reportData.day_28_avg : [];
  let day7Avg = reportData ? reportData.day_7_avg : [];
  dailyData = dailyData.filter(
    (data) => location === "All" || data.location === location
  );
  day28Avg = day28Avg.filter(
    (data) => location === "All" || data.location === location
  );
  day7Avg = day7Avg.filter(
    (data) => location === "All" || data.location === location
  );
  if (dailyData.length > 0) {
    return (
      <div>
        <Paper>
          <TableContainer>
            <Table
              aria-labelledby="tableTitle"
              size={"medium"}
              aria-label="enhanced table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={11}>
                    <ReportHeader>Meal or Manday/Resident Numbers</ReportHeader>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <CustomTableRow hover tabIndex={-1}>
                  <TableHeadCell width="28%" align="left">
                    Date
                  </TableHeadCell>
                  <TableSubHeadCell align="left">28 Day Avg</TableSubHeadCell>
                  <TableSubHeadCell align="left">7 Day Avg</TableSubHeadCell>
                  {days.map((day) => (
                    <TableSubHeadCell key={day} align="left">
                      {moment(day).format("DD-MM-YY")}
                    </TableSubHeadCell>
                  ))}
                </CustomTableRow>
                <CustomTableRow hover tabIndex={-1}>
                  <TableCell align="left">
                    <ReportTitle>Daily Manday/ Guest Numbers</ReportTitle>
                  </TableCell>
                  <TableCell align="left">
                    {filterMealCountAvg(day28Avg, 28)}
                  </TableCell>
                  <TableCell align="left">
                    {filterMealCountAvg(day7Avg, 7)}
                  </TableCell>
                  {days.map((day, index) => (
                    <TableCell key={index} align="left">
                      {filterMealCount(dailyData, day)}
                    </TableCell>
                  ))}
                </CustomTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    );
  } else {
    return (
      <div>
        <Paper>
          <TableContainer>
            <Table
              aria-labelledby="tableTitle"
              size={"medium"}
              aria-label="enhanced table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={11}>
                    <ReportTitle>Meal or Manday/Resident Numbers</ReportTitle>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <CustomTableRow hover tabIndex={-1}>
                  <TableCell align="left">
                    <ReportTitle>Date</ReportTitle>
                  </TableCell>
                  <TableCell align="left">28 Day Avg</TableCell>
                  <TableCell align="left">7 Day Avg</TableCell>
                  {days.map((day) => (
                    <TableCell key={day} align="left">
                      {moment(day).format("DD-MM-YY")}
                    </TableCell>
                  ))}
                </CustomTableRow>
                <CustomTableRow hover tabIndex={-1}>
                  <TableCell align="center" colSpan={10}>
                    Insufficient data
                  </TableCell>
                </CustomTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    );
  }
};

export default MealCountReport;
