// src/pages/EmployeeProfile.js
import React, { useContext } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const EmployeeProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 500, margin: "2rem auto", p: 3 }}>
      <CardContent>
        <Typography variant="h4" align="center" gutterBottom>
          {user.fullName}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          gutterBottom
        >
          {user.designation || "Employee"}
        </Typography>
        <div style={{ marginTop: 24 }}>
          <Typography variant="body1" gutterBottom>
            <strong>Email:</strong> {user.email}
          </Typography>
          {user.department && (
            <Typography variant="body1" gutterBottom>
              <strong>Department:</strong> {user.department}
            </Typography>
          )}
          {user.phone && (
            <Typography variant="body1" gutterBottom>
              <strong>Phone:</strong> {user.phone}
            </Typography>
          )}
          {user.gender && (
            <Typography variant="body1" gutterBottom>
              <strong>Gender:</strong> {user.gender}
            </Typography>
          )}
        </div>
        <Button
          variant="contained"
          sx={{ mt: 3, display: "block", mx: "auto" }}
          onClick={() => navigate("/edit-profile")}
        >
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmployeeProfile;
