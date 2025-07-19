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
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginForm = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        const savedUser = JSON.parse(localStorage.getItem('registeredUser'));

        if (
            savedUser &&
            savedUser.email === data.email &&
            savedUser.password === data.password
        ) {
            alert('Login successful!');
            // Redirect to dashboard/home here
            console.log(data)
        } else {
            alert('Invalid email or password');
        }
    };


    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    mt: 13,
                    p: 4,
                    boxShadow: 3,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
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
                        type="password"
                        label="Password"
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>

                    <Box textAlign="center" mt={2}>
                        <Typography variant="body2">
                            Don't have an account?{' '}
                            <Link component="button" variant="body2" onClick={() => navigate('/register')}>
                                Register
                            </Link>
                        </Typography>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default LoginForm;
