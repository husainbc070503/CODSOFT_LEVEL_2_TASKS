import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import React from "react";

const Title = styled(Typography)`
  font-size: 30px;
  text-align: center;
  color: #2d4356;
  font-weight: bold;
  line-height: 3.4rem;

  @media (max-width: 890px) {
    font-size: 20px;
    line-height: 2.6rem;
  }
`;

const Heading = ({ title }) => {
  return <Title>{title}</Title>;
};

export default Heading;
