"use client";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";

const CircularTimer = ({ duration = 10, onTimeUp }) => {
  // Duration in minutes → convert to total seconds
  const [remainingSeconds, setRemainingSeconds] = useState(duration * 60);

  useEffect(() => {
    if (duration <= 0) return;

    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (onTimeUp) onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [duration, onTimeUp]);

  const progressValue = (remainingSeconds / (duration * 60)) * 100;

  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="determinate"
        value={progressValue}
        size={120}
        thickness={5}
        color={progressValue < 25 ? "error" : "success"}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        sx={{ lineHeight: 1, textAlign: "center" }} // helps center
      >
        <Typography
          variant="h6"
          sx={{ m: 0, p: 0, lineHeight: 1 }} // no extra margin/padding
        >
          {Math.floor(remainingSeconds / 60)}:
          {(remainingSeconds % 60).toString().padStart(2, "0")}
        </Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{ m: 0, p: 0, lineHeight: 1 }}
        >
          remaining
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularTimer;
