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
  Link,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

const Login = () => {
  const [role, setRole] = useState("attendee");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { setAuth } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/signin",
        {
          email,
          password,
          role,
        }
      );
      console.log(response);
      const { access_token, token_type } = response.data;

      // Store the token and role
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("userRole", role);
      setAuth({ token: access_token, role: role });
      router.push("/");
    } catch (error) {
      const message =
        error.response?.data?.detail || "Login failed. Try again.";
      // alert(message);
      // console.error("Login error:", message);
      setMessage(message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        // background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 1,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          maxWidth: 600, // wider card
          width: "100%",
          px: { xs: 4, sm: 6 },
          py: { xs: 3, sm: 3 },
          borderRadius: 4,
          bgcolor: "rgba(255,255,255,0.95)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          //   component="h3"
          color="primary"
          sx={{ fontWeight: "bold", mb: 0 }}
        >
          DRISTHI:Proctroing System
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 1, whiteSpace: "pre-line" }}
        >
          {`Your smart proctoring and exam management solution.
            Log in to access your dashboard and manage exams.`}
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
          <FormControl component="fieldset" sx={{ mb: 1, textAlign: "left" }}>
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
          {message && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {message}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 1,
              py: 1.5,
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
            mt: 1,
            py: 1.5,
            fontWeight: "bold",
            fontSize: "1.1rem",
            borderWidth: 2,
            "&:hover": {
              borderWidth: 2,
              backgroundColor: "rgba(118,75,162,0.1)",
            },
          }}
          onClick={() => router.push("/signup")}
        >
          Sign Up
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
