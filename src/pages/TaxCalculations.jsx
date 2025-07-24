import React, { useState, useRef } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Logo from "../assets/logo1.png";
import SectionTitle from "./SectionTitle";

const PRIMARY_COLOR = "#0a9956ff";

const schema = yup.object().shape({
  grossSalary: yup.number().typeError("Required").min(0).required(),
  hraExemption: yup.number().typeError("Required").min(0).required(),
  homeLoanInterest: yup.number().typeError("Required").min(0).required(),
  section80C: yup.number().typeError("Required").min(0).required(),
  healthInsuranceSelf: yup.number().typeError("Required").min(0).required(),
  healthInsuranceParents: yup.number().typeError("Required").min(0).required(),
  standardDeduction: yup.boolean(),
});

const TaxCalculations = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      grossSalary: "",
      standardDeduction: true,
      hraExemption: "",
      homeLoanInterest: "",
      section80C: "",
      healthInsuranceSelf: "",
      healthInsuranceParents: "",
    },
    resolver: yupResolver(schema),
  });

  const [results, setResults] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const componentRef = useRef();

  const onSubmit = (data) => {
    const {
      grossSalary,
      standardDeduction,
      hraExemption,
      homeLoanInterest,
      section80C,
      healthInsuranceSelf,
      healthInsuranceParents,
    } = data;
    const oldRegime = {
      grossSalary,
      standardDeduction: standardDeduction ? 50000 : 0,
      hraExemption,
      deductions: {
        section80C: Math.min(section80C, 150000),
        homeLoanInterest: Math.min(homeLoanInterest, 200000),
        healthInsuranceSelf: Math.min(healthInsuranceSelf, 25000),
        healthInsuranceParents: Math.min(healthInsuranceParents, 50000),
      },
    };

    const newRegime = {
      grossSalary,
      standardDeduction: 75000,
    };

    oldRegime.taxableIncome = calculateOldRegimeTaxableIncome(oldRegime);
    newRegime.taxableIncome = calculateNewRegimeTaxableIncome(newRegime);
    oldRegime.tax = calculateOldRegimeTax(oldRegime.taxableIncome);
    newRegime.tax = calculateNewRegimeTax(newRegime.taxableIncome);

    setResults({ oldRegime, newRegime });
  };

  const calculateOldRegimeTaxableIncome = (data) => {
    let taxable = data.grossSalary - data.standardDeduction - data.hraExemption;
    Object.values(data.deductions).forEach((d) => (taxable -= d));
    return Math.max(0, taxable);
  };

  const calculateNewRegimeTaxableIncome = (data) =>
    Math.max(0, data.grossSalary - data.standardDeduction);

  const calculateOldRegimeTax = (income) => {
    let tax = 0;
    if (income > 1000000) {
      tax += (income - 1000000) * 0.3;
      income = 1000000;
    }
    if (income > 500000) {
      tax += (income - 500000) * 0.2;
      income = 500000;
    }
    if (income > 250000) {
      tax += (income - 250000) * 0.05;
    }
    return tax + tax * 0.04;
  };

  const calculateNewRegimeTax = (income) => {
    let tax = 0;
    if (income > 1500000) {
      tax += (income - 1500000) * 0.3;
      income = 1500000;
    }
    if (income > 1200000) {
      tax += (income - 1200000) * 0.2;
      income = 1200000;
    }
    if (income > 900000) {
      tax += (income - 900000) * 0.15;
      income = 900000;
    }
    if (income > 600000) {
      tax += (income - 600000) * 0.1;
      income = 600000;
    }
    if (income > 300000) {
      tax += (income - 300000) * 0.05;
    }
    return tax + tax * 0.04;
  };

  const downloadPDF = async () => {
    setPdfLoading(true);
    try {
      const canvas = await html2canvas(componentRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`tax-calculation-${new Date().toISOString().slice(0, 10)}.pdf`);
    } finally {
      setPdfLoading(false);
    }
  };

  const difference = results
    ? results.oldRegime.tax - results.newRegime.tax
    : 0;
  const beneficialRegime = difference > 0 ? "NEW REGIME" : "OLD REGIME";

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <img src={Logo} alt="Company Logo" style={{ maxHeight: 60 }} />
      </Box> */}



      <SectionTitle title=' Income Tax Calculator'  />


      {/* Form */}
      <Paper sx={{ p: 3, m: 3 }} elevation={3}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {[
              { name: "grossSalary", label: "Gross Salary (₹)" },
              { name: "hraExemption", label: "HRA Exemption (₹)" },
              { name: "homeLoanInterest", label: "Home Loan Interest (₹)" },
              { name: "section80C", label: "Section 80C Investments (₹)" },
              {
                name: "healthInsuranceSelf",
                label: "Health Insurance (Self) (₹)",
              },
              {
                name: "healthInsuranceParents",
                label: "Health Insurance (Parents) (₹)",
              },
            ].map(({ name, label }) => (
              <Grid item xs={12} sm={6} key={name}>
                <Controller
                  name={name}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label={label}
                      type="number"
                      error={!!errors[name]}
                      helperText={errors[name]?.message}
                    />
                  )}
                />
              </Grid>
            ))}

            <Grid item xs={12}>
              <Controller
                name="standardDeduction"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label="Claim Standard Deduction (Old Regime)"
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  backgroundColor: '#2a7b8bff', "&:hover": {
                    bgcolor: "#22b7b7ff",
                  },
                }}
              >
                Calculate Tax
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="outlined"  fullWidth onClick={() => reset()}>
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Results */}
      {results && (
        <Paper
          ref={componentRef}
          elevation={3}
          sx={{ p: 3, mb: 3, borderRadius: 2, backgroundColor: "#fafafa" }}
        >
          {/* Company Logo */}
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <img
              src={Logo}
              alt="Company Logo"
              style={{ maxWidth: 150, height: "auto" }}
            />
          </Box>

          <Typography variant="h5" gutterBottom>
            Tax Calculation Results
          </Typography>

          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Particulars</TableCell>
                  <TableCell align="right">Old Regime</TableCell>
                  <TableCell align="right">New Regime</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Gross Salary</TableCell>
                  <TableCell align="right">
                    ₹{results.oldRegime.grossSalary.toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    ₹{results.newRegime.grossSalary.toLocaleString()}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Standard Deduction</TableCell>
                  <TableCell align="right">
                    ₹{results.oldRegime.standardDeduction.toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    ₹{results.newRegime.standardDeduction.toLocaleString()}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>HRA Exemption</TableCell>
                  <TableCell align="right">
                    ₹{results.oldRegime.hraExemption.toLocaleString()}
                  </TableCell>
                  <TableCell align="right">NA</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Section 80C Deduction</TableCell>
                  <TableCell align="right">
                    ₹{results.oldRegime.deductions.section80C.toLocaleString()}
                  </TableCell>
                  <TableCell align="right">NA</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Home Loan Interest</TableCell>
                  <TableCell align="right">
                    ₹
                    {results.oldRegime.deductions.homeLoanInterest.toLocaleString()}
                  </TableCell>
                  <TableCell align="right">NA</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Taxable Income</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>
                      ₹{results.oldRegime.taxableIncome.toLocaleString()}
                    </strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>
                      ₹{results.newRegime.taxableIncome.toLocaleString()}
                    </strong>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Tax Amount</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>₹{results.oldRegime.tax.toFixed(2)}</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>₹{results.newRegime.tax.toFixed(2)}</strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Paper sx={{ mt: 2, p: 2, backgroundColor: "#f1f8ff" }}>
            <Typography variant="h6">Summary</Typography>
            <Typography>
              Old Regime Tax: ₹{results.oldRegime.tax.toLocaleString()}
            </Typography>
            <Typography>
              New Regime Tax: ₹{results.newRegime.tax.toLocaleString()}
            </Typography>
            <Typography sx={{ mt: 1, color: PRIMARY_COLOR }}>
              Recommended: {beneficialRegime} (Savings: ₹
              {Math.abs(difference).toLocaleString()})
            </Typography>
          </Paper>
          <Typography
            variant="body2"
            sx={{ color: "#999", textAlign: "center", mt: 2 }}
          >
            * Conditions apply. This is an estimate. For official filing,
            consult a tax professional.
          </Typography>
        </Paper>
      )}
      {/* Save as PDF Button (outside print area) */}
      {results && (
        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "center",
            "@media print": {
              display: "none !important",
            },
          }}
        >
          <Button
            variant="contained"
            onClick={downloadPDF}
            disabled={pdfLoading}
            startIcon={<PictureAsPdfIcon />}
            sx={{
              backgroundColor: '#2a7b8bff',
              color: "#fff",
              "&:hover": { backgroundColor: "#22b7b7ff" },
              "@media print": {
                display: "none !important",
              },
            }}
          >
            {pdfLoading ? "Generating PDF..." : "Save as PDF"}
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default TaxCalculations;
