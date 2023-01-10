import React from "react";
import styled, { withTheme } from "styled-components/macro";

import {
  Grid,
  Hidden,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Toolbar,
  ListItem,
  Typography,
} from "@material-ui/core";

import { Menu as MenuIcon } from "@material-ui/icons";

import UserDropdown from "./UserDropdown";
import AccountDisplay from "./AccountDisplay";
import { NavLink } from "react-router-dom";

const AppBar = styled(MuiAppBar)`
  background: #22334d;
`;

const Brand = styled(ListItem)`
  font-size: ${(props) => props.theme.typography.h5.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  color: ${(props) => props.theme.sidebar.header.color};
  font-family: ${(props) => props.theme.typography.fontFamily};
  min-height: 76px;
  justify-content: center;
  cursor: pointer;

  ${(props) => props.theme.breakpoints.up("sm")} {
    min-height: 64px;
  }
`;

const BrandImage = styled.img`
  max-width: 130px;
  margin-right: ${(props) => props.theme.spacing(2)}px;
  height: auto;
  display: block;
`;

const AppBarComponent = () => (
  <React.Fragment>
    <AppBar position="static" elevation={2}>
      <Toolbar>
        <Grid container justify={"space-between"} alignItems="center">
          <Grid item xs={"auto"}>
            <Brand component={NavLink} to="/" button>
              <BrandImage
                alt={`Regulo`}
                src={`/static/img/brands/brand-logo.jpg`}
              />{" "}
            </Brand>
          </Grid>
          <Grid item xs={"auto"}>
            <AccountDisplay />
          </Grid>
          <Grid item>
            <UserDropdown />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  </React.Fragment>
);

export default withTheme(AppBarComponent);
