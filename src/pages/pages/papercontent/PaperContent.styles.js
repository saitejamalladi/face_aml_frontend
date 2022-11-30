import styled from "styled-components";

import { Paper } from "@material-ui/core";

export const MainDiv = styled(Paper)`
  padding: 1.2rem;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.13);
  border-radius: 16px;
  margin: 1.5rem 0 0rem 0;
  padding-bottom: 2.5rem;
`;

export const Heading = styled.h1`
  padding: 0;
  margin: 0;
`;

export const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const LearnMoreDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7.563rem;
  height: 1.875rem;
  border: 2px solid ${(props) => props.theme.palette.primary.main};
  box-sizing: border-box;
  border-radius: 16px;
  cursor: pointer;
`;

export const HeadingDiv = styled.div``;

export const IconDiv = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;

export const Description = styled.p`
  font-size: ${(props) => props.theme.typography.subTextFont};
  font-weight: normal;
  line-height: 16px;
  width: 75%;
  margin-top: 0.25rem;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.palette.background.greyText};
  white-space: pre-wrap;
`;
