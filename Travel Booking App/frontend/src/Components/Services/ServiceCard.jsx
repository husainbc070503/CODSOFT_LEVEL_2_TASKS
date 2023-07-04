import { Box, Typography } from "@mui/material";
import React from "react";
import './Services.css'

const ServiceCard = ({ service }) => {
  const { title, image } = service;

  return (
    <Box>
      <div className="service-card">
        <img src={image} alt={title} />
        <Typography className="Typography service-title">{title}</Typography>
      </div>
    </Box>
  );
};

export default ServiceCard;
