import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const DisplayProfile = ({ face }) => {
  // Function will execute on click of button
  const onPDFDownload = (webLink) => {
    if (webLink) {
      // using Java Script method to get PDF file
      fetch(
        `https://face-aml-target-image-collection.s3.amazonaws.com/${webLink}`
      ).then((response) => {
        response.blob().then((blob) => {
          // Creating new object of PDF file
          const fileURL = window.URL.createObjectURL(blob);
          // Setting various property values
          // let alink = document.createElement("a");
          // alink.href = fileURL;
          // alink.download = `${name}.pdf`;
          // alink.click();
          const pdfWindow = window.open();
          pdfWindow.location.href = fileURL;
        });
      });
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="profile">
            {face.name[0]}
          </Avatar>
        }
        title={face.name}
        subheader={`Similarity Score : ${face.similarity.toFixed(2)}`}
      />
      <CardMedia
        component="img"
        image={`https://${face.bucket}.s3.amazonaws.com/${face.face_image}`}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Listed Individual Details
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {face.remarks}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color={"primary"}
          onClick={() => window.open(face.web_link, "_blank")}
        >
          Source Web Link
        </Button>
        <Button
          size="small"
          color={"primary"}
          onClick={() => onPDFDownload(face.weblink_pdf)}
        >
          View Pdf
        </Button>
      </CardActions>
    </Card>
  );
};
export default DisplayProfile;
