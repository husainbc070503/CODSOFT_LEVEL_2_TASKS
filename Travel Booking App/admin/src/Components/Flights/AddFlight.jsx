import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Heading from "../HeaderFooter/Heading";
import styled from "@emotion/styled";
import NoImage from "../../images/no-image.jpeg";
import CreateIcon from "@mui/icons-material/Create";
import { toast } from "react-toastify";
import { api } from "../../Utils/Api";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useGlobalContext } from "../../Context/AdminContext";
import { useParams } from "react-router-dom";

const ContainerTop = styled(Container)`
  margin-top: 6%;
`;

const Label = styled(FormLabel)`
  margin-bottom: 8px;
  font-size: 18px;
  color: #213555;
`;

const initialState = {
  image: NoImage,
  airline: "",
  from: "",
  to: "",
  departingDate: "",
  departureTime: "",
  arrivingDate: "",
  arrivalTime: "",
  first: "",
  bussiness: "",
  economy: "",
  fp: "",
  bp: "",
  ep: "",
};

const AddFlight = () => {
  const [flight, setFlight] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { admin, dispatch } = useGlobalContext();
  const { id } = useParams();
  const handleUpload = async (file) => {
    setLoading(true);

    if (file === undefined) {
      setLoading(false);
      return toast.error("Please upload image", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      setLoading(false);
      return toast.error("Only PNG or JPEG are accepted. No others", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    try {
      const url = "https://api.cloudinary.com/v1_1/dztxhls16/image/upload";

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "travel-booking-app");
      data.append("class", "dztxhls16");

      const res = await fetch(url, {
        method: "POST",
        body: data,
      });

      const resp = await res.json();
      if (resp) {
        toast.success("Image Uploaded.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setLoading(false);
        setFlight({ ...flight, image: resp.url });
        return;
      } else {
        toast.error("Failed to upload image", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setLoading(false);
        return;
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleChange = (e) =>
    setFlight({ ...flight, [e.target.name]: e.target.value });

  const updateFlight = (flight) => {
    return {
      ...flight,
      first: flight.seats[0].seatsAvailable,
      bussiness: flight.seats[1].seatsAvailable,
      economy: flight.seats[2].seatsAvailable,
      fp: flight.seats[0].pricePerSeat,
      bp: flight.seats[1].pricePerSeat,
      ep: flight.seats[2].pricePerSeat,
    };
  };

  const handleSubmit = async () => {
    setLoading(true);

    const seats = [
      { class: "First", seatsAvailable: flight.first, pricePerSeat: flight.fp },
      {
        class: "Bussiness",
        seatsAvailable: flight.bussiness,
        pricePerSeat: flight.bp,
      },
      {
        class: "Economy",
        seatsAvailable: flight.economy,
        pricePerSeat: flight.ep,
      },
    ];

    flight.departingDate = flight.departingDate.split("-").join("-");
    flight.arrivingDate = flight.arrivingDate.split("-").join("-");

    try {
      const url = id
        ? `${api}/api/flight/updateFlight/${id}`
        : `${api}/api/flight/addFlight`;

      const res = await fetch(url, {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${admin.token}`,
        },
        body: JSON.stringify({ ...flight, seats }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`Flight ${id ? "Details Updated" : "Added"}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setFlight(id ? updateFlight(data.flight) : initialState);
        setLoading(false);
        id
          ? dispatch({
              type: "UPDATE_FLIGHT",
              payload: { id, flight: data.flight },
            })
          : dispatch({ type: "ADD_FLIGHT", payload: data.flight });

      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setLoading(false);
    }
  };

  const getFlight = async () => {
    try {
      const res = await fetch(`${api}/api/flight/getFlight/${id}`);
      const data = await res.json();
      setFlight(updateFlight(data.flight));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    id && getFlight();
  }, [id]);

  return (
    <ContainerTop maxWidth="md">
      <div className="container">
        <Heading title={`${id ? "Update" : "Add"} Flight Details`} />
        <div className="add-form">
          <div className="input-group add-image">
            <Label>Airlines Flight Image</Label>
            <img src={flight.image} alt="airline-image" />
            <div className="input-file">
              <label htmlFor="flight-image">
                <CreateIcon />
              </label>
              <input
                type="file"
                id="flight-image"
                name="image"
                accept="image/*"
                onChange={(e) => handleUpload(e.target.files[0])}
              />
            </div>
          </div>
          <div className="input-group">
            <FormControl fullWidth>
              <TextField
                type="text"
                label="Airline Name"
                name="airline"
                value={flight.airline}
                onChange={handleChange}
                required
              />
            </FormControl>
          </div>
          <div className="input-group">
            <Grid container spacing={4}>
              <Grid item md={6} xs={12}>
                <TextField
                  type="text"
                  label="From"
                  name="from"
                  value={flight.from}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  type="text"
                  label="To"
                  name="to"
                  value={flight.to}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
          </div>
          <div className="input-group">
            <Grid container spacing={4}>
              <Grid item md={6} xs={12}>
                <FormControl fullWidth>
                  <Label>Departure Date</Label>
                  <TextField
                    type="date"
                    name="departingDate"
                    value={flight.departingDate}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl fullWidth>
                  <Label>Departure Time</Label>
                  <TextField
                    type="time"
                    name="departureTime"
                    value={flight.departureTime}
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
                  <Label>Arrival Date</Label>
                  <TextField
                    type="date"
                    name="arrivingDate"
                    value={flight.arrivingDate}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl fullWidth>
                  <Label>Arrival Time</Label>
                  <TextField
                    type="time"
                    name="arrivalTime"
                    value={flight.arrivalTime}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </Grid>
            </Grid>
          </div>
          <div className="input-group">
            <Label>Seats Availability Per Class</Label>
            <Grid container spacing={2} marginTop={0.5}>
              <Grid item md={4} xs={6}>
                <FormControl fullWidth>
                  <TextField
                    type="number"
                    label="First Class"
                    name="first"
                    value={flight.first}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item md={4} xs={6}>
                <FormControl fullWidth>
                  <TextField
                    type="number"
                    label="Bussiness Class"
                    name="bussiness"
                    value={flight.bussiness}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item md={4} xs={12}>
                <FormControl fullWidth>
                  <TextField
                    type="number"
                    label="Economy Class"
                    name="economy"
                    value={flight.economy}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </Grid>
            </Grid>
          </div>
          <div className="input-group">
            <Label>
              Ticket Price Per Seat (in{" "}
              <CurrencyRupeeIcon sx={{ fontSize: "16px" }} />)
            </Label>
            <Grid container spacing={2} marginTop={0.5}>
              <Grid item md={4} xs={6}>
                <FormControl fullWidth>
                  <TextField
                    type="number"
                    label="First Class Seat Ticket Price"
                    name="fp"
                    value={flight.fp}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item md={4} xs={6}>
                <FormControl fullWidth>
                  <TextField
                    type="number"
                    label="Bussiness Clas Seat Ticket Price"
                    name="bp"
                    value={flight.bp}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item md={4} xs={12}>
                <FormControl fullWidth>
                  <TextField
                    type="number"
                    label="Economy Class Seat Ticket Price"
                    name="ep"
                    value={flight.ep}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </Grid>
            </Grid>
          </div>

          <Button variant="contained" disabled={loading} onClick={handleSubmit}>
            {id ? "Update" : "Add"} Flight
          </Button>
        </div>
      </div>
    </ContainerTop>
  );
};

export default AddFlight;
