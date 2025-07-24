import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const HRLoginButton = () => {
  const { login, isHR, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "hr@company.com",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      // Simple validation - replace with actual API call in production
      if (!credentials.password) {
        throw new Error("Password is required");
      }

      if (credentials.password === "hrpassword") {
        await login({
          email: credentials.email,
          name: "HR Manager",
          role: "hr",
          id: "hr-001",
        });
        setOpen(false);
      } else {
        throw new Error("Invalid HR credentials");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setError("");
    setCredentials({ ...credentials, password: "" });
  };

  return (
    <Box sx={{ ml: 2 }}>
      {isHR() ? (
        <Button
          color="error"
          variant="contained"
          onClick={logout}
          sx={{
            minWidth: 120,
          }}
        >
          Logout HR
        </Button>
      ) : (
        <Button
          variant="outlined"
          onClick={() => setOpen(true)}
          sx={{
            minWidth: 120,
            borderColor: "primary.main",
            "&:hover": {
              borderColor: "primary.dark",
            },
          }}
        >
          HR Login
        </Button>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ textAlign: "center", pb: 1 }}>
          HR Portal Login
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              disabled
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={credentials.password}
              onChange={(e) => {
                setCredentials({ ...credentials, password: e.target.value });
                setError("");
              }}
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            />
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleClose} color="inherit" sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button
            onClick={handleLogin}
            variant="contained"
            disabled={loading || !credentials.password}
            sx={{ minWidth: 100 }}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HRLoginButton;
