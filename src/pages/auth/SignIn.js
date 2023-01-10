import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import * as Yup from "yup";
import { Formik } from "formik";
import { signIn } from "../../redux/actions/authActions";
import { fetchPermissions } from "../../redux/actions/permissionActions";

import {
  Button,
  Grid,
  Paper,
  TextField as MuiTextField,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { Alert as MuiAlert } from "@material-ui/lab";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)}px;
  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)}px;
  }
`;

const BrandTitle = styled(Typography)`
  text-transform: uppercase;
  color: orange;
  font-size: 24px;
  text-align: center;
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
`;

const BrandImage = styled.img`
  max-width: 120px;
  margin-right: ${(props) => props.theme.spacing(2)}px;
  margin-bottom: ${(props) => props.theme.spacing(2)}px;
  height: auto;
  display: block;
  text-align: center;
`;

function SignIn() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  // const [anchorMenu, setAnchorMenu] = React.useState(null);
  const auth = useSelector((state) => state.authReducer);
  if (auth.user && location.pathname === "/auth/sign-in") {
    history.push("/accounts");
  }
  // const toggleMenu = (event) => {
  //   setAnchorMenu(event.currentTarget);
  // };
  //
  // const closeMenu = () => {
  //   setAnchorMenu(null);
  // };

  // const handleRegister = async (role) => {
  //   closeMenu();
  //   history.push("/auth/sign-up/" + role);
  // };

  return (
    <Wrapper>
      <Helmet title="Sign In" />
      <Grid container direction={"column"} justify="center" alignItems="center">
        <BrandImage
          alt={`Regulo`}
          src={`/static/img/brands/brand-logo-alt.jpg`}
        />
      </Grid>
      <Typography component="h2" variant="body1" align="center">
        Sign in to your account to continue
      </Typography>

      <Formik
        initialValues={{
          username: "",
          password: "",
          submit: false,
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required("username is required"),
          password: Yup.string().max(255).required("Password is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await dispatch(
              signIn({ username: values.username, password: values.password })
            );
            await dispatch(fetchPermissions());

            history.push("/");
          } catch (error) {
            const message =
              error["display_msg"] || error.message || "Something went wrong";

            setStatus({ success: false });
            setErrors({ submit: message });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            {errors.submit && (
              <Alert mt={2} mb={1} severity="warning">
                {errors.submit}
              </Alert>
            )}
            <TextField
              type="text"
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
            <TextField
              type="password"
              name="password"
              label="Password"
              value={values.password}
              error={Boolean(touched.password && errors.password)}
              fullWidth
              helperText={touched.password && errors.password}
              onBlur={handleBlur}
              onChange={handleChange}
              my={2}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Sign in
            </Button>
            {/*<Grid container spacing={2}>*/}
            {/*  <Grid item sm={12}>*/}
            {/*    <Button*/}
            {/*      component={Link}*/}
            {/*      to="/auth/reset-password"*/}
            {/*      fullWidth*/}
            {/*      color="primary"*/}
            {/*    >*/}
            {/*      Forgot password*/}
            {/*    </Button>*/}
            {/*  </Grid>*/}
            {/*<Grid item sm={6}>*/}
            {/*  <Tooltip title="Account">*/}
            {/*    <Button onClick={toggleMenu} fullWidth color="primary">*/}
            {/*      Create Account?*/}
            {/*    </Button>*/}
            {/*  </Tooltip>*/}
            {/*  <Menu*/}
            {/*    id="sign-in"*/}
            {/*    anchorEl={anchorMenu}*/}
            {/*    open={Boolean(anchorMenu)}*/}
            {/*    onClose={closeMenu}*/}
            {/*  >*/}
            {/*    <MenuItem onClick={() => handleRegister("")}>Public</MenuItem>*/}
            {/*    <MenuItem onClick={() => handleRegister("super-admin")}>*/}
            {/*      Super Admin*/}
            {/*    </MenuItem>*/}
            {/*    <MenuItem onClick={() => handleRegister("global-admin")}>*/}
            {/*      Global Admin*/}
            {/*    </MenuItem>*/}
            {/*  </Menu>*/}
            {/*</Grid>*/}
            {/*</Grid>*/}
          </form>
        )}
      </Formik>
    </Wrapper>
  );
}

export default SignIn;
