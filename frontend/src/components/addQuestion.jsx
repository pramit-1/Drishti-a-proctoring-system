"use client";
import React, { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  Box,
  Button,
  FormControlLabel,
  Radio,
} from "@mui/material";

const AddQuestion = () => {
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

  const [qText, setQText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState("");
  const [editIndex, setEditIndex] = useState(null);

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

  return (
    <>
      <Paper
        elevation={6}
        sx={{ p: 2, mb: 5, borderRadius: 3, backgroundColor: "#f9f9f9" }}
      >
        <Typography variant="h6" fontWeight="bold">
          {editIndex !== null ? "Edit Question" : "Add New Question"}
        </Typography>
        <TextField
          label="Question Text"
          value={qText}
          onChange={(e) => setQText(e.target.value)}
          fullWidth
          multiline
          rows={1}
          margin="normal"
        />
        <Grid container spacing={2} mb={1}>
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

        <FormControl component="fieldset" sx={{ mb: 1 }}>
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
    </>
  );
};

export default AddQuestion;
