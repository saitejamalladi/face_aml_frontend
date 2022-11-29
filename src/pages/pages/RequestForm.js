import React, { useState } from "react";
import styled from "styled-components/macro";
import {
  Button,
  Card as MuiCard,
  CardContent,
  TextField,
  Typography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const Card = styled(MuiCard)(spacing);

const Spacer = styled.div(spacing);

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
  };
  const onNameChange = (event) => {
    setRequest({ ...request, name: event.target.value });
  };

  return (
    <Card mb={6} style={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h3" gutterBottom>
          Request
        </Typography>
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
            <Spacer mb={6} />
            <Button variant="contained" component="label" onChange={selectFile}>
              {request.image ? request.image.name : "Click to upload the image"}
              <input type="file" hidden />
            </Button>
            <Spacer mb={6} />
            <Button
              color={"primary"}
              variant="contained"
              onClick={submitRequest}
              disabled={!request.name || !request.image}
            >
              Submit
            </Button>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};
export default RequestForm;
