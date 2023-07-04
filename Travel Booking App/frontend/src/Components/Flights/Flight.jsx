import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Text = styled(Typography)`
  margin: 16px 0;
`;

const Head = styled(TableCell)`
  font-weight: bold;
`;

const Flight = ({ flight }) => {
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
    duration,
  } = flight;

  const updatedDate = (date) => {
    const arr = date.split("-");
    arr.reverse();
    return arr.join("/");
  };

  const getTime = (time) => {
    const arr = time.split(":");
    return arr[0] > 12 ? "pm" : "am";
  };

  const formatNumber = (num) => Intl.NumberFormat().format(num);

  return (
    <Card>
      <CardMedia
        component="img"
        alt="green iguana"
        height="200"
        image={image}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          fontWeight="bold"
          color="primary"
        >
          {airline}
        </Typography>
        <Typography>
          <Typography variant="h6" sx={{ display: "inline-block" }}>
            {from}
          </Typography>
          {` to `}
          <Typography variant="h6" sx={{ display: "inline-block" }}>
            {to}
          </Typography>
        </Typography>
        <Text>
          Departure On:
          <span className="span mr-3">{updatedDate(departingDate)}</span> At:
          <span className="span">{departureTime + getTime(departureTime)}</span>
        </Text>
        <Text>
          Arrival On:
          <span className="span mr-3">{updatedDate(arrivingDate)}</span> At:
          <span className="span">{arrivalTime + getTime(arrivalTime)}</span>
        </Text>
        <Text>
          Duration: <span className="span">{duration}</span>
        </Text>
        <Text>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <Head width={40}>Class</Head>
                  <Head width={50}>Seats</Head>
                  <Head>Price Per Seat</Head>
                </TableRow>
              </TableHead>
              <TableBody>
                {seats?.map((seat) => {
                  return (
                    <TableRow key={seat._id}>
                      <TableCell>{seat.class}</TableCell>
                      <TableCell>{seat.seatsAvailable}</TableCell>
                      <TableCell>
                        <CurrencyRupeeIcon sx={{ fontSize: "14px" }} />
                        {formatNumber(seat.pricePerSeat)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Text>
      </CardContent>
      <CardActions sx={{ textAlign: "end" }}>
        <div className="link-box">
          <Link to={`bookTicket/${_id}`} className="book-link">
            Book
          </Link>
        </div>
      </CardActions>
    </Card>
  );
};

export default Flight;
