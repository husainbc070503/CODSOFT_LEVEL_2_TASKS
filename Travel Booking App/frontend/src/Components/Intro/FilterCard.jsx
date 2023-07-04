import styled from "@emotion/styled";
import { Button, FormLabel, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useGlobalContext } from "../../Contexts/Context";

const Title = styled(Typography)`
  font-size: 34px;
  text-align: center;
  margin-bottom: 18px;
  color: #fff;
`;

const Label = styled(FormLabel)`
  color: #fff;
`;

const initialState = {
  from: "",
  to: "",
  dDate: "",
  time: "",
};

const FilterCard = () => {
  const [searchFields, setSearchFields] = useState(initialState);
  const { getFlights } = useGlobalContext();

  const handleChange = (e) =>
    setSearchFields({
      ...searchFields,
      [e.target.name]: e.target.value,
    });

  const changeString = (str) => str[0].toUpperCase() + str.slice(1);

  return (
    <div className="filter-card">
      <Title>Search Flights</Title>
      <Grid container spacing={2} alignItems="center">
        <Grid item md={6} xs={12}>
          <TextField
            type="text"
            label="From"
            name="from"
            value={searchFields.from}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            type="text"
            label="To"
            name="to"
            value={searchFields.to}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" sx={{ marginTop: "4px" }}>
        <Grid item md={6} xs={12}>
          <Label>Departure Date</Label>
          <TextField
            type="date"
            name="dDate"
            value={searchFields.dDate}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Label>Departure Time</Label>
          <TextField
            type="time"
            name="time"
            value={searchFields.time}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Button
          variant="contained"
          sx={{ margin: "20px 20px 0" }}
          onClick={() => {
            getFlights({
              ...searchFields,
              from: changeString(searchFields.from),
              to: changeString(searchFields.to),
            });
            window.scrollTo(0, 750);
          }}
        >
          Search
        </Button>
      </Grid>
    </div>
  );
};

export default FilterCard;
