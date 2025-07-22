import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Link
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import html2pdf from "html2pdf.js";
import PaySlipCard from "./PaySlipCard";

const STORAGE_KEY = "vinayPayroll";

const vinayPayrollData = [
  { id: 1, name: "Vinay", month: "January", year: 2024, salary: "₹45,000" },
  { id: 2, name: "Vinay", month: "February", year: 2024, salary: "₹47,000" },
  { id: 3, name: "Vinay", month: "March", year: 2024, salary: "₹46,000" },
  { id: 4, name: "Vinay", month: "April", year: 2024, salary: "₹48,500" },
  { id: 5, name: "Vinay", month: "May", year: 2024, salary: "₹49,000" },
  { id: 6, name: "Vinay", month: "June", year: 2024, salary: "₹50,000" },
  { id: 7, name: "Vinay", month: "July", year: 2024, salary: "₹51,000" },
  { id: 8, name: "Vinay", month: "August", year: 2024, salary: "₹52,500" },
  { id: 9, name: "Vinay", month: "September", year: 2024, salary: "₹54,000" },
  { id: 10, name: "Vinay", month: "October", year: 2024, salary: "₹55,000" },
  { id: 11, name: "Vinay", month: "November", year: 2024, salary: "₹56,000" },
  { id: 12, name: "Vinay", month: "December", year: 2024, salary: "₹57,500" },
];

const Payroll = () => {
  const [payrollData, setPayrollData] = useState([]);
  const [page, setPage] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPayslip, setSelectedPayslip] = useState(null);
  const pdfRef = useRef();

  const rowsPerPage = 6;
  const totalPages = Math.ceil(vinayPayrollData.length / rowsPerPage);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setPayrollData(JSON.parse(stored));
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(vinayPayrollData));
      setPayrollData(vinayPayrollData);
    }
  }, []);

  const handleOpenDialog = (row) => {
    setSelectedPayslip(row);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPayslip(null);
  };

  const handleDownload = () => {
    const element = pdfRef.current;
    const opt = {
      margin: 0.5,
      filename: `Payslip_${selectedPayslip.month}_${selectedPayslip.year}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  const handleChangePage = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const paginatedData = payrollData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Card sx={{ m: 4, p: 2, boxShadow: 5, borderRadius: 3 }}>
        <CardContent>
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            color="primary"
            gutterBottom
          >
            Payroll: Vinay
          </Typography>

          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#e8f5e9" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>S.No.</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Month</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Year</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Salary</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#f0fff0" : "#fffef0",
                    }}
                  >
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      {row.month}
                    </TableCell>
                    <TableCell>{row.year}</TableCell>
                    <TableCell>{row.salary}</TableCell>
                    <TableCell>
                      <Link
                        component="button"
                        onClick={() => handleOpenDialog(row)}
                        underline="hover"
                      >
                        View Payslip
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="center"
                      mt={2}
                    >
                      <Button
                        variant="outlined"
                        onClick={() => handleChangePage(page - 1)}
                        disabled={page === 0}
                      >
                        Prev
                      </Button>
                      {Array.from({ length: totalPages }, (_, i) => (
                        <Button
                          key={i}
                          variant={i === page ? "contained" : "outlined"}
                          onClick={() => handleChangePage(i)}
                        >
                          {i + 1}
                        </Button>
                      ))}
                      <Button
                        variant="outlined"
                        onClick={() => handleChangePage(page + 1)}
                        disabled={page >= totalPages - 1}
                      >
                        Next
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Dialog with Payslip and Download */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Payslip
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <div ref={pdfRef}>
            {selectedPayslip && (
              <PaySlipCard
                data={{
                  companyName: "Company Name",
                  companyAddress: "Company Address",
                  monthYear: `${selectedPayslip.month} ${selectedPayslip.year}`,
                  employeeDetails: [
                    ["Employee ID", "EMP001", "UAN", "123456789012"],
                    ["Employee Name", "Vinay Kumar", "PF No.", "PFD0112233"],
                    [
                      "Designation",
                      "Software Engineer",
                      "ESI No.",
                      "ESI445596",
                    ],
                    ["Department", "IT", "Bank", "ICICI"],
                    [
                      "Date of Joining",
                      "01-Jan-2020",
                      "Account No.",
                      "XXXXXXXXX67800",
                    ],
                  ],
                  summary: {
                    grossWages: selectedPayslip.salary,
                    totalWorkingDays: "30",
                    leaves: "0",
                    lopDays: "0",
                    paidDays: "30",
                  },
                  earnings: [
                    ["Basic", "₹7,600"],
                    ["HRA", "₹3,000"],
                    ["Conveyance Allowance", "₹1,000"],
                    ["Medical Allowance", "₹1,250"],
                    ["Other Allowances", "₹1,150"],
                  ],
                  deductions: [
                    ["BPE", "₹800"],
                    ["ESI", "₹113"],
                    ["Professional Tax", "₹0"],
                  ],
                  totalEarnings: selectedPayslip.salary,
                  totalDeductions: "₹1,013",
                  netSalary: "₹13,988",
                }}
              />
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="success" onClick={handleDownload}>
            Download PDF
          </Button>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Payroll;
