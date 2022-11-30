import React from "react";

import {
  MainDiv,
  Heading,
  TopDiv,
  HeadingDiv,
  Description,
} from "./PaperContent.styles";
import { Download as DownloadIcon } from "react-feather";
import { Button } from "@material-ui/core";

const MainPaperComponent = ({
  heading,
  description,
  children,
  elementData,
}) => {
  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(elementData)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `${description}.json`;
    link.click();
  };
  return (
    <MainDiv>
      <TopDiv>
        <HeadingDiv>
          <Heading>{heading}</Heading>
        </HeadingDiv>
        {elementData && (
          <Button
            variant={"contained"}
            startIcon={<DownloadIcon />}
            color={"primary"}
            onClick={exportData}
          >
            Download Json
          </Button>
        )}
      </TopDiv>
      <Description>{description}</Description>
      {children}
    </MainDiv>
  );
};
export default MainPaperComponent;
