import React from "react";

import { Users as UsersIcon } from "react-feather";

// Guards
import GuestGuard from "../components/GuestGuard";
import AuthGuard from "../components/AuthGuard";

// Auth components
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import SignUpSuperAdmin from "../pages/auth/SignUpSuperAdmin";
import SignUpGlobalAdmin from "../pages/auth/SignUpGlobalAdmin";
import ResetPassword from "../pages/auth/ResetPassword";
import Page404 from "../pages/auth/Page404";
import Page500 from "../pages/auth/Page500";

import {
  AccountCircle as AccountCircleIcon,
} from "@material-ui/icons";

// Account components
import APITest from "../pages/pages/APITest";

const authRoutes = {
  id: "Auth",
  path: "/auth",
  icon: <UsersIcon />,
  children: [
    {
      path: "/auth/sign-in",
      name: "Sign In",
      component: SignIn,
      guard: GuestGuard,
    },
    {
      path: "/auth/sign-up",
      name: "Sign Up",
      component: SignUp,
    },
    {
      path: "/auth/sign-up/super-admin",
      name: "Sign Up->Super Admin",
      component: SignUpSuperAdmin,
    },
    {
      path: "/auth/sign-up/global-admin",
      name: "Sign Up->Global Admin",
      component: SignUpGlobalAdmin,
    },
    {
      path: "/auth/reset-password",
      name: "Reset Password",
      component: ResetPassword,
    },
    {
      path: "/auth/404",
      name: "404 Page",
      component: Page404,
    },
    {
      path: "/auth/500",
      name: "500 Page",
      component: Page500,
    },
  ],
  component: null,
};

const accountRoutes = {
  id: "Home",
  path: "/",
  icon: <AccountCircleIcon />,
  component: APITest,
  children: null,
  guard: AuthGuard,
};

// Routes using the Dashboard layout
export const dashboardLayoutRoutes = [
  accountRoutes,
];

// Routes using the Auth layout
export const authLayoutRoutes = [authRoutes];

// Routes visible in the sidebar
export const sidebarRoutes = [
  accountRoutes,
];
