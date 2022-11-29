import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  // Collapse,
  Container,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import styled from "styled-components/macro";

import { Download as DownloadIcon } from "react-feather";
import { red } from "@material-ui/core/colors";
// import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import Loader from "./Loader";
import { spacing } from "@material-ui/system";

const Spacer = styled.div(spacing);

const ResponseForm = ({ responseData, loading }) => {
  // const [expanded, setExpanded] = React.useState(false);
  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

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
  const onPDFDownload = (url, name) => {
    if (url) {
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
          alink.download = `${name}.pdf`;
          alink.click();
        });
      });
    }
  };

  // const ExpandMore = styled((props) => {
  //   const { expand, ...other } = props;
  //   return <IconButton {...other} />;
  // })(({ theme, expand }) => ({
  //   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  //   marginLeft: "auto",
  //   transition: theme.transitions.create("transform", {
  //     duration: theme.transitions.duration.shortest,
  //   }),
  // }));
  return (
    <Card mb={6} style={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h3" gutterBottom>
          Result
        </Typography>

        <Grid container spacing={6}>
          <Grid item xs={"auto"}>
            <Typography variant="h6" gutterBottom>
              Transaction Id :
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body1" gutterBottom>
              {responseData?.transaction_id || "No data yet"}
            </Typography>
          </Grid>
        </Grid>
        <Grid container direction={"column"} spacing={6}>
          {loading && <Loader />}
          {responseData && responseData.transaction_id && (
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
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="h3" gutterBottom display="inline">
                  Matched Faces
                </Typography>
              </Grid>
              <Grid item>
                <Grid container spacing={3}>
                  {responseData.res_data && responseData.res_data.length > 0 ? (
                    responseData.res_data.map((face, index) => (
                      <Grid item xs={4} key={index}>
                        <Card sx={{ maxWidth: 345 }}>
                          <CardHeader
                            avatar={
                              <Avatar
                                sx={{ bgcolor: red[500] }}
                                aria-label="profile"
                              >
                                {face.name[0]}
                              </Avatar>
                            }
                            title={face.name}
                            subheader={`Similarity Score : ${face.similarity.toFixed(
                              2
                            )}`}
                          />
                          <CardMedia
                            component="img"
                            height="220"
                            image={`https://${face.bucket}.s3.amazonaws.com/${face.face_image}`}
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography variant="body2" color="text.secondary">
                              {face.remarks}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button
                              size="small"
                              color={"primary"}
                              onClick={() =>
                                window.open(face.web_link, "_blank")
                              }
                            >
                              Learn More
                            </Button>
                            <Button
                              size="small"
                              color={"primary"}
                              onClick={() =>
                                onPDFDownload(face.weblink_pdf, face.name)
                              }
                            >
                              Download Pdf
                            </Button>
                            {/*<ExpandMore*/}
                            {/*  expand={expanded}*/}
                            {/*  onClick={handleExpandClick}*/}
                            {/*  aria-expanded={expanded}*/}
                            {/*  aria-label="show more"*/}
                            {/*>*/}
                            {/*  <ExpandMoreIcon />*/}
                            {/*</ExpandMore>*/}
                          </CardActions>
                          {/*<Collapse in={expanded} timeout="auto" unmountOnExit>*/}
                          {/*  <CardContent>*/}
                          {/*    <JSONPretty data={face} />*/}
                          {/*  </CardContent>*/}
                          {/*</Collapse>*/}
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={4}>
                      <div>No Faces matched with the given inputs</div>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </React.Fragment>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};
export default ResponseForm;
