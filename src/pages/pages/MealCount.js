import React, { useEffect, useState } from "react";

import styled from "styled-components/macro";

import { Helmet } from "react-helmet-async";

import moment from "moment";

import {
  Box,
  Button as MuiButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider as MuiDivider,
  Grid,
  IconButton,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell as MuiTableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";

import { spacing } from "@material-ui/system";
import {
  fetchMealCount,
  updateMealCount,
} from "../../redux/actions/scaleActions";
import { useDispatch, useSelector } from "react-redux";
import { Add as AddIcon, Save as SaveIcon } from "@material-ui/icons";

import { MealCountForm } from "../../components/MealCountForm";
import { FindPermission } from "../../utils/localStorageHelper";

const Button = styled(MuiButton)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Paper = styled(MuiPaper)(spacing);

const CustomTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.025);
  }
`;
const ReportHeader = styled.span`
  text-transform: capitalize;
  font-size: ${(props) => props.theme.typography.h5.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
`;
const TableCell = styled(MuiTableCell)`
  padding: 8px;
  font-size: 12px;
  text-transform: capitalize;
`;
const TableHeadCell = styled(TableCell)`
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
`;

const useStyles = makeStyles({
  customRow: {
    background: "#fffffff",
    "&:hover": {
      background: "#d8d8d8",
    },
  },
});

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { title, headCells, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell align="center" colSpan={11}>
          <ReportHeader>{title}</ReportHeader>
        </TableCell>
      </TableRow>
      <TableRow>
        {headCells.map((headCell) => (
          <TableHeadCell
            key={headCell.id}
            align={headCell.alignment}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableHeadCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTable({ title, mealCount, services }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("customer");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [currentMealCount, setCurrentMealCount] = React.useState([]);

  const headCells = [
    { id: "id", alignment: "right", label: "Id" },
    { id: "account", alignment: "left", label: "Account" },
    { id: "location", alignment: "left", label: "Location" },
    { id: "modified_by", alignment: "left", label: "Modified By" },
    { id: "report_date", alignment: "left", label: "Date" },
    ...services.map((service) => {
      return { id: service, alignment: "right", label: service };
    }),
    { id: "sum", alignment: "right", label: "Sum" },
    { id: "action", alignment: "center", label: "Actions" },
  ];
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const getTotalCount = (mealCount, mealCountId, service) => {
    let currentRecord = mealCount.find(
      (meal) => meal.meal_count_id === mealCountId && meal.service === service
    );
    return currentRecord ? currentRecord.total_count : 0;
  };
  const getAccountName = (currentMealCount, mealCountId) => {
    let mealCountData = currentMealCount.find(
      (meal) => meal.meal_count_id === mealCountId
    );
    return mealCountData ? mealCountData.account_name : "";
  };
  const getLocation = (currentMealCount, mealCountId) => {
    let mealCountData = currentMealCount.find(
      (meal) => meal.meal_count_id === mealCountId
    );
    return mealCountData ? mealCountData.location : "";
  };
  const getModifiedByUser = (currentMealCount, mealCountId) => {
    let mealCountData = currentMealCount.find(
      (meal) => meal.meal_count_id === mealCountId
    );
    return mealCountData ? mealCountData.modified_by_user : "";
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeCount = (event, mealCountId, service) => {
    let updatedCurrentMealCount = [...currentMealCount];
    updatedCurrentMealCount = [
      ...updatedCurrentMealCount.filter(
        (mealCount) =>
          !(
            mealCount.meal_count_id === mealCountId &&
            mealCount.service === service
          )
      ),
      {
        ...updatedCurrentMealCount.find(
          (mealCount) =>
            mealCount.meal_count_id === mealCountId &&
            mealCount.service === service
        ),
        service: service,
        changed: true,
        total_count: Number(event.target.value),
      },
    ];
    setCurrentMealCount(updatedCurrentMealCount);
  };
  const handleUpdate = async (mealCountId) => {
    dispatch(
      updateMealCount(
        currentMealCount.filter(
          (mealCount) => mealCount.meal_count_id === mealCountId
        )
      )
    );
    let updatedCurrentMealCount = [...currentMealCount];
    updatedCurrentMealCount.forEach((mealCount) => (mealCount.changed = false));
    setCurrentMealCount(updatedCurrentMealCount);
  };

  useEffect(() => {
    setCurrentMealCount(mealCount);
  }, []);

  const rows = [...new Set(mealCount.map((meal) => meal.meal_count_id))];
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  if (currentMealCount.length <= 0) return null;
  return (
    <div>
      <Paper>
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              title={title}
              headCells={headCells}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            {rows.length > 0 && (
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <CustomTableRow
                        role="checkbox"
                        tabIndex={-1}
                        className={classes.customRow}
                        key={`${row.id}-${index}`}
                      >
                        <TableCell align="right">{index + 1}</TableCell>
                        <TableCell align="left">
                          {getAccountName(currentMealCount, row)}
                        </TableCell>
                        <TableCell align="left">
                          {getLocation(currentMealCount, row)}
                        </TableCell>
                        <TableCell align="left">
                          {getModifiedByUser(currentMealCount, row)}
                        </TableCell>
                        <TableCell align="right">
                          {moment(
                            currentMealCount.find(
                              (meal) => meal.meal_count_id === row
                            )?.report_date
                          ).format("DD-MM-YYYY")}
                        </TableCell>
                        {services.map((service) => (
                          <TableCell key={service} align="right">
                            <TextField
                              id={`${row}meal-count`}
                              name={`${row}meal-count`}
                              type="number"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={getTotalCount(
                                currentMealCount,
                                row,
                                service
                              )}
                              onChange={(e) =>
                                handleChangeCount(e, row, service)
                              }
                              my={2}
                            />
                          </TableCell>
                        ))}
                        <TableCell key={"service"} align="right">
                          {currentMealCount
                            .filter((meal) => meal.meal_count_id === row)
                            .reduce(
                              (total, meal) => total + meal.total_count,
                              0
                            )}
                        </TableCell>
                        <TableCell padding="none" align="center">
                          <Box mr={2}>
                            <IconButton
                              color="primary"
                              disabled={
                                !currentMealCount.find(
                                  (mealCount) =>
                                    mealCount.meal_count_id === row &&
                                    mealCount.changed
                                )
                              }
                              onClick={() => handleUpdate(row)}
                            >
                              <SaveIcon />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </CustomTableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={8} />
                  </TableRow>
                )}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

function MealCountTemplate() {
  let scaleReducer = useSelector((state) => state.scaleReducer);
  let mealCount = scaleReducer.mealCount ? scaleReducer.mealCount : [];
  mealCount = mealCount.sort((a, b) => a.reportDate > b.reportDate);
  return (
    <React.Fragment>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EnhancedTable
            title={"Meal Count Form Manday/Resident Entry"}
            mealCount={mealCount.filter(
              (meal) => meal["meal_count_type"] === "manday"
            )}
            services={["Function", "Total"]}
          />
        </Grid>
        <Grid item xs={12}>
          <EnhancedTable
            title={"Meal Count Form Guest Entry"}
            mealCount={mealCount.filter(
              (meal) => meal["meal_count_type"] === "guest"
            )}
            services={["Breakfast", "Lunch", "Dinner", "Function"]}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

function MealCountList() {
  const [addMealCountOpen, setAddMealCountOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMealCount());
  }, []);

  let scaleReducer = useSelector((state) => state.scaleReducer);

  const handleAddMealCountOpen = () => {
    let accountStack = scaleReducer.accountStack;
    if (accountStack.length <= 0) {
      return alert("Please select the account");
    }
    setAddMealCountOpen(true);
  };
  const handleAddMealCountClose = () => {
    dispatch(fetchMealCount());
    setAddMealCountOpen(false);
  };
  return (
    <React.Fragment>
      <Helmet title="Meal Count" />
      <Grid justify="space-between" container spacing={4}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Meal Count
          </Typography>
        </Grid>

        {FindPermission("Add Meal Count") && (
          <Grid item>
            <div>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                onClick={handleAddMealCountOpen}
              >
                <AddIcon />
                Add Meal Count
              </Button>
            </div>
          </Grid>
        )}
      </Grid>
      <Divider my={6} />
      <MealCountTemplate />
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={addMealCountOpen}
        onClose={handleAddMealCountClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Add Meal Count</DialogTitle>
        <DialogContent>
          <MealCountForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddMealCountClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default MealCountList;
