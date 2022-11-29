import React from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

import { Helmet } from "react-helmet-async";

import { Button as MuiButton, Typography } from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { signOut } from "../../redux/actions/authActions";


import { useHistory } from "react-router-dom";
import { useDispatch} from "react-redux";
import { AUTH_TOKEN, PERMISSIONS } from "../../constants";


const Button = styled(MuiButton)(spacing);

const Wrapper = styled.div`
  padding: ${(props) => props.theme.spacing(6)}px;
  text-align: center;
  background: transparent;

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)}px;
  }
`;



function Page403() {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const handleSignOut = async () => {
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(PERMISSIONS);
    await dispatch(signOut());
    history.push("/auth/sign-in");
  };

  return (
    <Wrapper>
      <Helmet title="403 Error" />
      <Typography component="h1" variant="h1" align="center" gutterBottom>
        403
      </Typography>
      <Typography component="h2" variant="h5" align="center" gutterBottom>
       Forbidden
      </Typography>
      <Typography component="h2" variant="body1" align="center" gutterBottom>
        You do not have access to view this page.
      </Typography>

      <Button
        component={Link}
        onClick={handleSignOut}
        to="/"
        variant="contained"
        color="secondary"
        mt={2}
      >
        Return to website
      </Button>
    </Wrapper>
  );
}

export default Page403;
