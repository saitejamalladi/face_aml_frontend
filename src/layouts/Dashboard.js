import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components/macro";
import Sidebar from "../components/Sidebar";
import Header from "../components/AppBar";
import Footer from "../components/Footer";

import { spacing } from "@material-ui/system";
import {
  Hidden,
  CssBaseline,
  Paper as MuiPaper,
  withWidth,
} from "@material-ui/core";

import { isWidthUp } from "@material-ui/core/withWidth";

const drawerWidth = 258;

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    background: ${(props) => props.theme.palette.background.default};
  }

  .MuiCardHeader-action .MuiIconButton-root {
    padding: 4px;
    width: 28px;
    height: 28px;
  }
`;

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Drawer = styled.div`
  ${(props) => props.theme.breakpoints.up("md")} {
    width: ${drawerWidth}px;
    flex-shrink: 0;
  }
`;

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

const MainContent = styled(MuiPaper)`
  padding: 8px;
  flex: 1;
  background: #22334d;
  border-radius: 0;
  min-height: 80%;

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }
`;

const Dashboard = ({ children, routes, width }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Root>
      <CssBaseline />
      <GlobalStyle />
      {/*<Drawer>*/}
      {/*<Hidden smDown implementation="js">*/}
      {/*  <Sidebar*/}
      {/*    routes={routes}*/}
      {/*    PaperProps={{ style: { width: drawerWidth } }}*/}
      {/*    variant="temporary"*/}
      {/*    open={mobileOpen}*/}
      {/*    onClose={handleDrawerToggle}*/}
      {/*  />*/}
      {/*</Hidden>*/}
      {/*<Hidden smDown implementation="css">*/}
      {/*  <Sidebar*/}
      {/*    routes={routes}*/}
      {/*    PaperProps={{ style: { width: drawerWidth } }}*/}
      {/*  />*/}
      {/*</Hidden>*/}
      {/*</Drawer>*/}
      <AppContent>
        <Header onDrawerToggle={handleDrawerToggle} />
        <MainContent p={isWidthUp("lg", width) ? 12 : 5}>
          {children}
        </MainContent>
        {/*<Footer />*/}
      </AppContent>
    </Root>
  );
};

export default withWidth()(Dashboard);
