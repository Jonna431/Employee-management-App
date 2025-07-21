// src/pages/EmployeeProfile.js
import React, { useContext } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const EmployeeProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 600, margin: "2rem auto", p: 2 }}>
      <CardContent>
        <Typography variant="h5">{user.fullName}</Typography>
        <Typography>Email: {user.email}</Typography>
        {user.designation && (
          <Typography>Designation: {user.designation}</Typography>
        )}
        {user.department && (
          <Typography>Department: {user.department}</Typography>
        )}
        {user.phone && <Typography>Phone: {user.phone}</Typography>}
        {user.gender && <Typography>Gender: {user.gender}</Typography>}
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => navigate("/dashboard/edit-profile")}
        >
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmployeeProfile;
