"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  FormControlLabel,
  AppBar,
  Toolbar,
  Stack,
  Divider,
} from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InfoIcon from "@mui/icons-material/Info";

const ExamManagement = () => {
  const [examTitle, setExamTitle] = useState("Hello World");
  const [subject, setSubject] = useState("subject");
  const [duration, setDuration] = useState("25");
  const [date, setDate] = useState("2025-10-10");
  const [status, setStatus] = useState("upcoming");
  const generateExamCode = (length = 6) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {" "}
        <Box mb={5}>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            {subject}
          </Typography>
          <Grid
            container
            spacing={3}
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Grid item xs={12} sm={4}>
              <Box display="flex" alignItems="center" gap={1}>
                <CalendarMonthIcon color="action" />
                <Typography variant="h6" color="text.primary">
                  {date}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box display="flex" alignItems="center" gap={1}>
                <AccessTimeIcon color="action" />
                <Typography variant="h6" color="text.primary">
                  {duration} mins
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box display="flex" alignItems="center" gap={1}>
                <InfoIcon
                  color={
                    status === ""
                      ? "warning"
                      : status === "started"
                      ? "success"
                      : "error"
                  }
                />
                <Typography
                  variant="h6"
                  color="text.primary"
                  textTransform="capitalize"
                >
                  {status}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default ExamManagement;
