import React from "react";
import { Grid, Typography as MuiTypography } from "@material-ui/core";

// import "react-json-pretty/themes/monikai.css";
import PaperComponent from "./papercontent/PaperContent";
import Loader from "./papercontent/Loader";
import DisplayProfile from "./DisplayProfile";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import CollapsibleTable from "./CollapsibileTable";

const Spacer = styled.div(spacing);

const Typography = styled(MuiTypography)`
  font-size: 2rem;
`;
const PinkTypography = styled(Typography)`
  color: #d414aa;
`;

const ResponseForm = ({ transactionId, responseData, loading }) => {
  if (responseData) {
    return (
      <PaperComponent
        heading={"Result"}
        description={`Transaction Id :${transactionId}`}
      >
        <CollapsibleTable responseData={responseData} />
      </PaperComponent>
    );
  }
  return (
    <PaperComponent
      heading={"Result"}
      description={`Transaction Id :No data yet`}
    >
      {loading && <Loader />}
    </PaperComponent>
  );
};
export default ResponseForm;
