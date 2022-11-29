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

import { spacing } from "@material-ui/system";

import moment from "moment";

const Paper = styled(MuiPaper)(spacing);

const CustomTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.025);
  }
`;

const TableCell = styled(MuiTableCell)`
  padding: 10px 10px;
  font-size: 11px;
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

function getTotalWaste(wasteDailyData, currentDay) {
  return wasteDailyData
    .filter((data) => {
      return data.report_date === currentDay;
    })
    .reduce((total, item) => total + item.total_weight, 0)
    .toFixed(3);
}
function getTotalWasteAvg(avgData, dayCount) {
  let data =
    avgData.reduce((total, item) => total + item.average_weight, 0) / dayCount;
  return Number(data).toLocaleString(undefined, {
    minimumFractionDigits: 1,
  });
}
function getAverageWaste(wasteDailyData, mealCountDailyData, currentDay) {
  let totalMealCount = mealCountDailyData
    .filter((data) => {
      return data.report_date === currentDay;
    })
    .reduce((total, item) => total + item.total_count, 0);
  if (totalMealCount) {
    let totalWaste = wasteDailyData
      .filter((data) => {
        return data.report_date === currentDay;
      })
      .reduce((total, item) => total + item.total_weight, 0);
    return Number(totalWaste / totalMealCount).toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });
  }
  return "NA";
}
function getAverageWasteAvg(wasteData, mealCount) {
  let totalMealCount = mealCount.reduce(
    (total, item) => total + item.average_count,
    0
  );
  if (totalMealCount) {
    let totalWaste = wasteData.reduce(
      (total, item) => total + item.average_weight,
      0
    );
    return Number(totalWaste / totalMealCount).toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });
  }
  return "NA";
}

const DailyWastageReport = ({
  reportDate,
  location,
  mealCountData,
  wasteData,
}) => {
  let days = [...new Array(7)].map((i, index) =>
    moment(reportDate)
      .subtract(7 - index - 1, "days")
      .format("YYYY-MM-DD")
  );
  let mealCountDailyData = mealCountData ? mealCountData.daily_data : [];
  let mealCountDay28Avg = mealCountData ? mealCountData.day_28_avg : [];
  let mealCountDay7Avg = mealCountData ? mealCountData.day_7_avg : [];
  let wasteDailyData = wasteData ? wasteData.daily_data : [];
  let wasteDay28Avg = wasteData ? wasteData.day_28_avg : [];
  let wasteDay7Avg = wasteData ? wasteData.day_7_avg : [];
  mealCountDailyData = mealCountDailyData.filter(
    (data) => location === "All" || data.location === location
  );
  mealCountDay28Avg = mealCountDay28Avg.filter(
    (data) => location === "All" || data.location === location
  );
  mealCountDay7Avg = mealCountDay7Avg.filter(
    (data) => location === "All" || data.location === location
  );
  wasteDailyData = wasteDailyData.filter(
    (data) => location === "All" || data.location === location
  );
  wasteDay28Avg = wasteDay28Avg.filter(
    (data) => location === "All" || data.location === location
  );
  wasteDay7Avg = wasteDay7Avg.filter(
    (data) => location === "All" || data.location === location
  );
  if (mealCountDailyData.length > 0 && wasteDailyData.length > 0) {
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
                    <ReportHeader>
                      Daily Total Waste Per Meal or Manday/Resident
                    </ReportHeader>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <CustomTableRow hover tabIndex={-1}>
                  <TableHeadCell width="28%" align="left">
                    Total waste
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
                    <ReportTitle>Total waste volume KG</ReportTitle>
                  </TableCell>
                  <TableCell align="left">
                    {getTotalWasteAvg(wasteDay28Avg, 28)}
                  </TableCell>
                  <TableCell align="left">
                    {getTotalWasteAvg(wasteDay7Avg, 7)}
                  </TableCell>
                  {days.map((day, index) => (
                    <TableCell key={index} align="left">
                      {getTotalWaste(wasteDailyData, day)}
                    </TableCell>
                  ))}
                </CustomTableRow>
                <CustomTableRow hover tabIndex={-1}>
                  <TableCell align="left">
                    <ReportTitle>Total waste per meal</ReportTitle>
                  </TableCell>
                  <TableCell align="left">
                    {getAverageWasteAvg(wasteDay28Avg, mealCountDay28Avg, 28)}
                  </TableCell>
                  <TableCell align="left">
                    {getAverageWasteAvg(wasteDay7Avg, mealCountDay7Avg, 7)}
                  </TableCell>
                  {days.map((day, index) => (
                    <TableCell key={index} align="left">
                      {getAverageWaste(wasteDailyData, mealCountDailyData, day)}
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
                    <ReportTitle>
                      Daily Total Waste Per Meal or Manday/Resident
                    </ReportTitle>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <CustomTableRow hover tabIndex={-1}>
                  <TableCell align="left">
                    <ReportTitle>Total waste</ReportTitle>
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

export default DailyWastageReport;
