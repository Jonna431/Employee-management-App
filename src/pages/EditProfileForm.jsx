import React, { useContext } from "react";
import {
  TextField,
  Button,
  Container,
  MenuItem,
  Typography,
  Paper,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  gender: yup.string().required(),
  maritalStatus: yup.string().required(),
  age: yup.number().required().positive().integer(),
  dob: yup.date().required("Date of Birth is required"),
  phone: yup.string().matches(/^[0-9]{10}$/, "Must be a valid 10-digit number"),
  address: yup.string().required(),
  designation: yup.string().required(),
  department: yup.string().required(),
});

const EditProfileForm = () => {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: user,
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const allUsers = JSON.parse(localStorage.getItem("employee-users")) || [];
    const updatedUsers = allUsers.map((u) =>
      u.email === user.email ? { ...u, ...data } : u
    );
    localStorage.setItem("employee-users", JSON.stringify(updatedUsers));
    login({ ...user, ...data }); // update context
    navigate("/profile");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{padding:'50px',width:'800px'}}>
        <Typography variant="h5" gutterBottom sx={{ color: '#2a7b8bff', }}>
          Edit Your Profile
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            margin="normal"
            label="Full Name"
            {...register("fullName")}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
          />
          <TextField
            select
            fullWidth
            margin="normal"
            label="Gender"
            {...register("gender")}
            error={!!errors.gender}
            helperText={errors.gender?.message}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
          <TextField
            select
            fullWidth
            margin="normal"
            label="Marital Status"
            {...register("maritalStatus")}
            error={!!errors.maritalStatus}
            helperText={errors.maritalStatus?.message}
          >
            <MenuItem value="Single">Single</MenuItem>
            <MenuItem value="Married">Married</MenuItem>
          </TextField>
          <TextField
            fullWidth
            margin="normal"
            label="Age"
            type="number"
            {...register("age")}
            error={!!errors.age}
            helperText={errors.age?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Date of Birth"
            type="date"
            InputLabelProps={{ shrink: true }}
            {...register("dob")}
            error={!!errors.dob}
            helperText={errors.dob?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone Number"
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Address"
            multiline
            rows={3}
            {...register("address")}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Designation"
            {...register("designation")}
            error={!!errors.designation}
            helperText={errors.designation?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Department"
            {...register("department")}
            error={!!errors.department}
            helperText={errors.department?.message}
          />
          <Button variant="contained" fullWidth type="submit" sx={{
            mt: 2, backgroundColor: '#2a7b8bff', "&:hover": {
              bgcolor: "#22b7b7ff",
            },
          }}>
            Update
          </Button>
        </form>
      </Paper>

    </Container>
  );
};

export default EditProfileForm;
