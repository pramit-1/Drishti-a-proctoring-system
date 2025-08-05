"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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
import axios from "axios";
import AddQuestion from "@/components/addQuestion";

const ExamManagement = () => {
  const [examTitle, setExamTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchExamData = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      const res = await axios.get(
        `http://localhost:8000/api/exam/view/${exam_id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      const exam = res.data;
      setExamTitle(exam.title);
      setSubject(exam.subject);
      setDuration(exam.duration);
      setDate(exam.date);
      setStatus(exam.status);
    } catch (err) {
      console.error("Failed to fetch exam:", err);
    } finally {
      setLoading(false);
    }
  };

  const params = useParams();
  const exam_id = params?.examID;
  useEffect(() => {
    fetchExamData();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          my={4}
          textAlign="center"
          color="primary"
        >
          {examTitle}
        </Typography>
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

      <AddQuestion />
    </>
  );
};

export default ExamManagement;
