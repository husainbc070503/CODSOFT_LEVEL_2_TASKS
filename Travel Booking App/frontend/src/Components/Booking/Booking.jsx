import {
  Container,
  FormControl,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../Contexts/Context";
import "./Booking.css";
import BookingForm from "./BookingForm";

const Booking = () => {
  const { id } = useParams();
  const { singleFlight, getSingleFlight } = useGlobalContext();

  useEffect(() => {
    getSingleFlight(id);
  }, [id]);

  return (
    <Container maxWidth="lg">
      <div className="container booking-cont">
        <section className="sections">
          <Typography className="Typography section-heading">
            Booking Desk
          </Typography>
          <div className="booking-form">
            <BookingForm singleFlight={singleFlight} />
          </div>
        </section>
      </div>
    </Container>
  );
};

export default Booking;
