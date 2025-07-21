// src/pages/ApplyLeaveForm.js
import React, { useContext } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
  Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { saveLeave } from "../utils/storage";

const schema = yup.object().shape({
  startDate: yup.date().required("Start date is required"),
  endDate: yup
    .date()
    .min(yup.ref("startDate"), "End date cannot be before start date")
    .required("End date is required"),
  days: yup
    .number()
    .positive("Number of days must be positive")
    .integer("Number of days must be an integer")
    .required("Number of days required"),
  type: yup.string().required("Leave type is required"),
  location: yup.string().required("Location is required"),
});

const ApplyLeaveForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (formData) => {
    const leave = {
      ...formData,
      name: user.fullName,
      email: user.email,
      appliedDate: new Date().toLocaleDateString(),
    };

    saveLeave(leave); // Save leave using utility function
    reset();
    navigate("/dashboard/leave"); // Redirect to leave list page
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Apply for Leave
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="date"
              label="Start Date"
              InputLabelProps={{ shrink: true }}
              {...register("startDate")}
              error={!!errors.startDate}
              helperText={errors.startDate?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="date"
              label="End Date"
              InputLabelProps={{ shrink: true }}
              {...register("endDate")}
              error={!!errors.endDate}
              helperText={errors.endDate?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Number of Days"
              type="number"
              {...register("days")}
              error={!!errors.days}
              helperText={errors.days?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Leave Type"
              {...register("type")}
              error={!!errors.type}
              helperText={errors.type?.message}
            >
              <MenuItem value="Sick Leave">Sick Leave</MenuItem>
              <MenuItem value="Casual Leave">Casual Leave</MenuItem>
              <MenuItem value="Earned Leave">Earned Leave</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location"
              {...register("location")}
              error={!!errors.location}
              helperText={errors.location?.message}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/dashboard/leave")}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ApplyLeaveForm;
