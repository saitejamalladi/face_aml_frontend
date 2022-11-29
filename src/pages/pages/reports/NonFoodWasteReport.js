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

function filterDayItem(dailyData, currentDay, item, category) {
  let currentDayWeight = dailyData
    .filter((data) => {
      return (
        data.report_date === currentDay &&
        (item ? data.item === item : true) &&
        (category && category !== "Overall" ? data.category === category : true)
      );
    })
    .reduce((total, item) => total + item.total_weight, 0);
  return Number(currentDayWeight).toLocaleString(undefined, {
    minimumFractionDigits: 2,
  });
}
function filterItem(avgData, category, dayCount, item) {
  if (category && category !== "Overall") {
    avgData = avgData.filter((item) => item.category === category);
  }
  let data = avgData.reduce((total, item) => total + item.average_weight, 0);
  if (item) {
    data = avgData
      .filter((data) => data.item === item)
      .reduce((total, item) => total + item.average_weight, 0);
  }
  if (!data) data = 0;
  return Number(data / dayCount).toLocaleString(undefined, {
    minimumFractionDigits: 2,
  });
}
function getBenchmark(benchMarkData, category, service) {
  if (benchMarkData && category && service) {
    return benchMarkData
      .filter(
        (data) =>
          data.category.toLowerCase() === category.toLowerCase() &&
          data.service.toLowerCase() === service.toLowerCase()
      )
      .reduce((total, data) => total + data.benchmark, 0);
  }
  return false;
}

const ConditionalFormation = (value, benchmark) => {
  if (!benchmark) return;
  if (value >= benchmark * 1.25)
    return { backgroundColor: "#CA0B00", color: "white" };
  if (value >= benchmark * 1.05)
    return { backgroundColor: "#F0D500", color: "black" };
  if (value > benchmark) return { backgroundColor: "#32CD32", color: "black" };
  return { backgroundColor: "#006400", color: "white" };
};

const ServiceWasteReport = ({
  title,
  total_description,
  reportDate,
  waste_type,
  reportData,
  benchmarkData,
  category,
  location,
}) => {
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
  let items = dailyData.map((data) => data.item);
  items = [...new Set(items)];
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
                    <ReportHeader>{title}</ReportHeader>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <CustomTableRow hover tabIndex={-1}>
                  <TableHeadCell width="18%" align="left">
                    {waste_type}
                  </TableHeadCell>
                  <TableHeadCell width="8%" align="left">
                    Benchmark
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
                    <ReportTitle>{total_description}</ReportTitle>
                  </TableCell>
                  <TableCell align="left">
                    {getBenchmark(benchmarkData, category, "Total")
                      ? getBenchmark(benchmarkData, category, "Total") + "Kg"
                      : "NA"}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={ConditionalFormation(
                      filterItem(day28Avg, category, 28),
                      getBenchmark(benchmarkData, category, "Total")
                    )}
                  >
                    {filterItem(day28Avg, category, 28)} Kg
                  </TableCell>
                  <TableCell
                    align="left"
                    style={ConditionalFormation(
                      filterItem(day7Avg, category, 7),
                      getBenchmark(benchmarkData, category, "Total")
                    )}
                  >
                    {filterItem(day7Avg, category, 7)} Kg
                  </TableCell>
                  {days.map((day, index) => (
                    <TableCell
                      style={ConditionalFormation(
                        filterDayItem(dailyData, day, null, category),
                        getBenchmark(benchmarkData, category, "Total")
                      )}
                      key={index}
                      align="left"
                    >
                      {filterDayItem(dailyData, day, null, category)} Kg
                    </TableCell>
                  ))}
                </CustomTableRow>

                {items.map((item) => (
                  <CustomTableRow hover tabIndex={-1} key={item}>
                    <TableCell align="left">
                      <ReportTitle>{item} service Non Food Waste</ReportTitle>
                    </TableCell>
                    <TableCell align="left">
                      {getBenchmark(benchmarkData, category, item)
                        ? getBenchmark(benchmarkData, category, item) + "Kg"
                        : "NA"}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={ConditionalFormation(
                        filterItem(day28Avg, category, 28, item),
                        getBenchmark(benchmarkData, category, item)
                      )}
                    >
                      {filterItem(day28Avg, category, 28, item)} Kg
                    </TableCell>
                    <TableCell
                      align="left"
                      style={ConditionalFormation(
                        filterItem(day7Avg, category, 7, item),
                        getBenchmark(benchmarkData, category, item)
                      )}
                    >
                      {filterItem(day7Avg, category, 7, item)} Kg
                    </TableCell>
                    {days.map((day, index) => (
                      <TableCell
                        key={index}
                        align="left"
                        style={ConditionalFormation(
                          filterDayItem(dailyData, day, item, category),
                          getBenchmark(benchmarkData, category, item)
                        )}
                      >
                        {filterDayItem(dailyData, day, item, category)} Kg
                      </TableCell>
                    ))}
                  </CustomTableRow>
                ))}
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
                    <ReportTitle>{title}</ReportTitle>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <CustomTableRow hover tabIndex={-1}>
                  <TableCell align="left">
                    <ReportTitle>{waste_type}</ReportTitle>
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

export default ServiceWasteReport;
