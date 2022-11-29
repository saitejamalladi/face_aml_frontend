import React, { useState } from "react";
import { Divider, Grid } from "@material-ui/core";
import axios from "axios";
import RequestForm from "./RequestForm";
import ResponseForm from "./ResponseForm";

const APITest = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const handleGetResponse = (request) => {
    setResponse(null);
    setError(null);
    console.log(request);
    if (request) {
      let formData = new FormData();
      formData.append("image", request.image);
      formData.append("name", request.name);
      axios
        .post("http://54.169.223.189:8080/api/face-aml", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setResponse(res.data);
        })
        .catch((err) => {
          setError(err);
        });
    }
  };
  return (
    <Grid container spacing={6} style={{ height: "70vh" }}>
      <Grid item xs={3} sm={3}>
        <React.Fragment>
          <RequestForm handleGetResponse={handleGetResponse} />
          <Divider orientation="vertical" flexItem />
        </React.Fragment>
      </Grid>
      <Grid item xs={12} sm={9}>
        <ResponseForm responseData={response} />
      </Grid>
    </Grid>
  );
};
export default APITest;
