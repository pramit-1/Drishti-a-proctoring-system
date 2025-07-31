"use client";
import React, { useState } from "react";
import {
  Avatar,
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Link,
  Alert,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

const Signup = () => {
    const [role, setRole] = useState("attendee"); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'error' or 'success'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    // Basic validation
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setMessage("Please fill in all required fields.");
      setMessageType("error");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      return;
    }

    setIsSubmitting(true);

    // Simulate async signup API call
    setTimeout(() => {
      console.log("User signed up with:", { name, email });
      setIsSubmitting(false);
      setMessage("Signup successful! You can now log in.");
      setMessageType("success");
      // Optionally reset fields:
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }, 1500);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        py: 4,
      }}
    >
      <Container maxWidth="sm" sx={{ maxWidth: 520 }}>
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: 8,
            bgcolor: "rgba(255,255,255,0.95)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <Avatar sx={{ mx: "auto", mb: 2, bgcolor: "primary.main", width: 64, height: 64 }} />
          <Typography component="h1" variant="h4" mb={2} fontWeight="bold" color="primary">
            Create Account
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Join DRISTHI — smart proctoring and exam management platform.
          </Typography>
          <form onSubmit={handleSignup} noValidate>
            <Box mb={2}>
              <TextField
                label="Full Name"
                fullWidth
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-label="Full Name"
                autoComplete="name"
                disabled={isSubmitting}
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
                aria-label="Email Address"
                autoComplete="email"
                disabled={isSubmitting}
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
                aria-label="Password"
                autoComplete="new-password"
                disabled={isSubmitting}
              />
            </Box>


            <Box mb={3}>
              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                aria-label="Confirm Password"
                autoComplete="new-password"
                disabled={isSubmitting}
              />
            </Box>

            {/* Role selection radio buttons */}
            <FormControl component="fieldset" sx={{ mb: 3, textAlign: "left" }}>
              <FormLabel component="legend" sx={{ mb: 1, fontWeight: "600" }}>
                Sign up as:
              </FormLabel>
              <RadioGroup
                row
                aria-label="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <FormControlLabel
                  value="proctor"
                  control={<Radio color="primary" />}
                  label="Proctor"
                  disabled={isSubmitting}
                />
                <FormControlLabel
                  value="attendee"
                  control={<Radio color="primary" />}
                  label="Attendee"
                  disabled={isSubmitting}
                />
              </RadioGroup>
            </FormControl>
            
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              disabled={isSubmitting}
              sx={{
                py: 1.8,
                fontWeight: "bold",
                fontSize: "1.1rem",
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
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>

          <Typography mt={3} variant="body2" color="text.secondary">
            Already have an account?{" "}
            <Link href="/login" underline="hover" color="primary" sx={{ fontWeight: "medium" }}>
              Log In
            </Link>
          </Typography>

          {message && (
            <Alert
              severity={messageType}
              sx={{ mt: 3, maxWidth: "360px", mx: "auto", fontWeight: "medium" }}
              role="alert"
            >
              {message}
            </Alert>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Signup;
