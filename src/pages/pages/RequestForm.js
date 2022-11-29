import React, { useState } from "react";
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";

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
    <Container>
      <Grid container direction={"column"} style={{ height: "100%" }}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Request
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            onChange={onNameChange}
            fullWidth
          />
        </Grid>
        <Grid item>
          <Button variant="contained" component="label" onChange={selectFile}>
            Upload File
            <input type="file" hidden />
          </Button>
        </Grid>
        <Grid item>
          <button onClick={submitRequest}> Submit</button>
        </Grid>
      </Grid>
    </Container>
  );
};
export default RequestForm;
