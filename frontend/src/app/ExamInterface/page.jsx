"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Divider,
  LinearProgress,
  Stack,
  AppBar,
  Toolbar,
} from "@mui/material";

const ExamInterface = () => {
  const [examData, setExamData] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const timerRef = useRef();

  // Load exam data from localStorage on mount
  useEffect(() => {
    const savedExam = localStorage.getItem("createdExam");
    if (savedExam) {
      const exam = JSON.parse(savedExam);
      setExamData(exam);
      setAnswers(Array(exam.questions.length).fill(""));
      setTimeLeft(exam.duration * 60); // duration in minutes to seconds
    } else {
      alert("No exam available. Please contact your proctor.");
    }
  }, []);

  // Timer logic
  useEffect(() => {
    if (submitted || !examData) {
      clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [submitted, examData]);

  if (!examData) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h6" color="error">
          Loading exam or no exam found.
        </Typography>
      </Box>
    );
  }

  const { title, subject, questions } = examData;

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[questionIndex] = answer;
      return copy;
    });
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctOption) {
        score += 1;
      }
    });
    return score;
  };

  const totalQuestions = questions.length;
  const score = calculateScore();

  const handleRetakeExam = () => {
    setAnswers(Array(totalQuestions).fill(""));
    setTimeLeft(examData.duration * 60);
    setSubmitted(false);
  };

  const progress = ((examData.duration * 60 - timeLeft) / (examData.duration * 60)) * 100;
  const allAnswered = answers.every((ans) => ans.trim() !== "");

  if (submitted) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <AppBar position="static" elevation={6} sx={{ bgcolor: "#564aa3" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              DRISTHI Proctoring Dashboard
            </Typography>
            <Typography sx={{ ml: 2, fontWeight: 500, fontStyle: "italic" }}>
              Role: Attendee
            </Typography>
          </Toolbar>
        </AppBar>

        <Box maxWidth={800} mx="auto" my={4} px={2} flexGrow={1} overflow="auto">
          <Typography variant="h4" gutterBottom>
            Exam Submitted
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            Exam: {title} ({subject})
          </Typography>
          <Typography variant="h6" color="primary" gutterBottom>
            Your Score: {score} / {totalQuestions} (
            {((score / totalQuestions) * 100).toFixed(2)}%)
          </Typography>
          <Divider sx={{ mb: 3 }} />
          {questions.map((q, idx) => (
            <Box key={idx} mb={3}>
              <Typography fontWeight="bold" variant="subtitle1">
                {idx + 1}. {q.text}
              </Typography>
              <Typography
                color={answers[idx] === q.correctOption ? "green" : "error"}
              >
                Your answer: {answers[idx] || "No answer"}
              </Typography>
              <Typography color="text.secondary">
                Correct answer: {q.correctOption}
              </Typography>
              <Divider sx={{ mt: 1 }} />
            </Box>
          ))}
          <Box textAlign="center" mt={3}>
            <Button variant="contained" size="large" onClick={handleRetakeExam}>
              Retake Exam
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <AppBar position="static" elevation={6} sx={{ bgcolor: "#564aa3" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            DRISTHI Proctoring Dashboard
          </Typography>
          <Typography sx={{ ml: 2, fontWeight: 500, fontStyle: "italic" }}>
            Role: Attendee
          </Typography>
        </Toolbar>
      </AppBar>

      <Box maxWidth={800} mx="auto" my={4} px={2} flexGrow={1} overflow="auto">
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">
            Exam In Progress: {title} ({subject})
          </Typography>
          <Typography color={timeLeft <= 10 ? "error" : "text.primary"}>
            Time Left: {timeLeft}s
          </Typography>
        </Stack>
        <LinearProgress variant="determinate" value={progress} sx={{ mb: 3 }} />
        {questions.map((q, idx) => (
          <Card key={idx} variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" mb={1}>
                {idx + 1}. {q.text}
              </Typography>
              <RadioGroup
                aria-label={`Question ${idx + 1}`}
                value={answers[idx]}
                onChange={(e) => handleAnswerChange(idx, e.target.value)}
              >
                {q.options.map((opt, i) => (
                  <FormControlLabel key={i} value={opt} control={<Radio />} label={opt} />
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        ))}
        <Box textAlign="center" mt={3}>
          <Button
            variant="contained"
            size="large"
            disabled={!allAnswered}
            onClick={() => setSubmitted(true)}
            aria-disabled={!allAnswered}
          >
            Submit Exam
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ExamInterface;
