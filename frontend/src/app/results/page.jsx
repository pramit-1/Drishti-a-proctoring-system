"use client";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const ResultsPage = ({ results }) => {
  // results = [{ title, subject, date, score }, ...]

  return (
    <Box maxWidth="900px" mx="auto" mt={6} px={3}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
        textAlign="center"
        color="primary"
      >
        Your Exam Results
      </Typography>

      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: "primary.main" }}>
            <TableRow>
              {["Title", "Subject", "Date", "Score"].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    color: "common.white",
                    fontWeight: "bold",
                    fontSize: 16,
                    borderBottom: "none",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {results.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center"
                  sx={{ py: 5, fontStyle: "italic", color: "text.secondary" }}
                >
                  No results available.
                </TableCell>
              </TableRow>
            ) : (
              results.map(({ title, subject, date, score }, idx) => (
                <TableRow
                  key={`${title}-${idx}`}
                  sx={{
                    bgcolor: idx % 2 === 0 ? "grey.50" : "common.white",
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: 600 }}>{title}</TableCell>
                  <TableCell>{subject}</TableCell>
                  <TableCell>{new Date(date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Typography
                      component="span"
                      sx={{
                        fontWeight: "bold",
                        color: score >= 50 ? "success.main" : "error.main",
                      }}
                    >
                      {score}%
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ResultsPage;
