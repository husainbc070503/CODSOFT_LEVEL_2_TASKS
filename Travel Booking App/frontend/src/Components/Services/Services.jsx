import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import airplane from "../../images/airplane.webp";
import bus from "../../images/bus.jpeg";
import cruise from "../../images/cruise.jpeg";
import train from "../../images/train.jpeg";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const services = [
    { title: "Airline Booking", image: airplane },
    { title: "Train Booking", image: train },
    { title: "Bus Booking", image: bus },
    { title: "Cruise Booking", image: cruise },
  ];

  return (
    <Container maxWidth="lg">
      <section className="sections">
        <Typography className="Typography section-heading">
          Services We Provide
        </Typography>
        <Grid container gap={10} justifyContent="center">
          {services.map((service, index) => {
            return (
              <Grid key={index} md={4} xs={12} item>
                <ServiceCard service={service} />
              </Grid>
            );
          })}
        </Grid>
      </section>
    </Container>
  );
};

export default Services;
