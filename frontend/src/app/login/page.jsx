"use client";
import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Alert,
} from "@mui/material";

const Login = () => {
  const [role, setRole] = useState("attendee");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Fetch saved users from localStorage
    const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    // Check if user exists with matching email, password and role
    const foundUser = savedUsers.find(
      (user) =>
        user.email === email &&
        user.password === password &&
        user.role === role
    );

    if (!foundUser) {
      setErrorMessage("Invalid credentials or user not registered.");
      return;
    }

    // Successful login: Save role (and email if needed) and redirect accordingly
    localStorage.setItem("userRole", role);
    localStorage.setItem("userEmail", email);

    // Redirect to role-specific dashboard
    if (role === "proctor") {
      window.location.href = "/dashboardProctor";
    } else {
      window.location.href = "/dashboardAttendee";
    }
  };

  const handleSignUpClick = () => {
    // Navigate to your sign up page
    window.location.href = "/signup"; // Change to your actual signup route
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          maxWidth: 600, // wider card
          width: "100%",
          p: { xs: 4, sm: 6 },
          borderRadius: 4,
          bgcolor: "rgba(255,255,255,0.95)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          color="primary"
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          Welcome to DRISTHI:Proctroing System
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, whiteSpace: 'pre-line' }}
>
          {`Your smart proctoring and exam management solution.
            Log in to access your dashboard and manage exams.`}
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
          <FormControl component="fieldset" sx={{ mb: 3, textAlign: "left" }}>
            <FormLabel component="legend" sx={{ mb: 1, fontWeight: "600" }}>
              Login as:
            </FormLabel>
            <RadioGroup
              row
              aria-label="login role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <FormControlLabel
                value="proctor"
                control={<Radio color="primary" />}
                label="Proctor"
              />
              <FormControlLabel
                value="attendee"
                control={<Radio color="primary" />}
                label="Attendee"
              />
            </RadioGroup>
          </FormControl>

          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            autoFocus
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
           {errorMessage && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errorMessage}
            </Alert>
          )}
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 3,
              py: 1.8,
              fontWeight: "bold",
              fontSize: "1.2rem",
              boxShadow: "0 4px 20px rgba(102,126,234,0.5)",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "#556cd6",
                boxShadow: "0 6px 30px rgba(102,126,234,0.7)",
              },
              "&:focus-visible": {
                outline: "3px solid #3f51b5",
                outlineOffset: 2,
              },
            }}
          >
            Login
                   </Button>
        </form>

        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{
            mt: 3,
            py: 1.6,
            fontWeight: "bold",
            fontSize: "1.1rem",
            borderWidth: 2,
            "&:hover": {
              borderWidth: 2,
              backgroundColor: "rgba(118,75,162,0.1)",
            },
          }}
          onClick={handleSignUpClick}
        >
          Sign Up
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;