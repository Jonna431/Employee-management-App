import React, { useContext } from "react";
import SectionTitle from "./SectionTitle";
import {
  Container,
  Button,
  MenuItem,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { saveLeave } from "../utils/storage";
import CustomTextField from "./CustomTextField"; // ✅ Custom text field

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

    saveLeave(leave);
    reset();
    navigate("/dashboard/leave");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card elevation={3} sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <SectionTitle title="Apply for Leaves" />
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={3} direction="column">
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  type="date"
                  label="Start Date"
                  name="startDate"
                  register={register}
                  error={errors.startDate}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  type="date"
                  label="End Date"
                  name="endDate"
                  register={register}
                  error={errors.endDate}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  type="number"
                  label="Number of Days"
                  name="days"
                  register={register}
                  error={errors.days}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  select
                  label="Leave Type"
                  name="type"
                  register={register}
                  error={errors.type}
                >
                  <MenuItem value="Sick Leave">Sick Leave</MenuItem>
                  <MenuItem value="Casual Leave">Casual Leave</MenuItem>
                  <MenuItem value="Earned Leave">Earned Leave</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  label="Location"
                  name="location"
                  register={register}
                  error={errors.location}
                />
              </Grid>

              {/* Side-by-side buttons */}
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      color="secondary"
                      onClick={() => navigate("/dashboard/leave")}
                      sx={{ py: 1, fontWeight: 600, borderRadius: 2 }}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      sx={{
                        py: 1,
                        fontWeight: 600,
                        borderRadius: 2,
                        backgroundColor: "#2a7b8bff",
                      }}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ApplyLeaveForm;
