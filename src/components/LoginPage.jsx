import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid } from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleLogin = () => {
        const userData = localStorage.getItem('userData');
        if (userData) {
            const parsedData = JSON.parse(userData);
            const user = parsedData.find(user => user.userName === username && user.password === password);
            if (user && user.isApproved === 'Approved') {
                if (user.userType === 'admin') {
                    // Redirect to admin dashboard or show admin table
                    navigate("/admin")
                    alert('Admin login successful');
                } else {
                    // Redirect to user dashboard or show user page
                    navigate("/dashboard")
                    alert('User login successful');
                }
            } else {
                // Show invalid login dialog
                toast.error('Invalid username or password');
            }
        } else {
            // Show invalid login dialog
            toast.error('Invalid username or password');
        }
    };


    return (
        <Container maxWidth="sm">
            <div style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4" gutterBottom>Login</Typography>
                <TextField
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ marginBottom: '20px' }}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ marginBottom: '20px' }}
                />
                <Button variant="contained" color="primary" onClick={handleLogin} style={{ marginBottom: '20px' }}>Login</Button>
                <Grid container spacing={2}>
                    <Grid item>
                        <Button variant="outlined" color="primary" onClick={() => navigate("/registration")}>
                            Signup
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" color="secondary">
                            Close
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={() => navigate("/admin")}>
                            Admin
                        </Button>
                    </Grid>
                </Grid>
            </div>
            <ToastContainer />
        </Container>
    );
};

export default LoginPage;
