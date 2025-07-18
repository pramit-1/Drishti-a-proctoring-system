"use client";
import {
  Avatar,
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Link,
} from "@mui/material";
import React, { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = () => {
    console.log("Submitted");
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper
          elevation={5}
          sx={{
            padding: 4,
            borderRadius: 8,
            maxWidth: 500,
            mx: "auto",
          }}
        >
          <Avatar sx={{ mx: "auto", mb: 2, bgcolor: "primary.main" }} />
          <Typography component="h1" variant="h5" align="center" mb={2}>
            Create Account
          </Typography>
          <form onSubmit={handleSignup}>
            <Box mb={2}>
              <TextField
                label="Full Name"
                fullWidth
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>

            <Box mb={2}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>

            <Box mb={2}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>

            <Box mb={2}>
              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Box>

            <Button variant="contained" color="primary" fullWidth type="submit">
              Sign Up
            </Button>

            <Typography align="center" mt={2}>
              Already have an account? <Link href="/login">Log In</Link>
            </Typography>

            {message && (
              <Typography color="secondary" mt={2} textAlign="center">
                {message}
              </Typography>
            )}
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default Signup;
