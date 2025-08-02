"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import axios from "axios";

const CreateExamModal = ({ open, onClose, onCreated }) => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async () => {
    // try {
    //   const res = await axios.post("http://localhost:8000/api/exams", {
    //     title,
    //     subject,
    //     duration,
    //     date,
    //   });
    //   if (onCreated) onCreated(res.data);
    //   onClose(); // close modal
    // } catch (err) {
    //   console.error("Failed to create exam:", err);
    // }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          padding: 3,
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
        Create New Exam
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} mt={1}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
            variant="outlined"
          />
          <TextField
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            fullWidth
            required
            variant="outlined"
          />
          <TextField
            label="Duration (in minutes)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            type="number"
            fullWidth
            required
            variant="outlined"
          />
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
            variant="outlined"
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", mt: 2 }}>
        <Button onClick={onClose} color="error" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateExamModal;
