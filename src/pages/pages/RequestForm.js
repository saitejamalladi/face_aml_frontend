import React, { useState } from "react";
import styled from "styled-components/macro";
import {
  Button,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Grid,
  TextField,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import PaperComponent from "./papercontent/PaperContent";

const Card = styled(MuiCard)(spacing);

const Spacer = styled.div(spacing);
const CardContent = styled(MuiCardContent)`
  padding: 2px;
  padding-bottom: 2px;
  margin: 0;
`;

const RequestForm = ({ handleGetResponse }) => {
  const [request, setRequest] = useState({
    name: "",
    image: null,
  });
  const submitRequest = () => {
    handleGetResponse(request);
  };
  const selectFile = (event) => {
    setRequest({ ...request, image: event.target.files[0] });
    console.log(event.target.files[0]);
  };
  const getObjectURL = (selectedFile) => {
    if (selectedFile) return URL.createObjectURL(selectedFile);
    return "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";
  };
  const onNameChange = (event) => {
    setRequest({ ...request, name: event.target.value });
  };

  return (
    <PaperComponent
      heading={"Request"}
      description={`Enter the name and upload the image to get the results`}
    >
      <Card mb={6}>
        <CardContent>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            placeholder={"Enter the name"}
            onChange={onNameChange}
            fullWidth
          />
          <Spacer mb={3} />
          <Button variant="contained" component="label" onChange={selectFile}>
            {request.image ? request.image.name : "Click to upload the image"}
            <input type="file" hidden />
          </Button>
          <Spacer mb={3} />
          {
            <img
              src={getObjectURL(request.image)}
              alt={"test"}
              width={"100%"}
              height={"200px"}
            />
          }
          <Spacer mb={3} />
          <Grid container direction={"row-reverse"}>
            <Grid item>
              <Button
                color={"primary"}
                variant="contained"
                onClick={submitRequest}
                disabled={!request.name || !request.image}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </PaperComponent>
  );
};
export default RequestForm;
