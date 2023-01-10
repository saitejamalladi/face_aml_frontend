import React from "react";
import { Grid, Typography as MuiTypography } from "@material-ui/core";

import "react-json-pretty/themes/monikai.css";
import PaperComponent from "./papercontent/PaperContent";
import Loader from "./papercontent/Loader";
import DisplayProfile from "./DisplayProfile";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";

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
        {responseData?.faceCount > 0 ? (
          <React.Fragment>
            {responseData.matchedFaces.length > 0 && (
              <React.Fragment>
                <Typography display="inline">
                  The customer face{" "}
                  <PinkTypography display="inline">matched</PinkTypography> with
                  the listed individual face
                </Typography>

                <Grid container spacing={3} alignContent={"center"}>
                  {responseData.matchedFaces.map((face, index) => (
                    <Grid item xs={4} key={index}>
                      <Spacer mb={3} />
                      <DisplayProfile face={face} />
                    </Grid>
                  ))}
                </Grid>
              </React.Fragment>
            )}
            {responseData.unMatchedFaces.length > 0 && (
              <React.Fragment>
                <Typography display="inline">
                  The customer face{" "}
                  <PinkTypography display="inline">
                    doesn’t match{" "}
                  </PinkTypography>{" "}
                  with the listed individual face
                </Typography>
                <Grid container spacing={3} alignContent={"center"}>
                  {responseData.unMatchedFaces.map((face, index) => (
                    <Grid item xs={4} key={index}>
                      <Spacer mb={3} />
                      <DisplayProfile face={face} />
                    </Grid>
                  ))}
                </Grid>
              </React.Fragment>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Spacer mb={3} />
            <PinkTypography variant="p" gutterBottom color={"red"}>
              No Face{" "}
            </PinkTypography>
            <Typography variant="p" gutterBottom color={"primary"}>
              found in the database
            </Typography>
          </React.Fragment>
        )}
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
