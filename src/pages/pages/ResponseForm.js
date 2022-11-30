import React from "react";
import { Grid, Typography } from "@material-ui/core";

import "react-json-pretty/themes/monikai.css";
import PaperComponent from "./papercontent/PaperContent";
import Loader from "./papercontent/Loader";
import DisplayProfile from "./DisplayProfile";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";

const Spacer = styled.div(spacing);

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
              <PaperComponent
                heading={"Matched Faces"}
                description={
                  "The Customer face matched with the Listed Individual face"
                }
              >
                <Grid container spacing={3} alignContent={"center"}>
                  {responseData.matchedFaces.map((face, index) => (
                    <Grid item xs={4} key={index}>
                      <DisplayProfile face={face} />
                    </Grid>
                  ))}
                </Grid>
              </PaperComponent>
            )}
            {responseData.unMatchedFaces.length > 0 && (
              <PaperComponent
                heading={"Unmatched Faces"}
                description={
                  "The Customer face DOESN’T match with the Listed Individual face"
                }
              >
                <Grid container spacing={3} alignContent={"center"}>
                  {responseData.unMatchedFaces.map((face, index) => (
                    <Grid item xs={4} key={index}>
                      <DisplayProfile face={face} />
                    </Grid>
                  ))}
                </Grid>
              </PaperComponent>
            )}
          </React.Fragment>
        ) : (
          <Grid
            container
            direction={"column-reverse"}
            alignContent={"center"}
            alignItems={"center"}
            style={{ height: "100px" }}
          >
            <Grid item>
              <Spacer mb={3} />
              <Typography variant="body2" gutterBottom color={"primary"}>
                FaceAML doesn't have a face in the database for the Listed
                Individual
              </Typography>
            </Grid>
          </Grid>
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
