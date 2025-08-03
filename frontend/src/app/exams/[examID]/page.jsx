"use client";

import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useParams } from "next/navigation";

const ExamDetailPage = () => {
  const { examId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [examInfo, setExamInfo] = useState({});
  const [newQ, setNewQ] = useState({
    question: "",
    options: ["", "", "", ""],
    correct: "",
  });

  const fetchQuestions = async () => {
    const token = localStorage.getItem("access_token");
    // const res = await axios.get(
    //   `http://localhost:8000/api/exam/questions/view-all-proctor/${examId}`,
    //   {
    //     headers: { Authorization: `Bearer ${token}` },
    //   }
    // );
    // setQuestions(res.data.questions);
    // setExamInfo(res.data.exam);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const deleteQuestion = async (qid) => {
    const token = localStorage.getItem("access_token");
    // await axios.delete(`http://localhost:8000/api/questions/delete/${qid}`, {
    //   headers: { Authorization: `Bearer ${token}` },
    // });
    // fetchQuestions();
  };

  const cancelExam = async () => {
    // const token = localStorage.getItem("access_token");
    // await axios.patch(`http://localhost:8000/api/exam/cancel/${examId}`, {}, {
    //   headers: { Authorization: `Bearer ${token}` },
    // });
    alert("Exam canceled");
  };

  const addQuestion = async () => {
    const token = localStorage.getItem("access_token");
    // await axios.post(`http://localhost:8000/api/questions/add`, {
    //   exam_id: examId,
    //   question: newQ.question,
    //   option1: newQ.options[0],
    //   option2: newQ.options[1],
    //   option3: newQ.options[2],
    //   option4: newQ.options[3],
    //   correct_option: newQ.correct,
    // }, {
    //   headers: { Authorization: `Bearer ${token}` },
    // });
    // setNewQ({ question: "", options: ["", "", "", ""], correct: "" });
    // fetchQuestions();
  };

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        {examInfo.title} — {examInfo.subject}
      </Typography>

      <Typography variant="subtitle1" mb={1}>
        Duration: {examInfo.duration} minutes | Date: {examInfo.date}
      </Typography>

      <Typography variant="h6" mt={3}>
        Questions
      </Typography>
      {questions.map((q) => (
        <Card key={q.id} sx={{ mt: 2 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between">
              <Typography>{q.question}</Typography>
              <IconButton onClick={() => deleteQuestion(q.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
            <ul>
              {[q.optionA, q.optionB, q.optionC, q.optionD].map((opt, idx) => (
                <li
                  key={idx}
                  style={{ color: q.correct_ans === opt ? "green" : undefined }}
                >
                  {opt}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}

      <Box mt={4}>
        <Typography variant="h6">Add New Question</Typography>
        <Stack spacing={2}>
          <TextField
            label="Question"
            value={newQ.question}
            onChange={(e) => setNewQ({ ...newQ, question: e.target.value })}
            fullWidth
          />
          {[0, 1, 2, 3].map((i) => (
            <TextField
              key={i}
              label={`Option ${String.fromCharCode(65 + i)}`}
              value={newQ.options[i]}
              onChange={(e) =>
                setNewQ({
                  ...newQ,
                  options: newQ.options.map((val, idx) =>
                    idx === i ? e.target.value : val
                  ),
                })
              }
              fullWidth
            />
          ))}
          <TextField
            label="Correct Option"
            value={newQ.correct}
            onChange={(e) => setNewQ({ ...newQ, correct: e.target.value })}
            fullWidth
          />
          <Button variant="contained" onClick={addQuestion}>
            Add Question
          </Button>
        </Stack>
      </Box>

      <Box mt={4}>
        <Button variant="outlined" color="error" onClick={cancelExam}>
          Cancel Exam
        </Button>
      </Box>
    </Box>
  );
};

export default ExamDetailPage;
