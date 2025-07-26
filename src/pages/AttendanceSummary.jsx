import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Select,
  MenuItem,
} from "@mui/material";

const statusColors = {
  Present: "#D4F5DC",
  Absent: "#FCE3E1",
  Leave: "#ECEAFF",
  Holidays: "#F3EED9",
};

const statusTextColors = {
  Present: "#1B873F",
  Absent: "#C83E3E",
  Leave: "#5B4DC5",
  Holidays: "#A88F48",
};

const summaryData = [
  { label: "Present", count: 21 },
  { label: "Absent", count: 2 },
  { label: "Leave", count: 4 },
  { label: "Holidays", count: 4 },
];

const AttendanceSummary = () => {
  const [selectedMonth, setSelectedMonth] = React.useState("Jul 2025");

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        padding: 2,
        width: "100%",
        maxWidth: 300,
        height:320,
        mt:1,
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="bold">
            Attendance summary
          </Typography>
          <Select
            size="small"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            sx={{ fontSize: "14px", minWidth: "110px" }}
          >
            <MenuItem value="Jul 2025">Jul 2025</MenuItem>
            <MenuItem value="Jun 2025">Jun 2025</MenuItem>
            <MenuItem value="May 2025">May 2025</MenuItem>
          </Select>
        </Box>

        <Grid container spacing={2}>
          {summaryData.map((item) => (
            <Grid item xs={6} sm={3} key={item.label}>
              <Box
                sx={{
                  backgroundColor: statusColors[item.label],
                  borderRadius: 2,
                  padding: "10px 0",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: statusTextColors[item.label],
                    fontSize: "16px",
                  }}
                >
                  {String(item.count).padStart(2, "0")}
                </Typography>
                <Typography
                  sx={{ fontSize: "13px", fontWeight: 500, color: "#555" }}
                >
                  {item.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AttendanceSummary;
