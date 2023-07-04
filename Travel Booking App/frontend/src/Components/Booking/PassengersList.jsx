import {
  Badge,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const PassengersList = ({ passengers, setPassengers }) => {
  return (
    passengers.length > 0 && (
      <TableContainer sx={{ margin: "20px 0" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="TableCell header">Passenger No.</TableCell>
              <TableCell className="TableCell header">Name</TableCell>
              <TableCell className="TableCell header">Age</TableCell>
              <TableCell className="TableCell header">Gender</TableCell>
              <TableCell className="TableCell header">
                Passport Number
              </TableCell>
              <TableCell className="TableCell header">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {passengers.map((pass, index) => {
              const { id, name, passportNumber, age, gender } = pass;
              return (
                <TableRow>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{name}</TableCell>
                  <TableCell align="center">{age}</TableCell>
                  <TableCell
                    align="center"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {gender}
                  </TableCell>
                  <TableCell align="center">{passportNumber}</TableCell>
                  <TableCell align="center">
                    <DeleteIcon
                      color="error"
                      onClick={() =>
                        setPassengers(
                          passengers.filter((pass) => pass.id != id)
                        )
                      }
                      sx={{ cursor: "pointer" }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
};

export default PassengersList;
