import React,{useState} from "react";
import styled from "styled-components/macro";

import { Breadcrumbs as MuiBreadcrumbs, Link, Tooltip, Typography} from "@material-ui/core";
import {spacing} from "@material-ui/system";
import {useSelector} from "react-redux";

const AccountName = styled(Typography)`
  color: orange;
  text-transform: uppercase;
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
  margin-left: ${(props) => props.theme.spacing(2)}px;
  padding-left: ${(props) => props.theme.spacing(2)}px;
`;

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

function AccountDisplay() {
    let scaleReducer = useSelector((state) => state.scaleReducer);
    let accountStack = scaleReducer.accountStack;
    return (
    <React.Fragment>
      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        {
          accountStack.map((account, index) =>
            <AccountName key={account.account_id}>{account.name}</AccountName>
          )
        }
      </Breadcrumbs>
    </React.Fragment>
  );
}

export default AccountDisplay;
