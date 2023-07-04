import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useGlobalContext } from "../../Contexts/Context";
import Flight from "./Flight";
import "./Flights.css";

const Flights = ({ flights }) => {
  return (
    flights.length > 0 && (
      <Container maxWidth="lg">
        <section className="sections">
          <Typography className="Typography section-heading">
            Filtered Flights
          </Typography>
          <Grid container spacing={2}>
            {flights &&
              flights?.map((flight) => {
                return (
                  <Grid item md={4} xs={12} key={flight._id}>
                    <Flight flight={flight} />
                  </Grid>
                );
              })}
          </Grid>
        </section>
      </Container>
    )
  );
};

export default Flights;
