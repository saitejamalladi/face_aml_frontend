import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import axios from "axios";
import RequestForm from "./RequestForm";
import ResponseForm from "./ResponseForm";

const APITest = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleGetResponse = (request) => {
    setResponse(null);
    setError(null);
    setLoading(true);
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
          setLoading(false);
          setResponse(res.data);
        })
        .catch((err) => {
          setLoading(false);
          setError(err);
        });
    }
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={3}>
        <RequestForm handleGetResponse={handleGetResponse} />
      </Grid>
      <Grid item xs={12} sm={9}>
        <ResponseForm
          transactionId={response?.transaction_id}
          responseData={response?.res_data}
          loading={loading}
        />
      </Grid>
    </Grid>
  );
};
export default APITest;
