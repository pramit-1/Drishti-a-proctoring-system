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

const generateExamCode = (length = 6) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

const ExamManagement = () => {
  const [examTitle, setExamTitle] = useState("Hello World");
  const [subject, setSubject] = useState("subject");
  const [duration, setDuration] = useState("25");
  const [date, setDate] = useState("2025-10-10");
  const [status, setStatus] = useState("upcoming");

  const [qText, setQText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState("");

  const [questions, setQuestions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const [examsList, setExamsList] = useState([]);

  const [lastCreatedCode, setLastCreatedCode] = useState(null);

  // Load existing exams from localStorage on mount
  useEffect(() => {
    const storedExams = localStorage.getItem("examsList");
    if (storedExams) {
      setExamsList(JSON.parse(storedExams));
    }
  }, []);

  // Save examsList to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem("examsList", JSON.stringify(examsList));
  }, [examsList]);

  const buttonStyles = {
    px: { xs: 3, sm: 5 },
    py: { xs: 1.5, sm: 2 },
    fontWeight: "bold",
    fontSize: { xs: "0.9rem", sm: "1.1rem" },
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
    borderRadius: 3,
    transition: "transform 0.2s, box-shadow 0.2s",
    "&:hover": {
      transform: "scale(1.07)",
      boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
    },
    "&:focus-visible": {
      outline: "3px solid",
      outlineOffset: "2px",
    },
  };

  const resetQuestionForm = () => {
    setQText("");
    setOptions(["", "", "", ""]);
    setCorrectOption("");
    setEditIndex(null);
  };

  const validateQuestion = () => {
    if (!qText.trim()) return false;
    if (options.some((opt) => !opt.trim())) return false;
    if (!correctOption) return false;
    return true;
  };

  const addOrUpdateQuestion = () => {
    if (!validateQuestion()) {
      alert(
        "Please fill out question text, all 4 options, and select the correct option."
      );
      return;
    }
    const questionData = { text: qText.trim(), options, correctOption };
    if (editIndex !== null) {
      const newQuestions = [...questions];
      newQuestions[editIndex] = questionData;
      setQuestions(newQuestions);
    } else {
      setQuestions([...questions, questionData]);
    }
    resetQuestionForm();
  };

  const handleDeleteQuestion = (index) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      setQuestions(questions.filter((_, i) => i !== index));
      if (editIndex === index) resetQuestionForm();
      else if (editIndex && editIndex > index) setEditIndex(editIndex - 1);
    }
  };

  const handleEditQuestion = (index) => {
    const q = questions[index];
    setQText(q.text);
    setOptions(q.options);
    setCorrectOption(q.correctOption);
    setEditIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const canSubmitExam = () => {
    return (
      examTitle.trim() && subject.trim() && duration > 0 && questions.length > 0
    );
  };

  const handleSubmitExam = () => {
    if (!canSubmitExam()) {
      alert("Please fill out all exam details and add at least one question.");
      return;
    }
    const examCode = generateExamCode();

    const examData = {
      id: Date.now(), // unique identifier
      title: examTitle.trim(),
      subject: subject.trim(),
      duration: Number(duration),
      questions,
      code: examCode,
      status: "not started", // other values: "started", "ended"
      createdAt: new Date().toISOString(),
    };

    // Add new exam to exams list
    setExamsList((prev) => [...prev, examData]);
    setLastCreatedCode(examCode);

    // Clear current form
    setQuestions([]);
    resetQuestionForm();
  };

  // Handlers for Start and End exam session
  const handleStartExam = (id) => {
    setExamsList((prev) =>
      prev.map((exam) =>
        exam.id === id ? { ...exam, status: "started" } : exam
      )
    );
  };

  const handleEndExam = (id) => {
    setExamsList((prev) =>
      prev.map((exam) => (exam.id === id ? { ...exam, status: "ended" } : exam))
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        // background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          py: 6,
          px: 2,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        {/* <Paper
          elevation={12}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            backgroundColor: "rgba(255,255,255,0.95)",
            color: "text.primary",
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            width: "100%",
          }}
        > */}
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={4}
          textAlign="center"
          color="primary"
        >
          {examTitle}
        </Typography>

        {/* Exam Details */}
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

        {/* Add/Edit Question Section */}
        <Paper
          elevation={6}
          sx={{ p: 3, mb: 5, borderRadius: 3, backgroundColor: "#f9f9f9" }}
        >
          <Typography variant="h6" fontWeight="bold" mb={2}>
            {editIndex !== null ? "Edit Question" : "Add New Question"}
          </Typography>
          <TextField
            label="Question Text"
            value={qText}
            onChange={(e) => setQText(e.target.value)}
            fullWidth
            multiline
            rows={2}
            margin="normal"
          />
          <Grid container spacing={2} mb={2}>
            {options.map((opt, idx) => (
              <Grid item xs={12} sm={6} key={idx}>
                <TextField
                  label={`Option ${idx + 1}`}
                  value={opt}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[idx] = e.target.value;
                    setOptions(newOptions);
                  }}
                  fullWidth
                />
              </Grid>
            ))}
          </Grid>

          <FormControl component="fieldset" sx={{ mb: 2 }}>
            <FormLabel component="legend" sx={{ fontWeight: "600" }}>
              Select the Correct Option
            </FormLabel>
            <RadioGroup
              row
              value={correctOption}
              onChange={(e) => setCorrectOption(e.target.value)}
            >
              {options.map((opt, idx) => (
                <FormControlLabel
                  key={idx}
                  value={opt}
                  control={<Radio color="primary" />}
                  label={`Option ${idx + 1}`}
                  disabled={!opt.trim()}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={addOrUpdateQuestion}
              sx={buttonStyles}
              disabled={!validateQuestion()}
            >
              {editIndex !== null ? "Update Question" : "Add Question"}
            </Button>
            {editIndex !== null && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={resetQuestionForm}
                sx={{ ...buttonStyles, backgroundColor: "transparent" }}
              >
                Cancel Edit
              </Button>
            )}
          </Box>
        </Paper>

        {/* Questions List */}
        <Box sx={{ maxHeight: 300, overflowY: "auto", mb: 4 }}>
          {questions.length === 0 ? (
            <Typography
              variant="body1"
              textAlign="center"
              color="text.secondary"
            >
              No questions added yet.
            </Typography>
          ) : (
            questions.map((q, idx) => (
              <Card
                key={idx}
                variant="outlined"
                sx={{ mb: 2, backgroundColor: "white" }}
              >
                <CardContent>
                  <Typography fontWeight="bold">
                    {idx + 1}. {q.text}
                  </Typography>
                  <Box component="ul" sx={{ pl: 3, mb: 1 }}>
                    {q.options.map((opt, i) => (
                      <li
                        key={i}
                        style={{
                          fontWeight:
                            opt === q.correctOption ? "bold" : "normal",
                          color: opt === q.correctOption ? "green" : "inherit",
                        }}
                      >
                        {opt}
                        {opt === q.correctOption && " (Correct)"}
                      </li>
                    ))}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 1,
                    }}
                  >
                    <Button
                      variant="text"
                      color="primary"
                      onClick={() => handleEditQuestion(idx)}
                      sx={{ textTransform: "none", minWidth: 0 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="text"
                      color="error"
                      onClick={() => handleDeleteQuestion(idx)}
                      sx={{ textTransform: "none", minWidth: 0 }}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))
          )}
        </Box>

        {/* Create Exam Button */}
        <Box textAlign="center" mb={4}>
          <Button
            variant="contained"
            color="success"
            disabled={!canSubmitExam()}
            onClick={handleSubmitExam}
            sx={{ ...buttonStyles, minWidth: 150 }}
          >
            Create Exam
          </Button>
        </Box>
        {/* </Paper> */}

        {/* Recently generated access code */}
        {lastCreatedCode && (
          <Paper
            elevation={6}
            sx={{
              py: 2,
              px: 3,
              textAlign: "center",
              borderRadius: 3,
              backgroundColor: "rgba(255, 255, 255, 0.95)",
            }}
          >
            <Typography variant="h6" fontWeight="bold" color="primary">
              Exam Created Successfully!
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Your Exam Access Code is{" "}
              <Box
                component="span"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                  color: "#d32f2f",
                  letterSpacing: "0.2em",
                }}
              >
                {lastCreatedCode}
              </Box>
            </Typography>
          </Paper>
        )}

        {/* List of Existing Exams and session controls */}
        <Box sx={{ mt: 6 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            color="primary"
            mb={3}
            textAlign="center"
          >
            Existing Exams
          </Typography>
          {examsList.length === 0 ? (
            <Typography textAlign="center" color="text.secondary" mb={4}>
              No exams created yet.
            </Typography>
          ) : (
            <Stack spacing={3}>
              {examsList.map((exam) => (
                <Card key={exam.id} variant="outlined" sx={{ p: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        {exam.title}
                      </Typography>
                      <Typography>Subject: {exam.subject}</Typography>
                      <Typography>Duration: {exam.duration} minutes</Typography>
                      <Typography>
                        Access Code:{" "}
                        <Box
                          component="span"
                          sx={{ fontFamily: "monospace", fontWeight: "bold" }}
                        >
                          {exam.code}
                        </Box>
                      </Typography>
                      <Typography>Status: {exam.status}</Typography>
                    </Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {exam.status === "not started" && (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleStartExam(exam.id)}
                          sx={buttonStyles}
                        >
                          Start Exam Session
                        </Button>
                      )}
                      {exam.status === "started" && (
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleEndExam(exam.id)}
                          sx={buttonStyles}
                        >
                          End Exam Session
                        </Button>
                      )}
                      {exam.status === "ended" && (
                        <Typography color="error" fontWeight="bold">
                          Session Ended
                        </Typography>
                      )}
                    </Stack>
                  </Box>
                </Card>
              ))}
            </Stack>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default ExamManagement;
