import { Container, Typography } from "@mui/material";
import React from "react";
import "./Intro.css";
import FilterCard from "./FilterCard";

const Intro = () => {
  return (
    <div className="wrapper">
      <Container maxWidth="lg">
        <div className="container intro-container">
          <div className="welcome-note">
            <Typography className="Typography heading">
              Online Airline Booking App
            </Typography>
            <Typography className="Typography text">
              The online airline booking web app is a user-friendly platform
              that allows individuals to conveniently search, compare, and book
              flights online. The app provides users with access to a vast
              database of airlines, destinations, and available flights, making
              it easy to find the most suitable options based on their
              preferences and travel requirements. Users can input their
              departure and arrival locations, preferred travel dates, and
              passenger details to retrieve a list of available flights, along
              with their respective prices, durations, and layovers if
              applicable.
            </Typography>
          </div>
          <FilterCard />
        </div>
      </Container>
    </div>
  );
};

export default Intro;
