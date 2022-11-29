import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { dashboardLayoutRoutes, authLayoutRoutes } from "./index";

import DashboardLayout from "../layouts/Dashboard";
import AuthLayout from "../layouts/Auth";
import Page404 from "../pages/auth/Page404";
import Page403 from "../pages/auth/Page403";
import { useSelector } from "react-redux";

const childRoutes = (Layout, routes, userRole) => {
  return routes.map(
    (
      { component: Component, guard, children, path, permittedRoles },
      index
    ) => {
      if (!permittedRoles || permittedRoles.includes(userRole)) {
        const Guard = guard || React.Fragment;

        return children ? (
          children.map((element, index) => {
            const Guard = element.guard || React.Fragment;
            const ElementComponent = element.component || React.Fragment;

            return (
              <Route
                key={index}
                path={element.path}
                exact
                render={(props) => (
                  <Layout>
                    <Guard>
                      <ElementComponent {...props} />
                    </Guard>
                  </Layout>
                )}
              />
            );
          })
        ) : Component ? (
          <Route
            key={index}
            path={path}
            exact
            render={(props) => (
              <Layout>
                <Guard>
                  <Component {...props} />
                </Guard>
              </Layout>
            )}
          />
        ) : null;
      }
      return null;
    }
  );
};

const Routes = () => {
  const auth = useSelector((state) => state.authReducer);
  let role = auth.user ? auth.user.role : "";
  if(role === "User" || role === "user" || role === null){
    return (
      <Router>
        <Route>
          <Page403 />  
        </Route >
      </Router>
    );
  }
  return (
    <Router>
      <Switch>
        {childRoutes(AuthLayout, authLayoutRoutes, role)}
        {childRoutes(DashboardLayout, dashboardLayoutRoutes, role)}
        <Route
          render={() => (
            <AuthLayout>
              <Page404 />
            </AuthLayout>
          )}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
