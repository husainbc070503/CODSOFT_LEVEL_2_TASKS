import React from "react";
import { useGlobalContext } from "../../Context/AdminContext";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Heading from "../HeaderFooter/Heading";
import PassengersModal from "./PassengersModal";
import styled from "@emotion/styled";

const TableHeading = styled(TableCell)`
  font-size: 18px;
  font-weight: bold;
`;

const Bookings = () => {
  const { bookings } = useGlobalContext();

  return (
    <Container maxWidth="xl">
      <div className="container">
        <Heading>Flight Bookings</Heading>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeading align="center">Sr.No.</TableHeading>
                <TableHeading align="center">Name</TableHeading>
                <TableHeading align="center">Email</TableHeading>
                <TableHeading align="center">Phone No.</TableHeading>
                <TableHeading align="center">Airline</TableHeading>
                <TableHeading align="center">From</TableHeading>
                <TableHeading align="center">To</TableHeading>
                <TableHeading align="center">Booking Date Time</TableHeading>
                <TableHeading align="center">Booked Class</TableHeading>
                <TableHeading align="center">Seats Booked</TableHeading>
                <TableHeading align="center">Passengers</TableHeading>
                <TableHeading align="center">Amount Paid</TableHeading>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings &&
                bookings.map((book, index) => {
                  const {
                    flight: { airline, from, to },
                    bookedClass,
                    bookingDateTime,
                    passengers,
                    noOfSeats,
                    totalPrice,
                    user: { name, email, phone },
                  } = book;

                  return (
                    <TableRow key={index}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{name}</TableCell>
                      <TableCell align="center">{email}</TableCell>
                      <TableCell align="center">{phone}</TableCell>
                      <TableCell align="center">{airline}</TableCell>
                      <TableCell align="center">{from}</TableCell>
                      <TableCell align="center">{to}</TableCell>
                      <TableCell align="center">{bookingDateTime}</TableCell>
                      <TableCell align="center">{bookedClass}</TableCell>
                      <TableCell align="center">{noOfSeats}</TableCell>
                      <TableCell>
                        <PassengersModal passengers={passengers} />
                      </TableCell>
                      <TableCell>
                        <Typography fontSize={15}>Rs. {Intl.NumberFormat("en-IN").format(totalPrice)}</Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
};

export default Bookings;
