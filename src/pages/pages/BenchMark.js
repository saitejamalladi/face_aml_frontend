import React, { useEffect } from "react";

import styled from "styled-components/macro";

import { Helmet } from "react-helmet-async";

import {
  Divider as MuiDivider,
  Grid,
  IconButton as MuiIconButton,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell as MuiTableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from "@material-ui/core";

import { Save as SaveIcon } from "@material-ui/icons";

import { makeStyles } from "@material-ui/styles";

import { spacing } from "@material-ui/system";
import {
  updateBenchmark,
  fetchBenchmark,
} from "../../redux/actions/scaleActions";
import { useDispatch, useSelector } from "react-redux";

const Paper = styled(MuiPaper)(spacing);

const Divider = styled(MuiDivider)(spacing);

const CustomTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.025);
  }
`;
const ReportHeader = styled.span`
  text-transform: capitalize;
  font-size: ${(props) => props.theme.typography.h6.fontSize};
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
const IconButton = styled(MuiIconButton)`
  padding: 0;
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
const headCells = [
  { id: "id", alignment: "right", label: "Id" },
  { id: "account", alignment: "left", label: "Account" },
  { id: "service", alignment: "left", label: "Service" },
  { id: "benchmark", alignment: "left", label: "Benchmark" },
];

function EnhancedTable({ category }) {
  const classes = useStyles();

  const [order, setOrder] = React.useState("asc");
  const [rows, setRows] = React.useState([]);
  const [orderBy, setOrderBy] = React.useState("customer");
  const [selected, setSelected] = React.useState([]);
  const dispatch = useDispatch();
  let scaleReducer = useSelector((state) => state.scaleReducer);
  let benchmark = scaleReducer.benchmark ? scaleReducer.benchmark : [];

  useEffect(() => {
    setRows(benchmark.filter((benchmark) => benchmark.category === category));
  }, []);
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
  const handleChange = (event, index) => {
    let updatedRows = [...rows];
    updatedRows[index] = {
      ...updatedRows[index],
      benchmark: Number(event.target.value),
      changed: true,
    };
    setRows(updatedRows);
  };
  const handleUpdate = async (index) => {
    let benchmarkObj = rows[index];
    await dispatch(updateBenchmark(benchmarkObj));
    let updatedRows = [...rows];
    updatedRows[index] = {
      ...updatedRows[index],
      changed: false,
    };
    setRows(updatedRows);
  };

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
              title={category}
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
                {stableSort(rows, getComparator(order, orderBy)).map(
                  (row, index) => {
                    return (
                      <CustomTableRow
                        role="checkbox"
                        tabIndex={-1}
                        className={classes.customRow}
                        key={`${row.id}-${index}`}
                      >
                        <TableCell align="right">{index + 1}</TableCell>
                        <TableCell align="left">{row.account_id}</TableCell>
                        <TableCell align="left">{row.service}</TableCell>
                        <TableCell align="left">
                          <Grid container>
                            <Grid item xs={6}>
                              <TextField
                                id="benchmark"
                                name={`${row.id}-${index}benchmark`}
                                type="number"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                value={row.benchmark}
                                onChange={(e) => handleChange(e, index)}
                                my={2}
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <IconButton
                                color="primary"
                                disabled={!rows[index]["changed"]}
                                onClick={() => handleUpdate(index)}
                              >
                                <SaveIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </TableCell>
                      </CustomTableRow>
                    );
                  }
                )}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

function BenchmarkTemplate() {
  let categories = [
    "Overall",
    "Production Waste",
    "Service Waste",
    "Customer Waste",
    "Non Food Waste",
  ];

  return (
    <Grid container spacing={4} alignItems={"center"}>
      {categories.map((category) => (
        <Grid item xs={6} key={category}>
          <EnhancedTable category={category} />
        </Grid>
      ))}
    </Grid>
  );
}

function BenchmarkList() {
  const dispatch = useDispatch();
  dispatch(fetchBenchmark());
  return (
    <React.Fragment>
      <Helmet title="Benchmark" />
      <Grid justify="space-between" container spacing={4}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Benchmark Details
          </Typography>
        </Grid>
      </Grid>
      <Divider my={6} />
      <BenchmarkTemplate />
    </React.Fragment>
  );
}

export default BenchmarkList;
