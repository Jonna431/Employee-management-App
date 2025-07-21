import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Box,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LeaveManagement = () => {
  const { user } = useContext(AuthContext);
  const [leaves, setLeaves] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedLeaves =
      JSON.parse(localStorage.getItem("employee-leaves")) || [];
    const userLeaves = storedLeaves.filter(
      (leave) => leave.email === user.email
    );
    setLeaves(userLeaves);
  }, [user.email]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5">Your Leave Applications</Typography>
        <Button variant="contained" onClick={() => navigate("/apply-leave")}>
          Apply for Leave
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>S.No.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Leave Type</TableCell>
            <TableCell>Applied On</TableCell>
            <TableCell>No. of Days</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaves.length > 0 ? (
            leaves.map((leave, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{leave.name}</TableCell>
                <TableCell>{leave.type}</TableCell>
                <TableCell>{leave.appliedDate}</TableCell>
                <TableCell>{leave.days}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No leave applications found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Container>
  );
};

export default LeaveManagement;
