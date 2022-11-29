import React, { useState } from "react";

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
  Fab as MuiFab,
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
  Typography,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";

import { spacing } from "@material-ui/system";
import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../../redux/actions/scaleActions";
import { useDispatch, useSelector } from "react-redux";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@material-ui/icons";

import { UserForm } from "../../components/UserForm";
import { FindPermission } from "../../utils/localStorageHelper";

const Button = styled(MuiButton)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Paper = styled(MuiPaper)(spacing);

const CustomTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.025);
  }
`;

const Fab = styled(MuiFab)(spacing);

const TableCell = styled(MuiTableCell)`
  padding: 10px 10px;
`;

const useStyles = makeStyles({
  customRow: {
    background: "#fffffff",
    "&:hover": {
      background: "#d8d8d8",
    },
  },
});

function createData(
  id,
  first_name,
  last_name,
  email,
  username,
  account,
  created_date,
  address,
  role
) {
  return {
    id,
    first_name,
    last_name,
    email,
    username,
    account,
    created_date,
    address,
    role,
  };
}

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

const headCells = [
  { id: "id", alignment: "right", label: "Id" },
  { id: "first_name", alignment: "left", label: "First Name" },
  { id: "last_name", alignment: "left", label: "Last Name" },
  { id: "email", alignment: "left", label: "Email" },
  { id: "account", alignment: "left", label: "Account" },
  { id: "created_date", alignment: "left", label: "Created Date" },
  // { id: "address", alignment: "left", label: "Address" },
  { id: "role", alignment: "left", label: "role" },
  { id: "action", alignment: "center", label: "Actions" },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
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
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("customer");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let scaleReducer = useSelector((state) => state.scaleReducer);
  let users = scaleReducer.users ? scaleReducer.users : [];
  // TODO: Needs to be account name, not account id.
  const rows = users.map((user, index) =>
    createData(
      index + 1,
      user.first_name,
      user.last_name,
      user.email,
      user.username,
      user.account_name,
      user.created_at,
      user.address + ", " + user.address2,
      user.role
    )
  );

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
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
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
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
                      <TableCell align="right">{row.id}</TableCell>
                      <TableCell align="left">{row.first_name}</TableCell>
                      <TableCell align="left">{row.last_name}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.account}</TableCell>
                      <TableCell align="left">
                        {moment(row.created_date).format("DD-MM-YYYY")}
                      </TableCell>
                      {/*<TableCell align="left">{row.address}</TableCell>*/}
                      <TableCell align="left">{row.role}</TableCell>
                      <TableCell padding="none" align="center">
                        <Box mr={2}>
                          <IconButton
                            aria-label="edit"
                            onClick={() => {
                              if (FindPermission("Edit User")) {
                                const matchedUser = users.filter((element) => {
                                  if (element.role !== row.role) return false;
                                  if (element.first_name !== row.first_name)
                                    return false;
                                  if (element.last_name !== row.last_name)
                                    return false;
                                  if (element.email !== row.email) return false;
                                  if (element.account !== row.account_id)
                                    return false;
                                  return true;
                                });
                                const user = {
                                  ...row,
                                  id_user: matchedUser[0].id_users,
                                };

                                if (user) {
                                  props.setUser(user);
                                  props.handleOpen();
                                }
                                // Else throw Error on error dialog.
                              }
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            onClick={() => props.handleDeleteOpen(row.username)}
                          >
                            <DeleteIcon fontSize="small" />
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

function UsersList() {
  const dispatch = useDispatch();
  dispatch(fetchUsers());

  const [addUserOpen, setAddUserOpen] = useState(false);
  const [deleteUsername, setDeleteUsername] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const handleAddUserOpen = () => {
    setAddUserOpen(true);
  };
  const handleAddUserClose = () => {
    setAddUserOpen(false);
  };

  const handleEditOpen = () => {
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setSelectedUser({});
    setEditOpen(false);
  };
  const handleDeleteOpen = (username) => {
    setDeleteUsername(username);
    setDeleteOpen(true);
  };
  const handleDeleteUser = async () => {
    await dispatch(deleteUser(deleteUsername));
    setDeleteOpen(false);
  };
  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  return (
    <React.Fragment>
      <Helmet title="Users" />
      <Grid justify="space-between" container spacing={4}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            View Users
          </Typography>
        </Grid>

        {FindPermission("Add User") && (
          <Grid item>
            <div>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                onClick={handleAddUserOpen}
              >
                <AddIcon />
                Add User
              </Button>
            </div>
          </Grid>
        )}
      </Grid>
      <Divider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EnhancedTable
            handleOpen={handleEditOpen}
            handleDeleteOpen={handleDeleteOpen}
            setUser={setSelectedUser}
          />
        </Grid>
      </Grid>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={addUserOpen}
        onClose={handleAddUserClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Add User</DialogTitle>
        <DialogContent>
          <UserForm event={addUser} buttonText={"Add User"} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddUserClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={editOpen}
        onClose={handleEditClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Edit User</DialogTitle>
        <DialogContent>
          <UserForm
            event={updateUser}
            buttonText={"Save"}
            user={selectedUser}
            setUser={setSelectedUser}
            isEdit={true}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={deleteOpen}
        onClose={handleDeleteClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          Are you sure you want to permanently elete the account?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Close
          </Button>
          <Button onClick={handleDeleteUser} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default UsersList;
