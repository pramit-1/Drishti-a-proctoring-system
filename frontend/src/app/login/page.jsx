"use client";
import { React, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Grid,
  Link,
  Avatar,
} from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    console.log("Submitted");
  };
  return (
    <Container maxWidth="sm" sx={{ borderRadius: 4 }}>
      <Paper elevation={5} sx={{ padding: 4, marginTop: 8 }}>
        <Avatar sx={{ mx: "auto", mb: 2, bgcolor: "secondary.main" }} />
        <Typography
          component={"h1"}
          variant="h5"
          sx={{ textAlign: "center", mb: 1 }}
        >
          Sign In
        </Typography>
        <form onSubmit={handleLogin}>
          <Box mb={2}>
            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Box>

          <Box mb={2}>
            <TextField
              label="Password"
              fullWidth
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>

          <Button variant="contained" color="primary" fullWidth type="submit">
            Log In
          </Button>
          <Typography color="secondary" mt={1}>
            <Link>Forgot Password? </Link>
          </Typography>
          <Typography color="secondary" align="center" mt={2}>
            Don't have an account ? <Link>Sign UP</Link>
          </Typography>
        </form>

        {message && (
          <Typography color="secondary" mt={2}>
            {message}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default Login;
