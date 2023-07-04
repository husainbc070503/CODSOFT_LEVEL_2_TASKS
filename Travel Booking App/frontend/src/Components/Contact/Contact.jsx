import { Container, Typography } from "@mui/material";
import React from "react";
import Form from "./Form";
import "./Contact.css";

const Contact = () => {
  return (
    <Container maxWidth="lg">
      <section className="sections">
        <Typography className="Typography section-heading">
          Contact Us
        </Typography>
          <Form />
      </section>
    </Container>
  );
};

export default Contact;
