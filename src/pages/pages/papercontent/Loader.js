import React from "react";

import {
  MainDiv,
  Heading,
  TopDiv,
  HeadingDiv,
  Description,
} from "./PaperContent.styles";

import { CircularProgress } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import styled, { withTheme } from "styled-components/macro";

const LoaderBar = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 300px;
`;

const Loader = () => (
  <MainDiv>
    <TopDiv>
      <HeadingDiv>
        <Heading>
          <Skeleton
            style={{ display: "inline-block", alignContent: "center" }}
            variant="rect"
            width={"150px"}
          />
        </Heading>
      </HeadingDiv>
    </TopDiv>
    <Description>
      <Skeleton
        style={{ display: "inline-block", alignContent: "center" }}
        variant="rect"
        width={"450px"}
      />
    </Description>
    <LoaderBar>
      <CircularProgress style={{ color: "primary" }} size={"6rem"} />
    </LoaderBar>
  </MainDiv>
);
export default withTheme(Loader);
