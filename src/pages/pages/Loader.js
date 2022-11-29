import React from "react";
import { CircularProgress } from "@material-ui/core";
import styled from "styled-components/macro";

const LoaderBar = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 300px;
`;

function Loader() {
  return (
    <LoaderBar>
      <CircularProgress color={"primary"} size={"6rem"} />
    </LoaderBar>
  );
}
export default Loader;
