import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styled from "@emotion/styled";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  maxWidth: "95%",
  bgcolor: "#fff",
  p: 4,
  borderRadius: 6,
};

const Heading = styled(TableCell)`
  font-size: 18px;
  font-weight: bold;
`;

const PassengersModal = ({ passengers }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{ fontSize: "16px", textTransform: "capitalize" }}
      >
        View Passengers
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            fontWeight="bold"
            fontSize="30px"
            marginBottom={1}
          >
            Passengers List
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <Heading align="left">Name</Heading>
                  <Heading align="center">Age</Heading>
                  <Heading align="center">Gender</Heading>
                  <Heading align="center">Passport Number</Heading>
                </TableRow>
              </TableHead>
              <TableBody>
                {passengers &&
                  passengers.map((pass) => {
                    const { name, age, gender, passportNumber } = pass;
                    return (
                      <TableRow key={name}>
                        <TableCell align="left">{name}</TableCell>
                        <TableCell align="center">{age}</TableCell>
                        <TableCell
                          align="center"
                          sx={{ textTransform: "capitalize" }}
                        >
                          {gender}
                        </TableCell>
                        <TableCell align="center">{passportNumber}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </div>
  );
};

export default PassengersModal;
