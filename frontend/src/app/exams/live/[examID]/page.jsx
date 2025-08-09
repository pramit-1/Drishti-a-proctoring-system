"use client";
import {
  Box,
  Card,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Divider,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import CircularTimer from "./circularTimer";
import { useParams } from "next/navigation";
import axios from "axios";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const StudentExamPage = () => {
  const [answers, setAnswers] = useState({});
  const [exam, setExam] = useState({});
  const [questions, setQuestions] = useState([]);

  const params = useParams();
  const exam_id = params?.examID;

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
      console.log(res.data);
      setExam(res.data);
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

      setQuestions(res.data.questions);
      console.log(res.data.questions);
    } catch (err) {
      console.error("Failed to fetch exam questions:", err);
    }
  };

  useEffect(() => {
    fetchExamData();
    fetchExamQuestions();
  }, [exam_id]);

  const handleChange = (question_id, value) => {
    setAnswers((prev) => ({ ...prev, [question_id]: value }));
  };

  const handleSubmit = () => {
    onSubmit(answers); // Callback to backend
  };

  return (
    <Box display="flex" justifyContent="space-between" p={3} gap={4}>
      {/* Left: Questions */}
      <Box flex={3}>
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
            {exam.title}
          </Typography>
          <Box mb={5}>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              {exam.subject}
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
                    {exam.date}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box display="flex" alignItems="center" gap={1}>
                  <AccessTimeIcon color="action" />
                  <Typography variant="h6" color="text.primary">
                    {exam.duration} mins
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {questions.map((q, idx) => (
          <Card key={q.question_id} variant="outlined" sx={{ mb: 3, p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              {idx + 1}. {q.question}
            </Typography>
            <RadioGroup
              value={answers[q.question_id] || ""}
              onChange={(e) => handleChange(q.question_id, e.target.value)}
            >
              <FormControlLabel
                value="A"
                control={<Radio />}
                label={q.optiona}
              />
              <FormControlLabel
                value="B"
                control={<Radio />}
                label={q.optionb}
              />
              <FormControlLabel
                value="C"
                control={<Radio />}
                label={q.optionc}
              />
              <FormControlLabel
                value="D"
                control={<Radio />}
                label={q.optiond}
              />
            </RadioGroup>
          </Card>
        ))}
        <Divider sx={{ my: 2 }} />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit Exam
        </Button>
      </Box>

      {/* Right: Timer */}
      <Box
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        pt={5}
      >
        <CircularTimer duration={exam.duration} />
      </Box>
    </Box>
  );
};

export default StudentExamPage;
