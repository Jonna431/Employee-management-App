import React from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Link,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const schema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  mobile: Yup.string()
    .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number')
    .required('Mobile number is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const RegisterForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const { confirmPassword, ...userData } = data;

    // Save user data to localStorage
    localStorage.setItem('registeredUser', JSON.stringify(userData));

    alert('Registration successful! Please log in.');
    console.log(data)
    navigate('/');
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            margin="normal"
            label="First Name"
            {...register('firstName')}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Last Name"
            {...register('lastName')}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Mobile Number"
            {...register('mobile')}
            error={!!errors.mobile}
            helperText={errors.mobile?.message}
          />

          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Confirm Password"
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Register
          </Button>

          <Box textAlign="center" mt={2}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Link component="button" onClick={() => navigate('/')}>
                Login
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterForm;
