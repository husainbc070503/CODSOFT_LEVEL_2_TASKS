import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useGlobalContext } from "../../Contexts/Context";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  maxWidth: "96%",
  boxShadow: "0 10px 30px #89a4c765",
  background: "#fff",
  p: 4,
  borderRadius: "6px",
};

const initialState = { name: "", age: 0, gender: "", passportNumber: "" };

const AddPassenger = ({ passengers, setPassengers, seats }) => {
  const [open, setOpen] = React.useState(false);
  const { user } = useGlobalContext();

  const [passengerDetails, setPassengersDetails] = React.useState(initialState);

  const handleChange = (e) =>
    setPassengersDetails({
      ...passengerDetails,
      [e.target.name]: e.target.value,
    });

  const handleAdd = () => {
    setPassengers([
      ...passengers,
      { ...passengerDetails, id: Math.floor(Math.random() * 100000) },
    ]);

    setOpen(false);
    setPassengersDetails(initialState);
  };

  React.useEffect(() => {
    passengers.length === 0 &&
      setPassengersDetails({
        ...initialState,
        name: user?.user?.name,
        passportNumber: user?.user?.passportNumber,
      });
  }, [passengers]);

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        disabled={passengers.length == seats}
        variant="contained"
      >
        Add Passengers
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            className="Typography modal-modal-title"
            variant="h6"
            component="h2"
            color="primary"
          >
            Passengers Details
          </Typography>
          <div className="modal-form">
            <div className="input-group">
              <Grid container spacing={4}>
                <Grid md={6} xs={12} item>
                  <FormControl fullWidth>
                    <FormLabel className="FormLabel label">Name</FormLabel>
                    <TextField
                      type="text"
                      name="name"
                      value={passengerDetails.name}
                      onChange={handleChange}
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12} item>
                  <FormControl fullWidth>
                    <FormLabel className="FormLabel label">Age</FormLabel>
                    <TextField
                      type="number"
                      name="age"
                      value={passengerDetails.age}
                      onChange={handleChange}
                      required
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </div>
            <div className="input-group">
              <Grid container spacing={4}>
                <Grid md={6} xs={12} item>
                  <FormControl fullWidth>
                    <FormLabel className="FormLabel label">Gender</FormLabel>
                    <RadioGroup
                      row
                      name="gender"
                      value={passengerDetails.gender}
                      onChange={handleChange}
                    >
                      {["male", "female"].map((gen, ind) => {
                        return (
                          <FormControlLabel
                            key={ind}
                            value={gen}
                            control={<Radio />}
                            label={gen}
                            className="FormControlLabel label"
                          />
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12} item>
                  <FormControl fullWidth>
                    <FormLabel className="FormLabel label">
                      Passport Number
                    </FormLabel>
                    <TextField
                      type="text"
                      name="passportNumber"
                      value={passengerDetails.passportNumber}
                      onChange={handleChange}
                      required
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </div>
            <Button variant="contained" onClick={handleAdd}>
              Add
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AddPassenger;
