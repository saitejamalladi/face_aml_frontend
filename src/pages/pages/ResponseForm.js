import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { Download as DownloadIcon } from "react-feather";

const ResponseForm = ({ responseData }) => {
  let images = [
    "Kiran_Teja.jpg",
    "Krishna_Teja.jpg",
    "Mohan_Teja.jpg",
    "narendra_modi.jpg",
    "nirav_modi.jpg",
    "nirav2.jpg",
    "nirav3.jpg",
    "Ravi_Teja.jpg",
    "Teja_Director.jpg",
    "Teja_Sajja.jpg",
    "Dora_Sai_Teja.jpg",
  ];
  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(responseData)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
  };
  // Function will execute on click of button
  const onPDFDownload = () => {
    // using Java Script method to get PDF file
    fetch(
      "https://face-aml-target-image-collection.s3.amazonaws.com/sample.pdf"
    ).then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "SamplePDF.pdf";
        alink.click();
      });
    });
  };
  return (
    <Container>
      <Grid
        container
        direction={"column"}
        spacing={6}
        style={{ height: "100%" }}
      >
        <Typography variant="h3" gutterBottom display="inline">
          Result
        </Typography>
        <Grid item>
          <Grid container>
            <Grid item xs={5}>
              <TextField
                id="filled-read-only-input"
                label=""
                defaultValue="Transaction Id"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                variant="filled"
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                id="outlined-read-only-input"
                label=""
                defaultValue={
                  responseData ? responseData.transaction_id : "No Data Yet"
                }
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        {responseData && (
          <React.Fragment>
            <Grid item>
              <Grid container direction={"row-reverse"} spacing={4}>
                <Grid item>
                  <Button
                    variant={"contained"}
                    startIcon={<DownloadIcon />}
                    color={"primary"}
                    onClick={exportData}
                  >
                    Download Json
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant={"contained"}
                    startIcon={<DownloadIcon />}
                    color={"primary"}
                    onClick={onPDFDownload}
                  >
                    Download Weblink PDF
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="h3" gutterBottom display="inline">
                Matched Faces
              </Typography>
            </Grid>
            <Grid item>
              <Grid container spacing={3}>
                {images.map((imageUrl, index) => (
                  <Grid item xs={4} key={index}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        component="img"
                        height="250"
                        image={`https://face-aml-target-image-collection.s3.amazonaws.com/${imageUrl}`}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Lizards are a widespread group of squamate reptiles,
                          with over 6,000 species, ranging across all continents
                          except Antarctica
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          onClick={() =>
                            window.open(
                              "https://www.timesofisrael.com/ahmad-jibril-head-of-syria-based-palestinian-terror-group-pflp-gc-dead-at-83/",
                              "_blank"
                            )
                          }
                        >
                          Learn More
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </React.Fragment>
        )}
      </Grid>
    </Container>
  );
};
export default ResponseForm;
