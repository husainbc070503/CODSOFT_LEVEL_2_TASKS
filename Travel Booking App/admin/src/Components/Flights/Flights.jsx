import React from "react";
import { useGlobalContext } from "../../Context/AdminContext";
import { Container, Grid } from "@mui/material";
import Flight from "./Flight";

const Flights = ({ flights }) => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={4}>
        {flights &&
          flights.map((flight) => {
            return (
              <Grid item md={4} xs={12} key={flight._id}>
                <Flight flight={flight} />
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
};

export default Flights;
