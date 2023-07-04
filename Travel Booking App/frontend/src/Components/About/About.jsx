import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import about from "../../images/about-us.jpg";
import "./About.css";
import styled from "@emotion/styled";

const Card = styled(Box)`
  width: 100%;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 10px 30px #89a4c765;
`;

const About = () => {
  return (
    <Container maxWidth="lg">
      <section className="sections">
        <Typography className="Typography section-heading">About Us</Typography>
        <Card>
          <Grid container spacing={4}>
            <Grid item md={8} xs={12}>
              <Typography className="Typography title">
                Travel Booking Company
              </Typography>
              <Typography className="Typography content">
                Welcome to our travel booking company! We are dedicated to
                providing exceptional travel experiences and making your travel
                dreams come true. Our team of passionate travel enthusiasts is
                here to curate unforgettable trips tailored to your preferences.
                With a wide range of options, seamless booking process, and
                reliable customer support, we strive to exceed your
                expectations. Let us be your partner in exploring the world!.
                <span />
                As a responsible travel company, we also recognize the
                importance of sustainable and ethical travel practices. We
                strive to promote eco-friendly initiatives, support local
                communities, and encourage responsible tourism to preserve the
                destinations we visit for future generations.
                <span />
                Thank you for choosing our travel booking company. We look
                forward to helping you plan your next adventure and creating
                memories that will last a lifetime. Let us be your partner in
                exploring the world!
              </Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <img src={about} alt="aboutus" className="about-img" />
            </Grid>
          </Grid>
        </Card>
      </section>
    </Container>
  );
};

export default About;
