import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Heading from "./HeaderFooter/Heading";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import Flights from "./Flights/Flights";
import { useGlobalContext } from "../Context/AdminContext";

const Text = styled(Typography)`
  font-size: 28px;
  font-weight: bold;
  color: #40128b;

  @media (max-width: 890px) {
    font-size: 22px;
  }
`;

const Index = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { flights } = useGlobalContext();

  return (
    <Container maxWidth="lg">
      <div className="container">
        <Heading title={"Travel Booking App - Admin Panel"} />
        <Grid container spacing={2} alignItems="center" margin="22px 0">
          <Grid item md={4} xs={6}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("addFlight")}
            >
              Add Flights
            </Button>
          </Grid>
          <Grid item md={4} xs={6}>
            <Text>Flights Details</Text>
          </Grid>
          <Grid item md={4} xs={12} textAlign="center">
            <TextField
              label="Search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>
        </Grid>
        <Flights
          flights={flights.filter((flight) =>
            flight.airline.toLowerCase().includes(search)
          )}
        />
      </div>
    </Container>
  );
};

export default Index;
