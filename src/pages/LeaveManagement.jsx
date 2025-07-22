import React, { useContext, useState, useEffect } from "react";
import SectionTitle from "./SectionTitle";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Box,
  Paper,
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
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <SectionTitle title='Leaves List' />
          <Button
            variant="contained"
            onClick={() => navigate("/apply-leave")}
            sx={{
              textTransform: "none",
              bgcolor: "#2a7b8bff",
              "&:hover": {
                bgcolor: "#d2cf0aff",
              },
              px: 3,
              py: 1,
              fontWeight: 500,
            }}
          >
            Apply for Leave
          </Button>
        </Box>

        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
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
                <TableRow
                  key={index}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f0f4ff",
                    },
                  }}
                >
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
      </Paper>
    </Container>
  );
};

export default LeaveManagement;
