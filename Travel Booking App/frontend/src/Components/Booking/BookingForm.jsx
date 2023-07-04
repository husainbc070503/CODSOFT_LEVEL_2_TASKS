import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import React, { useState } from "react";
import AddPassenger from "./AddPassenger";
import PassengersList from "./PassengersList";
import { useGlobalContext } from "../../Contexts/Context";
import { api } from "../../Utils/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.jpeg";

const initialState = {
  adults: 0,
  children: 0,
  bookedClass: "",
  noOfSeats: 0,
};

const BookingForm = ({ singleFlight }) => {
  const {
    _id,
    airline,
    from,
    to,
    departingDate,
    departureTime,
    arrivingDate,
    arrivalTime,
    seats,
    image,
  } = singleFlight;

  const [booking, setBooking] = useState(initialState);
  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setBooking({ ...booking, [e.target.name]: e.target.value });

  const seatsAvbl =
    seats && seats.find((seat) => seat.class === booking.bookedClass);

  const totalPrice = booking.noOfSeats * seatsAvbl?.pricePerSeat;

  const { dispatch, user } = useGlobalContext();

  const addBooking = async () => {
    setLoading(true);

    if (
      Number(booking.adults) + Number(booking.children) !==
      Number(booking.noOfSeats)
    ) {
      setLoading(false);
      return toast.error(
        "Number of seats is unequal to summation of adults and children",
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }

    if (
      Number(booking.adults) < 0 ||
      Number(booking.children) < 0 ||
      Number(booking.noOfSeats) < 0
    ) {
      setLoading(false);
      return toast.error("Negative intergers not allowed. Please check", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    try {
      const res = await fetch(`${api}/api/booking/bookTicket`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          ...booking,
          passengers,
          flight: _id,
          totalPrice,
          bookingDateTime: new Date().toLocaleString(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        const options = {
          key: "rzp_test_FlqRfa8gpkyIvH",
          amount: data.totalPrice,
          order_id: data.id,
          currency: data.currency,
          image: logo,

          handler: (resp) => {
            toast.success("Tickets Booked. Check mail", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

            toast.info(`Payment Id: ${resp.razorpay_payment_id}`, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

            setPassengers([]);
            setBooking(initialState);
            dispatch({ type: "ADD_BOOKING", payload: data.booking });
            navigate("../bookings");
          },

          prefill: {
            name: data.booking.user.name,
            email: data.booking.user.email,
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <Grid container spacing={6}>
      <Grid item md={4} xs={12} className="grid-mobile">
        <img src={image} alt={airline} className="flight-image" />
        <Typography className="Typography airline" color="primary">
          {airline}
        </Typography>
      </Grid>
      <Grid item md={8} xs={12} className="Grid book-form">
        <div className="input-group">
          <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <FormLabel className="FormLabel label">From</FormLabel>
                <TextField type="text" value={from} disabled />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <FormLabel className="FormLabel label">To</FormLabel>
                <TextField type="text" value={to} disabled />
              </FormControl>
            </Grid>
          </Grid>
        </div>
        <div className="input-group">
          <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <FormLabel className="FormLabel label">
                  Departure Date
                </FormLabel>
                <TextField type="date" value={departingDate} disabled />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <FormLabel className="FormLabel label">
                  Departure Time
                </FormLabel>
                <TextField type="time" value={departureTime} disabled />
              </FormControl>
            </Grid>
          </Grid>
        </div>
        <div className="input-group">
          <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <FormLabel className="FormLabel label">Arrival Date</FormLabel>
                <TextField type="date" value={arrivingDate} disabled />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <FormLabel className="FormLabel label">Arrival Time</FormLabel>
                <TextField type="time" value={arrivalTime} disabled />
              </FormControl>
            </Grid>
          </Grid>
        </div>
        <div className="input-group">
          <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <FormLabel className="FormLabel label">Class</FormLabel>
                <Select
                  name="bookedClass"
                  value={booking.bookedClass}
                  onChange={handleChange}
                  required
                >
                  {["First", "Bussiness", "Economy"].map((c, index) => {
                    return (
                      <MenuItem key={index} value={c}>
                        {c}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <FormLabel className="FormLabel label">
                  <span>Number of Seats </span>
                  <span className="span-sm">
                    (Seats available: {seatsAvbl?.seatsAvailable} / Cost:
                    <CurrencyRupeeIcon sx={{ fontSize: "12px" }} />
                    {seatsAvbl?.pricePerSeat})
                  </span>
                </FormLabel>
                <TextField
                  type="number"
                  name="noOfSeats"
                  value={booking.noOfSeats}
                  onChange={handleChange}
                  required
                />
              </FormControl>
            </Grid>
          </Grid>
        </div>
        <div className="input-group">
          <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <FormLabel className="FormLabel label">Adults</FormLabel>
                <TextField
                  type="number"
                  name="adults"
                  value={booking.adults}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <FormLabel className="FormLabel label">Children</FormLabel>
                <TextField
                  type="number"
                  name="children"
                  min="0"
                  value={booking.children}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </div>
        <PassengersList passengers={passengers} setPassengers={setPassengers} />
        <AddPassenger
          passengers={passengers}
          setPassengers={setPassengers}
          seats={booking.noOfSeats}
        />
        <div className="input-price">
          <FormControl fullWidth>
            <FormLabel className="FormLabel label price">Total Price</FormLabel>
            <div className="book-flex">
              <CurrencyRupeeIcon color="primary" />
              <TextField
                type="number"
                name="children"
                value={totalPrice ? totalPrice : 0}
                focused
                fullWidth
                disabled
              />
            </div>
          </FormControl>
        </div>
        <Button
          variant="contained"
          className="Button book-btn"
          onClick={addBooking}
          disabled={loading}
        >
          Book Now
          <span className="price-span">
            <CurrencyRupeeIcon sx={{ fontSize: "15px" }} />
            {totalPrice ? Intl.NumberFormat("en-IN").format(totalPrice) : 0}
          </span>
        </Button>
      </Grid>
    </Grid>
  );
};

export default BookingForm;
