import React, { Component } from "react";
import {FindPermission} from "../../utils/localStorageHelper";
import {connect, useSelector} from "react-redux";

import styled from "styled-components/macro";

import { Helmet } from "react-helmet-async";

import { MoreVertical } from "react-feather";

import {
  Breadcrumbs as MuiBreadcrumbs,
  Link,
  Paper as MuiPaper,
  Box,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  CircularProgress,
  Divider as MuiDivider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid as MuiGrid,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";

import { Add as AddIcon, ArrowBack as ArrowBackIcon, People as PeopleIcon } from "@material-ui/icons";

import { spacing } from "@material-ui/system";

import {
  fetchAccounts,
  fetchChildAccounts,
  setAccountStack,
} from "../../redux/actions/scaleActions";
import { NavLink, withRouter } from "react-router-dom";

import { Alert as MuiAlert } from "@material-ui/lab";

import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addAccount, editAccount } from "../../redux/actions/scaleActions";

import queryString from "query-string";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const AccountIcon = styled(PeopleIcon)`
  margin: ${(props) => props.theme.spacing(2)}px;
  padding: ${(props) => props.theme.spacing(2)}px;
  border-radius: 3px;
  color: ${(props) => props.theme.palette.common.black};
  background-color: #d01313;
  fill: ${(props) => props.theme.palette.common.white};
  width: 50px;
  height: 50px;
  vertical-align: middle;
  display: inline;
`;
const AccountPaper = styled(Paper)`
  cursor: pointer;
  padding: ${(props) => props.theme.spacing(2)}px;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.13);
  transition: 0.15s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;
const AccountCard = styled.div`
  margin: ${(props) => props.theme.spacing(2)}px;
`;
const AccountTitle = styled(Typography)`
  margin: ${(props) => props.theme.spacing(2)}px;
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

const AccountCount = styled(Typography)`
  margin: ${(props) => props.theme.spacing(2)}px;
`;
const NoAccounts = () => (
  <Typography variant="subtitle1" color="textPrimary">
    No Accounts. Click Add account to add one.
  </Typography>
);

const Button = styled(MuiButton)(spacing);

const Card = styled(MuiCard)(spacing);

const Alert = styled(MuiAlert)(spacing);

const Grid = styled(MuiGrid)(spacing);

