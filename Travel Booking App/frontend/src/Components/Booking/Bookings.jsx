import {
  Badge,
  Button,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useGlobalContext } from "../../Contexts/Context";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import styled from "@emotion/styled";
import { api } from "../../Utils/Api";
import { toast } from "react-toastify";

const Header = styled(TableCell)`
  font-size: 18px;
  color: #243763;
  font-weight: bold;
`;

const Airline = styled(Typography)`
  font-size: 18px;
  font-weight: bold;
`;

const Bookings = () => {
  const { bookings, getAllBookings, user, dispatch } = useGlobalContext();

  const cancelTicket = async (id) => {
    try {
      const res = await fetch(`${api}/api/booking/cancelBooking/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Booking Cancelled", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        dispatch({ type: "CANCEL_BOOKING", payload: id });
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
    } catch (error) {
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

  const checkDate = (date) => {
    let now = new Date().toLocaleDateString().split("/").reverse();
    now = now.map(Number);

    const temp = now[1];
    now[1] = now[2];
    now[2] = temp;

    let arr = date.split("-");
    arr = arr.map(Number);

    return now[0] > arr[0] || now[1] > arr[1] || now[2] > arr[2];
  };

  useEffect(() => {
    getAllBookings();
  }, [user]);

  return (
    <Container maxWidth="xl">
      <div className="container booking-cont">
        <section className="sections">
          <Typography className="Typography section-heading">
            All My Past Bookings
          </Typography>
          <TableContainer sx={{ paddingBottom: "30px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <Header align="center">Sr.No.</Header>
                  <Header>Airline</Header>
                  <Header>From</Header>
                  <Header>To</Header>
                  <Header>Duration</Header>
                  <Header>Booking Date Time</Header>
                  <Header>Class</Header>
                  <Header align="center">Total Passengers</Header>
                  <Header>Amount Paid</Header>
                  <Header align="center">Action</Header>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings &&
                  bookings.map((book, index) => {
                    const {
                      bookedClass,
                      noOfSeats,
                      totalPrice,
                      _id,
                      bookingDateTime,
                      flight: {
                        image,
                        airline,
                        from,
                        to,
                        duration,
                        departingDate,
                      },
                    } = book;

                    return (
                      <TableRow key={index}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell>
                          <Grid container alignItems="center">
                            <Grid item md={12}>
                              <img
                                src={image}
                                alt={airline}
                                width={100}
                                className="bookings-flight"
                              />
                            </Grid>
                            <Grid item md={12}>
                              <Airline>{airline}</Airline>
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell>{from}</TableCell>
                        <TableCell>{to}</TableCell>
                        <TableCell>{duration}</TableCell>
                        <TableCell>{bookingDateTime}</TableCell>
                        <TableCell>{bookedClass}</TableCell>
                        <TableCell align="center">{noOfSeats}</TableCell>
                        <TableCell>
                          <span className="price">
                            <CurrencyRupeeIcon fontSize="14px" />
                            {Intl.NumberFormat("en-IN").format(totalPrice)}
                          </span>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => cancelTicket(_id)}
                            disabled={checkDate(departingDate)}
                          >
                            Cancel Booking
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </section>
      </div>
    </Container>
  );
};

export default Bookings;
