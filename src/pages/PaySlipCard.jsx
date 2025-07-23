import React from "react";
import {
  Typography,
  Box,
  TableBody,
  TableCell,
  TableRow,
  Card,
  CardContent,
  Table,
} from "@mui/material";
import logo from "../assets/logo1.png";

const PaySlipCard = ({ data = {} }) => {
  if (!data || !data.earnings) return null;

  const maxRows = Math.max(data.earnings.length, data.deductions.length);

  return (
    <Card sx={{ maxWidth: 800, mx: "auto", my: 4, boxShadow: 3 }}>
      <CardContent sx={{ p: 3 }}>
        {/* Header with logo + centered content */}
        <Box textAlign="center" mb={2}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={1}
          >
            <img src={logo} alt="Company Logo" style={{ height: 90 }} />
          </Box>
          <Typography variant="body2" whiteSpace="pre-line">
            {` INSIGNIA Building, Kothapeta,
Hyderabad-35, Phone: 040-4953 2392
mail-to:info@dentassure.in`}
          </Typography>

          <Typography variant="h6" fontWeight="bold" mt={2}>
            Pay Slip for {data.monthYear}
          </Typography>
        </Box>

        {/* Employee Details */}
        <Table size="small" sx={{ mb: 2 }}>
          <TableBody>
            {data.employeeDetails.map(
              ([label1, value1, label2, value2], idx) => (
                <TableRow key={idx}>
                  <TableCell sx={{ width: "25%" }}>
                    <strong>{label1}</strong>
                  </TableCell>
                  <TableCell sx={{ width: "25%" }}>{value1}</TableCell>
                  <TableCell sx={{ width: "25%" }}>
                    <strong>{label2}</strong>
                  </TableCell>
                  <TableCell sx={{ width: "25%" }}>{value2}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>

        {/* Summary Section */}
        <Table sx={{ my: 2 }}>
          <TableBody>
            <TableRow>
              <TableCell>
                <strong>Gross Wages</strong>
              </TableCell>
              <TableCell>{data.summary.grossWages}</TableCell>
              <TableCell>
                <strong>Leaves</strong>
              </TableCell>
              <TableCell>{data.summary.leaves}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Total Working Days</strong>
              </TableCell>
              <TableCell>{data.summary.totalWorkingDays}</TableCell>
              <TableCell>
                <strong>Paid Days</strong>
              </TableCell>
              <TableCell>{data.summary.paidDays}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>LOP Days</strong>
              </TableCell>
              <TableCell>{data.summary.lopDays}</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>

        {/* Earnings & Deductions */}
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Earnings and Deductions
        </Typography>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <strong>Earnings</strong>
              </TableCell>
              <TableCell align="right"></TableCell>
              <TableCell>
                <strong>Deductions</strong>
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>

            {[...Array(maxRows)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>{data.earnings[index]?.[0] || ""}</TableCell>
                <TableCell align="right">
                  {data.earnings[index]?.[1] || ""}
                </TableCell>
                <TableCell>{data.deductions[index]?.[0] || ""}</TableCell>
                <TableCell align="right">
                  {data.deductions[index]?.[1] || ""}
                </TableCell>
              </TableRow>
            ))}

            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>
                <strong>Total Earnings</strong>
              </TableCell>
              <TableCell align="right">
                <strong>{data.totalEarnings}</strong>
              </TableCell>
              <TableCell>
                <strong>Total Deductions</strong>
              </TableCell>
              <TableCell align="right">
                <strong>{data.totalDeductions}</strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* Net Salary */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            border: "1px solid #e0e0e0",
            px: 2,
            py: 1,
            mt: 2,
          }}
        >
          <Typography fontWeight="bold">Net Salary</Typography>
          <Typography fontWeight="bold">{data.netSalary}</Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{ color: "#999", textAlign: "center", mt: 2 }}
        >
          Notice: This payslip has been generated electronically by{" "}
          <strong style={{ color: "red" }}>DENT</strong>
          <strong style={{ color: "black" }}>ASSURE</strong>. No signature is
          necessary. This document is valid and may be used as an official
          record.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PaySlipCard;
