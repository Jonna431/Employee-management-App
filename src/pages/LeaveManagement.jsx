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
  TextField,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LeaveManagement = () => {
  const { user } = useContext(AuthContext);
  const [leaves, setLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 Search state
  const navigate = useNavigate();

  useEffect(() => {
    const storedLeaves =
      JSON.parse(localStorage.getItem("employee-leaves")) || [];
    const userLeaves = storedLeaves.filter(
      (leave) => leave.email === user.email
    );
    setLeaves(userLeaves);
  }, [user.email]);

  //  Filter leaves based on search input
  const filteredLeaves = leaves.filter((leave) =>
    Object.values(leave).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <SectionTitle title="Leaves List" />
          <Button
            variant="contained"
            onClick={() => navigate("/leaves/apply-leave")}
            sx={{
              textTransform: "none",
              bgcolor: "#2a7b8bff",
              "&:hover": {
                bgcolor: "#22b7b7ff",
              },
              px: 3,
              py: 1,
              fontWeight: 500,
            }}
          >
            Apply for Leave
          </Button>
        </Box>

        {/* 🔍 Search Bar */}
        <TextField
          fullWidth
          label="Search leaves by name, type, or date"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            mb: 3, '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#2a7b8bff',
              },
              '&:hover fieldset': {
                borderColor: '#22b7b7ff',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#22b7b7ff',
              },
            },
          }}
        />

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
            {filteredLeaves.length > 0 ? (
              filteredLeaves.map((leave, index) => (
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
