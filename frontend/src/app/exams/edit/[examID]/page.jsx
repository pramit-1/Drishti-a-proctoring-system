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
import AddUpdateQuestion from "@/components/addQuestion";
import ViewQuestion from "@/components/viewQuestion";

const ExamManagement = () => {
  const [examTitle, setExamTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [editIndex, setEditIndex] = useState(null);

  const params = useParams();
  const exam_id = params?.examID;

  const [questions, setQuestions] = useState({ questions: [] });

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
    }
  };

  const fetchExamQuestions = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      const res = await axios.get(
        `http://localhost:8000/api/exam/questions/view/${exam_id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      setQuestions(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Failed to fetch exam questions:", err);
    }
  };

  useEffect(() => {
    if (exam_id) {
      fetchExamData();
      fetchExamQuestions();
    }
  }, [exam_id, loading]);

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
                    status === "Upcoming"
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

      <AddUpdateQuestion
        reload={{ value: loading, load: setLoading }}
        examID={exam_id}
        editIndex={{ value: editIndex, load: setEditIndex }}
      />
      {/* {console.log(questions.questions.length)} */}
      {Array.isArray(questions.questions) &&
      questions.questions.length === 0 ? (
        <Typography variant="body1" textAlign="center" color="text.secondary">
          No questions added yet.
        </Typography>
      ) : (
        questions.questions.map((q) => (
          <ViewQuestion
            key={q.question_id}
            qidx={q.question_id}
            question={{
              question: q.question,
              options: [q.optiona, q.optionb, q.optionc, q.optiond],
              correct_ans: q.correct_ans,
            }}
          />
        ))
      )}
    </>
  );
};

export default ExamManagement;