function AccountForm({ parentAccount }) {
  const dispatch = useDispatch();
  const initialValues = {
    name: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
  });
  const scale = useSelector((state) => state.scaleReducer);
  let accountStack = scale.accountStack;
  let selectedAccount = accountStack[accountStack.length - 1];
  const handleSubmit = async (
    values,
    { resetForm, setErrors, setStatus, setSubmitting }
  ) => {
    try {
      let accountForm = {
        name: values.name,
        parent_account: selectedAccount.account_id,
      };
      await dispatch(addAccount(accountForm));
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
              <Grid item xs={12} sm={6}>
                {status && status.sent && (
                  <Alert severity="success" my={3}>
                    Account added successfully!
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
                <Grid container direction={"column"} spacing={4}>
                  <Grid item md={6}>
                    <TextField
                      name="name"
                      label="Account Name"
                      aria-readonly={true}
                      error={Boolean(touched.name && errors.name)}
                      fullWidth
                      helperText={touched.name && errors.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      my={2}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      mt={3}
                    >
                      Add Account
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

function EditAccountForm({ account }) {
  const dispatch = useDispatch();
  const handleSubmit = async (
    values,
    { resetForm, setErrors, setStatus, setSubmitting }
  ) => {
    try {
      let accountForm = {
        name: values.name,
        account_id: account.account_id
      };
      await dispatch(editAccount(accountForm));
      resetForm();
      setStatus({ sent: true });
      setSubmitting(false);
    } catch (error) {
      setStatus({ sent: false });
      setErrors({ submit: error.message });
      setSubmitting(false);
    }
  };

  const initialValues = {
    name: account.name,
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
  });
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
              <Grid item xs={12} sm={6}>
                {status && status.sent && (
                  <Alert severity="success" my={3}>
                    Account updated successfully!
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
                <Grid container direction={"column"} spacing={4}>
                  <Grid item md={6}>
                    <TextField
                      name="name"
                      label="Account Name"
                      aria-readonly={true}
                      error={Boolean(touched.name && errors.name)}
                      fullWidth
                      helperText={touched.name && errors.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      my={2}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      mt={3}
                    >
                      Edit Account
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

class Accounts extends Component {
  state = {
    open: false,
  };

  componentDidMount() {
    this.props.setAccountStack([]);
    this.props.fetchAccounts();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    let prevParams = queryString.parse(prevProps.location.search);
    let params = queryString.parse(this.props.location.search);
    let parentAccountId = params["account_id"];
    if (parentAccountId && parentAccountId !== prevParams["account_id"]) {
      this.props.fetchChildAccounts(parentAccountId);
    }
  }

  handleViewAccount = (account) => {
    let accountStack = this.props.accountStack;
    accountStack.push(account);
    this.props.setAccountStack(accountStack);
    this.props.fetchChildAccounts(account.account_id);
  };

  handleBackButton = () => {
    let accountStack = this.props.accountStack;
    accountStack.pop();
    this.props.setAccountStack(accountStack);
    if(accountStack.length > 0) {
      let account = accountStack[accountStack.length - 1];
      this.props.fetchChildAccounts(account.account_id);
    } else {
      this.props.fetchAccounts();
    }
  };

  closeMenu = () => {
    this.setState({
      anchorMenu: null
    });
  };

  handleEditAccount = (account) => {
    this.closeMenu();
    this.setState({ editAccount: account });
    this.setState({ openEdit: true });
  }

  handleClickOpen = () => {
    let accountStack = this.props.accountStack;
    if (accountStack.length > 0) {
      this.setState({ open: true });
    } else {
      alert("Please select the account");
    }
  };
  handleClose = () => {
    this.setState({ open: false });
    this.setState({ openEdit: false });
    let accountStack = this.props.accountStack;
    if(accountStack.length > 0) {
      let account = accountStack[accountStack.length - 1];
      this.props.fetchChildAccounts(account.account_id);
    } else {
      this.props.fetchAccounts();
    }
  };
  render() {
    let accounts = this.props.accounts ? this.props.accounts : [];
    let accountStack = this.props.accountStack;
    return (
      <React.Fragment>
        <Helmet title="Accounts" />
        {
          accountStack.length > 0 &&
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            mt={3}
            startIcon={<ArrowBackIcon />}
            onClick={this.handleBackButton}
          >
            Back
          </Button>
        }
        <Grid justify="space-between" container spacing={4}>
          <Grid item>
            <Typography variant="h3" gutterBottom display="inline">
              Accounts
            </Typography>
          </Grid>
          {FindPermission("Add Account") && (<Grid item>
            <div>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                onClick={this.handleClickOpen}
              >
                <AddIcon />
                Add Account
              </Button>
            </div>
          </Grid>)}
        </Grid>
        <Breadcrumbs aria-label="Breadcrumb" mt={2}>
          <Link component={NavLink} exact to="/">
            Account
          </Link>
          {
            accountStack.map((account) =>
              <Typography key={account.account_id}>{account.name}</Typography>
            )
          }
        </Breadcrumbs>
        <Divider my={6} />
        <Grid container spacing={4}>
          {accounts.map((account, index) => (
            <Grid key={index} item xs={6} sm={3}>
              <AccountPaper>
                <Grid container>
                  <Grid item xs={4}>
                    <AccountIcon onClick={() => this.handleViewAccount(account)}/>
                  </Grid>
                  <Grid item xs={6}>
                    <AccountCard onClick={() => this.handleViewAccount(account)}>
                      <AccountTitle>{account.name}</AccountTitle>
                      <AccountCount>{account.child_account}</AccountCount>
                    </AccountCard>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton
                      onClick = {() => this.handleEditAccount(account)}
                      color="inherit"
                    >
                      <MoreVertical />
                    </IconButton>
                  </Grid>
                </Grid>
              </AccountPaper>
            </Grid>
          ))}
          {accounts.length <= 0 && <NoAccounts />}
        </Grid>
        <Dialog
          fullWidth={true}
          maxWidth={"sm"}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="add-account-dialog-title"
        >
          <DialogTitle id="add-account-dialog-title">Add Account</DialogTitle>
          <DialogContent>
            <AccountForm/>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleClose}
              color="primary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          fullWidth={true}
          maxWidth={"sm"}
          open={this.state.openEdit}
          onClose={this.handleClose}
          aria-labelledby="edit-account-dialog-title"
        >
          <DialogTitle id="edit-account-dialog-title">Edit Account</DialogTitle>
          <DialogContent>
            <EditAccountForm account={this.state.editAccount}/>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleClose}
              color="primary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accounts: state.scaleReducer.accounts,
    accountStack: state.scaleReducer.accountStack,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAccounts: () => dispatch(fetchAccounts()),
    fetchChildAccounts: (accountId) => dispatch(fetchChildAccounts(accountId)),
    setAccountStack: (accountStack) => dispatch(setAccountStack(accountStack)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Accounts));
